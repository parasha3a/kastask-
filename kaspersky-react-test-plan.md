# План реализации тестового задания Kaspersky — React

## Цель

Сделать React-приложение с 3 роутами, которое выделяется среди других кандидатов за счёт архитектурной зрелости, UX-полировки и сильного README:

- приветственная страница;
- страница списка пользователей (UI спроектирован вручную);
- страница групп пользователей (UI спроектирован с помощью LLM).

Решение должно показать:

- умение спроектировать UI вручную для страницы пользователей;
- умение использовать LLM для генерации UI страницы групп;
- аккуратную работу с данными, сортировкой, поиском и CRUD-операциями;
- внимание к производительности, accessibility и документации проекта;
- чистый, читаемый JavaScript с JSDoc-аннотациями для ключевых структур.

---

## Конкурсная стратегия

Нужно держать две оси одновременно:

- **Инженерный максимум**: аккуратная архитектура, предсказуемые хуки, тесты, a11y, error states, profiling, хороший README, детерминированные данные.
- **Конкурсная оптимальность**: проверяющий должен за 2-3 минуты увидеть, что все пункты ТЗ выполнены, а различие между manual UI и LLM UI не вызывает сомнений.

Правило приоритетов:

1. Точное покрытие ТЗ.
2. Видимые UX-дифференциаторы.
3. Доказательства в репозитории: README, скриншоты, prompt log, тесты, git-история.
4. Продвинутые технологии только если не создают риск срыва сроков.

Это не отменяет инженерный максимум, а задаёт порядок принятия решений: shipping quality важнее технологического эго.

## Трассировка требований ТЗ

| Пункт ТЗ | Решение в проекте | Как это будет доказано |
|---|---|---|
| 3 роута | `/`, `/users`, `/groups`, плюс `404` | router-конфиг, тесты роутов, GIF/скриншоты в README |
| Список пользователей в виде таблицы | Семантическая `<table>` с чекбоксами, сортировкой и поиском | скриншот users page, RTL-тесты, `aria-sort` |
| Поиск, добавление, удаление | `useUsers` + модалка + delayed delete + undo toast | интеграционные тесты, demo checklist в README |
| Производительность поиска и сортировки | derived state, `useDeferredValue`, profiling note | отдельный раздел README с объяснением trade-offs |
| Users page без LLM | ручное проектирование таблицы и UX | `docs/manual-ui-decisions.md` + поэтапная git-история |
| Groups page через LLM | отдельный UI-поток для карточек групп | `docs/llm-prompts.md`, скриншоты, README section |
| README в корне | полный `README.md` с запуском, логикой и выводами | корневой README |
| Публикация на GitHub и Word-файл со ссылкой | финальный submission step | отдельный раздел плана "Пакет сдачи" |

---

## Стек

| Технология | Назначение |
|-----------|-----------|
| React 19 + JavaScript | UI |
| Vite + `babel-plugin-react-compiler` | Сборка + автоматическая мемоизация (через `@vitejs/plugin-react` babel config) |
| `react-router` v7 + `react-router/dom` | Роутинг: `createBrowserRouter` импортируется из `react-router`, `RouterProvider` — из `react-router/dom` |
| `json-server@0.17.4` | Mock HTTP API (⚠️ v1.0 — бета с breaking changes, пинить 0.17.4) |
| Vitest + React Testing Library + MSW v2 | Тесты + мокирование API (`http`/`HttpResponse` из `msw`, сервер из `msw/node`) |
| `jest-axe` + `expect.extend()` | Accessibility тесты (vitest-axe устарел, jest-axe работает с Vitest) |
| ESLint (`react-hooks`, `jsx-a11y`, `eslint-plugin-react-compiler`) | Качество кода + проверка совместимости с компилятором |
| CSS Modules (SCSS) + `sass` devDep | Стили (Vite поддерживает .module.scss, но `sass` нужен отдельно) |
| concurrently | Одновременный запуск Vite + json-server |

## Почему такой стек

- **Vite** — минимальный технический шум для тестового задания.
- **React Router** — закрывает требование по 3 роутам без лишней архитектурной сложности.
- **json-server** — честно имитирует сервер и позволяет показать добавление/удаление через HTTP (лучше, чем статический JSON-импорт).
- **MSW** — тестирует полный цикл запросов (а не мокает fetch напрямую).
- **CSS Modules** — ручная вёрстка демонстрирует самостоятельное UI-проектирование лучше, чем готовые UI-kit.
- **Не используем Redux/Zustand** — для этого scope достаточно useState + custom hooks (упомянуть в README).
- **Не используем TanStack Query** — задание проверяет умение работать с fetch руками (упомянуть как production-альтернативу в README).
- **React Compiler** оставляем как инженерный максимум, но с `go/no-go` checkpoint в конце этапа 1: если ломает `build`/`test`/`lint` или замедляет доставку, отключаем его без сожаления и фиксируем это как осознанный trade-off в README.

---

## Архитектура проекта

Плоская ко-локация: код фичи лежит рядом со страницей, которая его использует. Для 3-страничного приложения это естественнее, чем FSD с 4 уровнями вложенности.

