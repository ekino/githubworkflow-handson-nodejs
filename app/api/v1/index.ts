import { Router } from 'express'
import departmentRouter from './departments/index.js'
import employeeRouter from './employees/index.js'
import managerRouter from './managers/index.js'

const router = Router({ mergeParams: true })

router.use('/departments', departmentRouter)
router.use('/employees', employeeRouter)
router.use('/managers', managerRouter)

export default router
