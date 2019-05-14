require('dotenv').config();

const production = process.env.NODE_ENV === 'production';

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
const MONGO_DEV_URI = 'mongodb://localhost/dpmudra';

module.exports = {
    port: process.env.PORT || 3000,
    cookieSecret: process.env.SECRET_COOKIE || 'dev-cookie',
    sessionSecret: process.env.SECRET_SESSION || 'dev-session',
    mongoURI: production ? MONGO_URI : MONGO_DEV_URI
}