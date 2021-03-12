import { DataGrid, GridColDef, GridRowsProp } from "@material-ui/data-grid";
import moment from "moment";
import React from "react";
import { TimeNote } from "../entities/time.note";

interface IProps {
    timeNotes: TimeNote[];
}

interface IRows {
    name: string,
    start: any,
    end: any,
    rate: number,
    value: number,
    edit: () => void;
    remove: () => void;
}

export const TimeNotesGrid: React.FC<IProps> = (props) => {
    const rows: IRows[] = props.timeNotes.map((timeNote) => {
        return {
            id: timeNote.id,
            name: timeNote.name,
            start: moment(timeNote.start).format('DD:MM:YYYY hh.mm.ss'),
            end: moment(timeNote.end).format('DD:MM:YYYY hh.mm.ss'),
            rate: timeNote.rate,
            value: timeNote.value,
        }
    });

    return (
        <DataGrid className='asdasdasdasd' disableColumnFilter={true} disableColumnMenu={true} rows={rows} rowsPerPageOptions={[]} columns={columns} />
    );
}

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 500 },
    { field: 'start', headerName: 'Start', width: 200 },
    { field: 'end', headerName: 'End', width: 200 },
    { field: 'rate', headerName: 'Rate', width: 200 },
    { field: 'value', headerName: 'Value', width: 200 },
];