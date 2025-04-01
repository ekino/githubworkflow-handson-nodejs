import * as ekinoLogger from '@ekino/logger'
import type { NextFunction, Response } from 'express'
import { getUniqueId } from '../../utils/uuid.js'
import type { ApiRequestInfo, ApiRequestQuery, ApiV1Request } from '../definitions.js'

export default (namespace: string) => {
    return (req: ApiV1Request, res: Response, next: NextFunction): void => {
        req.state = (req.state as Record<string, unknown> | undefined) || {}
        req.state.requestTime = Date.now()

        const logRequest = (): void => {
            const time = req.state?.requestTime ?? 0
            const responseTime: number = Date.now() - time

            const requestInfo: ApiRequestInfo = {
                httpVersion: req.httpVersion,
                query: req.query as ApiRequestQuery,
                'content-length': Number.parseInt(res.get('Content-Length') as string),
                req: {
                    url: req.url,
                    method: req.method,
                    headers: req.headers,
                    originalUrl: req.originalUrl,
                },
                res: {
                    statusCode: res.statusCode,
                },
                responseTime,
                timestamp: new Date(time).toISOString(),
            }

            const log = ekinoLogger.createLogger(namespace)

            log.info(
                req.state?.context ? req.state.context.id : getUniqueId(),
                `HTTP ${req.method} ${req.originalUrl || req.url}`,
                requestInfo
            )
        }

        res.on('finish', logRequest)

        next()
    }
}
