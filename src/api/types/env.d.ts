// src/types/env.d.ts (recommended for reusability across files)
declare namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      // Add other env vars like PORT, NODE_ENV if needed
    }
  }