$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Host "Starting KitchenPro from: $ProjectRoot" -ForegroundColor Cyan

function Test-PortInUse {
    param([int]$Port)
    try {
        $Connection = New-Object System.Net.Sockets.TcpClient("127.0.0.1", $Port)
        $Connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

function Wait-ForServer {
    param([string]$ServerName, [int]$Port, [int]$MaxAttempts = 30)
    Write-Host "Waiting for $ServerName on port $Port..." -ForegroundColor Yellow
    $Attempt = 0
    while ($Attempt -lt $MaxAttempts) {
        if (Test-PortInUse -Port $Port) {
            Write-Host "$ServerName is ready!" -ForegroundColor Green
            return $true
        }
        $Attempt++
        Start-Sleep -Seconds 1
    }
    Write-Host "$ServerName failed to start" -ForegroundColor Red
    return $false
}

Write-Host "Checking prerequisites..." -ForegroundColor Cyan
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js not found" -ForegroundColor Red
    exit 1
}
Write-Host "Node.js $(node --version) found" -ForegroundColor Green

Write-Host "Starting services..." -ForegroundColor Cyan
Get-Job | Remove-Job -Force -ErrorAction SilentlyContinue

$BackendJob = Start-Job -ScriptBlock { Push-Location "$using:ProjectRoot\backend"; npm run dev }
$FrontendJob = Start-Job -ScriptBlock { Push-Location "$using:ProjectRoot\frontend"; npm run dev }

Write-Host "Backend Job ID: $($BackendJob.Id)" -ForegroundColor White
Write-Host "Frontend Job ID: $($FrontendJob.Id)" -ForegroundColor White

Wait-ForServer -ServerName "Backend" -Port 5000 | Out-Null
Wait-ForServer -ServerName "Frontend" -Port 5173 | Out-Null

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "KitchenPro Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Login: admin@kitchenpro.local / admin123" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Green

$BackendJob, $FrontendJob | Wait-Job

Write-Host "Shutting down..." -ForegroundColor Yellow
Get-Job | Stop-Job
Get-Job | Remove-Job
Write-Host "Stopped" -ForegroundColor Green
