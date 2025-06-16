const express = require('express');
const app = express();
const path = require('path');
const PORT = 8081;

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
  
});


app.get('/about', (req,res) => {
    res.sendFile(path.join(__dirname+'/about.html'));
   
  });

app.listen(PORT, '0.0.0.0', () => { // Added '0.0.0.0' for explicit binding
    console.log(`Node.js app listening at http://0.0.0.0:${PORT}`);
});
