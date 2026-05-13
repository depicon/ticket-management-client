export const useEnv = () => {
  return window.__ENV || {
    VITE_API_URL: import.meta.env.VITE_API_URL || '',
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME || '',
    VITE_FEATURE_FLAG: import.meta.env.VITE_FEATURE_FLAG || ''
  };
};