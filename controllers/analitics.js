const moment = require('moment')
const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.overview = async function(req, res) {
    try {
        console.log(req.user.id);
        const allOrders = await Order.find({user: req.user.id})
        // create hashMap of orders in day >>> { day: [orders] }
        const ordersMap = getOrdersMap(allOrders)

        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []

        // Number of orders yesterday
        const yesterdayOrdersNumber = yesterdayOrders.length 
        // Number of all orders
        const totalOrdersNumber = allOrders.length
        // Number of all days
        const daysNumber = Object.keys(ordersMap).length
        // Avarage orders per day
        const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)
        // Percent of orders number (compare to avarage orders number)
        const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2)
        // Total gain
        const totalGain = calculatePrice(allOrders)
        // Gain per day (avarage)
        const gainPerDay = totalGain / daysNumber
        // Yesterday gain
        const yesterdayGain = calculatePrice(yesterdayOrders)
        // Gain percent
        const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2)
        // Compare gain
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2)
        // Compare orders number
        const compareOrdersNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2)

        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent),
                compare: Math.abs(+compareGain),
                yesterday: +yesterdayGain,
                isHigher: +gainPercent > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareOrdersNumber),
                yesterday: +yesterdayOrdersNumber,
                isHigher: +ordersPercent > 0
            }
        })
    } catch(err) {
        errorHandler(res, err)
    }
}

module.exports.analitics = async function(req, res) {
    try {
        const allOrders = await Order.find({user: req.user.id})
        const ordersMap = getOrdersMap(allOrders)

        const average = (calculatePrice(allOrders) / allOrders.length).toFixed(2)

        const chart = Object.keys(ordersMap).map(label => {
            // label is Date
            const gain = calculatePrice(ordersMap[label])
            const order = ordersMap[label].length
            return { label, order, gain }
        })

        res.status(200).json({ average, chart })
    } catch(err) {
        errorHandler(res, err)
    }
}

function getOrdersMap(orders = []) {
    const daysOrders = {}
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY')
        if(moment().format('DD.MM.YYYY') === date) {
            return
        }
        if(!daysOrders[date]) {
            daysOrders[date] = []
        }
        daysOrders[date].push(order)
    })
    return daysOrders
}

function calculatePrice(orders = []) {
    return orders.reduce((acc, order) => {
        const orderPrice = order.list.reduce((orderAcc, item) => orderAcc += item.cost * item.quantity, 0)
        return acc += orderPrice
    }, 0)
}