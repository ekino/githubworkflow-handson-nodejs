import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['tests/**'],
        coverage: {
            reporter: ['lcov', 'cobertura', 'text'],
            include: ['app/**'],
            exclude: [
                'app/types/**',
                'app/**/definitions.ts',
                'app/api/v1/*',
                'app/app.ts',
                'app/server.ts',
            ],
        },
    },
    esbuild: {
        target: 'esnext',
        format: 'esm',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        conditions: ['import', 'module', 'default'],
    },
})
