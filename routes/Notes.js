const express = require('express');
const notesRouter = express.Router();

notesRouter.use('/',(req,res) =>
{
    res.send("Notes Section");
});

exports.notesRoute = notesRouter;