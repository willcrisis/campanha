# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Campanha de Louvor** (Praise Campaign) is a spiritual mobile application for a 7-week cycling Bible study focused on God's attributes. Built with React Native/Expo, it provides daily devotional content that automatically cycles through 7 weekly themes, each exploring different aspects of God's character.

- **Platform:** Cross-platform (iOS, Android, Web) via Expo SDK 54
- **Tech Stack:** TypeScript, React 19.1.0, React Native 0.81.5, expo-router v6
- **Architecture:** Offline-first with no backend, static JSON data
- **Languages:** Portuguese (pt-br) and English (en-us)

## Essential Commands

### Development
```bash
npm install              # Install dependencies
npm start                # Start Expo dev server
npm run android          # Run on Android device/emulator
npm run ios              # Run on iOS device/simulator
npm run web              # Run web version
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run lint-fix         # Auto-fix ESLint issues
npm test                 # Run Jest tests (infrastructure exists, no tests written yet)
```

### Building & Deployment
```bash
npx expo-doctor          # Check for configuration issues
eas build --profile development   # Build for development
eas build --profile preview       # Build for preview
eas build --profile production    # Build for production with auto-increment
```

## Critical Constants & Configuration

### BASE_DATE (constants.ts)
```typescript
export const BASE_DATE = '2025-01-05';
```
This is the **anchor date** for all campaign calculations. The app calculates days since this date to determine the current week (0-6) and day (0-6) in the 7-week cycle. Modifying this will shift the entire campaign schedule globally.

### Package Configuration Issue
**IMPORTANT:** This project uses React 19.1.0 as a direct dependency. Do not add an `overrides` section to package.json that conflicts with the direct React version, as it will cause npm install failures with error code `EOVERRIDE`.

### App Configuration
- **Dark mode only:** `userInterfaceStyle: "dark"` in app.json
- **New Architecture enabled:** React Native's new architecture is enabled
- **Bundle identifiers:**
  - iOS: `com.willcrisis.campanha`
  - Android: `com.willcrisis.campanha`

## Code Architecture

### Directory Structure
```
/app/                   # File-based routing (expo-router)
  ├── _layout.tsx      # Root layout with provider hierarchy
  ├── index.tsx        # Home route → renders HomePage
  ├── [weekAndDay].tsx # Dynamic route (e.g., /1-3 for week 1, day 3)
  ├── config.tsx       # Settings page
  └── search.tsx       # Search page

/pages/                # Page components (rendered by routes)
/components/           # Reusable UI components
  └── inputs/         # Form inputs with accessibility support

/contexts/             # React Context providers (primary state management)
  ├── DataContext.tsx         # Campaign data & date calculations
  ├── I18nContext.tsx         # Internationalization & translations
  ├── NotificationContext.tsx # Daily notification scheduling
  └── AccessibilityContext.tsx # Font size controls

/hooks/                # Custom React hooks
/assets/
  ├── data/           # JSON: data.pt-br.json, data.en-us.json
  └── translations/   # UI strings: pt-br.json, en-us.json

/docs/                 # Comprehensive documentation
  └── memories/       # Project memories (READ FIRST before changes)
```

### Provider Hierarchy (app/_layout.tsx)
Providers are nested in this order (outermost to innermost):
1. **PaperProvider** - Material Design 3 theming
2. **I18nProvider** - Locale management & translations
3. **DataContextProvider** - Core campaign data
4. **NotificationProvider** - Push notification scheduling
5. **AccessibilityProvider** - Font size controls
6. **Stack** (expo-router) - Navigation

### State Management Pattern
This app uses **React Context API exclusively** - no Redux/MobX. All global state lives in 4 contexts:

#### DataContext
**Purpose:** Core data management and cyclical date calculations

**Key Responsibilities:**
- Loads campaign data for current locale
- Calculates current week/day based on BASE_DATE
- Implements 49-day (7 weeks) automatic cycling
- Recalculates when app comes to foreground
- Provides flattened verse array for search

**Critical Function:**
```typescript
calculateCurrentDay() {
  // Returns [week: 0-6, day: 0-6]
  // Based on days elapsed since BASE_DATE
  // Uses modulo 49 for cycling
}
```

#### I18nContext
**Purpose:** Internationalization

**Provides:**
- `locale` (pt-br or en-us)
- `data` - Locale-specific campaign data
- `translations` - UI strings
- `translate()` - Function with `{{param}}` interpolation support
- `ordinal()` - Language-specific ordinal formatting (1st vs 1ª)

**Note:** Campaign data is duplicated per language (not just UI translations) because it includes different Bible translations (ARA for PT, KJV for EN).

#### NotificationContext
- Manages daily notification scheduling
- Requests permissions
- Uses expo-notifications with calendar triggers

#### AccessibilityContext
- Provides `fontSize` state (12-32, default 16)
- All text must use `InputLabel` component to respect font size
- Persists preference via AsyncStorage

### Data Structure
Campaign data is stored as static JSON files with this hierarchy:

