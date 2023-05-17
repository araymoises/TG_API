import { Request, Response, NextFunction } from "express"
import Student from "../../models/Student"
import User from "../../models/User"
import nodemailer from "nodemailer";
import Encrypter from "../../services/encrypter.service"

export const getStudents = async (req: Request | any, res: Response) => {
  const { classroom } = req.params

  try {
    const models = await Student.find({ classroom, status: true })
      .populate({
        path: 'classroom',
        match: { status: true }
      })

    if (!models.length)
      return res.status(200).send({
        success: false,
        code: 200,
        message: 'Alumnos no encontrados.',
        content: null
      })

    return res.status(201).send({
      success: true,
      code: 201,
      message: 'Alumnos encontrados!',
      content: models
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Alumnos no encontrados.',
      error: err.message,
      content: null
    })
  }
}

export const getStudentById = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    const model = await Student.findOne({ _id: id, status: true })
      .populate({
        path: 'classroom',
        match: { status: true }
      })
      .populate({
        path: 'qualifications',
        match: { status: true },
        populate: {
          path: 'activity',
          match: { status: true }
        }
      })

    if (!model)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Alumno no encontrado.',
        content: null
      })

    return res.status(201).send({
      success: true,
      code: 201,
      message: 'Alumno encontrado!',
      content: model
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Alumno no encontrado.',
      error: err.message,
      content: null
    })
  }
}

export const updateStudentById = async (req: Request | any, res: Response) => {
  const { classroom, firstname, lastname, email, password } = req.body
  const { id } = req.params

  try {
    let userFields: any = {}
    let fields = await Student.findOne({ _id: id, status: true })
      .populate({
        path: 'user',
        match: { status: true }
      })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Alumno no encontrado.',
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
      userFields.email = email
    }
    if (password) {
      userFields.password = (await Encrypter(password)).toString()
    }

    await Student.updateOne({ _id: id, status: true }, fields)
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
      message: 'Alumno actualizado correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Alumno no pudo ser actualizado.',
      error: err.message,
      content: null
    })
  }
}

export const deleteStudent = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    let fields = await Student.findOne({ _id: id, status: true })
      .populate({
        path: 'user',
        match: { status: true }
      })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Alumno no encontrado.',
        content: null
      })

    await User.deleteOne({ _id: fields.user._id })
    await Student.deleteOne({ _id: id })

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Alumno eliminado correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Alumno no pudo ser eliminado.',
      error: err.message,
      content: null
    })
  }
}

export const unlinkStudent = async (req: Request | any, res: Response) => {
  const { id } = req.params

  try {
    let fields = await Student.findOne({ _id: id, status: true })
      .populate({
        path: 'user',
        match: { status: true }
      })

    if (!fields)
      return res.status(404).send({
        success: false,
        code: 404,
        message: 'Alumno no encontrado.',
        content: null
      })

    fields.classroom = null

    await Student.updateOne({ _id: id, status: true }, fields)

    return res.status(200).send({
      success: true,
      code: 200,
      message: 'Alumno desvinculado correctamente!',
      content: fields
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'Alumno no pudo ser desvinculado.',
      error: err.message,
      content: null
    })
  }
}

const encode = (str) => {
  var hex, i;

  var result = "";
  for (i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16);
    result += ("0" + hex).slice(-2);
  }

  return result
}

const decode = (str) => {
  var j;
  var hexes = str.match(/.{1,2}/g) || [];
  var back = "";
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
}

export const inviteStudent = async (req: Request | any, res: Response) => {
  const { email, classroom } = req.body

  const hostOld = 'app://arclassroom.app/'
  const host = 'https://api-arclassroom-tesis.herokuapp.com/invitation/'
  const timeInt = new Date().valueOf();

  try {
    const invitationLink = `${host}${encode(email)}.${classroom}.${timeInt}`;

    const mailer = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'araymoises55@gmail.com',
        pass: 'qeldtfivjvwacvar'
      }
    });

    const body = `
      <b>¡Hola!</b>
      <br />
      <br />
      <span>Bienvenido a AR Classroom App, éste es el link de acceso: </span>
      <br />
      <span>${invitationLink}</span>
    `;

    const mailOptions = {
      from: 'araymoises55@gmail.com',
      to: email,
      subject: 'Invitación a AR Classroom App',
      html: body
    };

    mailer.sendMail(mailOptions, function (err: any, info: any) {
      if (err || info.rejected.length) {
        console.log('err');
        console.log(err);
        return res.status(500).send({
          success: false,
          code: 500,
          message: 'No se pudo invitar al alumno.',
          error: err.message,
          content: null
        })
      }

      return res.status(200).send({
        success: true,
        code: 200,
        message: 'Alumno invitado correctamente!',
        content: {
          invitationLink
        }
      })
    });
  } catch (err: any) {
    console.log(err)
    return res.status(500).send({
      success: false,
      code: 500,
      message: 'No se pudo invitar al alumno.',
      error: err.message,
      content: null
    })
  }
}
