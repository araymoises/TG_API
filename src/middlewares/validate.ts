import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express";
import JFail from "../errors/JFail";


const validate = (req: Request, res: Response, next: NextFunction) => {
	
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const failData = {};
    errors.array().forEach((error, index) => {
        if(failData[error.param] === undefined) failData[error.param] = [error.msg];
        else failData[error.param].push(error.msg);
    });
    
    next(new JFail(failData).setStatus(422));
}

export default validate;