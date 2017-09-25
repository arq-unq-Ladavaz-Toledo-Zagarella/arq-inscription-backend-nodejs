import { setupMocha, createMockData } from "../setup"
import Career from "../../../src/backend/models/Career"

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

  describe("GET /carreras", () => {
    it("Should return the existing project", async() => {
      const response = await request(app)
            .get("/carreras")
            .expect(200)
      response.body.should.have.lengthOf(1)
    })
  })

  describe("GET /carreras/:carrera", () => {
    context("When querying an existing career id", () => {
      it("Should return the existing object", async() => {
        const response = await request(app)
              .get("/carreras/" + mockData.career1._id)
              .expect(200)

        response.body.should.have.property("_id")
        response.body.should.have.property("name", "Career1")
        response.body.should.have.property("milestones").with.lengthOf(1)
      })
    })

    context("When querying an non-existing project id", () => {
      it("Should return an error", () => {
        return request(app)
              .get("/carreras/590761c5c00daf0caa9b881f" )
              .expect(500) //should be 404
      })
    })
  })

  describe("Post /carreras", () => {

    it("Should return the object of the newly created career", async() => {
      const response = await request(app)
            .post("/carreras")
            .send({ name: "Career3", subjects: [] })
            .expect(200)
      response.body.should.be.a('object')
    })

    it("Should save the career in the database", async() => {
      const response = await request(app)
            .post("/carreras")
            .send({ name: "Career3", subjects: [] })
            .expect(200)

      const found = await Career.findById(response.body)
      should.exist(found)

      found.should.have.property("_id")
      found.should.have.property("name", "Career3")
      found.should.have.property("subjects").with.lengthOf(0)
    })

    it("Newer project should be returned on /GET carreras", async() => {
      const response = await request(app)
            .post("/carreras")
            .send({ name: "Career3", subjects: [] })
            .expect(200)

      const response2 = await request(app)
            .get("/carreras")
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