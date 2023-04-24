import { Request, Response, NextFunction } from "express"
import Activity from "../../models/Activity"

export const getActivities = async (req: Request | any, res: Response) => {
  // const { classroom } = req.params

  try {
    const models = await Activity.find({ status: true })
      .populate({
        path: 'content'
      })

    if (!models.length)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Actividades no encontradas.',
        content: null
      })

    return res.status(201).send({
      success: true,
      code: 201,
      message: 'Actividades encontradas!',
      content: models
    })
  } catch (err) {
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Actividades no encontradas.',
      content: null
    })
  }
}

export const getActivityById = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    const model = await Activity.findOne({ _id: id, status: true })
      .populate({
        path: 'classroom'
      })

    if (!model)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Actividad no encontrada.',
        content: null
      })

    return res.status(201).send({
      success: true,
      code: 201,
      message: 'Actividad encontrada!',
      content: model
    })
  } catch (err) {
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Actividad no encontrada.',
      content: null
    })
  }
}

export const saveActivity = async (req: Request | any, res: Response) => {
  const { classroom, firstname, lastname, email } = req.body

  try {
    let model: any = new Activity({
      classroom,
      firstname,
      lastname,
      email
    })

    try {
      model = await model.save()

      model = await Activity.populate(model, [
        { path: 'classroom' }
      ])

      return res.status(201).send({
        success: true,
        code: 201,
        message: 'Actividad creada exitosamente!',
        content: model
      })
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        success: false,
        code: 500,
        message: 'No se pudo crear la actividad.',
        content: null
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'No se pudo crear la actividad.',
      content: null
    })
  }
}

export const updateActivityById = async (req: Request | any, res: Response) => {
  const { classroom, firstname, lastname, email } = req.body
  const { id } = req.params

  try {
    let fields = await Activity.findOne({ _id: id, status: true })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Actividad no encontrada.',
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

    await Activity.updateOne({ _id: id, status: true }, fields)
      .populate({
        path: 'classroom'
      })

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Actividad actualizada correctamente!',
      content: fields
    })
  } catch (err) {
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Actividad no pudo ser actualizada.',
      content: null
    })
  }
}

export const deleteActivity = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    let fields = await Activity.findOne({ _id: id, status: true })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Actividad no encontrada.',
        content: null
      })

    fields.status = false

    await Activity.updateOne({ _id: id, status: true }, fields)

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Actividad eliminada correctamente!',
      content: fields
    })
  } catch (err) {
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Actividad no pudo ser eliminada.',
      content: null
    })
  }
}
