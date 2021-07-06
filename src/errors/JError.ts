import baseJError, { baseJErrorStatus } from "./baseJError";

export enum JSendResourceTypeCodes {
    RESERVED   = "00",
    GENERAL    = "01",
    ROUTE      = "02",
    CONTROLLER = "03",
    SERVICE    = "04",
	MODEL      = "05",
	MIDDLEWARE = "06",
}

export enum JSendErrorCodes {
    UNCONTROLLED_ERROR = "CTIC-00-000-00",
    UNDECLARED_CODE    = "CTIC-00-000-01",
    WRONG_CODE_FORMAT  = "CTIC-00-000-02"
};

export default class JError extends baseJError {
    constructor(message: string, data?: any) { 
		super("JError", baseJErrorStatus.ERROR, 500);
		this.message = message;
		this.data = data;

		if(!this.verifyCode()) {
            if(!(typeof this.code === 'string')) this.code = JSendErrorCodes.UNDECLARED_CODE;
            else this.code = JSendErrorCodes.WRONG_CODE_FORMAT;
        }
	}
	
	private verifyCode(): boolean {
        const codeRegExp  = /^(CTIC-(\d){2}-(\d){3}-(\d){2})$/;
        if(!(typeof this.code === "string")) return false;
        return codeRegExp.test(this.code);
    }
    
    public static generateCode(resourceType: JSendResourceTypeCodes, rosurceId: string, caseId: string) {
        const API_CODE = "CTIC";
        return `${API_CODE}-${resourceType}-${rosurceId}-${caseId}`;
    }
}