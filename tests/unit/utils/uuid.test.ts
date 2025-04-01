import { describe, expect, it } from 'vitest'
import { getUniqueId } from '../../../app/utils/uuid.js'

describe('app > utils > uuid', () => {
    describe('getUniqueId', () => {
        it('should return uuid match the pattern', () => {
            expect(getUniqueId()).toMatch(
                /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
            )
        })
    })
})
