import OrderModel from '../models/Order.js'

export const createOrder = async (req, res) => {
	try {
		const {
			body: {
				title,
				description,
				category,
				subcategory,
				deadline,
				budget,
				creator,
			},
		} = req
		const doc = new OrderModel({
			title,
			description,
			category,
			subcategory,
			deadline,
			budget,
			creator,
		})
		const order = await doc.save()
		res.json(order)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось создать заказ',
		})
	}
}
export const getAllOrders = async (req, res) => {
	try {
		const {
			query: { search, category, subcategory, criteria, min, max },
		} = req
		const criteriaArr = criteria.split(',')
		let orders = await OrderModel.find({
			title: new RegExp(search, 'i'),
			category: new RegExp(category, 'i'),
			subcategory: new RegExp(subcategory, 'i'),
			budget: {
				$gte: +min,
				$lte: max === '' ? 100000000000 : +max,
			},
		}).sort(
			criteriaArr[0] === 'title'
				? { title: criteriaArr[1] }
				: criteriaArr[0] === 'budget'
				? { budget: criteriaArr[1] }
				: ''
		)
		res.json(orders)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить заказы',
		})
	}
}
export const getOrder = async (req, res) => {
	try {
		const {
			params: { id },
		} = req
		let order = await OrderModel.findById(id)
		res.json(order)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Не удалось получить ворки',
		})
	}
}
