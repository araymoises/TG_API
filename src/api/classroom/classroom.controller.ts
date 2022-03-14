import { Request, Response, NextFunction } from "express"
import Classroom from "../../models/Classroom"

export const getClassrooms = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const classrooms = await Classroom.find({teacher: req.teacherId})
        .populate({ 
            path: 'teacher'
        })

        if(!classrooms.length) 
            return res.status(500).send({
                success: false,
                code: 500,
                message: 'Aulas no encontradas.',
                content: null
            })

        return res.status(201).send({
            success: true,
            code: 201,
            message: '¡Aulas encontradas!',
            content: classrooms
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Aulas no encontradas.',
            content: null
        })
    }
}

export const saveClassroom = async (req: Request | any, res: Response, next: NextFunction) => {
	const {name, description} = req.body

    try {
        let classroom: any = new Classroom({
            teacher: req.teacherId,
            name,
            description
        })
    
        try {
            classroom = await classroom.save()
    
            classroom = await Classroom.populate(classroom, [
                { path: 'teacher' },
            ])
    
            return res.status(201).send({
                success: true,
                code: 201,
                message: '¡Aula creada exitosamente!',
                content: classroom
            })
        } catch (err) {
            console.log(err)
            return res.status(500).send({
                success: false,
                code: 500,
                message: 'No se pudo crear el aula.',
                content: null
            })
        }
    } catch(err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'No se pudo crear el aula.',
            content: null
        })
    }
}