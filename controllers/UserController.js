import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'

export const register = async (req, res) => {
	try {
		const {
			body: { email, password, phone, name, surname, role },
		} = req
		const userEmail = await UserModel.findOne({
			email,
		})

		if (userEmail) {
			return res.status(404).json({
				message: 'Такой аккаунт уже существует',
			})
		}
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const doc = new UserModel({
			phone: phone,
			email: email,
			name: name,
			surname: surname,
			role: role,
			passwordHash: hash,
		})

		const user = await doc.save()

		const {
			_doc: { passwordHash, ...userData },
			_doc: { _id },
		} = user
		const token = jwt.sign(
			{
				_id,
			},
			'secret123',
			{ expiresIn: '90d' }
		)

		res.json({
			...userData,
			token,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось зарегистрироваться',
		})
	}
}

export const login = async (req, res) => {
	try {
		const {
			body: { email, password },
		} = req
		const user = await UserModel.findOne({
			email,
		})

		if (!user) {
			return res.status(404).json({
				message: 'Такого аккаунта не существует',
			})
		}
		const {
			_doc: { passwordHash, ...userData },
			_doc: { _id },
		} = user
		const inValidPass = await bcrypt.compare(password, passwordHash)

		if (!inValidPass) {
			return res.status(404).json({
				message: 'Неверный E-mail или пароль ',
			})
		}

		const token = jwt.sign(
			{
				_id,
			},
			'secret123',
			{ expiresIn: '30d' }
		)

		res.json({
			...userData,
			token,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось войти',
		})
	}
}

export const getMe = async (req, res) => {
	try {
		const {
			params: { id },
		} = req
		const user = await UserModel.findById(id)
		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден',
			})
		}
		const {
			_doc: { passwordHash, ...userData },
		} = user
		res.json(userData)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Нет доступа',
		})
	}
}
export const changeRole = async (req, res) => {
	try {
		const {
			params: { id },
			body: { role },
		} = req
		UserModel.findByIdAndUpdate(
			{
				_id: id,
			},
			{
				role,
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось изменить роль',
					})
				}
				if (!doc) {
					return res.status(404).json({
						message: 'Пользователь не найден',
					})
				}
				res.json(doc)
			}
		)
	} catch (err) {
		console.log(err)
		res.status(500).json(
			{
				message: 'Не удалось отправить запрос ',
			},
			{
				returnDocument: 'after',
			}
		)
	}
}
export const getProfile = async (req, res) => {
	try {
		const {
			params: { id },
		} = req
		let user = await UserModel.findById(id)
		res.json(user)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить ворки',
		})
	}
}
export const changeProfile = async (req, res) => {
	try {
		const {
			params: { id },
			body: {
				name,
				surname,
				profession,
				description,
				photo,
				phone,
				technologies,
				country,
				education,
				languages,
				certificates,
			},
		} = req
		UserModel.findByIdAndUpdate(
			{
				_id: id,
			},
			{
				name,
				surname,
				profession,
				description,
				photo,
				phone,
				technologies,
				education,
				languages,
				country,
				certificates,
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'Не удалось изменить профиль',
					})
				}
				if (!doc) {
					return res.status(404).json({
						message: 'Пользователь не найден',
					})
				}
				res.json(doc)
			}
		)
	} catch (err) {
		console.log(err)
		res.status(500).json(
			{
				message: 'Не удалось отправить запрос ',
			},
			{
				returnDocument: 'after',
			}
		)
	}
}
export const getAllUsers = async (req, res) => {
	try {
		let users = await UserModel.find()
		res.json(users)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить все  статьи',
		})
	}
}
