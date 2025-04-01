import type { IncomingHttpHeaders } from 'node:http'
import type { Request } from 'express'

export type ApiRequestContext = {
    hostname?: string
    id: string
    protocol: string
}

export type ApiV1Request = Request & {
    state?: {
        requestTime?: number
        context?: ApiRequestContext
    }
}

export type ApiRequestQuery = Record<string, string | string[] | undefined>

export type ApiRequestInfo = {
    httpVersion: string
    query?: ApiRequestQuery
    'content-length': number
    req: {
        url: string
        method: string
        headers: IncomingHttpHeaders
        originalUrl: string
    }
    res: {
        statusCode: number
    }
    responseTime: number
    timestamp: string
}
