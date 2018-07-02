import "babel-polyfill"
import {dropData} from "../support/dropData"
import chai from "chai"
chai.should()

describe("Create an inscription", () => {

  dropData()

  it("Should add a inscription from a student", async() => {

   browser.get("http://inscripciones-unq.herokuapp.com/#/question/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhMjRhYTIyMjdjZjkzOTI0YmQwYWZhYyJ9.lkHHEQ-WQFqiICXttpm6dihoiac9J2iIgeEldUm9jBU")

   //eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhN2M3MDRkNGFhMzYxMjMyY2JiMGQyNSJ9.Hurt71UJSHE-hLeM04WCXcK0-a3V4463eol5gwjskYw"
    await element.all(by.css(".chooseSubject")).last().click()

    await element.all(by.css(".chooseCourse")).last().click()

    await element(by.css(".submitQuestion")).click()
    
    const inCongratulationsPage = await element(by.css(".congratulations")).isPresent()

    inCongratulationsPage.should.be.equal(true)
    
  });
})