const app = require('./server');
const conn = require('./conn/conn');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const authMiddleware = require('./middlewares/authMiddleware');
app.get('/user', userController.index);
app.post('/user', userController.store);
app.post('/login', userController.login);
app.get('/admin', authMiddleware, adminController.index);
