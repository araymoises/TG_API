import jwt from 'jsonwebtoken';

export default (user: any): any => {
    const AUTH_TOKEN_EXPIRATION = parseInt(process.env.AUTH_TOKEN_EXPIRATION || "86400");
    const payLoad: any = user;
    const token: string = jwt.sign(payLoad, process.env.JWT_SECRET || '', {
        expiresIn: AUTH_TOKEN_EXPIRATION
    });
    return token;
} 
