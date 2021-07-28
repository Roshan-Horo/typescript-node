// const MongoClient = require('mongodb')
import { MongoClient} from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
let db:any;

async function connectDB() {
  
  try {
    
  await client.connect()
  console.log('Connected successfully to DB server')
  // db = client.db('tifProject')
  // console.log("db: ",db)
  } catch (error) {
    console.log('Error: ',error)
    process.exit(1)
  }

}

export { connectDB,client }



// import mongoose from 'mongoose'

// const connectDB = async () => {
//     try{
//       const conn = await mongoose.connect(process.env.MONGO_URI,{
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useCreateIndex: true
//       })

//       console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline)
//     }catch(err){
//        console.error(`Error: ${err.message}`.red.underline.bold)
//        process.exit(1)
//     }
// }

// export default connectDB

