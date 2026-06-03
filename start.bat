@echo off
chcp 65001 >nul
title Myrat Portfolio
cd /d "%~dp0"

echo ============================================
echo    Myrat Daniyarov - Portfolio
echo ============================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
  echo [ERROR] Node.js not found.
  echo Download from: https://nodejs.org
  echo Then run start.bat again.
  echo.
  pause
  exit /b
)

if not exist "node_modules\" (
  echo [SETUP] First run - installing dependencies...
  echo This needs internet and takes ~30 seconds.
  echo.
  call npm install
  if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Install failed. Check your internet connection.
    echo.
    pause
    exit /b
  )
  echo.
)

echo [OK] Starting server at http://localhost:5173
echo Browser will open automatically.
echo Admin panel hotkey: Ctrl + Shift + A
echo To stop: close this window or press Ctrl+C
echo.

call npm run dev

echo.
echo Server stopped.
pause
