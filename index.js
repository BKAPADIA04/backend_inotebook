const connectToMongo = require('./db.js');
const express = require('express')
connectToMongo();

const server = express();
const port = 3000;

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.use(express.json());

//Router Section
const userRouter = require('./routes/User.js');
const notesRouter = require('./routes/Notes.js');
server.use('/api/user_auth',userRouter.userRoute);
server.use('/api/notes',notesRouter.notesRoute);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})