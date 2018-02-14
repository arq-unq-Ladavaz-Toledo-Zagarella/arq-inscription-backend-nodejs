import express from 'express'
import jwt from 'jwt-simple';
import Career from '../models/Career.js'
import Student from '../models/Student.js'
import Subject from '../models/Subject.js'
import Course from '../models/Course.js'
import Inscription from '../models/Inscription.js'

let router = express.Router()

//var payload = { id: '5a7c704d4aa361232cbb0d25' };
var secret = process.env.SECRET || 'unacontraseñadeldirector';
// encode
//var token = jwt.encode(payload, secret);
//console.log(token)
// decode
//var decoded = jwt.decode(token, secret);
//console.log(decoded); //=> { foo: 'bar' }

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
      if (! career ) {
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

//Estudiantes
router.get('/estudiantes', (req, res, next) => {
  Student.find()
    .then(estudiantes => res.json(estudiantes))
    .catch(next)
})

router.get('/total-estudiantes', (req, res, next) => {
  Student.count()
    .then(estudiantes => res.json(estudiantes))
    .catch(next)
})

router.get('/estudiantes/:estudiante', (req, res, next) => {
  res.json(req.student)
})

router.param('estudiante', (req, res, next, value) => {
  Student.findById(value)
    .then(student => {
      if (! student ) {
        throw new Error(`Estudiante no encontrado ${value}`)
      }
      req.student = student
      next()
    })
    .catch(next)
})

router.post('/estudiantes', (req, res, next) => {
  const estudiante = new Student(req.body)
  estudiante.save()
  .then(estudiante => res.json(estudiante))
  .catch(next)
})

//Formularios de inscripción
router.get('/inscripciones', (req, res, next) => {
  Inscription.find()
    .then(inscripciones => res.json(inscripciones))
    .catch(next)
})

router.get('/total-inscripciones', (req, res, next) => {
  Inscription.count()
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

router.post('/inscripciones/:token', (req, res, next) => {
  req.body.studentId= jwt.decode(req.token, secret).id;
  const inscripcion = new Inscription(req.body)
  inscripcion.save()
  .then(inscripcion => res.json(inscripcion))
  .catch(next)
})

router.delete('/inscripciones', (req, res, next) => {
  const inscripcion = new Inscription(req.body)
  Inscription.remove(req.body)
    .then(inscripcion => res.json(inscripcion))
    .catch(next)
})

//Progreso encuesta
router.get('/progreso-encuesta', (req, res, next) => {
  const progreso = {}
  Inscription.count()
    .then(inscripciones => {
      progreso.totalInscriptions = inscripciones
      Student.count()
        .then(alumnos => {
          progreso.totalStudents = alumnos
          res.json(progreso)
        })
        .catch(next)
      })
  .catch(next)
})

//Materias
router.get('/materias', (req, res, next) => {
  Subject.find()
    .then(materias => res.json(materias))
    .catch(next)
})

router.get('/materiasycursos', (req, res, next) => {
  Subject.find({}, function(err, subjects) {
    Course.populate(subjects, {path: "courses"}, function(err, subjects) {
      res.status(200).send(subjects)
    })
  }).sort( { suggestedSemester: 1 })
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

router.post('/carreras/:carrera/materias', (req, res, next) => {
  const career = req.career
  const subject = new Subject(req.body)
  subject.career = career
  saveParentAndChild(career, 'subjects', subject, 'subjects', res, next)
})

//Cursos
router.get('/inscribir-curso/:curso', (req, res, next) => {
  const curso = req.course
  Course.update( 
     { _id: curso._id },
     {
       $inc: { inscripted: 1 }
     }
  )
  .then(curso => res.json(curso))
  .catch(next)
})

router.get('/cancelar-inscripcion-curso/:curso', (req, res, next) => {
  const curso = req.course
  Course.update( 
     { _id: curso._id },
     {
       $set: { inscripted: curso.inscripted-1 }
     }
  )
  .then(curso => res.json(curso))
  .catch(next)
})

router.get('/cursos', (req, res, next) => {
  Course.find()
    .then(cursos => res.json(cursos))
    .catch(next)
})

router.get('/cursos/:curso', (req, res, next) => {
  res.json(req.course)
})

router.param('curso', (req, res, next, value) => {
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

router.get('/acceso-permitido/:token', (req, res, next) => {
  if (req.token) {
    try {
      var decoded = jwt.decode(req.token, secret);
    } catch(e) {
      res.sendStatus(400);
      next()
      return
    }
    Student.findById(decoded.id)
    .then(student => {
      if (! student ) {
        res.sendStatus(400); 
        next()
      }
      res.sendStatus(200); 
      next()
    })
  }
});

router.param('token', (req, res, next, value) => {
  req.token= value
  next()
})

export default router