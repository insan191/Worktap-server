import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
	{
		chatId: {
			type: String,
		},
		sender: {
			type: String,
		},
		message: {
			type: String,
		},

	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Message', MessageSchema)