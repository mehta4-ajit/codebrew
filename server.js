
// server.js
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app =require('./app')
dotenv.config();
// undefined
const db = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
mongoose.connect(process.env.DATABASE_LOCAL,
    {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false}).then(()=>console.log('db connection successfully!'))
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});