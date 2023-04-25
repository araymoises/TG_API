import { Request, Response, NextFunction } from 'express'

export default (req: Request | any, res: Response, next: NextFunction) => {
  try {
    console.log(req.method)
    if (req.method == 'POST' || req.method == 'PATCH' || req.method == 'PUT' || req.method == 'DELETE') {
      if (!req.isTeacher) {
        return res.status(401).send({
          success: false,
          code: 401,
          message: 'Alumnos no pueden POST/PATCH/PUT/DELETE en esta ruta.',
          content: null
        })
      }
    }
    next();
  } catch (err: any) {
    return res.status(401).send({
      success: false,
      code: 401,
      message: 'Alumnos no pueden POST/PATCH/PUT/DELETE en esta ruta.',
      content: err.message
    })
  }
}

