const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require('cors')

morgan.token("json", (req, res) => 
    req.method === "POST"
    ? JSON.stringify(req.body)
    : null
)

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :json"))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

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

  app.get('/', (_, response) => {
    response.send("<h1>Hello world!</h1>")
  })
  
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

  app.delete('/api/persons/:id', (request, response) => {
    const lengthBefore = persons.length;
    persons = persons.filter(person => person.id !== Number(request.params.id))

    if (lengthBefore === persons.length) {
        response.status(404).send("No persons found with given id, no deletions happened")
        return
    }

    response.status(200).send("Person deleted")
  })

  app.post('/api/persons', (request, response) => {
    const newPerson = request.body

    if (!("name" in newPerson)) {
        response.status(400).send({error: "Name is missing"})
        return
    }
    if (!("number" in newPerson)) {
        response.status(400).send({error: "Number is missing"})
        return
    }

    const alreadyExists = persons.some(
        person => (newPerson.name === person.name)
    )
    if (alreadyExists) {
        response.status(400).send({error: "A person with that name already exists"})
        return
    }

    newPerson.id = Math.floor(Math.random() * Number.MAX_VALUE) // Big enough?

    persons = persons.concat(newPerson)
    response.status(200).json(newPerson)
  })

  app.get('/info', (_, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>${new Date()}`)
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
