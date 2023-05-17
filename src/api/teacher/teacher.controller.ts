import { Request, Response, NextFunction } from "express"
import Teacher from "../../models/Teacher"
import User from "../../models/User"
import Encrypter from "../../services/encrypter.service"

export const getTeacherById = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    const model = await Teacher.findOne({ _id: id, status: true })
      .populate({
        path: 'classroom',
        match: { status: true }
      })

    if (!model)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Docente no encontrado.',
        content: null
      })

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Docente encontrado!',
      content: model
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Docente no encontrado.',
      error: err.message,
      content: null
    })
  }
}

export const updateTeacherById = async (req: Request | any, res: Response) => {
  const { classroom, firstname, phone, lastname, email, password } = req.body
  const { id } = req.params

  try {
    let userFields: any = {}
    let fields = await Teacher.findOne({ _id: id, status: true })
      .populate({
        path: 'user',
        match: { status: true }
      })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Docente no encontrado.',
        content: null
      })

    if (classroom) {
      fields.classroom = classroom
    }
    if (firstname) {
      fields.firstname = firstname
    }
    if (phone) {
      fields.phone = phone
    }
    if (lastname) {
      fields.lastname = lastname
    }
    if (email) {
      fields.email = email
      userFields.email = email
    }
    if (password) {
      userFields.password = (await Encrypter(password)).toString()
    }

    await Teacher.updateOne({ _id: id, status: true }, fields)
      .populate({
        path: 'classroom',
        match: { status: true }
      })


    if (email || password) {
      await User.updateOne({ _id: fields.user._id, status: true }, userFields)
    }

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Docente actualizado correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Docente no pudo ser actualizado.',
      error: err.message,
      content: null
    })
  }
}

export const deleteTeacher = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    let fields = await Teacher.findOne({ _id: id, status: true })
      .populate({
        path: 'user',
        match: { status: true }
      })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Docente no encontrado.',
        content: null
      })

    await User.deleteOne({ _id: fields.user._id })
    await Teacher.deleteOne({ _id: id })

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Docente eliminado correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Docente no pudo ser eliminado.',
      error: err.message,
      content: null
    })
  }
}
