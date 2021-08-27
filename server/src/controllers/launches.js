const { launches } = require('../models/launches')

function getAllLaunches(req, res) {
  console.log('here')
  return res.status(201).json(Array.from(launches.values()))
}

module.exports = {
  getAllLaunches
}