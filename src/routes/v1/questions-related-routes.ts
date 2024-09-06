import express from 'express'
import { QuestionController } from '../../controllers'
import { isAuthenticated } from '../../middlewares'
const questionController = new QuestionController()
const router = express.Router()

router.get('/', questionController.getAllQues);

export default router