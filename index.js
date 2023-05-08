const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
console.log(process.env.URI)
const uri = process.env.URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
     await client.connect();
     console.log("Database Connect Successful")
    }catch(error){
     console.log(error.message)
    }
 } 
 run();

app.get("/", (req, res)=>{
    res.send("Done");
})

const Category = client.db("assignment10").collection("categories");
const Services = client.db("assignment10").collection("services");
const Review = client.db("assignment10").collection("review");
const Blog = client.db("assignment10").collection("blog");
const Slider = client.db("assignment10").collection("slider");
const Contact = client.db("assignment10").collection("contact");

// All Category 
app.get("/category", async (req, res)=>{
    try{
        const cursor = {};
        const result = Category.find(cursor);
        const allResult = await result.toArray();
        res.send({
            data: allResult,
            success: true,
            message: "Successfully find the all data"
        })
       }catch(error){
        res.send({
            data: {},
            success: false, 
            message: error.message
        })
       }
})

// Create Category Data
app.post('/category', async (req, res)=>{
    try{
        const query = req.body;
        const result =await Category.insertOne(query);
        res.send({
            data: result,
            success: true,
            message: "Successfully Created New Category"
        })
    }catch(error){
        res.send({
            data: {},
            success: false, 
            message: error.message
        })
    }
})

// Find Category Data By Category Name
app.get('/category/:name', async (req,res)=>{
    try{
     const cursor = {category_name: req.params.name};
     const result = Category.find(cursor);
     const user = await result.toArray();
     res.send({
         success: true,
         message: "Successfully Find The Data",
         data: user,
     })
    }catch(error){
     res.send({
         success: false, 
         message: error.message
     })
    }
 })


// Services
app.get("/services", async (req, res)=>{
    try{
        const cursor = {};
        const result = Services.find(cursor);
        const allServices = await result.toArray();
        res.send({
            data: allServices,
            success: true,
            message: "Successfully find the all data",
           
        })
       }catch(error){
        res.send({
            data: {},
            success: false, 
            message: error.message,
        })
       }
})

// Create Service Data
app.post('/service', async (req, res)=>{
    try{
        const query = req.body;
        const result =await Services.insertOne(query);
        res.send({
            data: result,
            success: true,
            message: "Successfully Created New Service"
        })
    }catch(error){
        res.send({
            data: {},
            success: false, 
            message: error.message
        })
    }
})

// Find Service Data By Category Id
app.get('/service/:id', async (req,res)=>{
    try{
        console.log(req.params.id)
     const cursor = ObjectId(req.params.id);
     const result = Services.find({_id: cursor});
     const user = await result.toArray();
     res.send({
         success: true,
         message: "Successfully Find The ",
         data: user,
     })
    }catch(error){
     res.send({
         success: false, 
         message: error.message
     })
    }
 })

 //Find Service Data By Category Name
app.get('/service-name/:name', async (req,res)=>{
    console.log(req.params.name)
    try{
        console.log(req.params.name)
     const cursor = {service_name: req.params.name};
     const result = Services.find(cursor);
     const user = await result.toArray();
     res.send({
         success: true,
         message: "Successfully Find The Data",
         data: user,
     })
    }catch(error){
     res.send({
         data: {}, 
         success: false, 
         message: error.message
     })
    }
 })

// All Review
app.get("/review", async (req, res)=>{
    try{
        const cursor = {};
        const result = Review.find(cursor);
        const allUser = await result.toArray();
        res.send({
            data: allUser,
            success: true,
            message: "Successfully find the all data",
           
        })
       }catch(error){
        res.send({
            data: {},
            success: false, 
            message: error.message
        })
       }
})

// Create Review Data
app.post('/review', async (req, res)=>{
    try{
        const query = req.body;
        const result =await Review.insertOne(query);
        res.send({
            data: result,
            success: true,
            message: "Successfully Created New Review"
        })
    }catch(error){
        res.send({
            data: {},
            success: false, 
            message: error.message
        })
    }
})

//Find Review Data By service Name
app.get('/reviews/:name', async (req,res)=>{
    try{
        console.log(req.params.name);
     const cursor = {review_service_name: req.params.name};
     const result = Review.find(cursor);
     const user = await result.toArray();
     res.send({
         success: true,
         message: "Successfully Find The Data",
         data: user,
     })
    }catch(error){
     res.send({
         data: {}, 
         success: false, 
         message: error.message
     })
    }
 })

//Find Review Data By Email
app.get('/reviewemail/:email', async (req,res)=>{
    try{
        console.log(req.params.name);
     const cursor = {email: req.params.email};
     const result = Review.find(cursor);
     const user = await result.toArray();
     res.send({
         success: true,
         message: "Successfully Find The Data",
         data: user,
     })
    }catch(error){
     res.send({
         data: {}, 
         success: false, 
         message: error.message
     })
    }
 })


// All Blog
app.get("/blog", async (req, res)=>{
    try{
        const cursor = {};
        const result = Blog.find(cursor);
        const allUser = await result.toArray();
        res.send({
            data: allUser,
            success: true,
            message: "Successfully find the all data",
           
        })
       }catch(error){
        res.send({
            data: {},
            success: false, 
            message: error.message
        })
       }
})

// Find Blog Data By Blog Id
app.get('/blog/:id', async (req,res)=>{
    try{
     const cursor = {_id: ObjectId(req.params.id)};
     const result = Blog.find(cursor);
     const user = await result.toArray();
     res.send({
         success: true,
         message: "Successfully Find The Data",
         data: user,
     })
    }catch(error){
     res.send({
         success: false, 
         message: error.message
     })
    }
 })
 
 // Find Blog Data By Blog title
app.get('/blogs/:title', async (req,res)=>{
    try{
     const cursor = {title: req.params.title};
     const result = Blog.find(cursor);
     const user = await result.toArray();
     res.send({
         success: true,
         message: "Successfully Find The Data",
         data: user,
     })
    }catch(error){
     res.send({
         success: false, 
         message: error.message
     })
    }
 })
 
 // Create Blog Data
app.post('/blog', async (req, res)=>{
    try{
        const query = req.body;
        const result =await Blog.insertOne(query);
        res.send({
            data: result,
            success: true,
            message: "Successfully Created New Blog"
        })
    }catch(error){
        res.send({
            data: {},
            success: false, 
            message: error.message
        })
    }
})

 // Contact
app.get("/contact", async (req, res)=>{
    try{
        const cursor = {};
        const result = Contact.find(cursor);
        const allContact = await result.toArray();
        res.send({
            data: allContact,
            success: true,
            message: "Successfully find the all Message",
           
        })
       }catch(error){
        res.send({
            data: {},
            success: false, 
            message: error.message,
        })
       }
})

// Find Contact Data By email 
app.get("/contact/:email", async (req, res)=>{
    try{
        const cursor = {};
        const result = Contact.find({email: req.params.email});
        const allContact = await result.toArray();
        res.send({
            data: allContact,
            success: true,
            message: "Successfully find the Message",
           
        })
       }catch(error){
        res.send({
            data: {},
            success: false, 
            message: error.message,
        })
       }
})

// Create Contact Data
app.post('/contact', async (req, res)=>{
    try{
        const query = req.body;
        const result =await Contact.insertOne(query);
        res.send({
            data: result,
            success: true,
            message: "Successfully Send Message"
        })
    }catch(error){
        res.send({
            data: {},
            success: false, 
            message: error.message
        })
    }
})


app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server Running SuccessFull Port", process.env.PORT)
})
