import { Request, Response, NextFunction } from "express"
import Teacher from "../../models/Teacher"
import Student from "../../models/Student"
import User from "../../models/User"
import Encrypter from "../../services/encrypter.service"
import GenerateToken from "../../services/generateToken.service"
import bcrypt from 'bcryptjs'

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body

	const user = await User.findOne({email})
		.select("+password")
		.populate({
			path: 'teacher',
      match: { status: true }
		})
		.populate({
			path: 'student',
      match: { status: true }
		})

	if(!user)
		return res.status(401).send({
			success: false,
			code: 401,
			message: 'Usuario no encontrado.',
			content: null
		})

	const samePassword : boolean = await bcrypt.compare(password, user.password);
	if(!samePassword)
		return res.status(401).send({
			success: false,
			code: 401,
			message: 'Contraseña incorrecta.',
			content: null
		})

	user.password = undefined
	const token: string = GenerateToken({user})

	return res.status(200).send({
		success: true,
		code: 200,
		message: '¡Bienvenido!',
		content: {
			user,
			token
		}
	})
}

export const teacherSignup = async (req: Request, res: Response, next: NextFunction) => {
	const {firstname, lastname, phone, email, password} = req.body
	let encryptedPassword = (await Encrypter(password)).toString()

  try {
    let user: any = new User({
			name: firstname + ' ' + lastname,
			email,
			password: encryptedPassword,
		})

		user = await user.save()

    let teacher: any = new Teacher({
      firstname,
      lastname,
			user: user._id,
      email,
      phone,
    })

		teacher = await teacher.save()

		user = await User.populate(user, [
			{
        path: 'teacher',
        match: { status: true }
      },
		])

		return res.status(201).send({
			success: true,
			code: 201,
			message: '¡Usuario creado exitosamente!',
			content: user
		})
	} catch (err: any) {
    let errorMessage: string = ''
    let message: string = ''

    if (err.name && err.name == 'MongoError' && err.code == '11000') {
      errorMessage = message = 'El correo ya está siendo utilizado'
    } else {
      errorMessage = err.message
      message = 'No se pudo crear el usuario.'
    }

    console.log(err)
    return res.status(500).send({
			success: false,
			code: 500,
			message,
      error: errorMessage,
			content: null
		})
	}
}

export const studentSignup = async (req: Request, res: Response, next: NextFunction) => {
	const { firstname, lastname, email, password, classroom } = req.body
	let encryptedPassword = (await Encrypter(password)).toString()

  try {
    let user: any = new User({
			name: firstname + ' ' + lastname,
			email,
			password: encryptedPassword,
		})

		user = await user.save()

    let student: any = new Student({
      classroom,
      firstname,
      lastname,
			user: user._id,
      email,
    })

		student = await student.save()

		user = await User.populate(user, [
			{
        path: 'student',
        match: { status: true }
      },
		])

		return res.status(201).send({
			success: true,
			code: 201,
			message: '¡Usuario creado exitosamente!',
			content: user
		})
	} catch (err: any) {
    let errorMessage: string = ''
    let message: string = ''

    if (err.name && err.name == 'MongoError' && err.code == '11000') {
      errorMessage = message = 'El correo ya está siendo utilizado'
    } else {
      errorMessage = err.message
      message = 'No se pudo crear el usuario.'
    }

    console.log(err)
    return res.status(500).send({
			success: false,
			code: 500,
			message,
      error: errorMessage,
			content: null
		})
	}
}
