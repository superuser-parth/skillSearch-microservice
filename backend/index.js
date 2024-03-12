const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const PORT=5000;

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/companyDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const companySchema = new mongoose.Schema({
    companyName: String,
    position: String,
    skills:[String]
})

const Company = mongoose.model('Company', companySchema)

app.get('/search', async (req, res) => {
    const { skills } = req.query;
    
    try {
      const companies = await Company.find({ skills: { $in: skills.split(',') } });
      res.json(companies);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/add', async(req, res)=>{
    const {companyName, postion, skills} = req.body;
    try{
        const newCompany=new Company({
            companyName,
            position,
            skills:skills.split(',')
        })
        await newCompany.save();
        res.status(201).json({message:'Company added successfully'})
    }catch(error){
        res.status(500).json({error:'Couldnt add company'});
    }
})

app.listen(PORT, ()=>{
    console.log(`App started at port &{PORT}`)
})