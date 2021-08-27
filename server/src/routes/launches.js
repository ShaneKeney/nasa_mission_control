const express = require('express')
const { httpGetAllLaunches } = require('../controllers/launches')

const launchesRouter = express.Router()

launchesRouter.get('/launches', httpGetAllLaunches)

module.exports = launchesRouter