```text
src/
  components/           — переиспользуемые UI: Button, Input, Modal, Toast, Skeleton, Layout
  pages/
    WelcomePage.jsx
    UsersPage/
      UsersPage.jsx
      UsersTable.jsx
      UserForm.jsx
      useUsers.js
      useSortableData.js
      useSearch.js
      users.api.js
      UsersPage.module.scss
    GroupsPage/
      GroupsPage.jsx
      GroupCard.jsx
      useGroups.js
      groups.api.js
      GroupsPage.module.scss
    NotFoundPage.jsx
  mocks/
    handlers.js         — MSW v2 handlers (http, HttpResponse)
    server.js           — setupServer из msw/node
  styles/               — CSS variables, global reset
  App.jsx
  router.jsx
docs/
  manual-ui-decisions.md
  llm-prompts.md
  demo-checklist.md
  screenshots/
    users-page.png
    groups-page.png
mock/
  db.seed.json
  db.json
scripts/
  reset-db.mjs
jsconfig.json
vite.config.js
README.md
```

**Принцип**: код фичи ко-локирован со страницей. Мелкие компоненты (UserRow, SortIcon) живут в том же файле, что и таблица — выносим только то, что реально переиспользуется.

**Отдельный принцип для конкурса**: рядом с кодом живут артефакты доказательства. Reviewer не должен "догадываться", где был LLM, а где manual work.

---

## Данные

### Модель данных (точное соответствие макету)

Макет показывает колонки: ☑ | Полное имя | Учетная запись | Электронная почта | Группа | Номер телефона.

Структура объектов (описана через JSDoc в коде):

```javascript
/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} fullName        — Полное имя
 * @property {string} account         — Учетная запись (companydomain/UserName)
 * @property {string} email           — Электронная почта
 * @property {number|null} groupId    — null = без группы (Unmanaged)
 * @property {string} phone           — Номер телефона
 */

/**
 * @typedef {Object} Group
 * @property {number} id
 * @property {string} name            — "CDN/CEO", "CDN/Managers" и т.д.
 * @property {string} description
 * @property {string} color           — для визуальных бейджей
 */

```

API-функции (`users.api.js`) просто делают `fetch` и бросают ошибку при неудаче. Хуки ловят ошибки и возвращают `{ data, error, isLoading }` — стандартный паттерн без лишних абстракций.

> JSDoc-аннотации дают IDE-автодополнение и документируют структуры данных без TypeScript.

### mock/db.json

- 20-30 пользователей (данные из макета + дополнительные);
- 6-8 групп (CDN/CEO, CDN/Managers, CDN/Financials, CDN/Top Kvants, CDN/Human resources, CDN/Outsourced, CDN/Kvants, CDN/Sales);
- Часть пользователей без группы (`groupId: null`, отображаются как "Unmanaged").
- `mock/db.seed.json` — канонический снапшот данных для демо и проверки.
- `mock/db.json` — рабочая копия, которую меняет `json-server`.
- `npm run db:reset` — восстанавливает рабочую копию из seed перед демо, тестированием и финальной сдачей.

---

## Ключевые технические решения

### 1. Роутинг

```
/         → WelcomePage
/users    → UsersPage
/groups   → GroupsPage
*         → NotFoundPage (404)
```

Для web-приложения на React Router 7: `createBrowserRouter` берём из `react-router`, `RouterProvider` — из `react-router/dom`.

### 2. Custom Hooks — главный архитектурный сигнал

Страница пользователей через композицию хуков (каждый — одна ответственность):

```javascript
// В UsersPage:
const { data: users, error, isLoading, retry, addUser, removeUsers } = useUsers();
const { query, setQuery, filtered } = useSearch(users, ['fullName', 'email', 'account']);
const { sorted, sortConfig, requestSort } = useSortableData(filtered);
const { selected, toggleOne, toggleAll, isAllSelected, clearSelection } = useSelection(sorted);
```

Это сразу читаемо и тестируемо. Reviewer видит композицию и понимает, что кандидат думает в абстракциях.

### 3. Работа с данными

- При старте страницы — `fetch` на json-server (`http://localhost:3001/users`, `/groups`).
- Добавление и удаление через HTTP POST/DELETE к json-server.
- API-функции бросают ошибки; хуки ловят их и выставляют `{ data, error, isLoading, retry }`.
- **Async-ошибки** (fetch, таймауты) — обрабатываются в хуках через try/catch + error state + Retry кнопка.
- **Render-ошибки** — React Error Boundary как страховка (ловит только ошибки рендер-фазы, НЕ async).
- Vite proxy не нужен: json-server v0.17 включает CORS по умолчанию.

### 4. Производительность

- Хранить исходные данные отдельно от derived state (фильтрованный/сортированный список вычисляется, а не хранится).
- **React Compiler** включён → ручной `useMemo`/`useCallback` НЕ нужен. Компилятор автоматически мемоизирует вычисления. Двойная мемоизация (Compiler + ручной useMemo) безвредна, но избыточна и добавляет шум.
- **`useDeferredValue`** для строки поиска — ортогонален компилятору (про приоритет рендера, не про кеширование). Нужен отдельно.
- **Не добавлять виртуализацию** для 20-40 записей. Упомянуть в README: "При 1000+ строк добавил бы `@tanstack/react-virtual`".
- Проверить через React DevTools Profiler, упомянуть результат в README.

> **Важно для README**: объяснить выбор — "React Compiler берёт на себя мемоизацию, поэтому ручных useMemo нет. useDeferredValue оставлен для поиска, т.к. он про scheduling, а не кеширование."

