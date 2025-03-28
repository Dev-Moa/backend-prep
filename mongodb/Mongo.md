# Mongo db

- What is MongoDB
- MongoDB Important Topics
- Downloading and Installing MongoDB
- MongoDB Collection Information
- MongoDB Inserting Data In Depth
- MongoDB Finding In Depth
- MongoDB Sort, Limit, Skip
- MongoDB Operators
- MongoDB Update Documents
- MongoDB Delete Documents
- What is Mongoose
- Connecting Mongoose
- Mongoose Schema and Model
- Mongoose Creating and Inserting Documents
- Mongoose Retrieving Data
- Mongoose Updating Data
- Mongoose Deleting Data

# What is MongoDB

- Popular open source document oriented db
- uses document storage format called BSON (Binary style JSON document)
- able to handle large amounts of unstructured data in real-time apps
- install mongodb .msi file
- install mongosh .msi file

# MongoDB Important Topics

- A document is a set of key-value pairs that represent single record within a collection in sql we call it a table

- Field is a specific piece of data within a document that holds a value in sql we call it a column

- Collection is a group of related documents that share common structure and are stored in the same database in sql we call them table

- Database is a container for collections of JSON-Like documents


Here’s the revised `.md` file without the separators between topics:

---

# MongoDB Commands

- MongoDB collections store groups of documents. Here are essential commands for managing and retrieving collection information.

- Show all databases:
```js
show dbs
```
Lists all databases on the MongoDB server.

- Show current active database:
```js
db.getName()
```
Displays the name of the currently active database.

- Show all collections:
```js
show collections
```
Lists all collections within the active database.

- Create an empty collection:
```js
db.collectionName.insertOne({})
```
Creates an empty collection by inserting an empty document.

# MongoDB Inserting Data In Depth

- Inserting data into MongoDB collections allows us to add new documents, each containing JSON-like structures.

- Insert a single document:
```js
db.collectionName.insertOne({ "name": "alex", "age": 20 })
```
Adds a document to collectionName with fields name and age.


- Insert many documents

```js
const students = [{ "name": "alex", "age": 20 },{ "name": "david", "age": 30 }]
db.collectionName.insertMany(students)

```

# MongoDB Finding In Depth

- MongoDB’s find() command allows you to query documents in a collection based on specific criteria.

- Retrieve all documents:
```js
db.studentNames.find()
```
Returns all documents in the studentNames collection.

- Find a specific document by field:
```js
db.student.find({ "name": "alex" })
```
Returns documents where the name field is alex.

- Find a document by multiple fields:
```js
db.student.find({ "name": "alex", "age": 20 })
```
Returns documents where name is alex and age is 20.

- Retrieve a specific field only:
```js
db.student.find({ "name": "alex" }, { "name": 1 })
```
Retrieves only the name field for documents where name is alex.

- Exclude a specific field:
```js
db.student.find({ "name": "alex" }, { "name": 0 })
```
Returns all fields except name for documents where name is alex.

- Retrieve specific field across all documents:
```js
db.student.find({}, { "name": 1 })
```
Returns only the name field for all documents in the collection.

# MongoDB Sort, Limit, Skip

- MongoDB allows you to sort, limit, and skip query results, useful for organizing data output.

- Count documents:
```js
db.collectionName.find().count()
```
Returns the total number of documents in collectionName.

- Limit the number of results:
```js
db.collectionName.find().limit(2)
```
Limits the query results to 2 documents.

- Sort in ascending order:
```js
db.collectionName.find({}, { "name": 1 }).sort({ "name": 1 })
```
Sorts documents by name in ascending order.

- Sort in descending order:
```js
db.collectionName.find({}, { "name": 1 }).sort({ "name": -1 })
```
Sorts documents by name in descending order.

- Skip documents in results:
```js
db.collectionName.find({}, { "name": 1 }).sort({ "name": 1 }).skip(1)
```
Sorts by name in ascending order and skips the first document.

# MongoDB Operators

- MongoDB offers various operators to perform conditional queries, making it easier to filter documents based on specific criteria.

- $lt (Less than):
```js
db.collectionName.find({ price: { $lt: 200 } })
```
Finds documents where price is less than 200.

- $gt (Greater than):
```js
db.collectionName.find({ price: { $gt: 200 } })
```
Finds documents where price is greater than 200.

# MongoDB Update Documents

- Updating documents in MongoDB allows you to modify existing data, using operators to control update behavior.

