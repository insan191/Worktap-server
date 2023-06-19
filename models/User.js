import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},

		surname: {
			type: String,
			required: true,
		},
		profession: {
			type: String,
		},
		technologies: {
			type: Array,
		},
		description: {
			type: String,
		},
		photo: {
			type: String,
		},
		country: {
			type: String,
		},
		education: {
			type: String,
		},
		languages: {
			type: String,
		},
		certificates: {
			type: String,
		},
		role: {
			type: String,
			required: true,
		},
		reviewsCount: {
			type: Number,
		},
		dealCount: {
			type: Number,
		},
		grade: {
			type: Number,
		},
		passwordHash: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('User', UserSchema)
