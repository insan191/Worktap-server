import MessageModel from '../models/Message.js'

export const sentMessage = async (req, res) => {
	try {
		const { body } = req
		const doc = new MessageModel(body)
		const message = await doc.save()
		res.json(message)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить чат',
		})
	}
}

export const getMessages = async (req, res) => {
	try {
		const { params: { id } } = req
		const messages = await MessageModel.find({
			chatId: id,
		})
		res.json(messages)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить чат',
		})
	}
}