const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const multer = require('multer');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const sess = 
{
    secret: process.env.secret,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({db: sequelize})
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

const upload = multer
({
    limits:
    {
        fileSize: 5000000
    },
    fileFilter(req, file, cb)
    {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        {
            return cb( new Error(`Please upload a valid image file.`));
        }
        cb(undefined, true);
    }
});

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() =>
{
    app.listen(PORT, () => console.log('Now listening!'));
});