### 5. Страница пользователей — спроектирована ВРУЧНУЮ (без LLM)

Это самый важный участок для оценки. Здесь НЕ используем: генерацию UI через LLM, тяжёлые таблицы (AG Grid), шаблонные UI-kit.

Что сделать вручную:

- **Семантическая `<table>`** с `<thead>`, `<tbody>`, `<th scope="col">`, `aria-sort`.
- **Чекбоксы** — колонка с чекбоксами для множественного выделения + "Select all" в header (как на макете!).
- **Сортировка** — клик по заголовку: asc → desc → none. Визуальная стрелка. `aria-sort` атрибут.
- **Поиск** — по fullName, email, account. С `useDeferredValue`.
- **Добавление** — модальная форма с валидацией (нативные HTML-атрибуты + custom hook).
- **Удаление** — confirmation dialog (не `window.confirm`!) + **delayed delete паттерн**:
  1. Убрать из локального state сразу (optimistic UI)
  2. Показать toast "Удалено" с кнопкой "Отменить" + запустить 5-сек таймер (`useRef` для timer ID)
  3. Если таймер истёк → отправить HTTP DELETE
  4. Если "Отменить" → `clearTimeout`, вернуть в state, не отправлять DELETE
  5. Edge case: если пользователь закроет браузер в 5-сек окне — данные останутся (допустимо для тестового)
- **Групповое удаление** — выбрать чекбоксами → удалить выбранных (тот же delayed-delete паттерн).
- **Состояния UI**: loading skeleton (не spinner), error + retry, empty state с кнопкой "Очистить поиск".
- **Пользователи без группы** отображаются как "Unmanaged".

### 6. Страница групп — спроектирована С ПОМОЩЬЮ LLM

Визуально отличается от страницы пользователей для очевидного контраста:

- **Карточный layout** (не таблица!) — каждая карточка: название группы, цветной бейдж, кол-во участников.
- Блок **"Без группы" (Unmanaged)** отдельно.
- Клик по карточке → раскрывает список участников группы.
- В README документировать: точные промпты к LLM, 2-3 итерации, что сгенерировано vs что поправлено вручную.

### 7. UX-дифференциаторы

| Фича | Почему важно |
|-------|-------------|
| Loading skeleton (не spinner) | Профессиональный вид, снижает perceived load time |
| Delayed delete + undo-toast (5 сек) | Самый впечатляющий UX-touch с минимальными затратами |
| Confirmation dialog (не `window.confirm`) | Показывает UI-зрелость |
| Empty state с кнопкой "Очистить поиск" | Внимание к edge cases |
| Toast-уведомления при add/delete | Обратная связь пользователю |
| 404 страница (catch-all route) | 5 минут работы, показывает полноту |
| `<title>` per route (`useDocumentTitle`) | Мелочь, но заметная |
| CSS custom properties | Мини дизайн-система (5-6 переменных) |

### 8. Артефакты доказательства

- `docs/manual-ui-decisions.md` — короткое объяснение, как принимались решения по странице пользователей без LLM.
- `docs/llm-prompts.md` — точные промпты, итерации и границы ручной доработки страницы групп.
- `docs/screenshots/users-page.png` и `docs/screenshots/groups-page.png` — визуальные доказательства отличий двух подходов.
- `docs/demo-checklist.md` — сценарий проверки для reviewer: что открыть и какие действия выполнить за 2 минуты.
- `npm run verify` — один командный quality gate перед публикацией.

---

## Тестирование

### Подход: MSW v2 + интеграционные тесты + a11y

**MSW v2 setup** (API v1 несовместим!):
```javascript
// src/mocks/handlers.js — используем http/HttpResponse, НЕ rest/ctx
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('http://localhost:3001/users', () => {
    return HttpResponse.json([/* test data */])
  }),
  http.post('http://localhost:3001/users', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json(body, { status: 201 })
  }),
  http.delete('http://localhost:3001/users/:id', () => {
    return new HttpResponse(null, { status: 200 })
  }),
]

// src/mocks/server.js — импорт из msw/node, НЕ из msw
import { setupServer } from 'msw/node'
import { handlers } from './handlers'
export const server = setupServer(...handlers)

// vitest.setup.js
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './src/mocks/server'
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

**a11y тесты** через `jest-axe` (работает с Vitest через `expect.extend`):
```javascript
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)
// ...
expect(await axe(container)).toHaveNoViolations()
```

- **Интеграционные тесты UsersPage**: загрузка → поиск → сортировка → добавление → удаление → ошибка → retry.
- **Тесты error states**: мок неудачного ответа API → проверка error UI → retry → recovery.

### Минимальный набор (10-15 тестов)

- Рендер всех роутов (включая 404)
- Отображение списка пользователей после загрузки
- Сортировка по колонке (asc/desc)
- Поиск по имени/email
- Добавление пользователя
- Удаление пользователя
- Множественное выделение и групповое удаление
- Обработка ошибки загрузки + retry
- Страница групп: карточки с данными
- a11y проверка таблицы пользователей
- a11y проверка страницы групп

---

## JavaScript: качество кода без TypeScript

- **JSDoc** `@typedef` для структур данных (User, Group) и `@param` для параметров хуков/компонентов — даёт IDE-автодополнение.
- **ESLint** с `eslint-plugin-react-hooks` + `eslint-plugin-jsx-a11y` + `eslint-plugin-react-compiler` — ловит ошибки на этапе линтинга.
- **Без PropTypes** — React 19 удалил внутренний механизм проверки PropTypes, они больше не выдают warnings. JSDoc `@param` на функциях компонентов даёт лучшую IDE-поддержку.
- `jsconfig.json` — полная конфигурация:

```json
{
  "compilerOptions": {
    "checkJs": true,
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

> ⚠️ `"jsx": "react-jsx"` обязателен, иначе VS Code будет ругаться на JSX в .js файлах. `checkJs` может давать false positives на сторонних библиотеках — допустимы точечные `// @ts-ignore`.

---

## Ключевые конфиги

### vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler']
      }
    })
  ]
})
```

### package.json scripts

```json
{
  "scripts": {
    "dev": "vite",
    "db:reset": "node scripts/reset-db.mjs",
    "api": "json-server --watch mock/db.json --port 3001",
    "start": "concurrently \"npm:dev\" \"npm:api\"",
    "start:fresh": "npm run db:reset && npm run start",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint src/",
    "verify": "npm run lint && npm run test && npm run build"
  }
}
```

> json-server на порту 3001, Vite на 5173. CORS не нужен — json-server v0.17 включает его по умолчанию. Fetch идёт напрямую на `http://localhost:3001`. Для конкурентной воспроизводимости перед демо и публикацией запускать `npm run db:reset` или `npm run start:fresh`.

