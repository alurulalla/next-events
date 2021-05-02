import { MongoClient } from 'mongodb';

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb://lalla:sairam@cluster0-shard-00-00.0ajph.mongodb.net:27017,cluster0-shard-00-01.0ajph.mongodb.net:27017,cluster0-shard-00-02.0ajph.mongodb.net:27017/events?ssl=true&replicaSet=atlas-7y2n4b-shard-0&authSource=admin&retryWrites=true&w=majority'
  );

  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();

  return await db.collection(collection).insertOne({
    ...document,
  });
};

export const getDocuments = async (client, collection, findBy) => {
  const db = client.db();
  const documentList = await db
    .collection(collection)
    .find({ eventId: findBy })
    .sort({ _id: -1 })
    .toArray();
  return documentList;
};
