import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Department, Employee } from '../../../app/services/definitions.js'
import { getDepartments, getEmployees, getManagers, initData } from '../../../app/services/index.js'

const mockDepartments: Department[] = [
    { id: 1, name: 'Engineering' },
    { id: 2, name: 'Human Resources' },
]

const mockEmployees: Employee[] = [
    { id: 1, name: 'Alice', isManager: true },
    { id: 2, name: 'Bob', isManager: false },
    { id: 3, name: 'Charlie', isManager: true },
]

vi.mock('node:fs/promises')

describe('app > services > index', () => {
    describe('initData', () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        it('should initialize departments and employees data', async () => {
            vi.mocked(fs.readFile)
                .mockResolvedValueOnce(JSON.stringify(mockEmployees))
                .mockResolvedValueOnce(JSON.stringify(mockDepartments))

            await initData()

            expect(getEmployees()).toEqual(mockEmployees)
            expect(getDepartments()).toEqual(mockDepartments)
        })

        it('should throw an error if file read fails', async () => {
            vi.mocked(fs.readFile).mockRejectedValueOnce(new Error('File not found'))

            await expect(initData()).rejects.toThrowError('Failed to initialize data service')
        })
    })

    describe('Data process', () => {
        beforeEach(async () => {
            vi.clearAllMocks()

            vi.mocked(fs.readFile)
                .mockResolvedValueOnce(JSON.stringify(mockEmployees))
                .mockResolvedValueOnce(JSON.stringify(mockDepartments))

            await initData()
        })

        describe('getDepartments', () => {
            it('should return the departments', () => {
                expect(getDepartments()).toEqual(mockDepartments)
            })
        })

        describe('getEmployees', () => {
            it('should return the employees', () => {
                expect(getEmployees()).toEqual(mockEmployees)
            })
        })

        describe('getManagers', () => {
            it('should return only managers from the employees list', () => {
                const expectedManagers = mockEmployees.filter((employee) => employee.isManager)
                expect(getManagers()).toEqual(expectedManagers)
            })
        })
    })
})
