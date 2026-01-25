# Скрипт для деплоя на GitHub Pages
# Использование: .\scripts\deploy-github-pages.ps1

Write-Host "🚀 Деплой на GitHub Pages" -ForegroundColor Cyan
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
    Write-Host "Установите Git и попробуйте снова." -ForegroundColor Yellow
    exit 1
}

# Проверка наличия npm
try {
    $npmVersion = npm --version
    Write-Host "✅ npm найден: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm не найден!" -ForegroundColor Red
    Write-Host "Установите Node.js и npm." -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Сборка проекта
Write-Host "📦 Сборка проекта..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка при сборке проекта" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Проект собран успешно" -ForegroundColor Green
Write-Host ""

# Переход в папку dist
if (-not (Test-Path "dist")) {
    Write-Host "❌ Папка dist не найдена" -ForegroundColor Red
    exit 1
}

Write-Host "📤 Деплой на GitHub Pages..." -ForegroundColor Cyan

# Сохранение текущей ветки
$currentBranch = git branch --show-current

# Переключение на ветку gh-pages или создание новой
$ghPagesExists = git show-ref --verify --quiet refs/heads/gh-pages
if (-not $ghPagesExists) {
    Write-Host "Создание ветки gh-pages..." -ForegroundColor Cyan
    git checkout --orphan gh-pages
    git rm -rf .
} else {
    Write-Host "Переключение на ветку gh-pages..." -ForegroundColor Cyan
    git checkout gh-pages
    # Удаление всех файлов кроме .git
    Get-ChildItem -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force
}

# Копирование файлов из dist
Write-Host "Копирование файлов из dist..." -ForegroundColor Cyan
Copy-Item -Path "dist\*" -Destination "." -Recurse -Force

# Убеждаемся, что 404.html и .nojekyll на месте
if (Test-Path "public\404.html") {
    Copy-Item -Path "public\404.html" -Destination "404.html" -Force
}
if (Test-Path ".nojekyll") {
    Copy-Item -Path ".nojekyll" -Destination ".nojekyll" -Force
}

# Добавление всех файлов
git add .

# Проверка изменений
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "ℹ️  Нет изменений для коммита" -ForegroundColor Yellow
} else {
    # Создание коммита
    Write-Host "💾 Создание коммита..." -ForegroundColor Cyan
    git commit -m "Deploy to GitHub Pages: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Ошибка при создании коммита" -ForegroundColor Red
        git checkout $currentBranch
        exit 1
    }
    
    # Отправка на GitHub
    Write-Host "🚀 Отправка на GitHub Pages..." -ForegroundColor Cyan
    git push origin gh-pages --force
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Проект успешно задеплоен на GitHub Pages!" -ForegroundColor Green
        Write-Host "🔗 Сайт будет доступен через несколько минут по адресу:" -ForegroundColor Cyan
        Write-Host "   https://a-configurator.github.io/arizona-rp-gear-configurator/" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Ошибка при отправке. Проверьте аутентификацию." -ForegroundColor Red
        git checkout $currentBranch
        exit 1
    }
} else {
    Write-Host "ℹ️  Нет изменений для деплоя" -ForegroundColor Yellow
}

# Возврат на исходную ветку
Write-Host "Возврат на ветку $currentBranch..." -ForegroundColor Cyan
git checkout $currentBranch

Write-Host ""
Write-Host "🎉 Готово!" -ForegroundColor Green
