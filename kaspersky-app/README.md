# Kaspersky Security Console

Краткое тестовое приложение на `React + Vite` для работы с пользователями и группами.

## Что есть

- главная страница
- страница пользователей
- страница групп
- локальный mock API на `json-server`
- тесты на `Vitest`

## Запуск

```bash
npm install
npm run start:fresh
```

Приложение: `http://localhost:5173`  
API: `http://localhost:3001`

## Полезные команды

```bash
npm run dev        # только frontend
npm run api        # только mock API
npm run db:reset   # сброс mock-базы
npm run test       # тесты
npm run lint       # линтер
npm run build      # production build
npm run verify     # lint + test + build
```

## Стек

- React 19
- Vite
- React Router
- CSS Modules
- Framer Motion
- json-server
- Vitest

## Структура

```text
src/components   # общие UI-компоненты
src/pages        # страницы приложения
mock/            # mock-данные
scripts/         # вспомогательные скрипты
```
