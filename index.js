'use stict'

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {GoogleGenerativeAI} from '@google/generative-ai'

dotenv.config()

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash"});

app.post('/api/chat', async (req, res) => {
    try{
        const {prompt} = req.body
        const result = await model.generateContent(prompt);
        const response = result.response;
        res.json({output: response.text()})

    }catch (err) {
        res.status(500).json({error: err.message})
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 