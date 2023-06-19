import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import { createChat, getChats } from './controllers/ChatController.js'
import { getMessages, sentMessage } from './controllers/MessageController.js'
import { createOrder, getAllOrders, getOrder } from './controllers/OrderController.js'
import {
	changeProfile,
	changeRole,
	getAllUsers,
	getProfile,
	login,
	register,
} from './controllers/UserController.js'
import {
	createWork,
	getAllWorks,
	getMyWorks,
	getWork,
} from './controllers/WorkController.js'
import handleValidatorErrors from './utils/handleValidatorErrors.js'

mongoose
	.connect(
		'mongodb+srv://usaiyrovinsan:insan191@cluster0.pmbcjgx.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => console.log('Mongo DB успешно запущен'))
	.catch(err => console.log('Ошибка при запуске Mongo DB ', err))

const server = express()

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

server.use(express.json())
server.use(cors())
server.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 5555

server.post('/upload', upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	})
})

server.post('/auth/login', handleValidatorErrors, login)
server.post('/auth/register', register)
server.get('/users', getAllUsers)
server.patch('/users/:id/changerole', changeRole)
server.get('/profile/:id', getProfile)
server.patch('/users/:id/changeprofile', changeProfile)

server.post('/creatework', createWork)
server.get('/works', getAllWorks)
server.get('/works/:id', getMyWorks)
server.get('/work/:id', getWork)

server.post('/chats', createChat)
server.get('/chats/:id', getChats)
server.post('/messages/send', sentMessage)
server.get('/messages/:id', getMessages)

server.post('/createorder', createOrder)
server.get('/orders', getAllOrders)
server.get('/order/:id', getOrder)

server.listen(PORT, err => {
	if (err) {
		return console.log('Произошла ошибка', err)
	}
	console.log(`Сервер запущен на порту ${PORT}`)
})