---

## README — главный дифференциатор

Структура:

1. **Quick Start** — `npm install`, `npm run start:fresh`
2. **TL;DR / Матрица соответствия ТЗ** — одна таблица "требование → где реализовано"
3. **Бизнес-логика** — пользователь принадлежит 0 или 1 группе, группы агрегируют участников, есть `Unmanaged`
4. **Архитектурные решения** — почему Vite, почему CSS Modules, почему не Redux/React Query, data flow
5. **Страница пользователей: ручной UI** — дизайн-решения, accessibility, performance подход, что делалось принципиально без LLM
6. **Страница групп: LLM-assisted UI** — точные промпты, итерации, что сгенерировано vs поправлено вручную
7. **Сравнение manual UI vs LLM UI** — скорость, качество, контроль, ограничения, выводы автора
8. **Производительность** — что сделано и почему, что не нужно при 40 записях
9. **Тесты и quality gates** — `lint` / `test` / `build` / `verify`
10. **Скриншоты и demo path** — reviewer сразу видит результат
11. **Known limitations & future improvements**

## Требования к окружению

```
Node.js: ≥ 18.0.0 (рекомендуется LTS 20.x или 22.x)
npm: ≥ 9.0.0
ОС: macOS / Linux / Windows (с WSL2)
```

Перед сдачей:
```bash
node --version  # Убедиться v18+
npm --version   # Убедиться v9+
npm ci          # Clean install (воспроизводимость)
npm run verify  # Полная проверка
```

---

## Пакет сдачи

**Структура репозитория перед публикацией:**
```
repo/
  src/                    — исходный код React
  mock/
    db.json              — текущее состояние (для быстрого старта)
    db.original.json     — исходные данные (для reset)
  docs/
    manual-ui-decisions.md   — 5-7 ключевых решений по users page
    llm-prompts.md          — точные промпты, итерации, скриншоты
    demo-checklist.md       — сценарий проверки за 2 минуты
    screenshots/
      users-page.png
      groups-page.png
  scripts/
    reset-db.mjs        — восстановление исходных данных
  .gitignore, vite.config.js, jsconfig.json, package.json, README.md
```

**Сдача:**
1. Выполнить: `npm run db:reset && npm run verify` ✅
2. Убедиться: `git status` чистое, `git log` содержит 20-50 коммитов
3. GitHub-репозиторий публичный (читаемый без авторизации)
4. Word-файл: `ФИО_тестовое задание_JS` со ссылкой на репозиторий
5. Проверить: README видна на GitHub, скриншоты загружаются

**После сдачи (перед дедлайном):**
- Новая машина / чистая папка: `git clone`, `npm ci`, `npm run start:fresh` — всё работает за 1 минуту ✅

---

## Git-история: почему это важно

Reviewer будет смотреть commits, чтобы понять:
1. **Как вы разрабатывали** — итеративно ли или всё сразу?
2. **Где появилась каждая фича** — какой коммит добавил таблицу, какой — поиск?
3. **Где manual vs LLM** — если git history показывает 1 большой коммит "Страница групп", это подозрительно (похоже на LLM в одно касание)

**Идеальная история (20-40 коммитов):**
```
1. feat: init vite + react + router
2. feat: add json-server mock
3. feat: create page structure and layout
4. feat: add base components (Button, Input, Modal)
5. feat: add users api layer
6. feat: display users table with basic data
   (сюда входит семантическая <table>, но БЕЗ сортировки)
7. feat: add column sorting
8. feat: add search filter
9. feat: add user creation form
10. feat: add confirmation dialog component
11. feat: add delete with undo toast (delayed delete pattern)
12. feat: add row selection checkboxes
13. fix: handle edge case empty search results
14. style: improve table layout and add skeleton loading
15. perf: add useDeferredValue for responsive search
16. feat: add ErrorBoundary and error UI
17. test: setup MSW handlers
18. test: add integration tests for UsersPage
19. test: add a11y tests with jest-axe
20. feat: add groups page cards (LLM-assisted)
21. refactor: extract groups api
22. docs: add manual-ui-decisions.md
23. docs: add llm-prompts.md with iterations
24. feat: add db.original.json and reset script
25. docs: write README with all sections
26. test: verify all tests pass
27. style: final lint cleanup
```

