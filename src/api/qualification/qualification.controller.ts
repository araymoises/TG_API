import { Request, Response, NextFunction } from "express"
import Qualification from "../../models/Qualification"

export const getQualificationsByActivity = async (req: Request | any, res: Response) => {
    const { activity } = req.params

    try {
        const models = await Qualification.find({activity, status: true})
        .populate([{ 
            path: 'activity'
        }, { 
            path: 'student'
        }])

        if(!models.length) 
            return res.status(404).send({
                success: false,
                code: 404,
                message: 'Calificaciones no encontradas.',
                content: null
            })

        return res.status(201).send({
            success: true,
            code: 201,
            message: 'Calificaciones encontradas!',
            content: models
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Calificaciones no encontradas.',
            content: null
        })
    }
}

export const getQualificationsByStudent = async (req: Request | any, res: Response) => {
    const { student } = req.params

    try {
        const models = await Qualification.find({student, status: true})
        .populate([{ 
            path: 'activity'
        }, { 
            path: 'student'
        }])

        if(!models.length) 
            return res.status(404).send({
                success: false,
                code: 404,
                message: 'Calificaciones no encontradas.',
                content: null
            })

        return res.status(201).send({
            success: true,
            code: 201,
            message: 'Calificaciones encontradas!',
            content: models
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Calificaciones no encontradas.',
            content: null
        })
    }
}

export const getQualificationById = async (req: Request | any, res: Response) => {
    const { id } = req.params

    try {
        const model = await Qualification.findOne({ _id: id, status: true })
        .populate([{ 
            path: 'activity'
        }, { 
            path: 'student'
        }])

        if(!model) 
            return res.status(404).send({
                success: false,
                code: 404,
                message: 'Calificación no encontrada.',
                content: null
            })

        return res.status(201).send({
            success: true,
            code: 201,
            message: 'Calificación encontrada!',
            content: model
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Calificación no encontrada.',
            content: null
        })
    }
}

export const saveQualification = async (req: Request | any, res: Response) => {
	const { activity, student, qualification } = req.body

    try {
        let model: any = new Qualification({
            activity,
            student,
            qualification
        })
    
        try {
            model = await model.save()
    
            model = await Qualification.populate(model, [{ 
                path: 'activity'
            }, { 
                path: 'student'
            }])
    
            return res.status(201).send({
                success: true,
                code: 201,
                message: 'Calificación creada exitosamente!',
                content: model
            })
        } catch (err) {
            console.log(err)
            return res.status(500).send({
                success: false,
                code: 500,
                message: 'No se pudo crear la Calificación.',
                content: null
            })
        }
    } catch(err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'No se pudo crear la Calificación.',
            content: null
        })
    }
}

export const updateQualificationById = async (req: Request | any, res: Response) => {
	const {classroom, firstname, lastname, email} = req.body
    const { id } = req.params

    try {
        let fields = await Qualification.findOne({ _id: id, status: true })

        if(!fields) 
            return res.status(404).send({
                success: false,
                code: 404,
                message: 'Calificación no encontrada.',
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

        await Qualification.updateOne({ _id: id, status: true }, fields)
        .populate([{ 
            path: 'activity'
        }, { 
            path: 'student'
        }])

        return res.status(200).send({
            success: true,
            code: 200,
            message: 'Calificación actualizada correctamente!',
            content: fields
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Calificación no pudo ser actualizada.',
            content: null
        })
    }
}

export const deleteQualification = async (req: Request | any, res: Response) => {
    const { id } = req.params

    try {
        let fields = await Qualification.findOne({ _id: id, status: true })

        if(!fields) 
            return res.status(404).send({
                success: false,
                code: 404,
                message: 'Calificación no encontrada.',
                content: null
            })

        fields.status = false

        await Qualification.updateOne({ _id: id, status: true }, fields)

        return res.status(200).send({
            success: true,
            code: 200,
            message: 'Calificación eliminada correctamente!',
            content: fields
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Calificación no pudo ser eliminada.',
            content: null
        })
    }
}
