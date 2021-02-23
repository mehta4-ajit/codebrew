const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const pumpRouter = require('./api/routes/pumpRouter')
const authRouter = require('./api/routes/authRouter')
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware all👋');
//   let token = req.header.token
//   console.log(token)
//   next();
// });

// 3) ROUTES
app.get('/', (req,res)=>{
    res.status(200).json({msg:"journey is to get started"})
});
 app.use('/pumps', pumpRouter);
 app.use('/auth',authRouter);
// app.use('/api/v1/users', userRouter);
module.exports = app;