**Red flags в истории:**
- ❌ 2-3 гигантских коммита (видно, что писали LLM сразу)
- ❌ Весь проект в одном коммите `Initial commit`
- ❌ Много неинформативных сообщений `fix`, `update`, `wip`
- ❌ Отсутствие коммитов на тесты (все строили без проверки?)

---

## Чего НЕ делать

- ❌ Redux/Zustand/MobX — overkill, достаточно useState + хуков
- ❌ TanStack Query/SWR — задание проверяет умение работать с fetch руками
- ❌ UI-библиотека (MUI, Ant, Chakra) — задание требует ручной UI
- ❌ Пагинация — при 20-40 записях бессмысленна
- ❌ Виртуализация — упомянуть как improvement для 1000+ записей
- ❌ AG Grid / тяжёлые таблицы — скрывают качество ручного проектирования

---

## Пошаговый план реализации

### Этап 0. Трассировка ТЗ и доказательная база

Что сделать:
- Разложить ТЗ в таблицу соответствия "требование → реализация → доказательство"
- Завести `docs/manual-ui-decisions.md`, `docs/llm-prompts.md`, `docs/demo-checklist.md`
- Сформировать список обязательных скриншотов для README
- Определить `must-win` differentiators: users table, contrast manual vs LLM, reproducible demo data

Критерий готовности:
- Для каждого пункта ТЗ заранее понятно, каким артефактом он подтверждается
- План не только "что делаем", но и "как проверяющий это увидит"

### Этап 1. Инициализация проекта

Что сделать:
- `npm create vite@latest` с шаблоном `react` (JavaScript, не TypeScript)
- `npm install react-router` (v7: `createBrowserRouter` из `react-router`, `RouterProvider` из `react-router/dom`)
- `npm install -D eslint eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-react-compiler`
- `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom msw jest-axe`
- `npm install -D babel-plugin-react-compiler sass`
- Настроить `vite.config.js` с React Compiler (см. раздел "Ключевые конфиги")
- Настроить `jsconfig.json` (см. раздел "JavaScript: качество кода")
- Настроить `vitest.setup.js` с MSW сервером и jest-axe extend
- Завести структуру директорий (плоская ко-локация)
- CSS custom properties в `src/styles/variables.css`

Критерий готовности:
- `npm run dev` работает
- `npm run build` проходит
- 3 пустых роута + 404 открываются
- Принято `go/no-go` решение по React Compiler: либо остаётся, либо убирается до начала feature work

### Этап 2. Mock API и модель данных

Что сделать:
- `npm install -D json-server@0.17.4 concurrently` (⚠️ пинить 0.17.4!)
- Создать `mock/db.seed.json` (20-30 users, 6-8 groups, часть без группы)
- Добавить `scripts/reset-db.mjs`, который копирует `mock/db.seed.json` в `mock/db.json`
- JSDoc `@typedef` для User, Group в начале api-файлов
- `pages/UsersPage/users.api.js`: `fetchUsers`, `createUser`, `deleteUser`
- `pages/GroupsPage/groups.api.js`: `fetchGroups`
- Настроить scripts в `package.json` (см. раздел "Ключевые конфиги")

Критерий готовности:
- `npm start` поднимает и Vite, и json-server
- HTTP-запросы работают, CRUD меняет db.json
- `npm run db:reset` гарантированно возвращает проект в исходное состояние

### Этап 3. Каркас приложения

Что сделать:
- Общий layout с навигацией
- Приветственная страница с описанием проекта и CTA
- Shared UI компоненты: Button, Input, Modal, Toast, Skeleton
- Единый стиль для контейнеров и заголовков
- ErrorBoundary с fallback UI
- `useDocumentTitle` для каждого роута

Критерий готовности:
- Навигация между 3 страницами
- Layout адаптивен (desktop + tablet/mobile)

### Этап 4. Страница пользователей (выглядит как ручная работа)

> Эта страница должна выглядеть так, будто её писал живой разработчик, а не генерировал LLM.
> Ниже — инструкции для LLM, как именно писать код, чтобы он был неотличим от ручного.

#### 4.1. Принципы «человеческого» кода

**Стиль написания:**
- Именование переменных — конкретное, не шаблонное: `filteredUsers` вместо `filteredData`, `sortDirection` вместо `sortOrder`, смешивать длинные и короткие имена (`q` для query в хуке, `handleSort` в компоненте)
- Не делать идеально единообразный код — где-то использовать function declaration, где-то arrow function. Люди непоследовательны
- Комментарии — редкие и по делу: 1-2 на файл максимум, в сложных местах. Не комментировать очевидное. Стиль: `// skip if already sorted` а не `// This function handles the sorting logic`
- Не создавать идеально симметричные абстракции. Если `useSearch` возвращает `{ query, setQuery, filtered }`, то `useSortableData` может вернуть `{ sorted, sortConfig, onSort }` — немного другой стиль именования
- CSS — смешать подходы: в одном месте flexbox, в другом grid, где-то margin, где-то gap. Живой код неоднороден

