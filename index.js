const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import files from data directory
const users = require('./data/users.js');
const posts = require('./data/posts.js');

// MIDDLEWARE----------------------------------------------------------------------------
// Body parser middleware
// Middleware to parse data within routes
// parsed data located in "req.body"
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// New logging middleware to help us keep track of
// requests during testing!
app.use((req, res, next) => {
    const time = new Date();
  
    console.log(
      `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
      console.log('Containing the data:');
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
});
//---------------------------------------------------------------------------------------

// GET route to get all user data
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET route to get user by id
app.get('/api/users/:id', (req, res) => {
    const user = users.find((u) => 
        u.id == req.params.id
    );

    if(user)
        res.json(user);
});

// GET route for default root
app.get('/', (req, res) => {
    res.send("Hello HOMEPAGE!")
})

// The only way this middlware runs is if a route handler 
// function runs the "next()" function
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Resource Not Found' });
  });

// Server actively listeing on port 3000
app.listen(PORT, (req, res) => {
    console.log(`Server listening on port: ${PORT}`)
});