const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())
require('dotenv').config()
app.use(cookieParser())


const uri = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.dwv5efd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db('service-collection')
        const serviceCollection = database.collection('service')

        app.post('/jwt', async(req, res)=>{
            const userEmail = req.body
            console.log(userEmail);

            const token = jwt.sign(userEmail, process.env.AccessToken , {expiresIn: '1h'})


            res.cookie('AccessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            })
            .send({success: true})
        })
    

        app.post('/service', async(req, res)=> {
            const product = req.body
            const result = await serviceCollection.insertOne(product)
            console.log(product);
            res.send(result)
        })
        

        // app.post('/jwt', async (req, res) => {
        //     const user = req.body;
        //     console.log(user);
        //     const token = jwt.sign(user, process.env.AccessToken, { expiresIn: '1h' })

        //     res.cookie('token', token, {
        //         httpOnly: true,
        //         secure: process.env.NODE_ENV === 'production', 
        //         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

        //     })
        //     // .cookie('AccessToken', token, {
        //     //     httpOnly: true,
        //     //     secure: false,
        //     //     sameSite: 'none'
        //     // })

        //     .send({success: true})
        // })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('car doctor server is running')
})

app.listen(port, () => {
    console.log(`port is running ${port}`);
})





















// const uri = `mongodb+srv://${process.env.user}:${process.env.password}@car-doctor.nfnttfm.mongodb.net/?retryWrites=true&w=majority`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection

//         const database = client.db('service-collection')
//         const serviceCollection = database.collection('service')

//         app.post('/jwt', async(req, res)=>{
//             const userEmail = req.body
//             console.log(userEmail);

//             const token = jwt.sign(userEmail, process.env.AccessToken , {expiresIn: '1h'})


//             res.cookie('AccessToken', token, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production', 
//                 sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//             })
//             .send({success: true})
//         })
    

//         app.post('/service', async(req, res)=> {
//             const product = req.body
//             const result = await serviceCollection.insertOne(product)
//             res.send(result)
//         })
        

//         // app.post('/jwt', async (req, res) => {
//         //     const user = req.body;
//         //     console.log(user);
//         //     const token = jwt.sign(user, process.env.AccessToken, { expiresIn: '1h' })

//         //     res.cookie('token', token, {
//         //         httpOnly: true,
//         //         secure: process.env.NODE_ENV === 'production', 
//         //         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

//         //     })
//         //     // .cookie('AccessToken', token, {
//         //     //     httpOnly: true,
//         //     //     secure: false,
//         //     //     sameSite: 'none'
//         //     // })

//         //     .send({success: true})
//         // })



//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);