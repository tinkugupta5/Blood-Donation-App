const express = require('express');

// rest object 
const app = express();

//routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome To Blood Bank App'
    })
})
// http://localhost:8080
//port
const PORT = 8080
// listen

app.listen(PORT, () => {
    console.log('Node Server Running');
})