/*
 * @copyRight by md sarwar hoshen.
 */
const db = {
  url: process.env.MONGO_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
};

module.exports = db;
