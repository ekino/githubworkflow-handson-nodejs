import type { NextFunction, Response } from 'express'
import { ApiHeaders } from '../../constants.js'
import { getUniqueId } from '../../utils/uuid.js'
import type { ApiV1Request } from '../definitions.js'

export default (req: ApiV1Request, res: Response, next: NextFunction): void => {
    const id = getUniqueId()
    req.state = {
        ...req.state,
        context: {
            ...req.state?.context,
            id,
            hostname: req.header(ApiHeaders.Host),
            protocol: req.protocol,
        },
    }
    res.set(ApiHeaders.UniqueId, id)

    next()
}
