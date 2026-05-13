
export interface EnvConfig {
  VITE_API_URL: string;
  VITE_APP_NAME: string;
  VITE_FEATURE_FLAG: string;
}

declare global {
  interface Window {
    __ENV: EnvConfig;
  }
}