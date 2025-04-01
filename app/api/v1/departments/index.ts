import * as ekinoLogger from '@ekino/logger'
import type { Response } from 'express'
import { Router } from 'express'
import { getDepartments } from '../../../services/index.js'
import type { ApiV1Request } from '../../definitions.js'
import requestLogger from '../../middlewares/logger.js'

const namespace = 'api:v1:departments'

const router = Router({ mergeParams: true })
const logger = ekinoLogger.createLogger(namespace)

router.get('/', requestLogger(namespace), (_req: ApiV1Request, res: Response): void => {
    try {
        res.status(200).json(getDepartments())
    } catch (error) {
        logger.error('Error while fetching departments', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

export default router
