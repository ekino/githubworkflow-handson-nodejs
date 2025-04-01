import fs from 'node:fs/promises'
import path from 'node:path'
import type { Department, Employee } from './definitions.js'

let DEPARTMENTS: Department[] = []
let EMPLOYEES: Employee[] = []

export const initData = async (): Promise<void> => {
    try {
        const [employeesData, departmentsData] = await Promise.all([
            fs.readFile(path.resolve('data/employees.json'), 'utf-8'),
            fs.readFile(path.resolve('data/departments.json'), 'utf-8'),
        ])

        DEPARTMENTS = JSON.parse(departmentsData)
        EMPLOYEES = JSON.parse(employeesData)
    } catch (error) {
        throw new Error('Failed to initialize data service')
    }
}

export const getDepartments = (): Department[] => DEPARTMENTS

export const getEmployees = (): Employee[] => EMPLOYEES

export const getManagers = (): Employee[] => EMPLOYEES.filter((employee) => employee.isManager)
