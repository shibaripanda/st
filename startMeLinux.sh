#!/bin/bash
set -e
cat > .env <<EOF
POSTGRES_DB=$(date +%Y-%m-%d_%H-%M-%S)
POSTGRES_USER=user
POSTGRES_PASSWORD=password
PORT=5050
VITE_SERVER_LINK=http://localhost:5050
EOF
docker compose up --build