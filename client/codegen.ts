import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../server/schema.gql",
  documents: "**/*.ts",
  ignoreNoDocuments: true,
  generates: {
    "gql/": {
      schema: "./graphql/client-schema.graphql",
      preset: "client",
      presetConfig: {
        // чтобы фрагменты встраивались в типы без указания на то, что они фрагменты
        fragmentMasking: false,
      },
    },
  },
};

export default config;
