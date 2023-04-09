import { Request, Response, NextFunction } from "express"
import Student from "../../models/Student"

export const getStudents = async (req: Request | any, res: Response) => {
    const { classroom } = req.params

    try {
        const models = await Student.find({classroom, status: true})
        .populate({ 
            path: 'classroom'
        })

        if(!models.length) 
            return res.status(404).send({
                success: false,
                code: 404,
                message: 'Alumnos no encontrados.',
                content: null
            })

        return res.status(201).send({
            success: true,
            code: 201,
            message: 'Alumnos encontrados!',
            content: models
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Alumnos no encontrados.',
            content: null
        })
    }
}

export const getStudentById = async (req: Request | any, res: Response) => {
    const { id } = req.params

    try {
        const model = await Student.findOne({ _id: id, status: true })
        .populate({ 
            path: 'classroom'
        })

        if(!model) 
            return res.status(404).send({
                success: false,
                code: 404,
                message: 'Alumno no encontrado.',
                content: null
            })

        return res.status(201).send({
            success: true,
            code: 201,
            message: 'Alumno encontrado!',
            content: model
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Alumno no encontrado.',
            content: null
        })
    }
}

export const saveStudent = async (req: Request | any, res: Response) => {
	const {classroom, firstname, lastname, email} = req.body

    try {
        let model: any = new Student({
            classroom,
            firstname,
            lastname,
            email
        })
    
        try {
            model = await model.save()
    
            model = await Student.populate(model, [
                { path: 'classroom' }
            ])
    
            return res.status(201).send({
                success: true,
                code: 201,
                message: '¡Alumno creado exitosamente!',
                content: model
            })
        } catch (err) {
            console.log(err)
            return res.status(500).send({
                success: false,
                code: 500,
                message: 'No se pudo crear el Alumno.',
                content: null
            })
        }
    } catch(err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'No se pudo crear el Alumno.',
            content: null
        })
    }
}

export const updateStudentById = async (req: Request | any, res: Response) => {
	const {classroom, firstname, lastname, email} = req.body
    const { id } = req.params

    try {
        let fields = await Student.findOne({ _id: id, status: true })

        if(!fields) 
            return res.status(404).send({
                success: false,
                code: 404,
                message: 'Alumno no encontrado.',
                content: null
            })

        if (classroom) {
            fields.classroom = classroom
        }
        if (firstname) {
            fields.firstname = firstname
        }
        if (lastname) {
            fields.lastname = lastname
        }
        if (email) {
            fields.email = email
        }

        await Student.updateOne({ _id: id, status: true }, fields)
        .populate({ 
            path: 'classroom'
        })

        return res.status(200).send({
            success: true,
            code: 200,
            message: 'Alumno actualizado correctamente!',
            content: fields
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Alumno no pudo ser actualizado.',
            content: null
        })
    }
}

export const deleteStudent = async (req: Request | any, res: Response) => {
    const { id } = req.params

    try {
        let fields = await Student.findOne({ _id: id, status: true })

        if(!fields) 
            return res.status(404).send({
                success: false,
                code: 404,
                message: 'Alumno no encontrado.',
                content: null
            })

        fields.status = false

        await Student.updateOne({ _id: id, status: true }, fields)

        return res.status(200).send({
            success: true,
            code: 200,
            message: 'Alumno eliminado correctamente!',
            content: fields
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Alumno no pudo ser eliminado.',
            content: null
        })
    }
}
