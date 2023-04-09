import { Request, Response, NextFunction } from "express"
import Content from "../../models/Content"

export const getContents = async (req: Request | any, res: Response) => {
    const { classroom } = req.params

    try {
        const models = await Content.find({classroom, status: true})
        .populate({ 
            path: 'classroom'
        })

        if(!models.length) 
            return res.status(404).send({
                success: false,
                code: 404,
                message: 'Contenidos no encontrados.',
                content: null
            })

        return res.status(201).send({
            success: true,
            code: 201,
            message: 'Contenidos encontrados!',
            content: models
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Contenidos no encontrados.',
            content: null
        })
    }
}

export const getContentById = async (req: Request | any, res: Response) => {
    const { id } = req.params

    try {
        const model = await Content.findOne({ _id: id, status: true })
        .populate({ 
            path: 'classroom'
        })

        if(!model) 
            return res.status(404).send({
                success: false,
                code: 404,
                message: 'Contenido no encontrado.',
                content: null
            })

        return res.status(201).send({
            success: true,
            code: 201,
            message: 'Contenido encontrado!',
            content: model
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Contenido no encontrado.',
            content: null
        })
    }
}

export const saveContent = async (req: Request | any, res: Response) => {
	const {classroom, firstname, lastname, email} = req.body

    try {
        let model: any = new Content({
            classroom,
            firstname,
            lastname,
            email
        })
    
        try {
            model = await model.save()
    
            model = await Content.populate(model, [
                { path: 'classroom' }
            ])
    
            return res.status(201).send({
                success: true,
                code: 201,
                message: '¡Contenido creado exitosamente!',
                content: model
            })
        } catch (err) {
            console.log(err)
            return res.status(500).send({
                success: false,
                code: 500,
                message: 'No se pudo crear el Contenido.',
                content: null
            })
        }
    } catch(err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'No se pudo crear el Contenido.',
            content: null
        })
    }
}

export const updateContentById = async (req: Request | any, res: Response) => {
	const {classroom, firstname, lastname, email} = req.body
    const { id } = req.params

    try {
        let fields = await Content.findOne({ _id: id, status: true })

        if(!fields) 
            return res.status(404).send({
                success: false,
                code: 404,
                message: 'Contenido no encontrado.',
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

        await Content.updateOne({ _id: id, status: true }, fields)
        .populate({ 
            path: 'classroom'
        })

        return res.status(200).send({
            success: true,
            code: 200,
            message: 'Contenido actualizado correctamente!',
            content: fields
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Contenido no pudo ser actualizado.',
            content: null
        })
    }
}

export const deleteContent = async (req: Request | any, res: Response) => {
    const { id } = req.params

    try {
        let fields = await Content.findOne({ _id: id, status: true })

        if(!fields) 
            return res.status(404).send({
                success: false,
                code: 404,
                message: 'Contenido no encontrado.',
                content: null
            })

        fields.status = false

        await Content.updateOne({ _id: id, status: true }, fields)

        return res.status(200).send({
            success: true,
            code: 200,
            message: 'Contenido eliminado correctamente!',
            content: fields
        })
    } catch(err) {
        return res.status(500).send({
            success: false,
            code: 500,
            message: 'Contenido no pudo ser eliminado.',
            content: null
        })
    }
}
