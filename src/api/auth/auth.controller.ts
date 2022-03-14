import { Request, Response, NextFunction } from "express"
import Teacher from "../../models/Teacher"
import User from "../../models/User"
import Encrypter from "../../services/encrypter.service"
import GenerateToken from "../../services/generateToken.service"
import bcrypt from 'bcryptjs'

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const {email, password} = req.body

	const user = await User.findOne({email})
		.select("+password")
		.populate({ 
			path: 'teacher' 	
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

export const signup = async (req: Request, res: Response, next: NextFunction) => {
	const {firstname, lastname, phone, email, password} = req.body

	let encryptedPassword = (await Encrypter(password)).toString()
	// let talves = await bcrypt.compare(password, crypt)

	let teacher: any = new Teacher({
		firstname,
		lastname,
		email,
		phone,
	})

	try {
		teacher = await teacher.save()

		let user: any = new User({
			name: firstname + ' ' + lastname,
			teacher: teacher._id,
			email,
			password: encryptedPassword,
		})

		user = await user.save()

		user = await User.populate(user, [
			{ path: 'teacher' },
		])

		return res.status(201).send({
			success: true,
			code: 201,
			message: '¡Usuario creado exitosamente!',
			content: user
		})
	} catch (err) {
		console.log(err)
        return res.status(500).send({
			success: false,
			code: 500,
			message: 'No se pudo crear el usuario.',
			content: null
		})
	}
}