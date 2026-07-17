import { defineConfig } from 'orval';

export default defineConfig({
  macarte: {
    output: {
      mode: 'tags-split',
      target: 'src/api',
      schemas: {
        path: 'src/api/model',
        splitByTags: true,
      },
      tsconfig: './tsconfig.json',
      formatter: 'prettier',
      client: 'react-query',
      baseUrl: {
        runtime: 'env.API_EDITEUR_URL',
        imports: [{ name: 'env', importPath: '../env' }],
      },
      mock: true,
      override: {
        query: {
          useMutation: false,
          useQuery: true,
          usePrefetch: true,
        },
        mutator: {
          path: 'src/api/fetchWithAuth.ts',
          name: 'fetchWithAuth',
        },
      },
      headers: true,
    },
    input: {
      target: './macarte-api.yaml',
    },
  },
});