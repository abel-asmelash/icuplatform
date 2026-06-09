import mongoose, {Mongoose} from 'mongoose';
const MONGODB_URI = preprocess.env.MONGODB_URI as string;
if (!MONGODB_URI){
 throw new Error ("MONGODB_URI is not defined")

}

interface MongooseCache {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
}

declare global {
    var mongoose: MongooseCache
}
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = {conn: null, promise:null}
}
const dbConnect: Promise<Mongoose> = async () => {
  if (cached.conn){
    return cached.conn
  }
  if (!cached.promise){
  cached.promise = mongoose
  .connect (MONGODB_URI, {dbName: "icu-forum"})
  .then((result) =>{
    console.log("Connected to MongoDB")
    return result
  })
  .cached((error) => {
    console.error("Error connecting to MongoDB", error)
    throw error;
  })
  }
  cached.conn = await cached.promise;
  return cached.conn
}
export default dbConnect