# Скрипт для автоматической загрузки проекта на GitHub
# Использование: .\scripts\upload-to-github.ps1

Write-Host "🚀 Загрузка проекта на GitHub" -ForegroundColor Cyan
Write-Host ""

# Проверка наличия Git
$gitPath = $null
$possiblePaths = @(
    "git",
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\bin\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\bin\git.exe"
)

foreach ($path in $possiblePaths) {
    try {
        $result = Get-Command $path -ErrorAction SilentlyContinue
        if ($result) {
            $gitPath = $path
            break
        }
    } catch {
        continue
    }
}

if (-not $gitPath) {
    Write-Host "❌ Git не найден!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Пожалуйста, установите Git одним из способов:" -ForegroundColor Yellow
    Write-Host "1. Скачайте с официального сайта: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "2. Или установите через winget: winget install --id Git.Git -e --source winget" -ForegroundColor Yellow
    Write-Host "3. Или установите через Chocolatey: choco install git" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "После установки Git:" -ForegroundColor Yellow
    Write-Host "- Перезапустите PowerShell" -ForegroundColor Yellow
    Write-Host "- Запустите этот скрипт снова" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git найден: $gitPath" -ForegroundColor Green
Write-Host ""

# Проверка статуса репозитория
Write-Host "📋 Проверка статуса репозитория..." -ForegroundColor Cyan
$status = & git status --porcelain 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка при проверке статуса Git" -ForegroundColor Red
    Write-Host $status -ForegroundColor Red
    exit 1
}

# Проверка remote
Write-Host "🔗 Проверка настроек remote..." -ForegroundColor Cyan
$remoteUrl = & git remote get-url origin 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Remote 'origin' не настроен. Настраиваю..." -ForegroundColor Yellow
    & git remote add origin https://github.com/A-configurator/arizona-rp-gear-configurator.git
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Ошибка при настройке remote" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Remote настроен" -ForegroundColor Green
} else {
    Write-Host "✅ Remote настроен: $remoteUrl" -ForegroundColor Green
}

Write-Host ""

# Проверка изменений
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "ℹ️  Нет изменений для коммита" -ForegroundColor Yellow
    Write-Host "Проверяю, нужно ли запушить существующие коммиты..." -ForegroundColor Cyan
    
    $localCommits = & git log origin/main..HEAD 2>&1
    if ($LASTEXITCODE -eq 0 -and -not [string]::IsNullOrWhiteSpace($localCommits)) {
        Write-Host "📤 Найдены локальные коммиты для отправки" -ForegroundColor Cyan
        Write-Host "🚀 Отправка на GitHub..." -ForegroundColor Cyan
        & git push origin main
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Проект успешно загружен на GitHub!" -ForegroundColor Green
        } else {
            Write-Host "❌ Ошибка при отправке. Проверьте аутентификацию." -ForegroundColor Red
            Write-Host ""
            Write-Host "Для настройки аутентификации:" -ForegroundColor Yellow
            Write-Host "1. Создайте Personal Access Token: https://github.com/settings/tokens" -ForegroundColor Yellow
            Write-Host "2. При push введите токен вместо пароля" -ForegroundColor Yellow
            exit 1
        }
    } else {
        Write-Host "✅ Все изменения уже на GitHub" -ForegroundColor Green
    }
} else {
    Write-Host "📝 Найдены изменения:" -ForegroundColor Cyan
    Write-Host $status -ForegroundColor Gray
    Write-Host ""
    
    # Добавление всех файлов
    Write-Host "📦 Добавление файлов..." -ForegroundColor Cyan
    & git add .
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Ошибка при добавлении файлов" -ForegroundColor Red
        exit 1
    }
    
    # Создание коммита
    $commitMessage = "Initial commit: Arizona RP Gear Configurator"
    Write-Host "💾 Создание коммита: $commitMessage" -ForegroundColor Cyan
    & git commit -m $commitMessage
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Ошибка при создании коммита" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Коммит создан" -ForegroundColor Green
    Write-Host ""
    
    # Отправка на GitHub
    Write-Host "🚀 Отправка на GitHub..." -ForegroundColor Cyan
    & git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Проект успешно загружен на GitHub!" -ForegroundColor Green
        Write-Host "🔗 Репозиторий: https://github.com/A-configurator/arizona-rp-gear-configurator" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Ошибка при отправке. Проверьте аутентификацию." -ForegroundColor Red
        Write-Host ""
        Write-Host "Для настройки аутентификации:" -ForegroundColor Yellow
        Write-Host "1. Создайте Personal Access Token: https://github.com/settings/tokens" -ForegroundColor Yellow
        Write-Host "   Выберите права: repo (полный доступ к репозиториям)" -ForegroundColor Yellow
        Write-Host "2. При push введите токен вместо пароля" -ForegroundColor Yellow
        Write-Host "3. Windows сохранит его в Credential Manager" -ForegroundColor Yellow
        exit 1
    }
}

Write-Host ""
Write-Host "🎉 Готово! Проект доступен на GitHub." -ForegroundColor Green
