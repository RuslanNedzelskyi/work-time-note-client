import { DataGrid, GridCellParams, GridColDef } from "@material-ui/data-grid";
import moment from "moment";
import React from "react";
import { TimeNote } from "../entities/time.note";
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';

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

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 500 },
        { field: 'start', headerName: 'Start', width: 200 },
        { field: 'end', headerName: 'End', width: 200 },
        { field: 'rate', headerName: 'Rate', width: 150 },
        { field: 'value', headerName: 'Value', width: 150 },
        {
            field: 'onEdit', headerName: 'Edit', width: 200,
            hideSortIcons: true,
            renderCell: (params: GridCellParams) => {
                return (
                    <div onClick={() => props.onEdit(params.row.id)}><UpdateIcon /></div>
                );
            }
        },
        {
            field: 'onRemove', headerName: 'Remove', width: 200,
            hideSortIcons: true,
            renderCell: (params: GridCellParams) => {
                return (
                    <div onClick={() => props.onRemove(params.row.id)}><DeleteIcon /></div>
                );
            }
        },
    ];

    return (
        <DataGrid disableColumnFilter={true} hideFooterSelectedRowCount={true} disableColumnMenu={true} rows={rows} rowsPerPageOptions={[]} hideFooterPagination={true} columns={columns} />
    );
}

