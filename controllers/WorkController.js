import WorkModel from '../models/Work.js'

export const createWork = async (req, res) => {
	try {
		const {
			body: {
				main,
				gallery,
				creator,
				description,
				packet,
				requirements,
				price,
			},
		} = req
		const doc = new WorkModel({
			main,
			gallery,
			creator,
			description,
			packet,
			requirements,
			price,
		})
		const work = await doc.save()
		res.json(work)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось создать ворк',
		})
	}
}
export const getMyWorks = async (req, res) => {
	try {
		const {
			params: { id },
		} = req
		let works = await WorkModel.find({
			creator: id,
		})
		res.json(works)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить ворки',
		})
	}
}
export const getAllWorks = async (req, res) => {
	try {
		const {
			query: { search, category, subcategory, criteria, max, min },
		} = req
		const criteriaArr = criteria.split(',')
		let works = await WorkModel.find({
			'main.title': new RegExp(search, 'i'),
			'main.category': new RegExp(category, 'i'),
			'main.subcategory': new RegExp(subcategory, 'i'),
			price: {
				$gte: +min,
				$lte: max === '' ? 100000000000 : +max,
			},
		}).sort(
			criteriaArr[0] === 'main.title'
				? { 'main.title': criteriaArr[1] }
				: criteriaArr[0] === 'price'
				? { price: criteriaArr[1] }
				: ''
		)
		res.json(works)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить ворки',
		})
	}
}
export const getWork = async (req, res) => {
	try {
		const {
			params: { id },
		} = req
		let work = await WorkModel.findById(id)
		res.json(work)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить ворки',
		})
	}
}
