@echo off
setlocal ENABLEDELAYEDEXPANSION

REM Генерация текущей даты-времени
for /f %%i in ('powershell -Command "Get-Date -Format yyyy-MM-dd_HH-mm-ss"') do set DATESTAMP=%%i

echo POSTGRES_DB=%DATESTAMP%> .env
echo POSTGRES_USER=user>> .env
echo POSTGRES_PASSWORD=password>> .env
echo PORT=5050>> .env
echo VITE_SERVER_LINK=http://localhost:5050>> .env

docker compose up --build

pause