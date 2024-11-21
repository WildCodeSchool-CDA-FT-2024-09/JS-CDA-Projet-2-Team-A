import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const { VITE_GRAPHQL_API_URL } = process.env;

const config: CodegenConfig = {
  schema: VITE_GRAPHQL_API_URL,
  documents: ["src/schema/**/*.ts"],
  generates: {
    "src/generated/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
  overwrite: true,
};

export default config;
