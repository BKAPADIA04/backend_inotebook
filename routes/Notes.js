const express = require('express');
const notesRouter = express.Router();
const Note = require('../controller/Notes.js');
const { body } = require('express-validator');
const decodeMiddleware = require('../middleware/Login.js');
const decoder = decodeMiddleware.decoder;


notesRouter.get('/fetchAllNotes',decoder,Note.fetchAllNotes);
notesRouter.post('/insertNote',decoder,[
    body('title','Enter a valid title').isLength({min : 3}),
    body('tag','Enter a valid tag, atleast 3 characters').isLength({min : 3}),
    body('description','Desription should atleast have 5 characters').isLength({min : 5})
],Note.insertNote);
exports.notesRoute = notesRouter;