```
Semana (Week)
  ├── id: number (1-7)
  ├── tema: string (e.g., "O Amor de Deus")
  └── dias: Dia[]
      ├── id: number (1-7, Sunday=1 to Saturday=7)
      ├── atributo: string (God's attribute)
      ├── textos: string (verse references for display)
      └── livros: Livro[]
          ├── nome: string (Bible book name)
          └── capitulos: Capitulo[]
              ├── id: string (chapter number)
              └── versiculos: Versiculo[]
                  ├── id: string (verse number)
                  └── texto: string (verse text)
```

### Routing Architecture (expo-router)
- **File-based routing** with typed routes enabled
- Routes in `/app` are minimal - they render page components from `/pages`
- Dynamic route: `[weekAndDay].tsx` accepts params like `1-3` (week 1, day 3)
- No headers: `screenOptions={{ headerShown: false }}`
- Navigation: Use `router.push()`, `router.back()` from `expo-router`

### Component Patterns

**Key Components:**
- **PageView** - Safe area wrapper with themed background
- **PageHeader** - Header with back button and actions
- **FullDay** - Main content display (theme, attribute, scriptures)
- **Scriptures** - Renders nested Book → Chapter → Verse hierarchy
- **InputLabel** - ALL text must use this to respect fontSize context

**Accessibility Rule:**
Never use bare `<Text>` components. Always use `<InputLabel>` which automatically applies the user's font size preference.

### Custom Hooks

**usePersistedState** - Generic AsyncStorage-backed state:
```typescript
const [state, setState, clearState] = usePersistedState('key', defaultValue);
```

**useShare** - Formats and shares daily content via native share dialog

**useSearch** - Simple case-insensitive text search across all verses

## Key Architectural Decisions

1. **Cyclical Campaign Logic:** The app automatically cycles through 7 weeks (49 days) indefinitely. Week/day calculations are based on days elapsed since BASE_DATE using modulo arithmetic.

2. **Offline-First:** No API calls, no backend, no analytics. All data is bundled as JSON. The app works 100% offline.

3. **Separation of Routes and Pages:** Routes in `/app` directory are minimal routing logic. Actual page components live in `/pages` directory.

4. **Locale-Specific Data:** Campaign data is duplicated per language (not just UI translations) to include different Bible translations.

5. **Dark Mode Only:** No light mode support. Pure black background (#000000).

6. **Denormalized Search Index:** All verses are flattened into a single array with metadata for fast search, built once in DataContext.

7. **Context-Based Accessibility:** All typography flows through InputLabel component with centralized font size control.

## Development Workflow

### Before Making Changes
1. **Read `/docs/memories/` folder** - Contains project history and past decisions (per .cursor/rules)
2. Review relevant documentation in `/docs/` directory
3. Understand the cycling date calculation logic in DataContext
4. Check TypeScript types - the codebase is strictly typed

### Making Data Changes
- Edit `/assets/data/data.pt-br.json` or `data.en-us.json`
- Follow the existing hierarchical structure (Semana → Dia → Livro → Capitulo → Versiculo)
- Maintain parallel structure between languages
- Run the app to verify JSON parsing succeeds

### Adding New Routes
1. Create file in `/app/` directory (e.g., `newpage.tsx`)
2. Create corresponding page component in `/pages/` directory
3. Route file should be minimal - just render the page component
4. expo-router will automatically add the route

### Modifying Contexts
- Be careful with DataContext - it contains critical date calculation logic
- Changes to calculateCurrentDay() affect the entire campaign schedule
- Test thoroughly across different dates
- Remember that the app recalculates on foreground (AppState listener)

### Styling & Theming
- Use react-native-paper components where possible
- Theme is configured in `app/_layout.tsx`
- Accent color for attributes: `#dac132` (golden)
- Background: `#000000` (pure black)
- All colors should work in dark mode only

### Linting Rules
- No console.log allowed (except console.info, console.warn, console.error)
- Prefer const over let
- Arrow functions must use expression bodies when possible
- TypeScript unused vars are enforced

## Testing
- Jest is configured with jest-expo preset
- No tests currently exist
- Test infrastructure is ready: run `npm test`

## Common Gotchas

1. **BASE_DATE is critical:** Don't change it unless intentionally shifting the global campaign schedule.

2. **Week/day indexing:** DataContext uses 0-indexed (0-6), but JSON data uses 1-indexed (1-7). Pay attention to conversions.

3. **React version conflicts:** Never add `overrides` section to package.json that conflicts with direct React dependency.

4. **Font sizing:** Always use InputLabel, never bare Text components.

5. **Date calculations:** The app calculates "today" when it comes to foreground. Be aware of this when debugging date-related issues.

6. **Bible data size:** Each data JSON file is ~1969 lines. Performance is fine because it's loaded once and cached.

## Resources

- **Documentation:** `/docs/README.md` - Comprehensive project docs
- **Memories:** `/docs/memories/campanha-memories.md` - Project history
- **Expo Docs:** https://docs.expo.dev/
- **expo-router Docs:** https://docs.expo.dev/router/introduction/

## Support

- **Owner:** willcrisis
- **Bundle ID:** com.willcrisis.campanha
- **App URL:** https://abre.ai/campanhadelouvor
