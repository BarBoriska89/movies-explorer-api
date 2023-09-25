const { JWT_SECRET = 'bigsecret' } = process.env;
const { DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const { PORT = 3000 } = process.env;
module.exports = { JWT_SECRET, DB, PORT };
