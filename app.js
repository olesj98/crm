const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// to maintain cors(cross-domain) requests
const cors = require('cors');
// to pretty log requests
const morgan = require('morgan');

const keys = require('./config/keys');

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const categoryRoutes = require('./routes/category');
const analiticsRoutes = require('./routes/analitics');

const app = express();

mongoose.connect(keys.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('MongoDB connected.'))
    .catch((err) => console.log(err));

// dostup do kartynok na priamu (mozna w browseri zagruzyty GET)
app.use('/uploads', express.static('uploads'));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/analitics', analiticsRoutes);


module.exports = app;