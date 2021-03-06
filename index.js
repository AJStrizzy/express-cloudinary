// Modules
require('dotenv').config()
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const multer = require('multer')
const cloudinary = require('cloudinary')

// App and PORT
const app = express();
const PORT = process.env.PORT || 3000;
const uploads = multer(({ dest: './uploads'}))


// Middleware
app.set('view engine', 'ejs');
app.use(ejsLayouts);


// Routes
app.get('/', function(req, res) {
  res.render('index');
});

// post route
app.post('/', uploads.single('inputFile'), (req, res) => {
  console.log('On POST route')
// Get an input from the user
  let file = req.file.path;

  console.log(req);

  cloudinary.uploader.upload(file, (result) => {
    console.log(result);

    //render result page with image
    // res.render('result', { image: results.url });
  })
})

// Server listening on port
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
