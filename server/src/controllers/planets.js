const planets = require('../models/planets')

function getAllPlanets(req, res) {
  console.log('here')
  return res.status(200).json(planets)
}

module.exports = {
  getAllPlanets
}