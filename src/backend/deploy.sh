#!/bin/bash

echo "🚀 Total Faith Network one-click deploy starting..."

# Ensure Node.js and npm installed
if ! [ -x "$(command -v node)" ]; then
  echo "⚠️ Node.js not found. Installing..."
  sudo apt update
  sudo apt install -y nodejs npm
fi

# Ensure cloudflared installed
if ! [ -x "$(command -v cloudflared)" ]; then
  echo "⚠️ cloudflared not found. Installing..."
  wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
  sudo dpkg -i cloudflared-linux-amd64.deb
fi

# Define backend directory
PROJECT_ROOT="/mnt/c/Users/Junaet Mahbub/Desktop/Github/TotalFaithNetwork"
BACKEND_DIR="$PROJECT_ROOT/src/backend"

# Backend install
if [ -d "$BACKEND_DIR" ]; then
  echo "📦 Installing backend dependencies..."
  cd "$BACKEND_DIR"
  npm install
else
  echo "❌ Backend directory not found at $BACKEND_DIR"
  exit 1
fi

# Ensure backend binds to 0.0.0.0
if ! grep -q "0.0.0.0" "$BACKEND_DIR/server.js"; then
  echo "⚠️ Ensure your server.js binds to 0.0.0.0"
fi

# Kill any running backend
echo "🔪 Killing old backend processes..."
pkill -f "node server.js" || true

# Start backend server
echo "⚡ Starting backend server..."
nohup node "$BACKEND_DIR/server.js" > backend.log 2>&1 &

# Launch Cloudflare Tunnel on port 5000
echo "🌐 Starting Cloudflare Tunnel (port 5000, backend + frontend served)..."
cloudflared tunnel --url http://localhost:5000
