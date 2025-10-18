Write-Host "Testing Guardian.AI Services..." -ForegroundColor Green

# Test Backend API
Write-Host "`n1. Testing Backend API (Port 3000)..." -ForegroundColor Yellow
try {
    $backend = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Backend API: $($backend.StatusCode) - $($backend.Content)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend API: Failed - $($_.Exception.Message)" -ForegroundColor Red
}

# Test AI Filter Service
Write-Host "`n2. Testing AI Filter Service (Port 8001)..." -ForegroundColor Yellow
try {
    $ai = Invoke-WebRequest -Uri "http://localhost:8001" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ AI Filter: $($ai.StatusCode) - $($ai.Content)" -ForegroundColor Green
} catch {
    Write-Host "❌ AI Filter: Failed - $($_.Exception.Message)" -ForegroundColor Red
}

# Test Web Dashboard
Write-Host "`n3. Testing Web Dashboard (Port 3001)..." -ForegroundColor Yellow
try {
    $web = Invoke-WebRequest -Uri "http://localhost:3001" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Web Dashboard: $($web.StatusCode) - Running" -ForegroundColor Green
} catch {
    Write-Host "❌ Web Dashboard: Failed - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 Service testing complete!" -ForegroundColor Green
Write-Host "`nAccess URLs:" -ForegroundColor Cyan
Write-Host "• Web Dashboard: http://localhost:3001" -ForegroundColor White
Write-Host "• Backend API: http://localhost:3000" -ForegroundColor White
Write-Host "• AI Filter: http://localhost:8001" -ForegroundColor White
Write-Host "• Mobile App: Run 'npx expo start' in mobile-app folder" -ForegroundColor White

