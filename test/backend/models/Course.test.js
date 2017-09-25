import { setupMocha } from "../setup"

import chai from "chai"
import chaiAsPromised from "chai-as-promised"

const should = chai.should();
chai.use(chaiAsPromised)

import Course from "../../../src/backend/models/Course"
import Subject from "../../../src/backend/models/Subject"
import Career from "../../../src/backend/models/Career"

describe("Course model object", () => {
	let parentSubject
	let parentCareer

	setupMocha()

	beforeEach(async() => {
		const career = new Career({
			name: "Name of career",
			subjects: []
		})
		parentCareer= await career.save()

		const subject = new Subject({
			name: "Name of subject",
			courses: [],
			career: parentCareer
		})
		parentSubject= await subject.save()
	})
	
	it("should store all fields", async() => {
		const course = new Course({
			name: "Name of course",
			quota: 0,
			days: [ "Lunes", "Martes" ],
			startTime: "10",
			endTime: "12",
			subject: parentSubject
		})

		const saved = await course.save()

		should.exist(saved)
		saved.should.have.property("_id")
        saved.should.have.property("name").equal("Name of course")
        saved.should.have.property("quota").equal(0)
        saved.should.have.property("startTime").equal("10")
        saved.should.have.property("endTime").equal("12")
        saved.should.have.property("subject").that.has.property("_id").equal(parentSubject._id)
        saved.should.have.property("days").that.has.lengthOf(2) 
	})
})