import "babel-polyfill"
import mongoose from "mongoose"
import mockgoose from "mockgoose"
import Career from "../../src/backend/models/Career"
import Course from "../../src/backend/models/Course"
import Student from "../../src/backend/models/Student"
import Subject from "../../src/backend/models/Subject"
import Inscription from "../../src/backend/models/Inscription"

/**
 * @return {Function} a function that when invoked will prepare mockgoose
 *                    mocks
 */
export function setupMocha() {
	before("Mock mongoose", async() => {
		await mockgoose(mongoose)
		mongoose.connect('mongodb://localhost/careers')
	})

	after("Restore mongoose", done => {
  	mongoose.unmock(done);
	})

	afterEach("Reset mock mongo database", done => {
	  mockgoose.reset(done);
	})
}

export async function createMockData() {

		const mockData = {}

		mockData.career1 = await new Career({ name: "Career1", subjects: []}).save()
		mockData.subject1 = await new Subject({ name: "Subject1", courses: [], career: mockData.career1 }).save()
		mockData.student1 = await new Student({ name: "Student1", studentId: 1 }).save()
		mockData.inscription1 = await new Inscription({ courses: [], studentId: 1}).save()
		mockData.course1 = await new Course({ name: "Course1", quota: 23, days: ["Lunes", "Jueves"], startTime: "18", endTime: "22", subject: mockData.subject1 }).save()

		mockData.subject1.courses.push(mockData.course1)
		mockData.career1.subjects.push(mockData.subject1)

		mockData.career1 = await mockData.career1.save()
		mockData.student1 = await mockData.student1.save()
		mockData.subject1 = await mockData.subject1.save()
		mockData.course1 = await mockData.course1.save()

		return mockData
} 