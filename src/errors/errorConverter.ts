import JSendError, { JSendErrorCodes } from "./jsendError";

import jsend from 'jsend';
export default (error : Error | JSendError , code: string | undefined) => {
    if(error instanceof JSendError) return error;
    if(typeof code === "undefined") code = JSendErrorCodes.UNCONTROLLED_ERROR;
    new JSendError(jsend.error({
        code: code,
        message: "Undefined error"
    }));
}

