const app = require('express').Router();

// Helper function to generate unique ids
const uuid = require('../helpers/uuid');

// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
app.get('/', (req, res) => {
  console.info(`${req.method} request received for note`);

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting note
app.post('/', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to submit note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

app.delete('/:id', (req, res) => {
    console.log(req.params.id);

    // Step 1

    // Filter the array of objects to get only the values whose id is NOT EQUALS to req.params.id
    // After Filter
    // [
    //     {
    //         "title": "Make Bed",
    //         "text": "Remove old bedding.\nAdd new clean bedding.",
    //         "id": "fa8b"
    //     },
    //     {
    //         "title": "Make Bed",
    //         "text": "Remove old bedding.\nAdd new clean bedding.",
    //         "id": "4byz"
    //     },
    //     {
    //         "title": "Make Bed",
    //         "text": "Remove old bedding.\nAdd new clean bedding.",
    //         "id": "a01w"
    //     }
    // ]


    // Step 2
    // Write the db.json file with the new array of objects above

    // Step 3
    // Send the response back with the approprite status code
});

module.exports = app;