- Update a document with $set:
```js
db.collectionName.updateOne({ "name": "Movie" }, { $set: { "name": "New Movie" } })
```
Changes the name field from Movie to New Movie in one document.

- Increment a field with $inc:
```js
db.collectionName.updateOne({ "name": "count" }, { $inc: { count: 2 } })
```
Increments the count field by 2 in the document where name is count.

- Push a value into an array with $push:
```js
db.friends.updateOne({ "names": ["alex", "john"] }, { $push: { "names": "huxn" } })
```
Adds huxn to the end of the names array in the document where names already contains alex and john.

- Pull a value from an array with $pull:
```js
db.peoples.updateOne({ _id: ObjectId("6499e17d7b0390625e58c20d") }, { $pull: { "p": ["new peoples"] } })
```
Removes new peoples from the p array in the document with the specified _id.

# MongoDB Delete Documents

- MongoDB allows for the deletion of documents individually or in bulk.

- Delete one document by filter:
```js
db.collectionName.deleteOne({ filter: "filtername" })
```
Deletes a single document that matches the specified filter.

- Delete multiple documents by filter:
```js
db.collectionName.deleteMany({ filter: "filtername" })
```
Deletes all documents that match the specified filter criteria.


## What is Mongoose
- Mongoose is an object data modeling library (ODM) for node js and mongodb.
- it manages relationships between  data,provides schema validation and is used to translate between objects in code and the representation of those objects in mongodb.
- mongoose makes it easier to work with mongodb in node js by providing a higher level abstraction layer.

# Why mongoose

- simplifies working with mongodb
- schema definition
- validation
- middleware support

# Connecting Mongoose

- to connect mongoose first lets setup express app with the following packages
- express nodemon dotenv mongoose
- lets create connect file called connect.js in db/connect.js

```js
import { connect } from "mongoose";

const connectDB = async (DB_URL)=>{
    try {
        await connect(DB_URL)
        console.log("connected to DB ...");
    } catch (error) {
        console.log("error",error);
    }
}

export default connectDB

```

```js
import express from "express"
import { configDotenv } from "dotenv";
import connectDB from "./db/connect.js";

configDotenv()
const app = express()
await connectDB(process.env.DB_URL)
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("app is running on port " + PORT);
})

```

# Mongoose schema and Models

- mongoose schema is a blueprint that defines the structure of a document in mongodb database collection.
- it defines the fields,their data types and any additional options such as default values,validation rules and indexes

```js
import mongoose from "mongoose"

const schema = new mongoose.Schema({
    key:type, //shorthand
    keyTwo : {type:string}
})

```
- types

```js
const movieSchema = new mongoose.Schema({
    name : {type:String,required:true,trim:true},
    ratings:{type:Number,required:true,min:1,max:5},
    money:{
        type:mongoose.Decimal128,
        required:true,
        validate:(v)=>v >= 10
    },
    genre:{type:Array},
    isActive:{type:Boolean},
    comments:[
        {value:{type:String},publish : { type:Date,default:Date.now() }}
    ]
})
```
# Modal
- A model is a constructor function that represents a collection in mongodb and defines the schema for each document

```js
import mongoose from "mongoose"

const modelSchema = new mongoose.Schema({
    name : string
})

const model = mongoose.model("Model",modelSchema)

export default model

```
- also Note when ever we create model aka collection it will make it plural for example if we create User collection it will convert to users

# Mongoose Creating and Inserting Documents

```js
// create
import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./db/connect.js";
import movie from "./models/movies.js";

configDotenv();
const app = express();
await connectDB(process.env.DB_URL);
const PORT = process.env.PORT || 3000;

// create
const createDoc = async ()=>{
    try {
        const newMovie = movie.create({
            name:"Extraction 2",
            ratings:3,
            money : 500,
            genre:["Military","Love"],
            isActive:true,
            comments:[{value:"good movie"},{value:"its not that bad movie"}]
        })
        const result = await newMovie.save()
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }
}

createDoc()

app.listen(PORT, () => {
  console.log("app is running on port " + PORT);
});

```

- NOTE : insert Many does not save it does automatically

