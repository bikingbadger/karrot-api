import mongoose from 'mongoose';

console.log(process.env);
// The URL should be in the .env file locally or an environment
// variable when hosted in the cloud
const uri = process.env.DB_CONNECT;
console.log('uri', uri);

const dbConnection = mongoose
  .connect(uri, { dbName: 'Karrot' })
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log('DB Connection Error: ', err);
  });

export { dbConnection };
