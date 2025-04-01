import * as ekinoConfig from '@ekino/config'
import { type OutputAdapter, setLevel, setOutput } from '@ekino/logger'
import type { Log } from '@ekino/logger'
import {
    type MockInstance,
    afterAll,
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest'
import { ApiHeaders } from '../../../app/constants.js'
import { setupLogger } from '../../../app/utils/logger.js'

vi.mock('@ekino/config', () => ({
    get: vi.fn(),
}))

vi.mock('@ekino/logger', () => ({
    setLevel: vi.fn(),
    setNamespaces: vi.fn(),
    setOutput: vi.fn(),
}))

describe('setupLogger', () => {
    let log: Log
    let stdoutWriteSpy: MockInstance<{
        (buffer: Uint8Array | string, cb?: (err?: Error) => void): boolean
        (str: Uint8Array | string, encoding?: BufferEncoding, cb?: (err?: Error) => void): boolean
    }>

    beforeEach(() => {
        vi.clearAllMocks()
        stdoutWriteSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true)
        log = {
            contextId: '12345',
            level: 'info',
            time: new Date(),
            namespace: 'testNamespace',
            meta: { key: 'value' },
            message: 'Test message',
            data: { dataKey: 'dataValue' },
        }
    })

    afterEach(() => {
        vi.clearAllMocks()
    })
    afterAll(() => {
        vi.restoreAllMocks()
    })

    it('should set the logger level, namespaces, and output', () => {
        vi.mocked(ekinoConfig.get).mockImplementationOnce(() => 'debug')
        vi.mocked(ekinoConfig.get).mockImplementationOnce(() => 'namespace1,namespace2')

        setupLogger()

        expect(setLevel).toHaveBeenCalledWith('debug')
        expect(setOutput).toHaveBeenCalledWith(expect.any(Function))

        const jsonOutputFn = vi.mocked(setOutput).mock.calls[0]?.[0] as OutputAdapter
        jsonOutputFn(log)

        const expectedOutput = {
            [ApiHeaders.UniqueId]: log.contextId,
            level: log.level,
            timestamp: log.time.toISOString(),
            namespace: log.namespace,
            ...log.meta,
            message: log.message,
            ...log.data,
        }

        expect(stdoutWriteSpy).toHaveBeenCalledWith(`${JSON.stringify(expectedOutput)}\n`)
    })
})
