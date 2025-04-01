import * as ekinoConfig from '@ekino/config'
import Logger from '@ekino/logger'
import app from './app.js'

const log = Logger.createLogger('api:server')

const PORT = ekinoConfig.get('Port') || 3030

app.listen(PORT, () => {
    log.info(`Server is running on http://localhost:${PORT}`)
})
