const express = require('express');
const app = express();
const cors = require('cors')
const Blog = require('./models/blogmodel.js');
const db = require('./utils/connectMongo.js');
require('./utils/connectMongo.js')


const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
]
const corsOptions ={
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else (
            callback(new Error('Not allowed by CORS'))
        )
    },
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
};

db
// Middleware
app.use(express.json());

app.use(cors(corsOptions));

app.use(express.json())

app.post('/create', async (req, res) => {
    console.log(req.body)
    try {
        const blog = await Blog.create({
            title: req.body.title,
            body: req.body.body,
            author: req.body.author
        })
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', error: 'Duplicate error' })
    }
})
app.get('/blogs', async (req, res) => {
    try {
        const allBlogs = await Blog.find({})
        res.json(allBlogs) 
    } catch (error) {
        console.log(error)
    }
})

app.get('/blogdetails/:title', async (req, res) => {
    try {
        const title = req.params.title
        const blog = await Blog.findOne({title:title})
        res.json(blog)
 
    } catch (error) {
        console.log(error)
    }
})
app.delete('/blogdetails/:title', async (req, res) => {
    try {
        const title = req.params.title
        await Blog.findOneAndDelete({title:title})
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error' })
        console.log(error)
    }
})

app.listen(4000, () => {
    console.log('server is running');
})