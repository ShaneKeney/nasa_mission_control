const { getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById } = require('../models/launches')

function httpGetAllLaunches(req, res) {
  return res.status(201).json(getAllLaunches())
}

function httpAddNewLaunch(req, res) {
  const launch = req.body

  if(!launch.mission || !launch.launchDate || !launch.rocket || !launch.target) {
    return res.status(400).json({
      error: 'MISSING_FIELD',
      message: 'There is a missing launch parameter in the launch creation request!'
    })
  }
  
  launch.launchDate = new Date(launch.launchDate)  
  if(isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'INVALID_DATE',
      message: 'Invalid launch date supplied!'
    })
  }

  addNewLaunch(launch)
  return res.status(201).json(launch)
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id)

  if(!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: 'LAUNCH_NOT_FOUND',
      message: 'Launch not found'
    })    
  }

  const aborted = abortLaunchById(launchId)
  return res.status(200).json(aborted)
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
}