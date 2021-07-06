import jsend from 'jsend';

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



export default class JSendError extends Error implements jsend.JSendObject {
    
    httpStatus: number;
    status: string;
    code?: string | undefined;
    data?: any;

    constructor(jsendObject : jsend.JSendObject, httpStatus?: undefined | number) { 
        super("Undefined error");
		
        if(typeof httpStatus === 'undefined') this.httpStatus = 400;
        else this.httpStatus = httpStatus;
        this.name = "JSendError";
        this.status = jsendObject.status;
        this.code = jsendObject.code;
        if(this.status.toUpperCase() == 'ERROR' && !this.verifyCode) {
            if(!(typeof this.code === 'string')) this.code = JSendErrorCodes.UNDECLARED_CODE;
            else this.code = JSendErrorCodes.WRONG_CODE_FORMAT;
        }
        this.data = jsendObject.data;
		if(typeof jsendObject.message === 'string') this.message = jsendObject.message;
    }

    private verifyCode(): boolean {
        const codeRegExp  = /^(CTICA-(\d){2}-(\d){3}-(\d){2})$/;
        if(!(typeof this.code === "string")) return false;
        return codeRegExp.test(this.code);
    }
    
    public static generateCode(resourceType: JSendResourceTypeCodes, rosurceId: string, caseId: string) {
        const API_CODE = "CTICA";
        return `${API_CODE}-${resourceType}-${rosurceId}-${caseId}`;
    }

}


/*
    CTICA-00-000-00 Error no controlado.
            CTICA-00-000-01 Error sin código declarado
            CTICA-00-000-02 Error con formato inválido
    
    
    */
/*
    Código de error

        Formato de código de error
            CTIC-00-111-22
            CTIC: Todos los errores de esta api han de empezar con ese prefijo
            00: Indica en que tipo de documento ocurrio el error, 00 reservado, 01 general, 02 rutas, 03 controlador, 04 servicio
            111: Indica el número de documento
            22: Indica el número de error dentro del docuento

        Errores reservados:3
            CTICA-00-000-00 Error no controlado.
            CTICA-00-000-01 Error sin código declarado
            CTICA-00-000-02 Error con formato inválido


            throw new JSendError({
                "status": "error",
                "code": JSendError.generateCode(JSendResourceTypeCodes.SERVICE, "001", "02"),
                "message": "The action could not be executed."
            }, 500);
*/



