import jwt from 'jsonwebtoken';
import config from '../config/environment';

export default (user: any): any => {
    const AUTH_TOKEN_EXPIRATION = parseInt(config.AUTH_TOKEN_EXPIRATION || "86400");
    const payLoad: any = user;
    const token: string = jwt.sign(payLoad, config.JWT_SECRET || '', {
        expiresIn: AUTH_TOKEN_EXPIRATION
    });
    return token;
} 
