interface IRequestOptions {
    method: 'GET' | 'POST',
    headers: any,
    body: any
}

export class ApiOptionBuilder {
    private static _requestOption: IRequestOptions = { method: 'GET', headers: '', body: '' };

    public static Build(method: 'GET' | 'POST', headers: any = '', body: any = ''): IRequestOptions {
        ApiOptionBuilder._requestOption.method = method;
        ApiOptionBuilder._requestOption.headers = headers;
        ApiOptionBuilder._requestOption.body = body;

        return ApiOptionBuilder._requestOption;
    }
}