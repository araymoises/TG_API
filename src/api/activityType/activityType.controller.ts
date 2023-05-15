import { Request, Response, NextFunction } from "express"
import ActivityType from "../../models/ActivityType"

export const getActivityTypes = async (req: Request | any, res: Response) => {
  // const { classroom } = req.params

  try {
    const models = await ActivityType.find({ status: true })

    if (!models.length)
      return res.status(200).send({
        success: false,
        code: 200,
        message: 'Tipos de actividades no encontrados.',
        content: null
      })

    return res.status(201).send({
      success: true,
      code: 201,
      message: 'Tipos de actividades encontrados!',
      content: models
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Tipos de actividades no encontrados.',
      error: err.message,
      content: null
    })
  }
}

export const getActivityTypeById = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    const model = await ActivityType.findOne({ _id: id, status: true })

    if (!model)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Tipo de actividad no encontrado.',
        content: null
      })

    return res.status(201).send({
      success: true,
      code: 201,
      message: 'Tipo de actividad encontrado!',
      content: model
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Tipo de actividad no encontrado.',
      error: err.message,
      content: null
    })
  }
}

export const saveActivityType = async (req: Request | any, res: Response) => {
  const { code, name } = req.body

  try {
    let model: any = new ActivityType({
      code,
      name
    })

    try {
      model = await model.save()

      return res.status(201).send({
        success: true,
        code: 201,
        message: 'Tipo de actividad creado exitosamente!',
        content: model
      })
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        success: false,
        code: 500,
        message: 'No se pudo crear el tipo de actividad.',
        content: null
      })
    }
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'No se pudo crear el tipo de actividad.',
      error: err.message,
      content: null
    })
  }
}

export const updateActivityTypeById = async (req: Request | any, res: Response) => {
  const { code, name } = req.body
  const { id } = req.params

  try {
    let fields = await ActivityType.findOne({ _id: id, status: true })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Tipo de actividad no encontrado.',
        content: null
      })

    if (code) {
      fields.code = code
    }
    if (name) {
      fields.name = name
    }

    await ActivityType.updateOne({ _id: id, status: true }, fields)

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Tipo de actividad actualizado correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Tipo de actividad no pudo ser actualizado.',
      error: err.message,
      content: null
    })
  }
}

export const deleteActivityType = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    let fields = await ActivityType.findOne({ _id: id, status: true })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Tipo de actividad no encontrado.',
        content: null
      })

    fields.status = false

    await ActivityType.updateOne({ _id: id, status: true }, fields)

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Tipo de actividad eliminado correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Tipo de actividad no pudo ser eliminado.',
      error: err.message,
      content: null
    })
  }
}
