import { setupMocha, createMockData } from "../setup"
import Student from "../../../src/backend/models/Student"

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

  describe("GET /estudiantes", () => {
    it("Should return the existing student", async() => {
      const response = await request(app)
            .get("/estudiantes")
            .expect(200)
      response.body.should.have.lengthOf(1)
    })
  })

  describe("GET /estudiantes/:estudiante", () => {
    context("When querying an existing student id", () => {
      it("Should return the existing object", async() => {
        const response = await request(app)
              .get("/estudiantes/" + mockData.student1._id)
              .expect(200)

        response.body.should.have.property("_id")
        response.body.should.have.property("name").equal("Student1")
        response.body.should.have.property("studentId").equal(1)
      })
    })

    context("When querying an non-existing student id", () => {
      it("Should return an error", () => {
        return request(app)
              .get("/carreras/590761c5c00daf0caa9b881f" )
              .expect(500) //should be 404
      })
    })
  })

  describe("Post /estudiantes", () => {

    it("Should return the object of the newly created student", async() => {
      const response = await request(app)
            .post("/estudiantes")
            .send({ name: "Student6", studentId: 6 })
            .expect(200)
      response.body.should.be.a('object')
    })

    it("Should save the student in the database", async() => {
      const response = await request(app)
            .post("/estudiantes")
            .send({ name: "Student7", studentId: 7 })
            .expect(200)
      
      const found = await Student.findById(response.body)
      should.exist(found)

      found.should.have.property("_id")
      found.should.have.property("name").equal("Student7")
      found.should.have.property("studentId").equal(7)
    })

    it("Newer student should be returned on /GET estudiantes", async() => {
      const response = await request(app)
            .post("/estudiantes")
            .send({ name: "Student8", studentId: 8 })
            .expect(200)

      const response2 = await request(app)
            .get("/estudiantes")
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