const request = require('supertest')
const app = require('../app')

describe('Test GET /launches', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200)
  })
})

describe('Test POST /launches', () => {
  const completeLaunchData = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: 'Kepler-186 f',
    launchDate: 'January 4, 2028'
  }

  const launchDataInvalidDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: 'Kepler-186 f',
    launchDate: 'zoot'
  }

  const completeLaunchDataWithoutDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: 'Kepler-186 f',
  }

  test('It should respond with 200 success', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201)

    const requestDate = new Date(completeLaunchData.launchDate).valueOf()
    const responseDate = new Date(response.body.launchDate).valueOf()
    expect(responseDate).toBe(requestDate)

    expect(response.body).toMatchObject(completeLaunchDataWithoutDate)
  })

  test('It should catch missing required properties', async () => {
    const response = await request(app)
    .post('/launches')
    .send(completeLaunchDataWithoutDate)
    .expect('Content-Type', /json/)
    .expect(400)

    expect(response.body).toStrictEqual({
      error: 'MISSING_FIELD',
      message: 'There is a missing launch parameter in the launch creation request!'
    })
  })

  test('It should catch invalid dates', async () => {
    const response = await request(app)
    .post('/launches')
    .send(launchDataInvalidDate)
    .expect('Content-Type', /json/)
    .expect(400)

    expect(response.body).toStrictEqual({
      error: 'INVALID_DATE',
      message: 'Invalid launch date supplied!'
    })
  })
})