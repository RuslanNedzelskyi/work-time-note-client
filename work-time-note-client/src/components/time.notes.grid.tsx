import moment from "moment";
import React from "react";
import { TimeNote } from "../entities/time.note";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

interface IProps {
    timeNotes: TimeNote[];
    onEdit: (id: any) => void;
    onRemove: (id: any) => void;
}

interface IRows {
    id: number,
    name: string,
    start: any,
    end: any,
    rate: number,
    value: number,
    onEdit: any,
    onRemove: any,
}

export const TimeNotesGrid: React.FC<IProps> = (props) => {
    const classes = useStyles();

    const rows: IRows[] = props.timeNotes.map((timeNote) => {
        return {
            id: timeNote.id,
            name: timeNote.name,
            start: moment(timeNote.start).format('DD:MM:YYYY HH.mm.ss'),
            end: moment(timeNote.end).format('DD:MM:YYYY HH.mm.ss'),
            rate: timeNote.rate,
            value: timeNote.value,
            onEdit: '',
            onRemove: ''
        }
    });

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" width={200}>Start date</TableCell>
                        <TableCell align="left" width={200}>End date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right" width={80}>Rate</TableCell>
                        <TableCell align="right" width={80}>Value</TableCell>
                        <TableCell align="right" width={120}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>

                            <TableCell align="left">{row.start}</TableCell>
                            <TableCell align="left">{row.end}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.rate}</TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                            <TableCell align="right">
                                <div className={classes.dataGridControl}>
                                    <div className={classes.changeControl} onClick={() => props.onEdit(row.id)}><EditIcon /></div>
                                    <div className={classes.changeControl} onClick={() => props.onRemove(row.id)}><DeleteIcon /></div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


const useStyles = makeStyles((theme) => ({
    dataGridControl: {
        display: 'flex',
    },
    table: {
        minWidth: 650,
    },
    tableContainer: {
        maxWidth: 1280,
        margin: '20px auto 0',
    },
    changeControl: {
        marginLeft: '20px',
        cursor: 'pointer',
    }
}));