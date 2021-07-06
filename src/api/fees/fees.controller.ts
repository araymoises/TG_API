import { Request, Response, NextFunction } from "express"

export const getFees = async (req: Request, res: Response, next: NextFunction) => {
		// res.status(403).send('Se debe enviar los parametros');
		res.status(201).send({hola: 'sí'})
}
