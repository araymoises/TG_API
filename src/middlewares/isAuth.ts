
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/environment'

export default (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const token = req.header('auth-token');
        if(!token) 
            return res.status(401).send({
                success: false,
                code: 401,
                message: 'Token no enviado.',
                content: null
            })

        const payload:any = jwt.verify(token, config.JWT_SECRET)
        const user = payload.user

        req.teacherId = user.teacher._id;
        next();
    } catch(err) {
        return res.status(401).send({
            success: false,
            code: 401,
            message: 'Error con el token.',
            content: err
        })
    }
}
