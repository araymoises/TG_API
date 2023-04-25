import { Request, Response, NextFunction } from "express"
import Classroom from "../../models/Classroom"

export const getActivitiesStatus = async (req: Request | any, res: Response) => {
  const { classroom } = req.params

  try {
    const classroomModel: any = await Classroom.findOne({ _id: classroom, status: true })
      .populate([
        {
          path: 'content',
          match: { status: true },
          populate: {
            path: 'activities',
            match: { status: true },
            populate : [{
              path: 'qualifications'
            }]
          }
        },
        {
          path: 'students',
          match: { status: true }
        }
      ])

    if (!classroomModel)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Aula no encontrada.',
        content: null
      })

    const model = JSON.parse(JSON.stringify(classroomModel))

    if (!model.students.length)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Alumnos no encontrados.',
        content: null
      })

    const studentsQuantity = model.students.length

    if (!model.content)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Cotenido no encontrado.',
        content: null
      })

    if (!model.content.activities.length)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Actividades no encontradas.',
        content: null
      })

    let finishedActivitiesQuantity: Number = 0;
    let unfinishedActivitiesQuantity: Number = 0;

    const activitiesStatus = model.content.activities.map((activity: any) => {
      const qualificationsQuantity = activity.qualifications.length
      let isActivityFinished;
      if (qualificationsQuantity >= studentsQuantity) {
        isActivityFinished = true
        finishedActivitiesQuantity =+ 1
      } else {
        isActivityFinished = false
        unfinishedActivitiesQuantity =+1
      }

      return {
        id: activity._id,
        name: activity.name,
        isFinished: isActivityFinished
      }
    })

    return res.status(201).send({
      success: true,
      code: 201,
      message: '¡Estado de las actividades obtenido exitosamente!',
      content: {
        finishedActivitiesQuantity,
        unfinishedActivitiesQuantity,
        activitiesStatus
      },
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Ocurrió un error al crear la estadística: Estado de las actividades.',
      error: err.message,
      content: null
    })
  }
}

export const getBestQualificationsAverage = async (req: Request | any, res: Response) => {
  const { classroom } = req.params

  try {
    const classroomModel: any = await Classroom.findOne({ _id: classroom, status: true })
      .populate([
        {
          path: 'students',
          match: { status: true },
          populate: {
            path: 'qualifications',
            match: { status: true }
          }
        }
      ])

    if (!classroomModel)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Aula no encontrada.',
        content: null
      })

    const model = JSON.parse(JSON.stringify(classroomModel))

    if (!model.students.length)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Alumnos no encontrados.',
        content: null
      })

    const studentsQualificationAverage = model.students.map((student: any) => {
      let studentQualificationAverage: Number = 0
      student.qualifications.map((studentQualification: any) => {
        studentQualificationAverage =+ studentQualification.qualification
      })
      studentQualificationAverage = Number(studentQualificationAverage) / Number(student.qualifications.length)

      return {
        id: student._id,
        name: `${student.firstname} ${student.lastname}`,
        studentQualificationAverage
      }
    })

    return res.status(201).send({
      success: true,
      code: 201,
      message: '¡Mejores promedios de estudiantes obtenidos exitosamente!',
      content: studentsQualificationAverage
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Ocurrió un error al crear la estadística: Estado de las actividades.',
      error: err.message,
      content: null
    })
  }
}

export const getQualificationAverageByActivity = async (req: Request | any, res: Response) => {
  const { classroom } = req.params

  try {
    const classroomModel: any = await Classroom.findOne({ _id: classroom, status: true })
      .populate([
        {
          path: 'content',
          match: { status: true },
          populate: {
            path: 'activities',
            match: { status: true },
            populate : [{
              path: 'qualifications'
            }]
          }
        }
      ])

    if (!classroomModel)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Aula no encontrada.',
        content: null
      })

    const model = JSON.parse(JSON.stringify(classroomModel))

    if (!model.content)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Cotenido no encontrado.',
        content: null
      })

    if (!model.content.activities.length)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Actividades no encontradas.',
        content: null
      })

    const activitiesQualificationAverage = model.content.activities.map((activity: any) => {
      let qualificationAverage: Number = 0

      if (activity.qualifications.length) {
        activity.qualifications.map((qualificationActivity: any) => {
          qualificationAverage =+ Number(qualificationActivity.qualification)
        })
        qualificationAverage = Number(qualificationAverage) / Number(activity.qualifications.length)
      }

      return {
        id: activity._id,
        name: activity.name,
        qualificationAverage
      }
    })

    return res.status(201).send({
      success: true,
      code: 201,
      message: '¡Promedio de las actividades obtenidos exitosamente!',
      content: activitiesQualificationAverage
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Ocurrió un error al crear la estadística: Estado de las actividades.',
      error: err.message,
      content: null
    })
  }
}
