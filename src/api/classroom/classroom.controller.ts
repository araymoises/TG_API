import { Request, Response, NextFunction } from "express"
import Classroom from "../../models/Classroom"
import Student from "../../models/Student"

export const getClassrooms = async (req: Request | any, res: Response) => {
  try {
    let models;
    let result;
    if (req.isTeacher) {
      models = await Classroom.find({ teacher: req.teacherId, status: true })
        .populate({
          path: 'teacher',
          match: { status: true }
        })
        .populate({
          path: 'students',
          match: { status: true }
        })

      if (!models.length)
        return res.status(404).send({
          success: false,
          code: 404,
          message: 'Aulas no encontradas.',
          content: null
        })

      result = models.map((model: any) => {
        let res: any;
        res = JSON.parse(JSON.stringify(model))
        res.studentsQuantity = model.students.length

        return res;
      })
    } else {
      models = await Student.findOne({ _id: req.studentId, status: true })
        .populate({
          path: 'classroom',
          match: { status: true },
          populate: [{
            path: 'teacher',
            match: { status: true }
          },
          {
            path: 'students',
            match: { status: true }
          }]
        })

      models = JSON.parse(JSON.stringify(models))
      if (!models.classroom)
        return res.status(404).send({
          success: false,
          code: 404,
          message: 'Aulas no encontradas.',
          content: null
        })

      models.classroom.studentsQuantity = models.classroom.students.length
      result = [models.classroom]
    }

    return res.status(201).send({
      success: true,
      code: 201,
      message: '¡Aulas encontradas!',
      content: result
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Aulas no encontradas.',
      error: err.message,
      content: null
    })
  }
}

export const getClassroomById = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    const model = await Classroom.findOne({ _id: id, status: true })
      .populate({
        path: 'teacher'
      })
      .populate({
        path: 'students'
      })


    let result: any;

    if (!model)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Aula no encontrada.',
        content: null
      })

    result = JSON.parse(JSON.stringify(model))
    result.studentsQuantity = model.students.length

    return res.status(201).send({
      success: true,
      code: 201,
      message: '¡Aula encontrada!',
      content: result
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Aula no encontrada.',
      error: err.message,
      content: null
    })
  }
}

export const saveClassroom = async (req: Request | any, res: Response) => {
  const { name, description } = req.body

  try {
    let model: any = new Classroom({
      teacher: req.teacherId,
      name,
      description
    })

    try {
      model = await model.save()

      model = await Classroom.populate(model, [
        { path: 'teacher' }
      ])

      return res.status(201).send({
        success: true,
        code: 201,
        message: '¡Aula creada exitosamente!',
        content: model
      })
    } catch (err: any) {
      console.log(err)
      return res.status(500).send({
        success: false,
        code: 500,
        message: 'No se pudo crear el aula.',
        error: err.message,
        content: null
      })
    }
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'No se pudo crear el aula.',
      error: err.message,
      content: null
    })
  }
}

export const updateClassroomById = async (req: Request | any, res: Response) => {
  const { name, description } = req.body
  const { id } = req.params

  try {
    let fields = await Classroom.findOne({ _id: id, status: true })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Aula no encontrada.',
        content: null
      })

    if (name) {
      fields.name = name
    }
    if (description) {
      fields.description = description
    }

    await Classroom.updateOne({ _id: id, status: true }, fields)
      .populate({
        path: 'teacher'
      })

    return res.status(200).send({
      success: true,
      code: 200,
      message: '¡Aula actualizada correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Aula no pudo ser actualizada.',
      error: err.message,
      content: null
    })
  }
}

export const deleteClassroom = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    let fields = await Classroom.findOne({ _id: id, status: true })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Aula no encontrada.',
        content: null
      })

    fields.status = false

    await Classroom.updateOne({ _id: id, status: true }, fields)

    return res.status(200).send({
      success: true,
      code: 200,
      message: '¡Aula eliminada correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Aula no pudo ser eliminada.',
      error: err.message,
      content: null
    })
  }
}
