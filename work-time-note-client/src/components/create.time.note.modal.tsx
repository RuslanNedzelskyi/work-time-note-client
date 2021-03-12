import React, { useState } from 'react';
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { TimeNote } from '../entities/time.note';

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        }
    });

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

interface IProps {
    isOpen: boolean;
    handleClose: () => void;
    manageTimeNote: () => void;
    IsError: boolean;
    timeNote: TimeNote;
    changeTimeNote: (field: string, value: any) => void;
}

export const CreateTimeNoteModal: React.FC<IProps> = (props) => {
    const classes = useStyles();

    return (
        <div>
            <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.isOpen}>
                <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                    New time note
                </DialogTitle>
                <DialogContent dividers className={classes.modalWrapper}>
                    <form className={classes.form} autoComplete="off">
                        <TextField className={classes.inputName} required id="standard-required" label="Name"
                            onChange={(event: any) => {
                                props.changeTimeNote('name', event.target.value);
                            }}
                            defaultValue={props.timeNote.name}
                        />
                        <TextField
                            id="datetime-local"
                            label="Start"
                            type="datetime-local"
                            className={classes.dateTimeField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name='Start'
                            defaultValue={props.timeNote.start}
                            required
                            onChange={(event: any) => {
                                props.changeTimeNote('start', event.target.value);
                            }}
                        />
                        <TextField
                            id="datetime-local"
                            label="End"
                            type="datetime-local"
                            className={classes.dateTimeField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={props.timeNote.end}
                            required
                            onChange={(event: any) => {
                                props.changeTimeNote('end', event.target.value);
                            }}
                        />
                        <TextField
                            id="standard-number"
                            label="Rate"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={props.timeNote.rate}
                            className={classes.number}
                            onChange={(event: any) => {
                                props.changeTimeNote('rate', event.target.value);
                            }}
                        />

                        {
                            props.IsError &&
                            <p className={classes.errorMessage}>
                                Form is not valid
                            </p>
                        }
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => {
                        props.manageTimeNote();
                    }} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    modalWrapper: {
        minWidth: 380,
        minHeight: 300,
        maxWidth: 450,
    },
    form: {
        margin: '0 auto',
        height: '250px',
        width: '250px'
    },
    inputName: {
        width: '100%',
        height: '40px',
        marginBottom: theme.spacing(2)
    },
    number: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    dateTimeField: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    errorMessage: {
        color: 'red',
        marginTop: '-14px'
    }
}));

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
