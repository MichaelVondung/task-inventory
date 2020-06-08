// Basic task inventory manager
// Starting date: 2020-05-28 12:40:18
// Based on Get Programming with Node.JS book
// Updated: 2020-06-07 13:37:47

// Done: Todo: Use create for saving new tasks (p.211)
// Done: Redirect to task overview after saving (p.211)
// Done: Wrap tasks into a link with _id so they can be edited/updated later (l. 19.6)
// Todo: Implement http-override module.
// Todo: Considering moving task-related views into a tasks folder.
// Todo: Add res.locals.redirect to tasks-controller for flexible redirects.
// Todo: Add editing/updating and deleting of records.
// Todo: Document the code better.

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
    // useCreateIndex: true,
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
router.get('/tasks', tasksController.showAllTasks);
router.get('/add-task', tasksController.showNewTaskForm);
router.post('/save-task', tasksController.saveNewTaskToDatabase, tasksController.redirectView);
router.get('/tasks/:id', tasksController.showDetails, tasksController.showDetailsView);
router.get('/tasks/:id/edit', tasksController.editDetails);
router.put('/tasks/:id/update', tasksController.updateRecord, tasksController.redirectView);
router.delete('/tasks/:id/delete', tasksController.deleteRecord, tasksController.redirectView);

router.get('/delete-all', tasksController.deleteAllTask);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use('/', router);

app.listen(app.get('port'), () => {
    console.log(`Express server is running at port ${app.get('port')}`);
});
