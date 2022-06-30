const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(
  morgan('tiny', {
    skip(req, _res) {
      return req.method === 'POST';
    },
  })
);

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body',
    {
      skip(req, _res) {
        return req.method !== 'POST';
      },
    }
  )
);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);

  const foundPerson = persons.find((person) => person.id === id);

  if (foundPerson) {
    response.json(foundPerson);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);

  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.get('/info', (request, response) => {
  const responseString = `<p>Phonebook has info for ${
    persons.length
  } people<p> <p>${new Date()}<p>`;
  response.send(responseString);
});

const generateId = () => Math.floor(Math.random() * 1000000) + 1;

app.post('/api/persons', (request, response) => {
  const { body } = request;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    });
  }
  const foundPerson = persons.find((person) => person.name === body.name);

  if (foundPerson) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);

  return null;
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});