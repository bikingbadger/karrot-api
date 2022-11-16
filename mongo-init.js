db.createUser({
  user: 'karrotadmin',
  pwd: 'karrot123',
  roles: [
    {
      role: 'readWrite',
      db: 'karrotdb',
    },
  ],
});

// Need to actually create the collection or the DB is not created
//db = new Mongo().getDB('yamadb');
db = db.getSiblingDB('karrotdb');

db.createCollection('users', { capped: false });
db.createCollection('chores', { capped: false });
db.createCollection('kids', { capped: false });
