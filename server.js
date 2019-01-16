
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const knex = require('knex')

app.use(bodyParser.json())
app.use(cors());

const db = knex({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'iluvmylyf',
    database: 'contact'
  });
db.select('*').from('contact').then(data => { console.log(data)});
const database = {
    user: [
        {
            name: 'seun',
            email: 'seun@gmail.com',
            message: 'Hellooooooo'
        }
    ]
}
// app.get('/',(req,res) => {
//         res.json(database.user)
// })
app.post('/message',(req,res) => {
    const {name,email,message} = req.body;
        db('contact').insert({
            name: name,
            email: email,
            message: message
        }).then(response => { res.json(response[0])}).catch(err => {res.status(400).json("unable to submit")})
       
})
app.listen(process.env.PORT || 4000, () => {
    console.log(`running on port ${process.env.PORT}`)
})