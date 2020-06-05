// Basic task inventory manager
// Starting date: 2020-05-28 12:40:18
// Based on Get Programming with Node.JS book
// Updated: 2020-06-03 18:01:20

// Todo: Use create for saving new tasks (p.211)
// Todo: Redirect to task overview after saving (p.211)
// Todo: Wrap tasks into a link with _id so they can be edited/updated later (l. 19.6)

const express = require('express'),
    app = express(),
    layouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    homeController = require('./controllers/home-controller'),
    errorController = require('./controllers/error-controller'),
    tasksController = require('./controllers/tasks-controller')
    router = express.Router();

mongoose.connect('mongodb://localhost:27017/task_inventory', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

app.use(homeController.logIncomingRequestsToConsole);
app.use('/', router)

// routes
router.get('/', homeController.showIndexPage);

// database routes
router.get('/tasks', tasksController.showAllTasks);
router.get('/add-task', tasksController.showNewTaskForm);
router.post('/save-task', tasksController.saveNewTaskToDatabase);

router.get('/delete-all', tasksController.deleteAllTask);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get('port'), () => {
    console.log(`Express server is running at port ${app.get('port')}`);
});
