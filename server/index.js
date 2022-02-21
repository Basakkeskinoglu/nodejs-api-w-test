const http=require('http');
const express=require('express');
const logan=require('morgan');
const cors=require('cors');
const socketio=require('socket.io');

const db =( "../config/db");
const app = express();

const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/delete", deleteRouter);

app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

const server = http.createServer(app);
server.listen(port);
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:8080/`)
});
