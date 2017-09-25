import { setupMocha } from "../setup"

import chai from "chai"
import chaiAsPromised from "chai-as-promised"

const should = chai.should();
chai.use(chaiAsPromised)

import Career from "../../../src/backend/models/Career"

describe("Career model object", () => {

	setupMocha()
	
	it("should store all fields", async() => {
		const career = new Career({
			name: "Name of career",
			subjects: []
		})

		const saved = await career.save()

		should.exist(saved)
		saved.should.have.property("_id")
		saved.should.have.property("name").equal("Name of career")
        saved.should.have.property("subjects").that.has.lengthOf(0) 
	})

})