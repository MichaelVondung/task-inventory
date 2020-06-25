// Basic task inventory manager
// Starting date: 2020-05-28 12:40:18
// Based on Get Programming with Node.JS book

// Todo: Considering moving task-related views into a tasks folder.
// Todo: Document the code better.

const version = '0.0.4';
const updated = '2020-06-15 13:37:40';
console.log(`Welcome to Task Inventory v${version}, updated at ${updated}`);

const express = require('express'),
    app = express(),
    router = require('./routes/routes'),
    layouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    expressSession = require('express-session'),
    // cookieParser = require('cookie-parser'), // no longer needed by express-session
    connectFlash = require('connect-flash');
    // homeController = require('./controllers/home-controller'),
    // errorController = require('./controllers/error-controller'),
    // tasksController = require('./controllers/tasks-controller');
    // router = express.Router(); // moved to separate files.

mongoose.connect('mongodb://localhost:27017/task_inventory', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

const db = mongoose.connection;

db.once('open', () => {
    console.log(
        `Successfully connected to MongoDB at ${db.host}:${db.port} - active database: ${db.name}`
    );
});

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(layouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
// router.use(cookieParser('change_this_secret_code'));
app.use(
    expressSession({
        secret: 'change_this_secret_code',
        cookie: { maxAge: 4000000 },
        resave: false,
        saveUninitialized: false,
    })
);
app.use(connectFlash())

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

// router.use(homeController.logIncomingRequestsToConsole);

// routes
// router.get('/', homeController.showIndexPage);

// database routes

app.use('/', router);

app.listen(app.get('port'), () => {
    console.log(`Express server is running at port ${app.get('port')}`);
});
