import express from 'express'

import Career from '../models/Career.js'
import Student from '../models/Student.js'
import Subject from '../models/Subject.js'
import Course from '../models/Course.js'
import Inscription from '../models/Inscription.js'

let router = express.Router()


//Carreras
router.get('/carreras', (req, res, next) => {
  Career.find()
    .then(carreras => res.json(carreras))
    .catch(next)
})

router.get('/carreras/:carrera', (req, res, next) => {
  get(req.career, res, 'subjects', next)
})

router.param('carrera', (req, res, next, value) => {
  Career.findById(value)
    .then(career => {
      if (! subject ) {
        throw new Error(`Carrera no encontrada ${value}`)
      }
      req.career = career
      next()
    })
    .catch(next)
})

router.post('/carreras', (req, res, next) => {
  const carrera = new Career(req.body)
  carrera.save()
  .then(carrera => res.json(carrera))
  .catch(next)
})

//Formularios de inscripción
//Carreras
router.get('/inscripciones', (req, res, next) => {
  Career.find()
    .then(inscripciones => res.json(inscripciones))
    .catch(next)
})

router.get('/inscripciones/:inscripcion', (req, res, next) => {
  get(req.inscription, res, 'courses', next)
})

router.param('inscripcion', (req, res, next, value) => {
  Inscription.findById(value)
    .then(inscription => {
      if (! inscription ) {
        throw new Error(`Formulario de inscripción no encontrado ${value}`)
      }
      req.inscription = inscription
      next()
    })
    .catch(next)
})

router.post('/inscripciones', (req, res, next) => {
  const inscripcion = new Inscription(req.body)
  inscripcion.save()
  .then(inscripcion => res.json(inscripcion))
  .catch(next)
})

//Materias
router.get('/materias', (req, res, next) => {
  Subject.find()
    .then(materias => res.json(materias))
    .catch(next)
})

router.get('/materias/:materia', (req, res, next) => {
  get(req.subject, res, 'courses', next)
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

router.post('/materias', (req, res, next) => {
  const materia = new Subject(req.body)
  materia.save()
  .then(materia => res.json(materia))
  .catch(next)
})

//Cursos
router.get('/cursos', (req, res, next) => {
  Course.find()
    .then(cursos => res.json(cursos))
    .catch(next)
})

router.get('/cursos/:curso', (req, res, next) => {
  get(req.course, res, 'days', next)
})

router.param('course', (req, res, next, value) => {
  Course.findById(value)
    .then(course => {
      if (! course ) {
        throw new Error(`Comisión no encontrada ${value}`)
      }
      req.course = course
      next()
    })
    .catch(next)
})

router.post('/materias/:materia/cursos', (req, res, next) => {
  const subject = req.subject
  const course = new Course(req.body)
  course.subject = subject
  saveParentAndChild(subject, 'courses', course, 'courses', res, next)
})

//Genéricos
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