import { Request, Response, NextFunction } from "express"
import Classroom from "../../models/Classroom"

export const getActivitiesStatus = async (req: Request | any, res: Response) => {
  const { classroom } = req.params

  try {
    const classroomModel: any = await Classroom.findOne({ _id: classroom, status: true })
      .populate([
        {
          path: 'contents',
          match: { status: true },
          populate: {
            path: 'activities',
            match: { status: true },
            populate: [{
              path: 'qualifications',
              match: { status: true }
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

    if (!model.contents.length)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Cotenido no encontrado.',
        content: null
      })

    let finishedActivitiesQuantity: Number = 0;
    let unfinishedActivitiesQuantity: Number = 0;

    let activitiesStatus: Array<any> = []
    model.contents.map((content: any) => {
      content.activities.map((activity: any) => {
        const qualificationsQuantity = activity.qualifications.length
        let isActivityFinished;
        if (qualificationsQuantity >= studentsQuantity) {
          isActivityFinished = true
          finishedActivitiesQuantity = Number(finishedActivitiesQuantity) + 1
        } else {
          isActivityFinished = false
          unfinishedActivitiesQuantity = Number(unfinishedActivitiesQuantity) + 1
        }

        activitiesStatus.push({
          id: activity._id,
          name: activity.name,
          created: activity.created,
          isFinished: isActivityFinished
        })
      })
    })

    activitiesStatus = activitiesStatus.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());

    return res.status(200).send({
      success: true,
      code: 200,
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
        studentQualificationAverage = + studentQualification.qualification
      })
      studentQualificationAverage = Number(studentQualificationAverage) / Number(student.qualifications.length)

      return {
        id: student._id,
        name: `${student.firstname} ${student.lastname}`,
        studentQualificationAverage
      }
    }).sort((a, b) => b.studentQualificationAverage - a.studentQualificationAverage);

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
          path: 'contents',
          match: { status: true },
          populate: {
            path: 'activities',
            match: { status: true },
            populate: [{
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

    if (!model.contents.length)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Cotenido no encontrado.',
        content: null
      })

    let activitiesQualificationAverage: Array<any> = []
    model.contents.map((content: any) => {
      content.activities.map((activity: any) => {
        let qualificationAverage: Number = 0

        if (activity.qualifications.length) {
          activity.qualifications.map((qualificationActivity: any) => {
            qualificationAverage = Number(qualificationAverage) + Number(qualificationActivity.qualification)
            console.log('qualificationActivity.qualification');
            console.log(qualificationActivity.qualification);

          })
          qualificationAverage = Number(qualificationAverage) / Number(activity.qualifications.length)

          console.log('qualificationAverage');
          console.log(qualificationAverage);
          console.log('Number(qualificationAverage)');
          console.log(Number(qualificationAverage));
          console.log('Number(activity.qualifications.length)');
          console.log(Number(activity.qualifications.length));

        }

        console.log('result');
        console.log({
          id: activity._id,
          name: activity.name,
          qualificationAverage
        });

        activitiesQualificationAverage.push({
            id: activity._id,
            name: activity.name,
            qualificationAverage
          })
      })
    })

    activitiesQualificationAverage = activitiesQualificationAverage.sort((a, b) => b.qualificationAverage - a.qualificationAverage);

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
