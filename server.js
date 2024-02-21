import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
const app = express()
import userRoute from './Routes/UserRouter.js'
import adminController from './Routes/AdminRouter.js'

app.use(cors())
app.use(express.json())
dotenv.config()

try {
    app.listen(5001, () => {
 
        console.log(`server started ${5001}`)
        mongoose.connect(``).then(() => {
            console.log("DataBase connection successfull")
        }).catch((err) => {
            console.log('Connection Error',err)
        })
    })
} catch (error) {
    console.log(error)
}
 
app.use('/admin', adminController)
app.use('/', userRoute) 
    
