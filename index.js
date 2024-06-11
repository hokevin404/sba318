const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
// Middleware to parse data within routes
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello HOMEPAGE!")
})


// Server actively listeing on port 3000
app.listen(PORT, (req, res) => {
    console.log(`Server listening on port: ${PORT}`)
});