import "babel-polyfill"
import {dropData} from "../support/dropData"
import chai from "chai"
chai.should()

describe("A default test", () => {

  it("Should return true", async() => {

    const test = "test"

    test.should.be.equal("test")
  })
})