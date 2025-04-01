import type { NextFunction, Response } from 'express'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ApiV1Request } from '../../../../app/api/definitions.js'
import contextMiddleware from '../../../../app/api/middlewares/context.js'
import { ApiHeaders } from '../../../../app/constants.js'
import { getUniqueId } from '../../../../app/utils/uuid.js'

vi.mock('../../../../app/utils/uuid.js', () => ({
    getUniqueId: vi.fn(),
}))

describe('app > api > middlewares > context', () => {
    const mockId = '13b2cf1e-8bb7-412e-becb-68c4734c0827'
    let req: Partial<ApiV1Request>
    let res: Partial<Response>
    const next = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(getUniqueId).mockReturnValue(mockId)
        req = {
            protocol: 'http',
            header: vi.fn().mockReturnValue('localhost:3000'),
            state: {},
        }
        res = {
            set: vi.fn(),
        }
    })

    it('should add unique id and context to req.state and set response header', () => {
        contextMiddleware(req as ApiV1Request, res as Response, next as NextFunction)
        expect(getUniqueId).toHaveBeenCalledOnce()
        expect(req.state).toEqual({
            context: {
                id: mockId,
                hostname: 'localhost:3000',
                protocol: 'http',
            },
        })

        expect(res.set).toHaveBeenCalledWith(ApiHeaders.UniqueId, mockId)
        expect(next).toHaveBeenCalledOnce()
    })
})
