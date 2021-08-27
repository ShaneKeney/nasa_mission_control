const { getAllLaunches } = require('../models/launches')

function httpGetAllLaunches(req, res) {
  console.log('here')
  return res.status(201).json(getAllLaunches())
}

module.exports = {
  httpGetAllLaunches
}