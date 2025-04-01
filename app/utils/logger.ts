import * as ekinoConfig from '@ekino/config'
import { setLevel, setNamespaces, setOutput } from '@ekino/logger'
import type { Log } from '@ekino/logger'
import { ApiHeaders } from '../constants.js'

export const setupLogger = (): void => {
    setLevel(ekinoConfig.get('Logger.level'))
    setNamespaces(ekinoConfig.get('Logger.namespaces'))
    setOutput(jsonOutput)
}

const jsonOutput = (log: Log): void => {
    const output = {
        [ApiHeaders.UniqueId]: log.contextId,
        level: log.level,
        timestamp: log.time.toISOString(),
        namespace: log.namespace,
        ...log.meta,
        message: log.message,
        ...log.data,
    }

    const result = JSON.stringify(output)
    process.stdout.write(`${result}\n`)
}
