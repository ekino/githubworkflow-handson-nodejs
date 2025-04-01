import express from 'express'
import appRouters from './api/v1/index.js'
import { initData } from './services/index.js'
import { setupLogger } from './utils/logger.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

setupLogger()
initData()

app.use('/api/v1', appRouters)
app.get('/', (_req, res) => {
    res.send(`
        <h1>API</h1>
        <ul>
            <li><a href="/api/v1/departments">Departments</a></li>
            <li><a href="/api/v1/employees">Employees</a></li>
            <li><a href="/api/v1/managers">Managers</a></li>
        </ul>
    `)
})

export default app
