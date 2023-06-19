import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
	{
		creator: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		subcategory: {
			type: String,
			required: true,
		},
		deadline: {
			type: String,
			required: true,
		},
		budget: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Order', OrderSchema)
