import * as ekinoLogger from '@ekino/logger'
import type { NextFunction, Response } from 'express'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ApiV1Request } from '../../../../app/api/definitions.js'
import loggerMiddleware from '../../../../app/api/middlewares/logger.js'
import { getUniqueId } from '../../../../app/utils/uuid.js'

vi.mock('@ekino/logger', () => ({
    setLevel: vi.fn(),
    setNamespaces: vi.fn(),
    setOutput: vi.fn(),
    createLogger: vi.fn(),
}))
vi.mock('../../../../app/utils/uuid.js', () => ({
    getUniqueId: vi.fn(),
}))

describe('loggerMiddleware', () => {
    const mockId = '13b2cf1e-8bb7-412e-becb-68c4734c0827'
    let req: Partial<ApiV1Request>
    let res: Partial<Response>
    let next: NextFunction
    let logInfoMock = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()

        req = {
            httpVersion: '1.1',
            query: { foo: 'bar' },
            url: '/test',
            method: 'GET',
            headers: { host: 'localhost' },
            originalUrl: '/test',
            state: {},
        }

        res = {
            statusCode: 200,
            get: vi.fn().mockReturnValue('123'),
            set: vi.fn(),
            on: vi.fn((event, listener) => {
                if (event === 'finish') {
                    listener()
                }
                return res as Response
            }),
        }

        next = vi.fn()

        logInfoMock = vi.fn()
        vi.spyOn(ekinoLogger, 'createLogger').mockReturnValue({
            info: logInfoMock,
            trace: vi.fn(),
            debug: vi.fn(),
            warn: vi.fn(),
            error: vi.fn(),
            isLevelEnabled: vi.fn().mockReturnValue(true),
        })

        vi.mocked(getUniqueId).mockReturnValue(mockId)
    })

    it('should log request details after response is finished', () => {
        const middleware = loggerMiddleware('testNamespace')
        middleware(req as ApiV1Request, res as Response, next)

        res.on?.('finish', () => {
            expect(logInfoMock).toHaveBeenCalledWith(
                mockId,
                'HTTP GET /test',
                expect.objectContaining({
                    httpVersion: '1.1',
                    query: { foo: 'bar' },
                    'content-length': 123,
                    req: {
                        url: '/test',
                        method: 'GET',
                        headers: req.headers,
                        originalUrl: '/test',
                    },
                    res: {
                        statusCode: 200,
                    },
                    responseTime: expect.any(Number),
                    timestamp: expect.any(String),
                })
            )
        })

        res.on?.('finish', () => {
            expect(next).toHaveBeenCalled()
        })
    })

    it('should handle missing state.context gracefully', () => {
        req.state = {}

        const middleware = loggerMiddleware('testNamespace')
        middleware(req as ApiV1Request, res as Response, next)

        res.on?.('finish', () => {
            expect(logInfoMock).toHaveBeenCalledWith(mockId, 'HTTP GET /test', expect.anything())
        })
    })
})
