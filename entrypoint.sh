#!/bin/sh
# entrypoint.sh

# Remplacer les placeholders par les vraies variables d'environnement
ENV_JS_PATH="/usr/share/nginx/html/inject-env.js"

if [ -f "$ENV_JS_PATH" ]; then
  echo "🔄 Injection des variables d'environnement..."
  
  # Remplacer chaque variable
  sed -i "s|{{VITE_API_URL}}|${VITE_API_URL:-http://localhost:3000}|g" $ENV_JS_PATH
  sed -i "s|{{VITE_APP_NAME}}|${VITE_APP_NAME:-MyApp}|g" $ENV_JS_PATH
  sed -i "s|{{VITE_FEATURE_FLAG}}|${VITE_FEATURE_FLAG:-false}|g" $ENV_JS_PATH
  
  echo "✅ Variables injectées"
fi

# Démarrer nginx
nginx -g "daemon off;"