import express from 'express'
import { Admin_controller } from '../Controllers/AdminController.js';

const router = express.Router()

//profile
router.post('/create-user',Admin_controller.createUser)
router.get('/find_all_orders',Admin_controller.findAllOrders)

//user management



//menu items management

router.post('/add-item',Admin_controller.addItem)





 

export default router;