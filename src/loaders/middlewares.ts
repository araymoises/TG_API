import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import jsend from 'jsend'
import multer from 'multer'


export default (app) => {
    app.use(morgan('dev'))
    app.use(helmet())
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(compression())
    app.use(jsend.middleware)
    
};