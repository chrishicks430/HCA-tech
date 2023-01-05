/* eslint-disable no-undef */
const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//serve static build files

app.use(express.static(path.join(__dirname, '../build')));

//serve HTML
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

//error 404 handler
app.use((req, res) => {
    res.status(404).send('Sorry, page not found')
  });


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

// eslint-disable-next-line no-undef
module.exports = app;