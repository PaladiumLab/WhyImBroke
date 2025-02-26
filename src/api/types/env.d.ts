// src/types/env.d.ts (recommended for reusability across files)
declare namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string,
      MONGODB_URI_LOCAL: string,
      VITE_BACKEND_API_URL_LOCAL: string

      // Add other env vars like PORT, NODE_ENV if needed
    }

    interface ImportMetaEnv {
      readonly VITE_BACKEND_API_URL_LOCAL: string;
      // Add other environment variables here
      // readonly VITE_API_KEY: string;
    }

    interface ImportMeta {
      readonly env: ImportMetaEnv;
    }

}