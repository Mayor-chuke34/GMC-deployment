require('dotenv').config(); // Load environment variables from .env file

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose'); // MongoDB ODM

var app = express();

// 1. MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully!'))
.catch(err => console.error('MongoDB connection error:', err.message));

// View engine setup (optional, you might not need pug if only serving React)
app.set('views', path.join(__dirname, 'views')); // Assuming 'views' directory exists for error pages
app.set('view engine', 'pug'); // You can remove or change this if not using server-side rendering for non-React views

// PORT setting
const PORT = process.env.PORT || 5000;
app.set('port', PORT);
console.log(`Server starting on port: ${app.get('port')}`); // Improved log

app.use(logger('dev'));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded
app.use(cookieParser());

// 2. API Routes
// Create a 'routes' directory and an 'api.js' file within it
var apiRouter = require('./routes/api');
app.use('/api', apiRouter); // Mount API routes under /api prefix

// 3. Serve Static Files (React build) and Handle React Router Fallback
// This block MUST be placed AFTER all your API routes.
// Otherwise, requests for your API (e.g., /api/data) might try to serve index.html instead.
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, 'public')));

    // Handles any requests that don't match our API routes or static files,
    // and serves the React app's index.html for client-side routing.
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });
}

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error'); // If you are using 'pug' for error pages
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;