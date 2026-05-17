// hooks/useEnv.js ou useEnv.ts
export const useEnv = () => {
  
  // Pour la production (injecté par Nginx)
  if (typeof window !== 'undefined' && window.__ENV) {
    console.log('🐳 Mode production: utilisation des variables injectées', window.__ENV);
    return window.__ENV;
  }
  
  // Fallback
  console.warn('⚠️ Aucune configuration trouvée, utilisation des valeurs par défaut');
  return {
    VITE_API_URL: '/api',  // Valeur par défaut pour Docker
    VITE_APP_NAME: 'Ticket Management',
    VITE_FEATURE_FLAG: 'false'
  };
};