**Структура файлов:**
- Не разносить всё по отдельным файлам идеально. Мелкие компоненты (UserRow, SortIcon) можно оставить в том же файле, что и таблица — так делает большинство разработчиков при первом проходе
- Один-два хука можно определить прямо в файле компонента, а потом "вынести" только те, что переиспользуются
- `useSelection` — оставить внутри `UsersPage.jsx`, не выносить в отдельный файл (он используется только здесь)

**CSS Modules — имитация ручной вёрстки:**
- Имена классов — не идеально семантичные: `.tableWrap`, `.sortBtn`, `.userRow`, `.selected` (не `.data-table-container`, `.sort-button-interactive`)
- Несколько магических чисел: `padding: 12px 16px`, `max-width: 1200px`, `gap: 8px` — живой разработчик не выносит каждый пиксель в переменную
- Переменные CSS — только для цветов и может 1-2 отступа, остальное хардкод
- Не идеальная адаптивность: один `@media (max-width: 768px)` с `overflow-x: auto` на таблице, не больше

**Логика — просто и прямолинейно:**
- Сортировка — обычный `Array.prototype.sort()` с `localeCompare` для строк, без generic comparator factory
- Поиск — `.filter()` + `.toLowerCase().includes()`, без регулярок и fuzzy search
- Валидация формы — нативные `required`, `type="email"`, `pattern` + один `useState` для ошибок, без form-библиотеки и без кастомного хука валидации
- Fetch — обычный `fetch` + `async/await` + `try/catch` в хуке, без axios и без абстрактного API-client

#### 4.2. Git-стратегия (критично для проверки)

Код должен коммититься **поэтапно, маленькими шагами**, как будто человек разрабатывает итеративно:

1. `feat: add users table with basic data display` — таблица без сортировки, просто рендерит данные
2. `feat: add column sorting to users table` — добавляем сортировку
3. `feat: add search filter for users` — поиск
4. `feat: add user creation form` — модалка добавления
5. `feat: add delete with confirmation` — удаление
6. `feat: add row selection checkboxes` — чекбоксы
7. `fix: handle empty search results` — исправляем edge case
8. `style: improve table layout and loading skeleton` — полировка

Между коммитами — небольшие "исправления" типа `fix: correct sort direction icon` или `refactor: extract search into custom hook`. Живая git-история — не один гигантский коммит.

#### 4.3. Что реализовать

**Таблица:**
- Семантическая `<table>` / `<thead>` / `<tbody>` / `<th scope="col">`
- `aria-sort="ascending"` / `"descending"` / `"none"` на заголовках
- Сортировка по клику: asc → desc → сброс. Стрелка ▲/▼ рядом с текстом заголовка (символ, не SVG-иконка)
- Чекбоксы: колонка слева, "select all" в шапке
- Группа пользователя — текстом из связанной group, "Unmanaged" если `groupId === null`

**Поиск:**
- `<input>` над таблицей, placeholder "Поиск по имени, email или учетной записи..."
- Фильтрация по `fullName`, `email`, `account`
- `useDeferredValue` для отзывчивости инпута
- Пустой результат → текст "Ничего не найдено" + кнопка "Сбросить"

**CRUD:**
- Добавление → кнопка "Добавить пользователя" → модалка с формой (fullName, account, email, phone, группа из dropdown). Валидация: required поля, email format
- Удаление одного → иконка/кнопка в строке → confirmation dialog (кастомный, не `window.confirm`) → toast "Удалено" с кнопкой "Отменить" (5 сек)
- Групповое удаление → кнопка "Удалить выбранных" (появляется когда есть выделенные) → confirmation → toast

**Состояния UI:**
- Loading: skeleton-строки в таблице (серые пульсирующие блоки), не спиннер
- Error: сообщение + кнопка "Повторить"
- Empty (нет данных): иллюстрация-заглушка + текст

#### 4.4. Антипаттерны LLM-кода, которых нужно ИЗБЕГАТЬ

| LLM-паттерн (палится) | Человеческий аналог |
|---|---|
| `handleClick`, `handleChange`, `handleSubmit` на всё | `onSort`, `toggleUser`, `saveNewUser`, `removeSelected` |
| Одинаковые блоки JSDoc на каждой функции | Комментарий только где неочевидно |
| `// Component for displaying...` над каждым компонентом | Без комментария (имя компонента говорит за себя) |
| Идеально одинаковый стиль во всех файлах | Лёгкая разница в стиле между файлами |
| Все пропсы деструктурированы единообразно | Где-то `({ users, onSort })`, где-то `(props)` с `props.users` |
| `try { } catch (error) { console.error(error); }` | `try { } catch (err) { setError(err.message) }` — разные имена |
| Generic утилиты на всё (`createSortComparator`) | Инлайн `a.fullName.localeCompare(b.fullName)` |
| Симметричные экспорты `export { Component }` | `export default` где-то, named export где-то |

Критерий готовности:
- Полный CRUD без перезагрузки страницы
- Сортировка работает для 4+ колонок
- Поиск фильтрует по fullName, email, account
- Чекбоксы + групповое удаление работают
- Git-история из 6-10 логичных коммитов
- Код выглядит как написанный одним человеком за 1-2 сессии
- Заполнен `docs/manual-ui-decisions.md` с 5-7 короткими решениями по users page

### Этап 5. Оптимизация производительности

