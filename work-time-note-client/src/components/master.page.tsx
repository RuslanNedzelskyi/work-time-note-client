import { CssBaseline, AppBar, Toolbar, Typography, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import TimerIcon from '@material-ui/icons/Timer';
import { TimeNotesGrid } from "./time.notes.grid";
import { CreateTimeNoteModal } from "./create.time.note.modal";
import { TimeNote } from "../entities/time.note";
import { API } from "../actions/api.constants";
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';

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

    useEffect(() => {
        fetch(API.TimeNoteEndPoints.API_GET_ALL)
            .then(response => response.json())
            .then((data) => {
                setTimeNotes(data.body);
            });
    }, []);

    const manageTimeNote = () => {
        if (!updatedTimeNote.name || !updatedTimeNote.start || !updatedTimeNote.end || updatedTimeNote.rate <= 0) {
            setIsError(true);
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTimeNote)
            };

            if (updatedTimeNote.id > 0) {
                fetch(API.TimeNoteEndPoints.API_POST_UPDATE_TIME_NOTE, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        if (data.statusCode === 400) {
                            store.addNotification({
                                title: "Fail",
                                message: data.message,
                                type: "danger",
                                insert: "bottom",
                                container: "bottom-right",
                                animationIn: ["animate__animated", "animate__fadeIn"],
                                animationOut: ["animate__animated", "animate__fadeOut"],
                                dismiss: {
                                    duration: 5000,
                                    onScreen: true
                                }
                            });
                            setOpen(false);
                            setUpdatedTimeNote(new TimeNote());
                        } else {
                            setOpen(false);
                            setUpdatedTimeNote(new TimeNote());
                            setTimeNotes(data.body);
                        }
                    });
            } else {
                fetch(API.TimeNoteEndPoints.API_POST_NEW_TIME_NOTE, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        if (data.statusCode === 400) {
                            store.addNotification({
                                title: "Fail",
                                message: data.message,
                                type: "danger",
                                insert: "bottom",
                                container: "bottom-right",
                                animationIn: ["animate__animated", "animate__fadeIn"],
                                animationOut: ["animate__animated", "animate__fadeOut"],
                                dismiss: {
                                    duration: 5000,
                                    onScreen: true
                                }
                            });
                            setOpen(false);
                            setUpdatedTimeNote(new TimeNote());
                        } else {
                            setOpen(false);
                            setUpdatedTimeNote(new TimeNote());
                            setTimeNotes(data.body);
                        }
                    });
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
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(API.TimeNoteEndPoints.API_POST_REMOVE_TIME_NOTE + removedTimeNote.netId, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setOpen(false);
                    setUpdatedTimeNote(new TimeNote());
                    setTimeNotes(data.body);
                });
        }
    }

    const changeTimeNote = (field: string, value: any) => {
        setUpdatedTimeNote({ ...updatedTimeNote, [field]: value });
    }

    return (
        <div>
            <div className={classes.root}>
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
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon><TimerIcon /></ListItemIcon>
                            <ListItemText primary={'Time note'} />
                        </ListItem>
                    </List>
                </Drawer>
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
            </div>
            <ReactNotification />
        </div>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: '#1976d2',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        height: '100vh'
    },
    drawerPaper: {
        width: drawerWidth,
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