import mongoose from 'mongoose'

const WorkSchema = new mongoose.Schema(
	{
		creator: {
			type: String,
			required: true,
		},
		main: {
			type: Object,
			required: true,
		},
		packet: {
			type: Object,
			required: true,
		},
		description: {
			type: Object,
			required: true,
		},
		requirements: {
			type: Object,
			required: true,
		},
		gallery: {
			type: Object,
			required: true,
		},
		price: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Work', WorkSchema)
