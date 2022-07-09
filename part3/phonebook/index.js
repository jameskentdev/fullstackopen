require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

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

app.get('/api/persons', (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;

  const person = {
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.get('/info', (request, response) => {
  Person.countDocuments().then((countedDocuments) => {
    const responseString = `<p>Phonebook has info for ${countedDocuments} people<p> <p>${new Date()}<p>`;
    response.send(responseString);
  });
});

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

  Person.find({ name: body.name }).then((foundPerson) => {
    const person = new Person({
      name: body.name,
      number: body.number,
    });

    if (foundPerson.length > 0) {
      response.status(404).send({ error: 'name not unique' });
    }

    person.save().then((savedPerson) => {
      response.json(savedPerson);
    });
  });

  return null;
});

const errorHandler = (error, _request, response, next) => {
  console.log(error.message);

  next(error);

  return null;
};

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
