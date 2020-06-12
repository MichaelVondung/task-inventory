// Basic task inventory manager
// Starting date: 2020-05-28 12:40:18
// Based on Get Programming with Node.JS book

// Todo: Considering moving task-related views into a tasks folder.
// Todo: Document the code better.

const version = '0.0.4-RC';
const updated = '2020-06-12 13:55:17'
console.log(`Welcome to Task Inventory v${version}, updated at ${updated}`);

const express = require('express'),
    app = express(),
    layouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    homeController = require('./controllers/home-controller'),
    errorController = require('./controllers/error-controller'),
    tasksController = require('./controllers/tasks-controller'),
    methodOverride = require('method-override'),
    router = express.Router();

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

router.use(layouts);
router.use(express.static('public'));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

router.use(homeController.logIncomingRequestsToConsole);

// routes
router.get('/', homeController.showIndexPage);

// database routes
router.get('/tasks', tasksController.index, tasksController.indexView);
router.get('/tasks/new', tasksController.new);
router.post('/tasks/create', tasksController.create, tasksController.redirectView);
router.get('/tasks/delete-all', tasksController.deleteAllTasks);
router.get('/tasks/:id', tasksController.show, tasksController.showView);
router.get('/tasks/:id/edit', tasksController.edit);
router.put('/tasks/:id/update', tasksController.update, tasksController.redirectView);
router.delete('/tasks/:id/delete', tasksController.delete, tasksController.redirectView);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use('/', router);

app.listen(app.get('port'), () => {
    console.log(`Express server is running at port ${app.get('port')}`);
});
