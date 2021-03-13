import { CssBaseline, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import { TimeNotesGrid } from "./time.notes.grid";
import { CreateTimeNoteModal } from "./create.time.note.modal";
import { TimeNote } from "../entities/time.note";
import moment from "moment";
import { TimeNoteService } from "../services/time.note.service";

export const MasterPage: React.FC = () => {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(false);
    const [IsError, setIsError] = useState(false);
    const [updatedTimeNote, setUpdatedTimeNote] = useState(new TimeNote());
    const [timeNotes, setTimeNotes] = useState([] as TimeNote[]);

    const handleClickOpenModal = () => {
        setIsError(false);
        setOpen(true);
    };
    const handleCloseModal = () => {
        setOpen(false);
        setUpdatedTimeNote(new TimeNote());
    };

    const callbackForAction = (data: any) => {
        setOpen(false);
        setUpdatedTimeNote(new TimeNote());
        setTimeNotes(data.body);
    }

    const IsFormValid = () => {
        if (!updatedTimeNote.name ||
            !updatedTimeNote.start ||
            !updatedTimeNote.end || updatedTimeNote.rate <= 0 || moment(updatedTimeNote.end).isBefore(updatedTimeNote.start)) {
            return false;
        } else {
            return true
        }
    }

    useEffect(() => {
        TimeNoteService.reduce(
            {
                type: TimeNoteService.GET_ALL_TIME_NOTES,
                payload: undefined,
                callback: (data) => setTimeNotes(data.body)
            }
        )
    }, []);

    const manageTimeNote = () => {
        if (!IsFormValid()) {
            setIsError(true);
        } else {
            if (updatedTimeNote.id > 0) {
                TimeNoteService.reduce(
                    {
                        type: TimeNoteService.UPDATE_TIME_NOTE,
                        payload: updatedTimeNote,
                        callback: callbackForAction
                    }
                )
            } else {
                TimeNoteService.reduce(
                    {
                        type: TimeNoteService.ADD_NEW_TIME_NOTE,
                        payload: updatedTimeNote,
                        callback: callbackForAction
                    }
                )
            }
        }
    }

    const onEditClick = (id: any) => {
        const updatedTimeNote = timeNotes.find(x => x.id === id);

        if (updatedTimeNote) {
            setOpen(true);
            setUpdatedTimeNote(updatedTimeNote);
        }
    }

    const onRemove = (id: any) => {
        const removedTimeNote = timeNotes.find(x => x.id === id);

        if (removedTimeNote) {
            TimeNoteService.reduce(
                {
                    type: TimeNoteService.REMOVE_TIME_NOTE,
                    payload: removedTimeNote.netId,
                    callback: callbackForAction
                }
            )
        }
    }

    const changeTimeNote = (field: string, value: any) => {
        setUpdatedTimeNote({ ...updatedTimeNote, [field]: value });
    }

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Typography className={classes.typography} variant="h6" noWrap>
                        Work Time Note
                        </Typography>
                    <Button variant="contained" color="primary" className={classes.createButton} onClick={handleClickOpenModal}>
                        Create
                    </Button>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <TimeNotesGrid timeNotes={timeNotes ? timeNotes : []} onEdit={onEditClick} onRemove={onRemove} />
            </main>
            <CreateTimeNoteModal
                timeNote={updatedTimeNote}
                manageTimeNote={manageTimeNote}
                isOpen={isOpen}
                handleClose={handleCloseModal}
                IsError={IsError}
                changeTimeNote={changeTimeNote} />
        </>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        marginLeft: drawerWidth,
        backgroundColor: '#1976d2',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        position: 'relative',
        paddingTop: 78
    },
    createButton: {
        float: 'right',
        display: 'inline',
        height: '40px'
    },
    toolBar: {
        paddingTop: '10px',
        paddingBottom: '10px',
        display: 'block ',
        height: '60px'
    },
    typography: {
        display: 'inline',
        lineHeight: '40px'
    }
}));