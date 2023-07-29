
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.emit('pronto');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


//rotas    
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrMiddleware } = require('./src/middleware/middleware');

app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.json());
//conteudos staticos
app.use(express.static(path.resolve(__dirname, 'public')));


//session
const sessionOptions = session({
    secret: 'siufhsdufhsidfhsifdsdfuibsbfsidfbsfi65sf1s6df1s6f',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
//Nossos proprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrMiddleware);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log("http://localhost:3000");
    });
});
