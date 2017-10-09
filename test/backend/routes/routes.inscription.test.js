import { setupMocha, createMockData } from "../setup"
import Inscription from "../../../src/backend/models/Inscription"

import chai from "chai"
const should = chai.should()

import request from "supertest"
import app from "../../../src/backend/app.js"

describe("routes", () => {

  setupMocha()

  let mockData = {}

  beforeEach("Add mockdata to mockgoose", async() => {
    mockData = await createMockData()
  })

  describe("GET /inscripciones", () => {
    it("Should return the existing inscription", async() => {
      const response = await request(app)
            .get("/inscripciones")
            .expect(200)
      response.body.should.have.lengthOf(1)
    })
  })

  describe("GET /inscripciones/:inscripcion", () => {
    context("When querying an existing inscription id", () => {
      it("Should return the existing object", async() => {
        const response = await request(app)
              .get("/inscripciones/" + mockData.inscription1._id)
              .expect(200)

        response.body.should.have.property("_id")
        response.body.should.have.property("studentId").equal(1)
        response.body.should.have.property("courses").with.lengthOf(0)
      })
    })

    context("When querying an non-existing inscription id", () => {
      it("Should return an error", () => {
        return request(app)
              .get("/inscripciones/5907k" )
              .expect(500) //should be 404
      })
    })
  })

  describe("Post /inscripciones", () => {

    it("Should return the object of the newly created career", async() => {
      const response = await request(app)
            .post("/inscripciones")
            .send({ courses: [], studentId: 4 })
            .expect(200)
      response.body.should.be.a('object')
    })

    it("Should save the inscription in the database", async() => {
      const response = await request(app)
            .post("/inscripciones")
            .send({ courses: [], studentId: 5 })
            .expect(200)

      const found = await Inscription.findById(response.body)
      should.exist(found)

      found.should.have.property("_id")
      found.should.have.property("studentId").equal(5)
      found.should.have.property("courses").with.lengthOf(0)
    })

    it("Newer inscription should be returned on /GET inscripciones", async() => {
      const response = await request(app)
            .post("/inscripciones")
            .send({ courses: [], studentId: 6 })
            .expect(200)

      const response2 = await request(app)
            .get("/inscripciones")
            .expect(200)

      response2.body.should.have.lengthOf(2)
    })
  })
})

app.use((err, req, res, next) => {
  //Agregado error handling para eliminar el console.out() que se hace
  //por defecto
  res.status(500).send()
})