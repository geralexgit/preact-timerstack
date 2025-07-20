// Internationalization helper for English and Russian support

export interface Translations {
    // App Title
    appTitle: string

    // Navbar
    savedLists: string
    soundOn: string
    soundOff: string

    // Timer Queue
    timerQueue: string
    newList: string
    clearCurrentTimers: string
    clearStartNew: string
    cancel: string
    noTimersAdded: string
    removeTimer: string

    // Add Timer
    addNewTimer: string
    timerName: string
    minutes: string
    seconds: string
    enterValidTimer: string
    timerRunning: string
    addTimer: string
    timerNamePlaceholder: string

    // Current Timer
    currentTimer: string
    queueDuration: string
    noTimerSelected: string
    start: string
    pause: string
    skip: string
    stop: string

    // Progress
    currentTimerProgress: string
    totalProgress: string
    totalTime: string
    remaining: string

    // Saved Lists
    savedTimerLists: string
    saveCurrent: string
    loadList: string
    exportAll: string
    importFile: string
    saveTimerList: string
    loadTimerList: string
    enterListName: string
    save: string
    delete: string
    noSavedLists: string
    savedListsDescription: string

    // Modal Actions
    whatWillHappen: string
    allTimersRemoved: string
    runningTimerStopped: string
    freshEmptyList: string

    // Skip Button Tooltips
    noTimersAvailable: string
    startTimerToSkip: string
    lastTimer: string
    skipToNext: string

    // Voice Messages
    allTimersCompleted: string

    // Time Format
    timers: string
    timer: string
}

const translations: Record<string, Translations> = {
    en: {
        // App Title
        appTitle: 'Timer Stack',

        // Navbar
        savedLists: 'Saved Lists',
        soundOn: 'Sound On - Click to disable',
        soundOff: 'Sound Off - Click to enable',

        // Timer Queue
        timerQueue: 'Timer Queue',
        newList: 'New',
        clearCurrentTimers: 'Clear Current Timers?',
        clearStartNew: 'Clear & Start New',
        cancel: 'Cancel',
        noTimersAdded: 'No timers added yet. Add your first timer below!',
        removeTimer: 'Remove timer',

        // Add Timer
        addNewTimer: 'Add New Timer',
        timerName: 'Timer Name',
        minutes: 'Minutes',
        seconds: 'Seconds',
        enterValidTimer: 'Enter Valid Timer',
        timerRunning: 'Timer Running...',
        addTimer: 'Add Timer',
        timerNamePlaceholder: 'e.g., Focus Session, Break Time',

        // Current Timer
        currentTimer: 'Current Timer',
        queueDuration: 'Queue Duration:',
        noTimerSelected: 'No timer selected',
        start: 'Start',
        pause: 'Pause',
        skip: 'Skip',
        stop: 'Stop',

        // Progress
        currentTimerProgress: 'Current Timer Progress',
        totalProgress: 'Total Progress',
        totalTime: 'Total Time',
        remaining: 'Remaining',

        // Saved Lists
        savedTimerLists: 'Saved Timer Lists',
        saveCurrent: 'Save Current',
        loadList: 'Load List',
        exportAll: 'Export All',
        importFile: 'Import File',
        saveTimerList: 'Save Timer List',
        loadTimerList: 'Load Timer List',
        enterListName: 'Enter list name...',
        save: 'Save',
        delete: 'Delete',
        noSavedLists: 'No saved timer lists found.',
        savedListsDescription: 'No saved timer lists yet. Save your current timers to reuse them later!',

        // Modal Actions
        whatWillHappen: 'What will happen:',
        allTimersRemoved: 'All current timers will be removed',
        runningTimerStopped: 'Any running timer will be stopped',
        freshEmptyList: "You'll start with a fresh, empty timer list",

        // Skip Button Tooltips
        noTimersAvailable: 'No timers available',
        startTimerToSkip: 'Start timer to enable skip',
        lastTimer: 'This is the last timer',
        skipToNext: 'Skip to next timer',

        // Voice Messages
        allTimersCompleted: 'All timers completed! Great job!',

        // Time Format
        timers: 'timers',
        timer: 'timer'
    },

    ru: {
        // App Title
        appTitle: 'Стек Таймеров',

        // Navbar
        savedLists: 'Сохранённые списки',
        soundOn: 'Звук включён - Нажмите чтобы отключить',
        soundOff: 'Звук отключён - Нажмите чтобы включить',

        // Timer Queue
        timerQueue: 'Очередь таймеров',
        newList: 'Новый',
        clearCurrentTimers: 'Очистить текущие таймеры?',
        clearStartNew: 'Очистить и начать новый',
        cancel: 'Отмена',
        noTimersAdded: 'Таймеры ещё не добавлены. Добавьте свой первый таймер ниже!',
        removeTimer: 'Удалить таймер',

        // Add Timer
        addNewTimer: 'Добавить новый таймер',
        timerName: 'Название таймера',
        minutes: 'Минуты',
        seconds: 'Секунды',
        enterValidTimer: 'Введите корректный таймер',
        timerRunning: 'Таймер работает...',
        addTimer: 'Добавить таймер',
        timerNamePlaceholder: 'например, Фокус сессия, Перерыв',

        // Current Timer
        currentTimer: 'Текущий таймер',
        queueDuration: 'Длительность очереди:',
        noTimerSelected: 'Таймер не выбран',
        start: 'Старт',
        pause: 'Пауза',
        skip: 'Пропустить',
        stop: 'Стоп',

        // Progress
        currentTimerProgress: 'Прогресс текущего таймера',
        totalProgress: 'Общий прогресс',
        totalTime: 'Общее время',
        remaining: 'Осталось',

        // Saved Lists
        savedTimerLists: 'Сохранённые списки таймеров',
        saveCurrent: 'Сохранить текущий',
        loadList: 'Загрузить список',
        exportAll: 'Экспорт всех',
        importFile: 'Импорт файла',
        saveTimerList: 'Сохранить список таймеров',
        loadTimerList: 'Загрузить список таймеров',
        enterListName: 'Введите название списка...',
        save: 'Сохранить',
        delete: 'Удалить',
        noSavedLists: 'Сохранённые списки таймеров не найдены.',
        savedListsDescription: 'Сохранённых списков таймеров пока нет. Сохраните текущие таймеры для повторного использования!',

        // Modal Actions
        whatWillHappen: 'Что произойдёт:',
        allTimersRemoved: 'Все текущие таймеры будут удалены',
        runningTimerStopped: 'Любой работающий таймер будет остановлен',
        freshEmptyList: 'Вы начнёте с нового, пустого списка таймеров',

        // Skip Button Tooltips
        noTimersAvailable: 'Нет доступных таймеров',
        startTimerToSkip: 'Запустите таймер чтобы включить пропуск',
        lastTimer: 'Это последний таймер',
        skipToNext: 'Пропустить к следующему таймеру',

        // Voice Messages
        allTimersCompleted: 'Все таймеры завершены! Отличная работа!',

        // Time Format
        timers: 'таймеров',
        timer: 'таймер'
    }
}

// Detect browser language and return appropriate translations
export const getLanguage = (): string => {
    const browserLang = navigator.language.toLowerCase()

    // Check for Russian
    if (browserLang.startsWith('ru')) {
        return 'ru'
    }

    // Default to English
    return 'en'
}

// Get translations for current language
export const getTranslations = (): Translations => {
    const lang = getLanguage()
    return translations[lang] || translations.en
}

// Get specific translation
export const t = (key: keyof Translations): string => {
    const translations = getTranslations()
    return translations[key] || key
}