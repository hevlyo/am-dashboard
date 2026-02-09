import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTanstackQuery } from '@kubb/swagger-tanstack-query'
import { pluginTs } from '@kubb/swagger-ts'
import { pluginZod } from '@kubb/swagger-zod'
import { pluginClient } from '@kubb/swagger-client'

export default defineConfig(() => {
  return {
    root: '.',
    input: {
      path: '../../apps/swagger.json',
    },
    output: {
      path: './src/gen',
      clean: true,
    },
    plugins: [
      pluginOas({
        validate: process.env.CI === 'true',
      }),
      pluginTs(),
      pluginClient({
        output: {
          path: './clients',
        },
        client: {
          importPath: '../../client',
        },
      }),
      pluginZod({
        output: {
          path: './zod',
        },
      }),
      pluginTanstackQuery({
        output: {
          path: './hooks',
        },
        framework: 'react',
        client: {
          importPath: '../../client',
        },
      }),
    ],
  }
})
