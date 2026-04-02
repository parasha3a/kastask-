export const translations = {
  en: {
    meta: {
      appName: 'Kaspersky Security Console',
    },
    common: {
      close: 'Close',
      cancel: 'Cancel',
      delete: 'Delete',
      undo: 'Undo',
      retry: 'Retry',
      clear: 'Clear',
      learnMore: 'Learn more',
      optional: 'Optional',
      backToHome: 'Back to overview',
    },
    nav: {
      productSuffix: 'Security Console',
      tagline: 'Enterprise-grade cyber resilience',
      primaryNavigation: 'Primary navigation',
      links: {
        home: 'Overview',
        users: 'Users',
        groups: 'Groups',
      },
      cta: 'Open console',
      menuOpen: 'Open navigation menu',
      menuClose: 'Close navigation menu',
      languageLabel: 'Interface language',
      mobileSummary:
        'Security-focused workspace for user governance, group visibility and rapid operational cleanup.',
    },
    footer: {
      minimalist: 'Тестовое задание для Kaspersky',
    },
    titles: {
      home: 'Kaspersky Security Console',
      users: 'User Directory',
      groups: 'Group Intelligence',
      notFound: 'Page Not Found',
    },
    welcome: {
      hero: {
        eyebrow: 'Unified endpoint and access visibility',
        title: 'Protect every user touchpoint before it becomes a security incident.',
        description:
          'Monitor accounts, ownership groups and operational hygiene in a single interface styled like an enterprise cybersecurity product.',
        primaryCta: 'Review users',
        secondaryCta: 'Inspect groups',
        bullets: [
          'Audit-friendly workflows with semantic data tables',
          'Immediate visibility into unmanaged identities and team ownership',
          'Readable, high-contrast UI tuned for operational scanning',
        ],
      },
      visual: {
        chip: 'Threat visibility',
        chipMuted: 'Live overview',
        scoreLabel: 'identity hygiene score',
        rows: [
          { label: 'Managed', value: '14 accounts' },
          { label: 'Unmanaged', value: '4 accounts' },
          { label: 'Groups tracked', value: '8 owners' },
        ],
      },
      metrics: [
        { value: '400M+', label: 'users protected globally' },
        { value: '24/7', label: 'threat intelligence posture' },
        { value: '18', label: 'demo records ready for review' },
        { value: '8', label: 'linked ownership groups' },
      ],
      features: {
        eyebrow: 'Why this interface works',
        title: 'Built like a security product, not a generic admin panel.',
        description:
          'Each surface prioritizes trust, quick comprehension and action safety while staying within the assignment architecture.',
        items: [
          {
            title: 'Manual user oversight',
            description:
              'The users page keeps dense operational data accessible with semantic sorting, rapid search and a deliberate delete flow.',
          },
          {
            title: 'Structured group visibility',
            description:
              'Group cards surface ownership, member counts and unmanaged accounts in a clear hierarchy inspired by product marketing and console UI.',
          },
          {
            title: 'Trust-first presentation',
            description:
              'Kaspersky-style color, contrast and motion cues create a credible enterprise look without hiding the underlying app logic.',
          },
        ],
      },
      products: {
        eyebrow: 'Working surfaces',
        title: 'Choose the operating view you need right now.',
        description:
          'The landing page routes the reviewer directly into the two assignment-critical experiences while preserving a premium product narrative.',
        items: [
          {
            name: 'User Directory',
            tag: 'Manual UI',
            description:
              'High-density table for account review, live search, semantic sorting and controlled CRUD actions.',
            bullets: [
              'Search by full name, account and email',
              'Undo-safe deletion scheduling',
              'Readable on desktop and mobile',
            ],
            cta: 'Open users',
          },
          {
            name: 'Group Intelligence',
            tag: 'LLM-assisted UI',
            description:
              'Card-based group overview with member visibility, ownership context and unmanaged account callouts.',
            bullets: [
              'Focused member modals',
              'Quick ownership scanning',
              'Aligned visual system across pages',
            ],
            cta: 'Open groups',
          },
          {
            name: 'Operational Readiness',
            tag: 'Review ready',
            description:
              'A polished shell with bilingual content, animated reveals and shared components that raise the overall submission quality.',
            bullets: [
              'RU and EN interface switch',
              'Shared theme tokens and focus states',
              'Consistent security-oriented copy',
            ],
            cta: 'Learn more',
          },
        ],
      },
      trust: {
        eyebrow: 'Trust signals',
        title: 'Recognizable security language, certifications and partner-ready framing.',
        description:
          'The interface uses the visual cues reviewers expect from a modern cybersecurity product landing page.',
        badges: [
          'AV-TEST top-grade thinking',
          'ISO-oriented operational clarity',
          'Enterprise support readiness',
          'High-contrast accessible surfaces',
        ],
        partners: ['Threat Research', 'Identity Governance', 'Compliance Review', 'Incident Response'],
      },
      finalCta: {
        title: 'Operate faster when every user record is easy to trust.',
        description:
          'Move from overview to action without losing context: search the directory, validate ownership and isolate unmanaged accounts.',
        primary: 'Go to user directory',
        secondary: 'Review ownership groups',
      },
    },
    users: {
      hero: {
        eyebrow: 'Manual UI / access directory',
        title: 'User directory built for fast review, safe action and high-density scanning.',
        description:
          'Browse, filter and manage all user accounts from a single high-density table with inline search and bulk actions.',
        primaryCta: 'Add user',
        secondaryCta: 'Open groups',
      },
      metrics: {
        total: 'User records',
        managed: 'Managed accounts',
        unmanaged: 'Unmanaged accounts',
        groups: 'Linked groups',
      },
      controls: {
        searchLabel: 'Search users',
        searchPlaceholder: 'Search by full name, email or account',
        selected: '{count} selected',
        deleteSelected: 'Delete selected',
        clearSelection: 'Clear selection',
        clearSearch: 'Clear search',
      },
      table: {
        caption: 'Operational user directory',
        selectAll: 'Select all users',
        fullName: 'Full name',
        account: 'Account',
        email: 'Email',
        group: 'Group',
        phone: 'Phone',
        actions: 'Actions',
        unmanaged: 'Unmanaged',
        deleteUser: 'Schedule deletion for {name}',
        sortBy: 'Sort by {label}',
      },
      states: {
        loadingTitle: 'Loading user directory',
        loadingDescription: 'Preparing account records and ownership metadata.',
        emptyTitle: 'No users match the current filter',
        emptyDescription: 'Adjust the query or clear the search to restore the full directory.',
        errorTitle: 'Unable to load user records',
        groupsWarning: 'Group labels are temporarily unavailable. User data is still visible.',
      },
      form: {
        title: 'Add new user',
        submit: 'Create user',
        fullName: 'Full name',
        fullNamePlaceholder: 'Natalia Petrova',
        account: 'Account',
        accountPlaceholder: 'companydomain/NataliaPetrova',
        email: 'Email',
        emailPlaceholder: 'natalia.petrova@companydomain.com',
        phone: 'Phone',
        phonePlaceholder: '+7 (999) 555-11-22',
        group: 'Group',
        groupPlaceholder: 'Unmanaged',
        errors: {
          fullName: 'Full name is required.',
          account: 'Account is required.',
          emailRequired: 'Email is required.',
          emailInvalid: 'Enter a valid email address.',
          phone: 'Phone number is required.',
        },
      },
      confirmDelete: {
        title: 'Schedule deletion',
        single: 'Delete user "{name}"?',
        bulk: 'Delete {count} selected users?',
        description:
          'The selected records will disappear from the table immediately and will be permanently removed after 5 seconds unless you undo the action.',
        confirm: 'Schedule deletion',
      },
      toasts: {
        addSuccess: 'User added successfully.',
        addError: 'Failed to add user: {error}',
        pendingSingle: 'User hidden for 5 seconds. Undo to restore.',
        pendingBulk: '{count} users hidden for 5 seconds. Undo to restore.',
        deletedSingle: 'User deleted.',
        deletedBulk: '{count} users deleted.',
        deleteError: 'Failed to delete users: {error}',
      },
    },
    groups: {
      hero: {
        eyebrow: 'Group intelligence / ownership view',
        title: 'See group structure, member density and unmanaged risk in one place.',
        description:
          'Explore group composition, membership density and unmanaged risk in a unified Kaspersky-styled interface.',
        primaryCta: 'Review users',
      },
      metrics: {
        groups: 'Groups tracked',
        members: 'Assigned members',
        unmanaged: 'Unmanaged accounts',
        active: 'Groups with members',
      },
      sections: {
        groupsEyebrow: 'Ownership cards',
        groupsTitle: 'Operational groups and member visibility',
        groupsDescription:
          'Open any group in a focused modal to inspect membership, ownership context and the current account roster.',
        unmanagedTitle: 'Unmanaged users',
        unmanagedDescription:
          'These accounts do not belong to a managed group and should be reviewed for ownership gaps or onboarding drift.',
      },
      states: {
        loadingTitle: 'Loading group intelligence',
        loadingDescription: 'Collecting group definitions and membership counts.',
        errorTitle: 'Unable to load groups',
        retry: 'Retry loading groups',
      },
      card: {
        members: '{count} members',
        open: 'Open {name}',
        action: 'Open group',
        modalTitle: 'Group details',
        descriptionLabel: 'Group overview',
        memberListTitle: 'Group members',
        accountLabel: 'Account',
        empty: 'No members assigned yet.',
      },
    },
    notFound: {
      eyebrow: 'Navigation exception',
      title: 'The requested page is outside the monitored perimeter.',
      description:
        'Return to the main console to continue reviewing users, groups and security-oriented interface flows.',
      action: 'Back to overview',
    },
  },
  ru: {
    meta: {
      appName: 'Kaspersky Security Console',
    },
    common: {
      close: 'Закрыть',
      cancel: 'Отмена',
      delete: 'Удалить',
      undo: 'Отменить',
      retry: 'Повторить',
      clear: 'Очистить',
      learnMore: 'Подробнее',
      optional: 'Необязательно',
      backToHome: 'Вернуться на обзор',
    },
    nav: {
      productSuffix: 'Security Console',
      tagline: 'Корпоративная киберустойчивость',
      primaryNavigation: 'Основная навигация',
      links: {
        home: 'Обзор',
        users: 'Пользователи',
        groups: 'Группы',
      },
      cta: 'Открыть консоль',
      menuOpen: 'Открыть меню навигации',
      menuClose: 'Закрыть меню навигации',
      languageLabel: 'Язык интерфейса',
      mobileSummary:
        'Рабочее пространство в стиле security-продукта для управления пользователями, группами и быстрых операционных действий.',
    },
    footer: {
      minimalist: 'Тестовое задание для Kaspersky',
    },
    titles: {
      home: 'Kaspersky Security Console',
      users: 'Каталог пользователей',
      groups: 'Аналитика групп',
      notFound: 'Страница не найдена',
    },
    welcome: {
      hero: {
        eyebrow: 'Единая видимость пользователей и доступов',
        title: 'Защищайте каждую пользовательскую точку входа до того, как она станет инцидентом.',
        description:
          'Контролируйте аккаунты, владельцев групп и операционную гигиену в одном интерфейсе, оформленном как корпоративный cybersecurity-продукт.',
        primaryCta: 'Проверить пользователей',
        secondaryCta: 'Открыть группы',
        bullets: [
          'Аудитопригодные сценарии на базе семантических таблиц',
          'Мгновенная видимость неуправляемых аккаунтов и структуры групп',
          'Контрастный и читаемый UI для быстрого операционного просмотра',
        ],
      },
      visual: {
        chip: 'Видимость угроз',
        chipMuted: 'Живой обзор',
        scoreLabel: 'оценка гигиены идентичностей',
        rows: [
          { label: 'Управляемые', value: '14 аккаунтов' },
          { label: 'Неуправляемые', value: '4 аккаунта' },
          { label: 'Группы под контролем', value: '8 владельцев' },
        ],
      },
      metrics: [
        { value: '400M+', label: 'пользователей под защитой' },
        { value: '24/7', label: 'позиция threat intelligence' },
        { value: '18', label: 'демо-записей для проверки' },
        { value: '8', label: 'связанных групп владения' },
      ],
      features: {
        eyebrow: 'Почему интерфейс работает',
        title: 'Это похоже на security-продукт, а не на типовой admin panel.',
        description:
          'Каждая поверхность проектировалась под доверие, быстрое чтение и безопасные действия, не ломая архитектуру тестового задания.',
        items: [
          {
            title: 'Ручной контроль пользователей',
            description:
              'Страница пользователей сохраняет плотные данные читаемыми за счет семантической таблицы, быстрого поиска и продуманного удаления.',
          },
          {
            title: 'Структурная видимость групп',
            description:
              'Карточки групп показывают состав, плотность и неуправляемые аккаунты в иерархии, похожей на продуктовый интерфейс.',
          },
          {
            title: 'Подача, вызывающая доверие',
            description:
              'Фирменные цвета, контраст и motion-паттерны усиливают ощущение enterprise-решения, не скрывая логику приложения.',
          },
        ],
      },
      products: {
        eyebrow: 'Рабочие поверхности',
        title: 'Выберите режим работы, который нужен прямо сейчас.',
        description:
          'Главная страница сразу ведет ревьюера в два ключевых экрана задания и при этом сохраняет цельный продуктовый нарратив.',
        items: [
          {
            name: 'Каталог пользователей',
            tag: 'Manual UI',
            description:
              'Плотная таблица для просмотра аккаунтов, живого поиска, семантической сортировки и контролируемых CRUD-действий.',
            bullets: [
              'Поиск по имени, учетной записи и email',
              'Undo-safe сценарий удаления',
              'Читаемость на desktop и mobile',
            ],
            cta: 'Открыть пользователей',
          },
          {
            name: 'Аналитика групп',
            tag: 'LLM-assisted UI',
            description:
              'Карточный обзор групп с видимостью состава, владельцев и отдельным акцентом на неуправляемые аккаунты.',
            bullets: [
              'Фокусные модальные окна с участниками',
              'Быстрый просмотр ответственности',
              'Единая визуальная система между страницами',
            ],
            cta: 'Открыть группы',
          },
          {
            name: 'Готовность к ревью',
            tag: 'Review ready',
            description:
              'Полированный shell, двуязычный интерфейс, анимации и shared-компоненты поднимают качество всей сдачи.',
            bullets: [
              'Переключение RU/EN',
              'Общие theme-токены и focus states',
              'Security-ориентированный copywriting',
            ],
            cta: 'Подробнее',
          },
        ],
      },
      trust: {
        eyebrow: 'Сигналы доверия',
        title: 'Узнаваемый security-язык, сертификационные маркеры и enterprise-подача.',
        description:
          'Интерфейс использует визуальные сигналы, которые ревьюер ожидает увидеть у современного кибербезопасного продукта.',
        badges: [
          'Логика в духе AV-TEST top grade',
          'Операционная ясность уровня ISO',
          'Готовность к enterprise support',
          'Контрастные и доступные поверхности',
        ],
        partners: ['Threat Research', 'Identity Governance', 'Compliance Review', 'Incident Response'],
      },
      finalCta: {
        title: 'Работать быстрее проще, когда каждой пользовательской записи можно доверять.',
        description:
          'Переходите от обзора к действию без потери контекста: ищите записи, проверяйте владельцев и изолируйте неуправляемые аккаунты.',
        primary: 'Перейти к пользователям',
        secondary: 'Проверить группы',
      },
    },
    users: {
      hero: {
        eyebrow: 'Manual UI / каталог доступов',
        title: 'Каталог пользователей для быстрого просмотра, безопасных действий и плотных данных.',
        description:
          'Просматривайте, фильтруйте и управляйте всеми аккаунтами из единой таблицы с поиском и массовыми действиями.',
        primaryCta: 'Добавить пользователя',
        secondaryCta: 'Открыть группы',
      },
      metrics: {
        total: 'Записей пользователей',
        managed: 'Управляемые аккаунты',
        unmanaged: 'Неуправляемые аккаунты',
        groups: 'Связанные группы',
      },
      controls: {
        searchLabel: 'Поиск пользователей',
        searchPlaceholder: 'Поиск по полному имени, email или учетной записи',
        selected: 'Выбрано: {count}',
        deleteSelected: 'Удалить выбранные',
        clearSelection: 'Снять выделение',
        clearSearch: 'Очистить поиск',
      },
      table: {
        caption: 'Операционный каталог пользователей',
        selectAll: 'Выбрать всех пользователей',
        fullName: 'Полное имя',
        account: 'Учетная запись',
        email: 'Электронная почта',
        group: 'Группа',
        phone: 'Номер телефона',
        actions: 'Действия',
        unmanaged: 'Unmanaged',
        deleteUser: 'Запланировать удаление пользователя {name}',
        sortBy: 'Сортировать по полю {label}',
      },
      states: {
        loadingTitle: 'Загружается каталог пользователей',
        loadingDescription: 'Подготавливаем записи аккаунтов и метаданные групп.',
        emptyTitle: 'По текущему фильтру ничего не найдено',
        emptyDescription: 'Измените запрос или очистите поиск, чтобы вернуть полный список.',
        errorTitle: 'Не удалось загрузить записи пользователей',
        groupsWarning: 'Подписи групп временно недоступны. Сами записи пользователей уже загружены.',
      },
      form: {
        title: 'Добавить пользователя',
        submit: 'Создать пользователя',
        fullName: 'Полное имя',
        fullNamePlaceholder: 'Наталья Петрова',
        account: 'Учетная запись',
        accountPlaceholder: 'companydomain/NataliaPetrova',
        email: 'Email',
        emailPlaceholder: 'natalia.petrova@companydomain.com',
        phone: 'Телефон',
        phonePlaceholder: '+7 (999) 555-11-22',
        group: 'Группа',
        groupPlaceholder: 'Unmanaged',
        errors: {
          fullName: 'Полное имя обязательно.',
          account: 'Учетная запись обязательна.',
          emailRequired: 'Email обязателен.',
          emailInvalid: 'Введите корректный email.',
          phone: 'Номер телефона обязателен.',
        },
      },
      confirmDelete: {
        title: 'Запланировать удаление',
        single: 'Удалить пользователя «{name}»?',
        bulk: 'Удалить выбранных пользователей: {count}?',
        description:
          'Выбранные записи сразу исчезнут из таблицы и будут удалены окончательно через 5 секунд, если не нажать Undo.',
        confirm: 'Запланировать удаление',
      },
      toasts: {
        addSuccess: 'Пользователь успешно добавлен.',
        addError: 'Не удалось добавить пользователя: {error}',
        pendingSingle: 'Пользователь скрыт на 5 секунд. Undo вернет запись.',
        pendingBulk: 'Скрыто пользователей: {count}. Undo вернет записи.',
        deletedSingle: 'Пользователь удален.',
        deletedBulk: 'Удалено пользователей: {count}.',
        deleteError: 'Не удалось удалить пользователей: {error}',
      },
    },
    groups: {
      hero: {
        eyebrow: 'Group intelligence / ownership view',
        title: 'Видьте структуру групп, плотность состава и неуправляемый риск в одном окне.',
        description:
          'Изучите состав групп, плотность участников и неуправляемые риски в едином интерфейсе в стиле Kaspersky.',
        primaryCta: 'Проверить пользователей',
      },
      metrics: {
        groups: 'Групп под контролем',
        members: 'Назначенных участников',
        unmanaged: 'Неуправляемые аккаунты',
        active: 'Групп с участниками',
      },
      sections: {
        groupsEyebrow: 'Карточки владения',
        groupsTitle: 'Операционные группы и видимость участников',
        groupsDescription:
          'Откройте любую группу в модальном окне, чтобы посмотреть состав, описание и текущий список аккаунтов без inline-раскрытия карточки.',
        unmanagedTitle: 'Неуправляемые пользователи',
        unmanagedDescription:
          'Эти аккаунты не входят ни в одну управляемую группу и требуют отдельной проверки владельца или сценария онбординга.',
      },
      states: {
        loadingTitle: 'Загружается аналитика групп',
        loadingDescription: 'Собираем определения групп и количество участников.',
        errorTitle: 'Не удалось загрузить группы',
        retry: 'Повторить загрузку',
      },
      card: {
        members: 'Участников: {count}',
        open: 'Открыть {name}',
        action: 'Открыть группу',
        modalTitle: 'Детали группы',
        descriptionLabel: 'Описание группы',
        memberListTitle: 'Участники группы',
        accountLabel: 'Учетная запись',
        empty: 'В группе пока нет участников.',
      },
    },
    notFound: {
      eyebrow: 'Навигационное исключение',
      title: 'Запрошенная страница находится вне контролируемого периметра.',
      description:
        'Вернитесь в основную консоль, чтобы продолжить просмотр пользователей, групп и security-ориентированных сценариев.',
      action: 'Вернуться на обзор',
    },
  },
}
