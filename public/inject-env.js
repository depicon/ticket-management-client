// public/inject-env.js
window.__ENV = {
  VITE_API_URL: '{{VITE_API_URL}}',
  VITE_APP_NAME: '{{VITE_APP_NAME}}',
  VITE_FEATURE_FLAG: '{{VITE_FEATURE_FLAG}}'
};

// Log pour vérifier que le script est chargé
console.log('✅ inject-env.js chargé, valeurs actuelles:', window.__ENV);