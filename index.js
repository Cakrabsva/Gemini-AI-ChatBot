'use stict'

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {GoogleGenAI} from '@google/genai'

dotenv.config()

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY)

app.post('/api/chat', async (req, res) => {
    try{
        const {prompt} = req.body
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        })
        res.json({output: response.text})

    }catch (err) {
        res.status(500).json({error: err.message})
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 