Что сделать:
- React Compiler уже включён (этап 1) → **не добавлять** ручные `useMemo`/`useCallback`
- `useDeferredValue` для строки поиска (компилятор этого НЕ заменяет)
- Проверка через React DevTools Profiler — убедиться что нет лишних ре-рендеров
- При обнаружении проблем — точечный `React.memo` на тяжёлых компонентах

Критерий готовности:
- Инпут поиска остаётся отзывчивым при быстром вводе
- Нет лишних пересчётов на каждом рендере (подтверждено Profiler)
- Решение можно объяснить в README: "Compiler мемоизирует, useDeferredValue — про scheduling"

### Этап 6. Страница групп (с помощью LLM)

Что сделать:
- Использовать LLM для генерации UI-концепции (карточный layout)
- Адаптировать результат под общий стиль проекта
- Карточки: название группы, цветной бейдж, число участников
- Блок "Без группы" отдельно
- Раскрытие списка участников по клику на карточку
- Документировать промпты и итерации
- Сохранить 2-3 промежуточных скриншота и финальные промпты в `docs/llm-prompts.md`

Критерий готовности:
- Визуально отличается от таблицы пользователей
- Данные связаны с моделью проекта
- README содержит промпты и описание итераций

### Этап 7. Тесты

Что сделать:
- MSW v2 handlers (см. раздел "Тестирование" — `http`/`HttpResponse`)
- `vitest.setup.js` с `server.listen()`/`resetHandlers()`/`close()` + `jest-axe` extend
- Интеграционные тесты UsersPage (полный сценарий)
- a11y тесты через `jest-axe` + `expect.extend(toHaveNoViolations)`
- Тесты error states + retry
- Тесты роутов (включая 404)
- `npm run verify` как финальный gate перед публикацией

Критерий готовности:
- 10-15 тестов, все зелёные
- `npm test` проходит

### Этап 8. README, evidence pack и финальная полировка

Что сделать:
- Полный README по структуре из раздела выше
- Заполнить матрицу соответствия ТЗ в README
- Сохранить скриншоты `users-page.png` и `groups-page.png`
- Собрать `docs/demo-checklist.md` со сценарием проверки за 2 минуты
- Чистка кода, проверка ESLint (ноль warnings)
- `npm run build` без ошибок и warnings
- Чистая git-история с атомарными коммитами
- Финальный чеклист

Критерий готовности:
- Новый человек запускает проект по README за 2 минуты
- Reviewer понимает, почему решение устроено именно так
- Reviewer без запуска понимает, где manual UI, где LLM UI, и как это проверить

### Этап 9. Публикация и сдача

Что сделать:
- Выполнить `npm run db:reset` и `npm run verify`
- Опубликовать репозиторий на GitHub
- Подготовить Word-файл `ФИО_тестовое задание_JS` со ссылкой на репозиторий
- Финально пройти `docs/demo-checklist.md` на чистой базе данных

Критерий готовности:
- GitHub-ссылка открывается
- Word-файл оформлен по инструкции ТЗ
- Репозиторий и README готовы к проверке без устных пояснений

---

