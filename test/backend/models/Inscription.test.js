import { setupMocha } from "../setup"

import chai from "chai"
import chaiAsPromised from "chai-as-promised"

const should = chai.should();
chai.use(chaiAsPromised)

import Student from "../../../src/backend/models/Student"
import Inscription from "../../../src/backend/models/Inscription"

describe("Inscription model object", () => {
	setupMocha()
	
	it("should store all fields", async() => {
		const inscription = new Inscription({
			courses: [],
			studentId: 1
		})

		const saved = await inscription.save()

		should.exist(saved)
		saved.should.have.property("_id")
		saved.should.have.property("studentId").equal(1)
        saved.should.have.property("courses").that.has.lengthOf(0) 
	})

})