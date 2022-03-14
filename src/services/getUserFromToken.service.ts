import jwt from 'jsonwebtoken';
import config from '../config/environment'

export default (token: any): any => {
    const payload:any = jwt.verify(token, config.JWT_SECRET)
    return payload.user
} 
