import { Request, Response, NextFunction } from "express"
import Answer from "../../models/Answer"

export const getAnswers = async (req: Request | any, res: Response) => {
  const { activity } = req.params

  try {
    const models = await Answer.find({ activity, status: true })

    if (!models.length)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Respuestas no encontradas.',
        content: null
      })

    return res.status(201).send({
      success: true,
      code: 201,
      message: 'Respuestas encontradas!',
      content: models
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Respuestas no encontradas.',
      error: err.message,
      content: null
    })
  }
}

export const getAnswerById = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    const model = await Answer.findOne({ _id: id, status: true })

    if (!model)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Respuesta no encontrada.',
        content: null
      })

    return res.status(201).send({
      success: true,
      code: 201,
      message: 'Respuesta encontrada!',
      content: model
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Respuesta no encontrada.',
      error: err.message,
      content: null
    })
  }
}

export const saveAnswer = async (req: Request | any, res: Response) => {
  const { activity, title, isCorrect } = req.body

  try {
    let model: any = new Answer({
      activity,
      title,
      isCorrect
    })

    try {
      model = await model.save()

      return res.status(201).send({
        success: true,
        code: 201,
        message: 'Respuesta creada exitosamente!',
        content: model
      })
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        success: false,
        code: 500,
        message: 'No se pudo crear la respuesta.',
        content: null
      })
    }
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'No se pudo crear la respuesta.',
      error: err.message,
      content: null
    })
  }
}

export const updateAnswerById = async (req: Request | any, res: Response) => {
  const { activity, title, isCorrect } = req.body
  const { id } = req.params

  try {
    let fields = await Answer.findOne({ _id: id, status: true })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Respuesta no encontrada.',
        content: null
      })

    if (activity) {
      fields.activity = activity
    }
    if (title) {
      fields.title = title
    }
    if (isCorrect) {
      fields.isCorrect = isCorrect
    }

    await Answer.updateOne({ _id: id, status: true }, fields)

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Respuesta actualizada correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Respuesta no pudo ser actualizada.',
      error: err.message,
      content: null
    })
  }
}

export const deleteAnswer = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    let fields = await Answer.findOne({ _id: id, status: true })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Respuesta no encontrada.',
        content: null
      })

    fields.status = false

    await Answer.updateOne({ _id: id, status: true }, fields)

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Respuesta eliminada correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Respuesta no pudo ser eliminada.',
      error: err.message,
      content: null
    })
  }
}
