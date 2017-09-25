import { setupMocha } from "../setup"

import chai from "chai"
import chaiAsPromised from "chai-as-promised"

const should = chai.should();
chai.use(chaiAsPromised)

import Student from "../../../src/backend/models/Student"
import Inscription from "../../../src/backend/models/Inscription"

describe("Inscription model object", () => {
	let parentStudent

	setupMocha()

	beforeEach(async() => {
		const student = new Student({
			name: "Student 1",
			studentId: 1,
			careers: [], 
			approvedSubjects: []
		})
		parentStudent= await student.save()
	})
	
	it("should store all fields", async() => {
		const inscription = new Inscription({
			courses: [],
			student: parentStudent
		})

		const saved = await inscription.save()

		should.exist(saved)
		saved.should.have.property("_id")
		saved.should.have.property("student").that.has.property("_id").equal(parentStudent._id)
        saved.should.have.property("courses").that.has.lengthOf(0) 
	})

})