export class API {
    private static readonly SERVER_URL = 'http://localhost:64809/'

    private static readonly TIME_NOTE_CONTROLLER = 'time/note/';

    public static readonly TimeNoteEndPoints = {
        API_GET_ALL: API.SERVER_URL + API.TIME_NOTE_CONTROLLER + 'all/get',
        API_POST_NEW_TIME_NOTE: API.SERVER_URL + API.TIME_NOTE_CONTROLLER + 'new',
        API_POST_UPDATE_TIME_NOTE: API.SERVER_URL + API.TIME_NOTE_CONTROLLER + 'update',
        API_POST_REMOVE_TIME_NOTE: API.SERVER_URL + API.TIME_NOTE_CONTROLLER + 'remove?netId=',
    }
}