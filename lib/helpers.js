require('dotenv/config')
const jwt = require('jsonwebtoken')
const { response } = require('express')

/**
 *
 * @param {response} res Express app response parameter
 * @param {Array} data Data to return as json to the endpoint
 * @param {String} message Message to return as json to the endpoint. Default: "success"
 * @param {Number} status HTTP Status Code to return to endpoint. Default: 200
 * @returns
 */
function SuccessResponse(res, message = 'success', data = [], status = 200) {
	res.status(status).json({ success: true, message, status, data })
}

/**
 *
 * @param {response} res Express app response parameter
 * @param {Array} data Data to return as json to the endpoint
 * @param {String} message Message to return as json to the endpoint. Default: "error"
 * @param {Number} status HTTP Status Code to return to endpoint. Default: 500
 * @returns
 */
function ErrorResponse(res, message = 'error', data = [], status = 500) {
	res.status(status).json({ success: false, message, status, data })
}

/**
 * Logs information if the application is in development mode
 * @param {any} message Information to output
 */
function DevLog(message = '') {
	const isProduction = process.env.PRODUCTION || false

	if (isProduction === false) {
		console.log(message)
	}
}

function generateAccessToken(id) {
	let signedToken

	try {
		signedToken = jwt.sign(id, process.env.SECRET_JWT_TOKEN, { expiresIn: '1d' })
	} catch (error) {
		console.log(error)
	}

	return signedToken
}

module.exports = { SuccessResponse, ErrorResponse, DevLog, generateAccessToken }
