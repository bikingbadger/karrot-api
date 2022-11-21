import mongoose from 'mongoose';

// The URL should be in the .env file locally or an environment
// variable when hosted in the cloud

// DB_CONNECT = mongodb+srv://karrotapi:karrotapi@cluster0.wfbs6m1.mongodb.net/?retryWrites=true&w=majority

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_LOCAL_PORT}/${process.env.DB_NAME}?authMechanism=DEFAULT`;
console.log(`URI: ${uri}`);

const dbConnection = mongoose
  .connect(uri, { dbName: 'karrot' })
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log('DB Connection Error: ', err);
  });

export { dbConnection };
