const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// app.engine('handlebars', exphds());
// app.set('view engine', 'handlebars');

//middlewares

app.use(express.static(path.join(__dirname, '../public')));

app.listen(app.get('port'), () => {
  console.log(`app run on http://localhost:${app.get('port')}`);
});

module.exports = app;
