import { CssBaseline, AppBar, Toolbar, Typography, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from "react";
import TimerIcon from '@material-ui/icons/Timer';
import { TimeNotesGrid } from "./time.notes.grid";
import { CreateTimeNoteModal } from "./create.time.note.modal";
import { TimeNote } from "../entities/time.note";
import { API } from "../actions/api.constants";

export const MasterPage: React.FC = () => {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(false);
    const [IsError, setIsError] = useState(false);
    const [newTimeNote, setNewTimeNote] = useState(new TimeNote());

    const [timeNotes, setTimeNotes] = useState([]);

    const handleClickOpen = () => {
        setIsError(false);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const createNewTimeNote = () => {
        if (!newTimeNote.name || !newTimeNote.start || !newTimeNote.end || newTimeNote.rate <= 0) {
            setIsError(true);
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTimeNote)
            };
            fetch(API.TimeNoteEndPoints.API_POST_NEW_TIME_NOTE, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setOpen(false);
                    setNewTimeNote(new TimeNote());
                    setTimeNotes(data.body);
                });
        }
    }

    const changeNewTimeNote = (field: string, value: any) => {
        setNewTimeNote({ ...newTimeNote, [field]: value });
    }

    useEffect(() => {
        fetch(API.TimeNoteEndPoints.API_GET_ALL)
            .then(response => response.json())
            .then((data) => {
                setTimeNotes(data.body);
            });
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Typography className={classes.typography} variant="h6" noWrap>
                        Work Time Note
                        </Typography>
                    <Button variant="contained" color="primary" className={classes.createButton} onClick={handleClickOpen}>
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
                <TimeNotesGrid timeNotes={timeNotes} />
            </main>
            <CreateTimeNoteModal newTimeNote={newTimeNote} changeNewTimeNote={changeNewTimeNote} isOpen={isOpen} handleClose={handleClose} createNewTimeNote={createNewTimeNote} IsError={IsError} />
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