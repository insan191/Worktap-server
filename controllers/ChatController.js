import ChatModel from '../models/Chat.js'

export const createChat = async (req, res) => {
	try {
		const { body: { senderId, receiverId } } = req
		const doc = new ChatModel({
			members: [senderId, receiverId],
		})
		const chat = await doc.save()
		res.json(chat)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось создать чат',
		})
	}
}

export const getChats = async (req, res) => {
	try {
		const { params: { id } } = req
		const chats = await ChatModel.find({
			members: { $in: id },
		})

		res.json(chats)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить чат',
		})
	}
}