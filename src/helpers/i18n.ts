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
    
    // Edit Timer
    editTimer: string
    editTimerTitle: string
    updateTimer: string

    // Sound Settings
    soundSettings: string
    chooseSoundType: string
    voiceAnnouncement: string
    pianoChord: string
    alternativeChord: string
    preview: string
    configure: string
    currentSoundType: string
    enableSound: string
    enableSoundDescription: string
    on: string
    off: string
    soundTypeDescription: string
    voiceDescription: string
    pianoChordDescription: string
    alternativeChordDescription: string
    done: string
    individualTimerSound: string
    individualTimerSoundDescription: string
    allTimersCompletionSound: string
    allTimersCompletionSoundDescription: string
    voiceCompletionDescription: string
}

const translations: Record<string, Translations> = {
    en: {
        // App Title
        appTitle: 'TimerStack',

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
        timer: 'timer',
        
        // Edit Timer
        editTimer: 'Edit',
        editTimerTitle: 'Edit Timer',
        updateTimer: 'Update Timer',

        // Sound Settings
        soundSettings: 'Sound Settings',
        chooseSoundType: 'Choose sound type for timer completion:',
        voiceAnnouncement: 'Voice Announcement',
        pianoChord: 'Piano Chord',
        alternativeChord: 'Alternative Chord',
        preview: 'Preview',
        configure: 'Configure',
        currentSoundType: 'Current sound type',
        enableSound: 'Enable Sound',
        enableSoundDescription: 'Turn sound notifications on or off for timer events',
        on: 'On',
        off: 'Off',
        soundTypeDescription: 'Select how you want to be notified when timers complete',
        voiceDescription: 'Speaks timer names and completion messages',
        pianoChordDescription: 'Warm piano chord with triangle waves',
        alternativeChordDescription: 'Bright electronic chord with sawtooth waves',
        done: 'Done',
        individualTimerSound: 'Individual Timer Sound',
        individualTimerSoundDescription: 'Sound played when each individual timer completes and moves to the next',
        allTimersCompletionSound: 'All Timers Completion Sound',
        allTimersCompletionSoundDescription: 'Sound played when all timers in the queue are finished',
        voiceCompletionDescription: 'Announces "All timers completed" message'
    },

    ru: {
        // App Title
        appTitle: 'TimerStack',
    
        // Navbar
        savedLists: 'Списки',
        soundOn: 'Звук включён — нажми, чтобы выключить',
        soundOff: 'Звук выключен — нажми, чтобы включить',
    
        // Timer Queue
        timerQueue: 'Очередь',
        newList: 'Новый',
        clearCurrentTimers: 'Очистить таймеры?',
        clearStartNew: 'Очистить и начать',
        cancel: 'Отмена',
        noTimersAdded: 'Таймеров пока нет. Добавьте первый!',
        removeTimer: 'Удалить',
    
        // Add Timer
        addNewTimer: 'Добавить таймер',
        timerName: 'Название',
        minutes: 'Минуты',
        seconds: 'Секунды',
        enterValidTimer: 'Введите корректное время',
        timerRunning: 'Таймер работает...',
        addTimer: 'Добавить',
        timerNamePlaceholder: 'например: Фокус, Перерыв',
    
        // Current Timer
        currentTimer: 'Сейчас',
        queueDuration: 'Длительность:',
        noTimerSelected: 'Нет выбранного таймера',
        start: 'Старт',
        pause: 'Пауза',
        skip: 'Пропустить',
        stop: 'Стоп',
    
        // Progress
        currentTimerProgress: 'Прогресс таймера',
        totalProgress: 'Общий прогресс',
        totalTime: 'Общее время',
        remaining: 'Осталось',
    
        // Saved Lists
        savedTimerLists: 'Сохранённые списки',
        saveCurrent: 'Сохранить',
        loadList: 'Загрузить',
        exportAll: 'Экспорт',
        importFile: 'Импорт',
        saveTimerList: 'Сохранить список',
        loadTimerList: 'Загрузить список',
        enterListName: 'Имя списка...',
        save: 'Сохранить',
        delete: 'Удалить',
        noSavedLists: 'Нет сохранённых списков',
        savedListsDescription: 'Сохраняйте таймеры для повторного использования.',
    
        // Modal Actions
        whatWillHappen: 'Что произойдёт:',
        allTimersRemoved: 'Все таймеры будут удалены',
        runningTimerStopped: 'Идущий таймер остановится',
        freshEmptyList: 'Будет пустой список',
    
        // Skip Button Tooltips
        noTimersAvailable: 'Нет таймеров',
        startTimerToSkip: 'Запустите таймер',
        lastTimer: 'Это последний',
        skipToNext: 'Пропустить вперёд',
    
        // Voice Messages
        allTimersCompleted: 'Все таймеры завершены! Отлично!',
    
        // Time Format
        timers: 'таймеров',
        timer: 'таймер',
        
        // Edit Timer
        editTimer: 'Изменить',
        editTimerTitle: 'Изменить таймер',
        updateTimer: 'Обновить таймер',

        // Sound Settings
        soundSettings: 'Настройки звука',
        chooseSoundType: 'Выберите тип звука для завершения таймера:',
        voiceAnnouncement: 'Голосовое объявление',
        pianoChord: 'Аккорд пианино',
        alternativeChord: 'Альтернативный аккорд',
        preview: 'Прослушать',
        configure: 'Настроить',
        currentSoundType: 'Текущий тип звука',
        enableSound: 'Включить звук',
        enableSoundDescription: 'Включить или выключить звуковые уведомления для таймеров',
        on: 'Вкл',
        off: 'Выкл',
        soundTypeDescription: 'Выберите, как вы хотите получать уведомления о завершении таймеров',
        voiceDescription: 'Произносит названия таймеров и сообщения о завершении',
        pianoChordDescription: 'Тёплый аккорд пианино с треугольными волнами',
        alternativeChordDescription: 'Яркий электронный аккорд с пилообразными волнами',
        done: 'Готово',
        individualTimerSound: 'Звук отдельного таймера',
        individualTimerSoundDescription: 'Звук при завершении каждого отдельного таймера и переходе к следующему',
        allTimersCompletionSound: 'Звук завершения всех таймеров',
        allTimersCompletionSoundDescription: 'Звук при завершении всех таймеров в очереди',
        voiceCompletionDescription: 'Объявляет сообщение "Все таймеры завершены"'
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