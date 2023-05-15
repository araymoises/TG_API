import { Request, Response, NextFunction } from "express"
import Activity from "../../models/Activity"
import Classroom from "../../models/Classroom"

export const getActivities = async (req: Request | any, res: Response) => {
  const { classroom } = req.params

  try {
    const classroomModel = await Classroom.find({ _id: classroom, status: true })
      .populate({
        path: 'contents',
        match: { status: true },
        populate: {
          path: 'activities',
          match: { status: true },
          populate: [{
            path: 'content',
            match: { status: true }
          }, {
            path: 'activityType',
            match: { status: true }
          }, {
            path: 'object',
            match: { status: true },
            populate: [{
              path: 'resources',
              match: { status: true }
            }]
          }, {
            path: 'answers',
            match: { status: true }
          }, {
            path: 'qualifications',
            match: { status: true }
          }]
        }
      })

    if (!classroomModel.length || !classroomModel[0].contents.length)
      return res.status(200).send({
        success: false,
        code: 200,
        message: 'Actividades no encontradas.',
        content: null
      })
    let models: Array<any> = []
    classroomModel[0].contents.map((content: any) => {
      if (content.activities) {
        content.activities.map((activity: any) => {
          let resultActivity: any = JSON.parse(JSON.stringify(activity))
          resultActivity.object.scale = JSON.parse(resultActivity.object.scale)
          resultActivity.object.position = JSON.parse(resultActivity.object.position)
          resultActivity.object.rotationPivot = JSON.parse(resultActivity.object.rotationPivot)
          resultActivity.object.resources = resultActivity.object.resources.map((resource: any) => resource.path)

          models.push(resultActivity)
        })
      }
    })

    if (!models.length)
      return res.status(200).send({
        success: false,
        code: 200,
        message: 'Actividades no encontradas.',
        content: models
      })

    return res.status(201).send({
      success: true,
      code: 201,
      message: 'Actividades encontradas!',
      content: models
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Actividades no encontradas.',
      error: err.message,
      content: null
    })
  }
}

export const getActivityById = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    const model = await Activity.findOne({ _id: id, status: true })
      .populate({
        path: 'content',
        match: { status: true }
      })
      .populate({
        path: 'activityType',
        match: { status: true }
      })
      .populate({
        path: 'object',
        match: { status: true },
        populate: [{
          path: 'resources',
          match: { status: true }
        }]
      })
      .populate({
        path: 'answers',
        match: { status: true }
      })
      .populate({
        path: 'qualifications',
        match: { status: true }
      })

    if (!model)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Actividad no encontrada.',
        content: null
      })

    let resultActivity: any = JSON.parse(JSON.stringify(model))
    resultActivity.object.scale = JSON.parse(resultActivity.object.scale)
    resultActivity.object.position = JSON.parse(resultActivity.object.position)
    resultActivity.object.rotationPivot = JSON.parse(resultActivity.object.rotationPivot)
    resultActivity.object.resources = resultActivity.object.resources.map((resource: any) => resource.path)

    return res.status(201).send({
      success: true,
      code: 201,
      message: 'Actividad encontrada!',
      content: resultActivity
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Actividad no encontrada.',
      error: err.message,
      content: null
    })
  }
}

export const saveActivity = async (req: Request | any, res: Response) => {
  const { content, activityType, object, name, description, question, max_qualification } = req.body
  let { startDate, finishDate } = req.body

  try {
    if (!startDate || !finishDate) {
      throw new Error('faltan los campos startDate y finishDate')
    }

    startDate = startDate.replaceAll('-', ' ')
    finishDate = finishDate.replaceAll('-', ' ')

    let model: any = new Activity({
      content,
      activityType,
      object,
      name,
      description,
      question,
      max_qualification,
      startDate,
      finishDate
    })

    try {
      model = await model.save()

      model = await Activity.populate(model, [
        {
          path: 'content',
          match: { status: true }
        }
      ])

      return res.status(201).send({
        success: true,
        code: 201,
        message: 'Actividad creada exitosamente!',
        content: model
      })
    } catch (err: any) {
      console.log(err)
      return res.status(500).send({
        success: false,
        code: 500,
        message: 'No se pudo crear la actividad.',
        error: err.message,
        content: null
      })
    }
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'No se pudo crear la actividad.',
      error: err.message,
      content: null
    })
  }
}

export const updateActivityById = async (req: Request | any, res: Response) => {
  const { content, activityType, object, name, description, question, max_qualification, start_date, finish_date } = req.body
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

    if (content) {
      fields.content = content
    }
    if (activityType) {
      fields.activityType = activityType
    }
    if (object) {
      fields.object = object
    }
    if (name) {
      fields.name = name
    }
    if (description) {
      fields.description = description
    }
    if (question) {
      fields.question = question
    }
    if (max_qualification) {
      fields.max_qualification = max_qualification
    }
    if (start_date) {
      fields.start_date = start_date
    }
    if (finish_date) {
      fields.finish_date = finish_date
    }

    await Activity.updateOne({ _id: id, status: true }, fields)
      .populate({
        path: 'content',
        match: { status: true }
      })

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Actividad actualizada correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Actividad no pudo ser actualizada.',
      error: err.message,
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
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Actividad no pudo ser eliminada.',
      error: err.message,
      content: null
    })
  }
}
