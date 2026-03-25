import express from 'express'
import {
  getPerformances,
  getPerformanceById,
  createPerformance,
  updatePerformance,
  deletePerformance,
} from '../controllers/performanceController.js'

const router = express.Router()

router.get('/',       getPerformances)
router.get('/:id',    getPerformanceById)
router.post('/',      createPerformance)
router.put('/:id',    updatePerformance)
router.delete('/:id', deletePerformance)

export default router