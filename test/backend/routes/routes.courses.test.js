import { setupMocha, createMockData } from "../setup"
import Subject from "../../../src/backend/models/Subject"
import Course from "../../../src/backend/models/Course"

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

  describe("GET /cursos", () => {
    it("Should return the existing course", async() => {
      const response = await request(app)
            .get("/cursos")
            .expect(200)
      response.body.should.have.lengthOf(1)
    })
  })

  describe("GET /cursos/:curso", () => {
    context("When querying an existing course id", () => {
      it("Should return the existing object", async() => {
        const response = await request(app)
              .get("/cursos/" + mockData.course1._id)
              .expect(200)

        response.body.should.have.property("_id")
        response.body.should.have.property("name").equal("Course1")
        response.body.should.have.property("quota").equal(23)
        response.body.should.have.property("startTime").equal("18")
        response.body.should.have.property("endTime").equal("22")        
        response.body.should.have.property("days").with.lengthOf(2)
        response.body.should.have.property("subject").equal(mockData.subject1._id.toString())
      })
    })

    context("When querying an non-existing course id", () => {
      it("Should return an error", () => {
        return request(app)
              .get("/cursos/590761c" )
              .expect(500) //should be 404
      })
    })
  })

  describe("Post /cursos", () => {

    it("Should return the object of the newly created course", async() => {
      const response = await request(app)
            .post("/materias/" + mockData.subject1._id + "/cursos")
            .send({ name: "Course2", quota: 2, days: ["Lunes"], startTime: "18", endTime: "22" })
            .expect(200)
      response.body.should.be.a('object')
      response.body.should.have.property("_id")
      response.body.should.have.property("name").equal("Subject1")
      response.body.should.have.property("courses").with.lengthOf(2)
    })

    it("Should save the course in the database", async() => {
      const response = await request(app)
            .post("/materias/" + mockData.subject1._id + "/cursos")
            .send({ name: "Course3", quota: 22, days: ["Lunes"], startTime: "18", endTime: "22" })
            .expect(200)
      
      const found = await Course.findById(response.body.courses[1]._id)
      should.exist(found)

      found.should.have.property("_id")
      found.should.have.property("name").equal("Course3")
      found.should.have.property("quota").equal(22)
      found.should.have.property("startTime").equal("18")
      found.should.have.property("endTime").equal("22")        
      found.should.have.property("days").with.lengthOf(1)
      found.should.have.property("subject").deep.equal(mockData.subject1._id)
    })

    it("Should add the course to the parent subject", async() => {
      const response = await request(app)
            .post("/materias/" + mockData.subject1._id + "/cursos")
            .send({ name: "Course4", quota: 12, days: ["Lunes", "Viernes"], startTime: "17", endTime: "21" })
            .expect(200)
      
      const found = await Subject.findById(mockData.subject1._id)
      should.exist(found)

      found.should.have.property("courses").that.has.lengthOf(2)
    })

    it("Newer subject should be returned on /GET cursos", async() => {
      const response = await request(app)
            .post("/materias/" + mockData.subject1._id + "/cursos")
            .send({ name: "Course5", quota: 12, days: ["Viernes"], startTime: "17", endTime: "21" })
            .expect(200)

      const response2 = await request(app)
            .get("/cursos")
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