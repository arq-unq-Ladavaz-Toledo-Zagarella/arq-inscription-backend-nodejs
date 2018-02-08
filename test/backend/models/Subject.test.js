import { setupMocha } from "../setup"

import chai from "chai"
import chaiAsPromised from "chai-as-promised"

const should = chai.should();
chai.use(chaiAsPromised)

import Subject from "../../../src/backend/models/Subject"
import Career from "../../../src/backend/models/Career"

describe("Subject model object", () => {
	let parentCareer

	setupMocha()

	beforeEach(async() => {
		const career = new Career({
			name: "Name of career",
			subjects: []
		})
		parentCareer= await career.save()
	})
	
	it("should store all fields", async() => {
		const subject = new Subject({
			name: "Name of subject",
			suggestedSemester: 1,
			courses: [],
			career: parentCareer
		})

		const saved = await subject.save()

		should.exist(saved)
		saved.should.have.property("_id")
		saved.should.have.property("name").equal("Name of subject")
	    saved.should.have.property("suggestedSemester").equal(1)
		saved.should.have.property("career").that.has.property("_id").equal(parentCareer._id)
        saved.should.have.property("courses").that.has.lengthOf(0) 
	})

})