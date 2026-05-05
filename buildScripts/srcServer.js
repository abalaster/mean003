import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import { connectToDatabase } from '../src/db/connection';
import userRoutes from '../src/routes/userRoutes';

/*eslint-disable no-console*/
const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/about.html'));
});

app.get('/blog', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/blog.html'));
});

app.get('/products', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/products.html'));
});

app.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/profile.html'));
});

app.get('/nav.css', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/nav.css'));
});

connectToDatabase()
  .then(function () {
    app.listen(port, function(err) {
      if (err) {
        console.log(err);
      } else {
        open('http:localhost:' + port)
      }
    });
  })
  .catch(function (err) {
    console.log('MongoDB connection failed, starting server without database:', err.message);
    app.listen(port, function(err) {
      if (err) {
        console.log(err);
      } else {
        open('http:localhost:' + port)
      }
    });
  });
