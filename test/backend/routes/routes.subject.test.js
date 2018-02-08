import { setupMocha, createMockData } from "../setup"
import Career from "../../../src/backend/models/Career"
import Subject from "../../../src/backend/models/Subject"

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

  describe("GET /materias", () => {
    it("Should return the existing subject", async() => {
      const response = await request(app)
            .get("/materias")
            .expect(200)
      response.body.should.have.lengthOf(1)
    })
  })

  describe("GET /materias/:materia", () => {
    context("When querying an existing subject id", () => {
      it("Should return the existing object", async() => {
        const response = await request(app)
              .get("/materias/" + mockData.subject1._id)
              .expect(200)

        response.body.should.have.property("_id")
        response.body.should.have.property("name").equal("Subject1")
        response.body.should.have.property("suggestedSemester").equal(1)
        response.body.should.have.property("courses").with.lengthOf(1)
        response.body.should.have.property("career").equal(mockData.career1._id.toString())
      })
    })

    context("When querying an non-existing subject id", () => {
      it("Should return an error", () => {
        return request(app)
              .get("/materias/590761c5c00daf0caa9b881f" )
              .expect(500) //should be 404
      })
    })
  })

  describe("Post /materias", () => {

    it("Should return the object of the newly created subject", async() => {
      const response = await request(app)
            .post("/carreras/" + mockData.career1._id + "/materias")
            .send({ name: "Subject4", suggestedSemester: 1 })
            .expect(200)
      response.body.should.be.a('object')
      response.body.should.have.property("_id")
      response.body.should.have.property("name", "Career1")
      response.body.should.have.property("suggestedSemester")
      response.body.should.have.property("subjects").with.lengthOf(2)
    })

    it("Should save the subject in the database", async() => {
      const response = await request(app)
            .post("/carreras/" + mockData.career1._id + "/materias")
            .send({ name: "Subject5" })
            .expect(200)
      
      const found = await Subject.findById(response.body.subjects[1]._id)
      should.exist(found)

      found.should.have.property("_id")
      found.should.have.property("name").equal("Subject5")
      found.should.have.property("suggestedSemester").equal(1)
      found.should.have.property("courses").with.lengthOf(0)
    })

    it("Should add the subject to the parent career", async() => {
      const response = await request(app)
            .post("/carreras/" + mockData.career1._id + "/materias")
            .send({ name: "Subject8" })
            .expect(200)
      
      const found = await Career.findById(mockData.career1._id)
      should.exist(found)

      found.should.have.property("subjects").that.has.lengthOf(2)
    })

    it("Newer subject should be returned on /GET materias", async() => {
      const response = await request(app)
            .post("/carreras/" + mockData.career1._id + "/materias")
            .send({ name: "Subject6" , suggestedSemester: 1})
            .expect(200)

      const response2 = await request(app)
            .get("/materias")
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