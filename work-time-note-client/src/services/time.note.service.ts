import { API } from "../actions/api.constants";
import { ApiOptionBuilder } from "../helpers/api.option.builder";

export interface IAction {
    type: string;
    payload: any;
    callback: (data: any) => void;
}

export class TimeNoteService {
    public static reduce(props: IAction) {
        switch (props.type) {
            case TimeNoteService.GET_ALL_TIME_NOTES:
                TimeNoteService._getAll(props);
                break
            case TimeNoteService.ADD_NEW_TIME_NOTE:
                TimeNoteService._addNewTimeNote(props);
                break
            case TimeNoteService.UPDATE_TIME_NOTE:
                TimeNoteService._updateTime(props);
                break
            case TimeNoteService.REMOVE_TIME_NOTE:
                TimeNoteService._removeTimeNote(props);
                break
        }
    }

    private static _getAll = (props: IAction) => {
        fetch(API.TimeNoteEndPoints.API_GET_ALL)
            .then(response => response.json())
            .then((data) => {
                props.callback(data);
            });
    }

    private static _addNewTimeNote = (props: IAction) => {
        const option = ApiOptionBuilder.Build('POST', { 'Content-Type': 'application/json' }, JSON.stringify(props.payload));
        fetch(API.TimeNoteEndPoints.API_POST_NEW_TIME_NOTE, option)
            .then(response => response.json())
            .then(data => {
                props.callback(data);
            });
    }

    private static _updateTime = (props: IAction) => {
        const option = ApiOptionBuilder.Build('POST', { 'Content-Type': 'application/json' }, JSON.stringify(props.payload));
        fetch(API.TimeNoteEndPoints.API_POST_UPDATE_TIME_NOTE, option)
            .then(response => response.json())
            .then(data => {
                props.callback(data);
            });
    }

    private static _removeTimeNote = (props: IAction) => {
        const option = ApiOptionBuilder.Build('POST', { 'Content-Type': 'application/json' });
        fetch(API.TimeNoteEndPoints.API_POST_REMOVE_TIME_NOTE + props.payload, option)
            .then(response => response.json())
            .then(data => {
                props.callback(data);
            });
    }

    public static GET_ALL_TIME_NOTES: string = 'GET_ALL_TIME_NOTES';
    public static ADD_NEW_TIME_NOTE: string = 'ADD_NEW_TIME_NOTE';
    public static UPDATE_TIME_NOTE: string = 'UPDATE_TIME_NOTE';
    public static REMOVE_TIME_NOTE: string = 'REMOVE_TIME_NOTE';
}