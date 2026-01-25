# Инструкция по деплою на GitHub Pages

## Проблема: белый экран

Проблема была в неправильной настройке base path для GitHub Pages. Исправления уже внесены:

1. ✅ `vite.config.ts` - base path изменен на `/arizona-rp-gear-configurator/`
2. ✅ `src/App.tsx` - добавлен basename в BrowserRouter
3. ✅ `public/404.html` - создан файл для редиректа SPA

## Настройка GitHub Pages

### Вариант 1: Использование ветки gh-pages (рекомендуется)

1. Перейдите в настройки репозитория: https://github.com/A-configurator/arizona-rp-gear-configurator/settings/pages
2. В разделе "Source" выберите:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Нажмите "Save"

### Вариант 2: Использование GitHub Actions (автоматический деплой)

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Ручной деплой

Если нужно задеплоить вручную:

```powershell
# 1. Соберите проект
npm run build

# 2. Запустите скрипт деплоя
.\scripts\deploy-github-pages.ps1
```

Или используйте более простой метод:

```powershell
# 1. Соберите проект
npm run build

# 2. Переключитесь на gh-pages
git checkout --orphan gh-pages
git rm -rf .

# 3. Скопируйте файлы из dist
Copy-Item -Path "dist\*" -Destination "." -Recurse -Force
Copy-Item -Path "public\404.html" -Destination "404.html" -Force
Copy-Item -Path ".nojekyll" -Destination ".nojekyll" -Force

# 4. Закоммитьте и отправьте
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force

# 5. Вернитесь на main
git checkout main
```

## Проверка

После деплоя сайт будет доступен по адресу:
https://a-configurator.github.io/arizona-rp-gear-configurator/

**Важно**: Подождите 1-2 минуты после деплоя, чтобы GitHub Pages обновился.

## Если сайт все еще не работает

1. Проверьте консоль браузера (F12) на наличие ошибок
2. Убедитесь, что base path в `vite.config.ts` соответствует имени репозитория
3. Проверьте, что файл `404.html` находится в корне ветки gh-pages
4. Убедитесь, что файл `.nojekyll` присутствует
