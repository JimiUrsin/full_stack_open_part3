const express = require("express")
const app = express()

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
  ]
  
  app.get('/api/persons', (_, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(person => person.id === Number(request.params.id))

    if (person === undefined) {
        response.status(404).send("<p>No person was found with given id</p>")
        return
    }

    response.json(person)
  })

  app.get('/api/delete/:id', (request, response) => {
    const lengthBefore = persons.length;
    persons = persons.filter(person => person.id !== Number(request.params.id))

    if (lengthBefore === persons.length) {
        response.status(404).send("<p>No persons found with given id, no deletions happened</p>")
        return
    }

    response.status(200).send("<p>Person deleted</p>")
  })

  app.get('/info', (_, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>${new Date()}`)
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