```js

// create many
const createDocs = async () => {
  try {
    const movieList = [
      {
        name: "Movie 2",
        ratings: 3,
        money: 500,
        genre: ["Military", "Love"],
        isActive: true,
        comments: [
          { value: "good movie" },
          { value: "its not that bad movie" },
        ],
      },
      {
        name:"Kuch kuch hot ai hee",
        ratings:5,
        money:1000,
        genre:["love","comedy"],
        isActive:false,
        comments:[
            {value:"best love movie"},
            {value:"super hit movie"}
        ]
      }
    ];
    // insert many
    try {
        const movies = await movie.insertMany(movieList)
        console.log(JSON.stringify(movies, null, 2));

    } catch (error) {
        console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
};

createDocs();

app.listen(PORT, () => {
  console.log("app is running on port " + PORT);
});

```

# Mongoose Retrieving Data

```js
// find
const find = async () => {
  try {
    const movies = await movie.find() // finds all movies
    const singleMovie = await movie.findById("6728d43ae91b3ec9435e8a16","name") // finds single movie
    const singleMovieBySpecificField = await movie.findById("6728d43ae91b3ec9435e8a16","nam") // finds single movie specific field
    const findMovieByField = await movie.find({name:"Movie 2"}) // finds movie using specific field like name etc
    const findMovieByRating = await movie.find({ratings:5}) // finds movie using specific field like name etc
    const findWithLimit = await movie.find().limit(1) // finds with limited number
    const findWithSkip = await movie.find().skip(1) // finds all movies but skips the first one in the list
    const countDoc = await movie.find().countDocuments() // counts all movies number
    const sortAscending = await movie.find().sort({name : 1}) // sort ascending
    const sortDescending = await movie.find().sort({name : -1}) // sort descending
    const findWithOperatorslt = await movie.find({ratings : {$lt : 4}}) // less than operator
    const findWithOperatorsgt = await movie.find({ratings : {$gt : 4}}) // greater than operator
    console.log(findWithOperatorsgt);
    
  } catch (error) {
    console.log(error);
  }
};

find();

```
# Mongoose update

```js
// update
const update = async () => {
  try {
    const updateOneresult = await movie.updateOne({_id:"6728d43ae91b3ec9435e8a13"},{ratings:5}) // update one
    const updateManyResult = await movie.updateMany({isActive:true},{name:"update Many worked"})
    console.log("update result",updateManyResult);

  } catch (error) {
    console.log(error);
  }
};

update();

```
# Delete

```js
// delete
const delete_ = async () => {
  try {
    const deleteOneresult = await movie.findByIdAndDelete({_id:"6728d43ae91b3ec9435e8a13"}) // delete one
    const deleteManyResult = await movie.deleteMany({ratings:5}) // delete movies with ratings of 5
    console.log("delete many result",deleteManyResult);

  } catch (error) {
    console.log(error);
  }
};

delete_();

```


## Extra : Common Mongo DB commands summarised


### **Database Management**

| Command                  | Description                                                                                            |
|--------------------------|--------------------------------------------------------------------------------------------------------|
| `show dbs`               | Lists all databases on the server.                                                                     |
| `use <databaseName>`     | Switches to the specified database or creates it upon data insertion.                                  |
| `db.stats()`             | Returns statistics about the current database, including size and document count.                      |
| `db.dropDatabase()`      | Deletes the current database and all its data (use with caution).                                      |
| `db.createUser()`        | Adds a user to the database with specific roles and permissions.                                       |
| `db.updateUser()`        | Updates an existing user's roles or permissions.                                                       |
| `db.dropUser()`          | Removes a user from the database.                                                                      |
| `db.getUsers()`          | Lists all users in the current database.                                                               |
| `db.serverStatus()`      | Provides server statistics, useful for monitoring.                                                     |
| `db.shutdownServer()`    | Shuts down the MongoDB server; requires admin privileges.                                              |

### **Collection Management**

| Command                  | Description                                                                                            |
|--------------------------|--------------------------------------------------------------------------------------------------------|
| `show collections`       | Lists all collections in the current database.                                                         |
| `db.createCollection()`  | Creates a new collection with optional configuration.                                                  |
| `db.getCollectionNames()`| Lists all collections in the current database.                                                         |
| `db.renameCollection()`  | Renames a collection.                                                                                  |
| `db.collection.drop()`   | Deletes a collection and all its data.                                                                 |
| `db.collection.stats()`  | Provides statistics about a specific collection, including document count and storage size.           |

### **CRUD Operations**