## npm-зависимости (полный список)

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router": "^7.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "babel-plugin-react-compiler": "^1.0.0",
    "concurrently": "^9.0.0",
    "eslint": "^9.0.0",
    "eslint-plugin-jsx-a11y": "^6.10.0",
    "eslint-plugin-react-compiler": "^1.0.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "jest-axe": "^8.0.0",
    "json-server": "0.17.4",
    "msw": "^2.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^16.0.0",
    "jsdom": "^24.0.0",
    "vitest": "^2.0.0",
    "sass": "^1.70.0",
    "vite": "^6.0.0"
  }
}
```

> Версии пинить для воспроизводимости. React 19 final, json-server 0.17.4 (НЕ v1).

---

## Параллелизация

Параллелить имеет смысл:
- Трассировку ТЗ и заготовки `docs/*` (этап 0)
- Наполнение `mock/db.json` и описание структур данных (этап 2)
- Базовые стили и shared UI (этап 3)
- Черновик README (можно начать с этапа 1)

---

## Что будет смотреть проверяющий

- Соблюдены ли все 3 роута
- Действительно ли данные грузятся по сети (не захардкожены)
- Есть ли сортировка, поиск, добавление и удаление
- **Чекбоксы** (на макете они есть — их отсутствие заметят)
- Продуман ли UX таблицы (skeleton, error, empty states)
- Видно ли различие между ручным и LLM UI
- Умеет ли кандидат объяснить решения по производительности
- Качество README и раздел сравнения ручного/LLM подхода
- Есть ли у решения "доказательная база": prompt log, скриншоты, понятный путь проверки
- Можно ли быстро восстановить исходные данные перед проверкой
- Accessibility (семантический HTML, aria-атрибуты)
- Чистота кода (JSDoc, ESLint, предсказуемые хуки и отсутствие лишнего legacy-кода)

---

## Частые ошибки, которых лучше избежать

- Делать "сервер" простым импортом JSON в компонент
- Использовать тяжёлую таблицу, скрывающую собственное проектирование
- Не документировать, где применялся LLM
- Хранить и мутировать отфильтрованный список вместо исходных данных
- Не обрабатывать loading, empty и error states
- Не показать пользователей без группы
- **Пропустить чекбоксы из макета**
- Использовать `window.confirm` вместо кастомного диалога
- Не показать `aria-sort` и accessibility
- Оставить JavaScript без JSDoc для структур и сложных хуков/компонентов
- Не зафиксировать, что users page делалась вручную, а groups page — через LLM
- Сдавать проект в "грязном" состоянии после удаления/добавления пользователей
- Оставить README без матрицы соответствия ТЗ и без скриншотов

---

## Troubleshooting и распространённые проблемы

| Проблема | Решение |
|----------|---------|
| `Cannot find module 'react-router'` | Убедиться: `npm install react-router` (НЕ `react-router-dom`) |
| MSW handlers не перехватывают запросы | Проверить: handlers используют `http` (v2), не `rest` (v1) |
| json-server возвращает 404 | Проверить порт (должен быть `:3001`), структуру `db.json` |
| React Compiler ошибка | Убедиться: `babel-plugin-react-compiler` установлен и в vite.config.js |
| CORS error в консоли | json-server v0.17 имеет CORS by default; если нет — проверить версию |
| `jest-axe` не работает | Убедиться: `expect.extend(toHaveNoViolations)` в vitest.setup.js |
| Тесты зависают | Проверить: MSW server.listen() в beforeAll, server.close() в afterAll |

---

## Performance benchmark

После оптимизации (этап 5) запустить React DevTools Profiler:
- Записать 5-7 операций: loading → search → sort → add → delete → retry
- Проверить: нет ли лишних ре-рендеров при вводе в search
- Снять скриншот: `docs/performance/profiler-report.md` (текстовое описание, не image)

Критерий: **инпут поиска отзывчив при быстром вводе** (LCP < 100ms для каждой операции).

---

## Финальный checklist

- [ ] Есть 3 роута + 404
- [ ] Приветственная страница оформлена
- [ ] Пользователи отображаются в семантической таблице
- [ ] Чекбоксы + select all работают
- [ ] Сортировка работает (4+ колонок, asc/desc/none, визуальные стрелки)
- [ ] Поиск работает (fullName, email, account)
- [ ] Добавление через модальную форму
- [ ] Удаление с confirmation dialog + delayed delete + undo toast
- [ ] Групповое удаление выделенных
- [ ] Есть пользователи без группы (Unmanaged)
- [ ] Loading skeleton, async error + retry, empty state, ErrorBoundary для render-ошибок
- [ ] Страница пользователей сделана ВРУЧНУЮ
- [ ] Страница групп — карточный layout, сделан с LLM
- [ ] Есть `docs/manual-ui-decisions.md` и `docs/llm-prompts.md`
- [ ] Есть `docs/screenshots/users-page.png` и `docs/screenshots/groups-page.png`
- [ ] Есть `docs/demo-checklist.md`
- [ ] JSDoc для ключевых структур и `@param` у сложных компонентов/хуков
- [ ] ESLint без warnings
- [ ] 10-15 тестов (MSW v2 + `jest-axe` + retry/error сценарии)
- [ ] `npm run db:reset` восстанавливает исходные данные
- [ ] `npm start` запускает Vite + json-server
- [ ] `npm run verify` проходит
- [ ] `npm run build` без ошибок
- [ ] `npm test` — все зелёные
- [ ] README: запуск, матрица ТЗ, бизнес-логика, промпты LLM, сравнение manual/LLM UI, performance, скриншоты
- [ ] GitHub-репозиторий опубликован
- [ ] Подготовлен Word-файл `ФИО_тестовое задание_JS` со ссылкой на репозиторий
- [ ] Чистая git-история (20-50 атомарных коммитов, понятные сообщения)
- [ ] Выполнен `npm run db:reset && npm run verify` перед сдачей
- [ ] Проверено: на чистой машине `git clone && npm ci && npm start:fresh` работает

---

## Quick Reference (для быстрого поиска)

| Что нужно | Где найти в плане | Файл в проекте |
|----------|-------------------|-----------------|
| Какие npm-пакеты | "npm-зависимости" | package.json |
| Как запустить проект | "Ключевые конфиги" | scripts в package.json |
| Как писать тесты | "Тестирование → MSW v2 setup" | `vitest.setup.js`, `src/__tests__/` |
| Как структурировать папки | "Архитектура проекта" | `src/pages/`, `src/components/` |
| Как обрабатывать ошибки | "Работа с данными" | `src/pages/UsersPage/users.api.js` |
| Как сделать UX-улучшения | "UX-дифференциаторы" + этап 4.3 | `UsersPage/`, модальные диалоги |
| Когда использовать LLM | Этап 6 | `src/pages/GroupsPage/` |
| Как документировать LLM-работу | "README → 6" | `docs/llm-prompts.md` |
| Как сделать git-историю | "Git-история" | коммиты с понятными сообщениями |
| Как восстановить данные перед проверкой | "Пакет сдачи" | `npm run db:reset` |
| Как пройти финальную проверку | "Пакет сдачи" + checklist | `npm run verify` |

---

## Финальный совет

Вся система проверки основана на **воспроизводимости** и **прозрачности**:

1. **Воспроизводимость** — reviewer клонирует, запускает, всё работает (поэтому `npm run db:reset`, `npm run verify`)
2. **Прозрачность** — README + git-история + `docs/` файлы показывают, что вы сделали и почему
3. **Контраст** — между manual и LLM UI видна разница (таблица vs карточки, ручная CSS vs LLM layout)

Если всё это на месте — решение выделится автоматически.
