import express from 'express'

import Career from '../models/Career.js'
import Student from '../models/Student.js'
import Subject from '../models/Subject.js'
import Course from '../models/Course.js'
import CourseDays from '../models/CourseDay.js'

let router = express.Router()

router.get('/materias', (req, res, next) => {
  Subject.find()
    .then(materias => res.json(materias))
    .catch(next)
})

router.param('materia', (req, res, next, value) => {
  Subject.findById(value)
    .then(subject => {
      if (! subject ) {
        throw new Error(`Materia no encontrada ${value}`)
      }
      req.subject = subject
      next()
    })
    .catch(next)
})

router.get('/materias/:materia', (req, res, next) => {
	get(req.subject, res, 'courses', next)
})

router.post('/materias', (req, res, next) => {
  const materia = new Subject(req.body)
  materia.save()
  .then(materia => res.json(materia))
  .catch(next)
})

function get(object, res, populateProperty, next) {
  object.populate(populateProperty).execPopulate()
    .then(completeObject => res.json(completeObject))
    .catch(next)
}

function saveParentAndChild(parent, parentProperty, child, populateProperty, res, next) {
  child.save()
    .then(savedChild => {
      parent[parentProperty].push(savedChild)

      parent.save()
        .then(savedParent => get(savedParent, res, populateProperty, next))
        .catch(next)
    })
}

export default router