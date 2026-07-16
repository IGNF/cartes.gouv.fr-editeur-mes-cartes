import { defineConfig } from 'orval';

export default defineConfig({
  macarte: {
    output: {
      mode: 'tags-split',
      target: 'src/api',
      schemas: 'src/api/model',
      client: 'react-query',
      baseUrl: {
        runtime: 'env.API_EDITEUR_URL',
        imports: [{ name: 'env', importPath: '../env' }],
      },
      mock: true,
      override: {
        query: {
          usePrefetch: true,
        }
      },
    },
    input: {
      target: './macarte-api.yaml',
    },
  },
});