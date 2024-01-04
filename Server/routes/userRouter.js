import express from 'express'
import { login, signUp } from '../controller/authController.js'
import { addBudget, addExpense, deleteExpense, getExpenses } from '../controller/expenseController.js'
import { verifyUser } from '../middleware/verifyUser.js'

const router = express.Router()


router.post('/signUp',signUp)
router.post('/login', login)

router.use(verifyUser)
router.post('/addExpense',addExpense)
router.post('/deleteExpense/:id',deleteExpense)
router.post('/addBudget',addBudget)


router.get('/getExpense',getExpenses)


export default router