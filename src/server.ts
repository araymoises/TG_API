import express from 'express'
import mongoose from 'mongoose'

import environment from './config/environment'
import routes from './loaders/routes'
import middlewares from './loaders/middlewares'

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
            useNewUrlParser   : true,
            useUnifiedTopology: true,
            useCreateIndex    : true,
            useFindAndModify  : false
        }).then(db => console.log('DB connected'))
    
        // * Port
        this.app.set('port', environment.PORT);
        // * Middlewares
        middlewares(this.app);
        // * Routes
		this.app.use('/', routes());
		this.app.use('/assets', express.static('assets'));
		this.app.use('/font-awesome', express.static('node_modules/@fortawesome/fontawesome-free'));
    }   
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'))
        })
    }
}

const server = new Server()
server.start()


