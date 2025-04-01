import { createServer } from 'node:http'
import nock from 'nock'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import app from '../../app/app.js'

describe('API routes', () => {
    let server: ReturnType<typeof createServer>
    const PORT = 3131

    beforeEach(() => {
        server = createServer(app)
        server.listen(PORT)
    })

    afterEach(() => {
        nock.cleanAll()
        server.close()
    })

    it('should return the departments', async () => {
        nock('http://localhost:3131')
            .get('/api/v1/departments')
            .reply(200, { departments: ['Engineering', 'Sales', 'HR'] })

        const response = await fetch('http://localhost:3131/api/v1/departments')
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data).toEqual({ departments: ['Engineering', 'Sales', 'HR'] })
    })

    it('should return the employees', async () => {
        nock('http://localhost:3131')
            .get('/api/v1/employees')
            .reply(200, { employees: ['Alice', 'Bob', 'Charlie'] })

        const response = await fetch('http://localhost:3131/api/v1/employees')
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data).toEqual({ employees: ['Alice', 'Bob', 'Charlie'] })
    })

    it('should return the managers', async () => {
        nock('http://localhost:3131')
            .get('/api/v1/managers')
            .reply(200, { employees: ['Alice', 'Bob', 'Charlie'] })

        const response = await fetch('http://localhost:3131/api/v1/managers')
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data).toEqual({ employees: ['Alice', 'Bob', 'Charlie'] })
    })
})
