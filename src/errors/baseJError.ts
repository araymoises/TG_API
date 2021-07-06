import jsend from 'jsend';

export enum baseJErrorStatus {
    FAIL = "fail",
    ERROR = "error"
};

export default abstract class baseJError extends Error implements jsend.JSendObject {
    
    httpStatus: number;
    status: string;
    code?: string | undefined;
    data?: any;

    constructor(name:string, status: baseJErrorStatus, httpStatus: number) { 
        super(name);
        this.status = status;
        this.httpStatus = httpStatus;
    }

    setStatus(httpStatus: number): baseJError {
        this.httpStatus = httpStatus;
        return this;
    }

    setCode(code: string): baseJError {
        this.code = code;
        return this;
    }
}

