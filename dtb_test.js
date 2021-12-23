const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = `mongodb+srv://OmiGA:_Bliblibl0!@cluster0.w2tfo.mongodb.net/node-test?retryWrites=true&w=majority`;
const client = new MongoClient(url);

// Database Name
const dbName = "node-test";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("blogs");

  // the following code examples can be pasted here...

  // insertar documento
  // const insertResult = await collection.insertMany([{ title: "jgañah" }, { resume: "haohi" }, { body: 3 }]);
  // console.log('Inserted documents =>', insertResult);

  // eliminar un documento
  const deleteResult = await collection.deleteMany({ _id: `new ObjectId("61c46828e2ea1904007dc682")` });
  console.log("Deleted documents =>", deleteResult);

  // encontrar todos los documentos
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
