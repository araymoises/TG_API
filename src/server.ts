import express from 'express'
import mongoose from 'mongoose'

import environment from './config/environment'
import routes from './loaders/routes'
import middlewares from './loaders/middlewares'
import serveIndex from 'serve-index'

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
  }
  config() {
    // * DB connection
    console.log(environment.MONGODB_URI);
    mongoose.set('useFindAndModify', true);
    mongoose.connect(environment.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }).then(db => console.log('DB connected'))

    // * Port
    this.app.set('port', environment.PORT);
    // * Middlewares
    middlewares(this.app);
    // * Routes
    this.app.use('/', routes());
    this.app.use('/assets', express.static('assets'));
    this.app.use('/font-awesome', express.static('node_modules/@fortawesome/fontawesome-free'));
    this.app.use('/.well-known', express.static('.well-known'), serveIndex('.well-known'));
    this.app.get('/invitation/:encryptedData', (req, res) => {
      res.set('Content-Type', 'text/html');
      res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <title>Sample Site</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <style>
            body {
              padding-top: 50px;
            }
        </style>
      </head>

      <body>

        <div class="container">
            <div class="jumbotron">
              <h1>Invitación a AR Classroom</h1>
              <p><a href="app://arclassroom.app/studentInvitation/${req.params?.encryptedData}">Aceptar Invitacion</a></p>
            </div>
        </div>

      </body>

      </html>
      `);
    });

  }
  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'))
    })
  }
}

const server = new Server()
server.start()