| Command                  | Description                                                                                            |
|--------------------------|--------------------------------------------------------------------------------------------------------|
| `db.collection.insertOne()`   | Inserts a single document into the collection.                                                   |
| `db.collection.insertMany()`  | Inserts multiple documents into the collection.                                                  |
| `db.collection.find()`        | Retrieves documents matching a query; supports projections and sorting.                          |
| `db.collection.findOne()`     | Retrieves a single document that matches a query.                                               |
| `db.collection.updateOne()`   | Updates a single document based on a filter.                                                     |
| `db.collection.updateMany()`  | Updates multiple documents based on a filter.                                                    |
| `db.collection.replaceOne()`  | Replaces an entire document based on a filter.                                                   |
| `db.collection.deleteOne()`   | Deletes a single document based on a filter.                                                     |
| `db.collection.deleteMany()`  | Deletes multiple documents based on a filter.                                                    |
| `db.collection.findOneAndUpdate()` | Finds and updates a single document and returns it.                                        |
| `db.collection.findOneAndDelete()` | Finds and deletes a single document and returns it.                                         |

### **Aggregation and Query Optimization**

| Command                  | Description                                                                                            |
|--------------------------|--------------------------------------------------------------------------------------------------------|
| `db.collection.aggregate()` | Runs an aggregation pipeline for complex data transformations.                                     |
| `db.collection.countDocuments()` | Counts documents that match a specific query.                                                |
| `db.collection.distinct()` | Finds unique values for a specific field across a collection.                                       |
| `db.collection.explain()` | Provides information on the execution plan of a query, useful for optimization.                     |
| `db.collection.getPlanCache()` | Retrieves cached query plans, allowing analysis and clearing of cached plans.                  |

### **Index Management**

| Command                  | Description                                                                                            |
|--------------------------|--------------------------------------------------------------------------------------------------------|
| `db.collection.createIndex()` | Creates an index on one or more fields.                                                         |
| `db.collection.getIndexes()`  | Returns a list of all indexes in the collection.                                               |
| `db.collection.dropIndex()`   | Drops a specific index from the collection.                                                    |
| `db.collection.dropIndexes()` | Drops all indexes except the `_id` index.                                                      |
| `db.collection.reIndex()`     | Rebuilds all indexes on the collection.                                                        |

### **Bulk Operations**

| Command                        | Description                                                                                        |
|--------------------------------|----------------------------------------------------------------------------------------------------|
| `db.collection.bulkWrite()`    | Executes multiple write operations (insert, update, delete) in bulk for efficiency.              |
| `db.collection.initializeOrderedBulkOp()` | Initializes an ordered bulk operation for performance improvements.              |
| `db.collection.initializeUnorderedBulkOp()` | Initializes an unordered bulk operation, improving performance by ignoring failures. |

### **Administration and Monitoring**

| Command                  | Description                                                                                            |
|--------------------------|--------------------------------------------------------------------------------------------------------|
| `db.currentOp()`         | Lists active operations on the database. Useful for monitoring long-running queries.                   |
| `db.killOp(opId)`        | Terminates an operation based on its operation ID.                                                     |
| `db.collection.stats()`  | Provides storage and document statistics for the collection.                                          |
| `db.collection.latencyStats()` | Displays latency statistics for operations on the collection.                                   |
| `db.collection.storageSize()`  | Shows the allocated storage size for a collection.                                              |
| `db.collection.dataSize()`     | Shows the actual size of the documents in the collection.                                       |

### **Change Streams and Replication**

| Command                  | Description                                                                                            |
|--------------------------|--------------------------------------------------------------------------------------------------------|
| `db.collection.watch()`  | Opens a change stream cursor for tracking real-time changes in a collection.                          |
| `rs.status()`            | Shows the status of the replica set, including member health and synchronization.                     |
| `rs.initiate()`          | Initializes a new replica set configuration.                                                           |
| `rs.add()`               | Adds a new member to the replica set.                                                                  |

### **Backup and Restore**

| Command                  | Description                                                                                            |
|--------------------------|--------------------------------------------------------------------------------------------------------|
| `mongodump`              | Creates a binary backup of the database.                                                               |
| `mongorestore`           | Restores data from a binary backup created by `mongodump`.                                            |
| `mongoexport`            | Exports data from a MongoDB collection to JSON or CSV format.                                         |
| `mongoimport`            | Imports data from JSON or CSV into MongoDB.                                                           |

These commands are frequently used in production for managing databases, optimizing queries, handling large datasets, and monitoring performance, providing administrators with essential tools for effective MongoDB operation.