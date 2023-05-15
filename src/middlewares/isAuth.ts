
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/environment'

export default (req: Request | any, res: Response, next: NextFunction) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken) {
      bearerToken = req.body?.headers?.Authorization
      if (!bearerToken)
        return res.status(401).send({
          success: false,
          code: 401,
          message: 'Token no enviado.',
          content: null
        })
    }

    const token = bearerToken.split(' ')[1];

    const payload: any = jwt.verify(token, config.JWT_SECRET)
    const user = payload.user

    if (user.teacher) {
      req.teacherId = user.teacher._id
      req.isTeacher = true
    } else {
      req.studentId = user.student._id
      req.isTeacher = false
    }

    next();
  } catch (err: any) {
    return res.status(401).send({
      success: false,
      code: 401,
      message: 'Error con el token.',
      content: err.message
    })
  }
}

