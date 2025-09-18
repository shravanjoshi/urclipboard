import express from "express"
import cors from "cors"

import mongoose from "mongoose";
import { Clip } from "./clip.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();

mongoose.connect(process.env.MONGODB_URI).catch((error)=> console.log("Mongoose Error : ",error))
.then(()=> console.log('MongoDB connected'));

app.use(cors());
app.use(express.json());

app.get('/api/:id', async (req,res)=>{
    const id = req.params.id;
    
    

    const clip = await Clip.findOne({ id : id });
    
    if(!clip){
        return res.status(404).json({});
    }
    console.log(clip);
    
    res.json({content : clip.content, lifetime : clip.lifetime});
})

app.post('/api/:id', async (req,res)=>{

    
    const id = req.params.id;
    const content = req.body.content;
    const lifetime = req.body.lifetime;

    await Clip.create({
        id,
        content,
        lifetime
    });
    res.json({});
})

app.listen(3000, ()=> console.log("Server running!!"));