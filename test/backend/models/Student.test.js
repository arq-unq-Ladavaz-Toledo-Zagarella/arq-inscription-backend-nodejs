import { setupMocha } from "../setup"

import chai from "chai"
import chaiAsPromised from "chai-as-promised"

const should = chai.should();
chai.use(chaiAsPromised)

import Student from "../../../src/backend/models/Student"

describe("Student model object", () => {

	setupMocha()
	
	it("should store all fields", async() => {
		const student = new Student({
			name: "Name of student",
			studentId: 1,
			approvedSubjects: ["Objetos 1"]
		})

		const saved = await student.save()

		should.exist(saved)
		saved.should.have.property("_id")
		saved.should.have.property("name").equal("Name of student")
		saved.should.have.property("studentId").equal(1)
		saved.should.have.property("approvedSubjects").that.has.lengthOf(1) 
	})

})