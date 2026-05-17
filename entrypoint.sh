#!/bin/sh
# entrypoint.sh

echo "🚀 Démarrage du conteneur frontend..."

# Remplacer les placeholders par les vraies variables d'environnement
ENV_JS_PATH="/usr/share/nginx/html/inject-env.js"

if [ -f "$ENV_JS_PATH" ]; then
  echo "🔄 Injection des variables d'environnement dans $ENV_JS_PATH..."
  
  # Afficher les valeurs avant injection
  echo "📋 Variables reçues:"
  echo "   VITE_API_URL: ${VITE_API_URL:-'non définie, utilisation défaut'}"
  echo "   VITE_APP_NAME: ${VITE_APP_NAME:-'non définie'}"
  echo "   VITE_FEATURE_FLAG: ${VITE_FEATURE_FLAG:-'non définie'}"
  
  # Remplacer chaque variable
  sed -i "s|{{VITE_API_URL}}|${VITE_API_URL:-/api}|g" $ENV_JS_PATH
  sed -i "s|{{VITE_APP_NAME}}|${VITE_APP_NAME:-Ticket Management}|g" $ENV_JS_PATH
  sed -i "s|{{VITE_FEATURE_FLAG}}|${VITE_FEATURE_FLAG:-false}|g" $ENV_JS_PATH
  
  # Vérifier le résultat
  echo "✅ Variables injectées. Contenu du fichier:"
  cat $ENV_JS_PATH
  
else
  echo "❌ Fichier $ENV_JS_PATH non trouvé!"
fi

# Démarrer nginx
echo "🌐 Démarrage de Nginx..."
nginx -g "daemon off;"