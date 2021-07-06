import baseJError, { baseJErrorStatus } from "./baseJError";

export default class JFail extends baseJError {
    constructor(data?: any) { 
        super("JFail", baseJErrorStatus.FAIL, 400);
        this.data = data;
    }
}