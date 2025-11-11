# What's New Feature - Implementation Documentation

## Overview

A "What's New" popup has been implemented that displays when a new version is released (either through App Store updates or OTA updates via EAS). The popup shows a list of changes and allows users to opt out of future update notifications.

## Implementation Details

### Files Created

1. **`/contexts/WhatsNewContext.tsx`**
   - Tracks both app version (from `expo-constants`) and OTA update ID (from `expo-updates`)
   - Compares stored versions with current versions on app mount
   - Manages dialog visibility and user preferences
   - Uses `usePersistedState` hook for AsyncStorage persistence

2. **`/components/WhatsNewDialog.tsx`**
   - react-native-paper Dialog component with Portal
   - Displays version-specific content from JSON files
   - Includes checkbox to disable future update notifications
   - Respects accessibility settings (uses InputLabel)
   - Loads locale-specific content

3. **`/assets/translations/whats-new.pt-br.json`**
   - Portuguese changelog content
   - Version-keyed structure

4. **`/assets/translations/whats-new.en-us.json`**
   - English changelog content
   - Same structure as Portuguese file

### Files Modified

1. **`/app/_layout.tsx`**
   - Added WhatsNewProvider wrapping the Stack
   - Added WhatsNewDialog component
   - Positioned after AccessibilityProvider, inside DataContextProvider

## How It Works

### Version Detection

The system tracks two types of updates:

1. **App Version** (e.g., 3.1.0 → 3.2.0)
   - Detected via `Constants.expoConfig?.version`
   - Triggers on App Store/Play Store updates
   - Stored in `lastSeenAppVersion` (AsyncStorage)

2. **OTA Updates** (via EAS)
   - Detected via `Updates.updateId`
   - Triggers on over-the-air updates
   - Stored in `lastSeenUpdateId` (AsyncStorage)

### Trigger Logic

The popup shows when:
- Either app version OR OTA update ID changes
- User has not opted out via "Don't show updates" preference
- Content exists for the current version in JSON files
- NOT on first install (version is saved but dialog doesn't show)

### User Preferences

Stored in AsyncStorage:
- `lastSeenAppVersion` - Last seen app version string
- `lastSeenUpdateId` - Last seen OTA update UUID
- `dontShowUpdates` - Boolean for user opt-out preference

## Testing

### Test Scenario 1: First Install
**Expected:** No popup shows, version is saved silently

**How to test:**
1. Clear app data/reinstall app
2. Launch app
3. No popup should appear

### Test Scenario 2: Version Update
**Expected:** Popup shows with version 3.1.0 content

**How to test:**
1. Clear AsyncStorage keys:
   ```javascript
   // In a test component or console
   await AsyncStorage.removeItem('lastSeenAppVersion');
   await AsyncStorage.removeItem('lastSeenUpdateId');
   ```
2. Reload app
3. Popup should appear

### Test Scenario 3: OTA Update
**Expected:** Popup shows after OTA update is downloaded

**How to test:**
1. Publish an OTA update via EAS
2. App downloads and applies update
3. Popup should appear on next launch

### Test Scenario 4: Opt-Out Preference
**Expected:** Popup never shows again after opting out

**How to test:**
1. Check "Don't show updates" checkbox
2. Dismiss dialog
3. Clear version keys and reload
4. Popup should NOT appear

### Test Scenario 5: Missing Content
**Expected:** No popup if version not in JSON

**How to test:**
1. Change app version to 3.2.0 (in app.json)
2. Don't add 3.2.0 to JSON files
3. Clear version keys
4. Reload app
5. No popup should appear

## Adding New Version Content

When releasing a new version (e.g., 3.2.0):

1. **Edit `/assets/translations/whats-new.pt-br.json`:**
   ```json
   {
     "3.1.0": { ... },
     "3.2.0": {
       "title": "O que há de novo na versão 3.2.0",
       "items": [
         "Nova funcionalidade X",
         "Correção do bug Y",
         "Melhoria na performance Z"
       ]
     }
   }
   ```

2. **Edit `/assets/translations/whats-new.en-us.json`:**
   ```json
   {
     "3.1.0": { ... },
     "3.2.0": {
       "title": "What's New in Version 3.2.0",
       "items": [
         "New feature X",
         "Fixed bug Y",
         "Improved performance Z"
       ]
     }
   }
   ```

3. **Update version in `package.json` and `app.json`**

4. **Build and deploy**

## Content Guidelines

### Title Format
- Portuguese: "O que há de novo na versão X.Y.Z"
- English: "What's New in Version X.Y.Z"

### Items Format
- Use bullet points (rendered automatically)
- Keep items concise (1 line each)
- Start with action verbs:
  - Portuguese: "Adicionada", "Corrigida", "Melhorada", "Atualizada"
  - English: "Added", "Fixed", "Improved", "Updated"
- Focus on user-visible changes
- Group by category if needed (but keep simple)

### Best Practices
- 3-5 items per version (don't overwhelm users)
- Highlight the most important changes first
- Avoid technical jargon
- Be specific but concise

## Architecture Integration

### Provider Hierarchy
```
PaperProvider
  └─ I18nProvider
      └─ DataContextProvider
          └─ NotificationProvider
              └─ AccessibilityProvider
                  └─ WhatsNewProvider ← Added here
                      ├─ WhatsNewDialog
                      └─ Stack (routes)
```

**Why this position?**
- Inside I18nProvider: Needs locale for content
- Inside DataContextProvider: Waits for data to load first
- Inside AccessibilityProvider: Can use fontSize context
- Wraps Stack: Dialog renders on top of all routes

### Context Dependencies
- **I18nContext**: For locale detection (`locale.startsWith('en')`)
- **AccessibilityContext**: For font size (via InputLabel)
- **expo-constants**: For app version
- **expo-updates**: For OTA update detection
- **usePersistedState**: For AsyncStorage management

## Maintenance

### Pruning Old Versions
As JSON files grow, you can remove old version entries:

```json
{
  "3.0.0": { ... },  ← Can remove after most users updated
  "3.1.0": { ... },  ← Keep recent versions
  "3.2.0": { ... }   ← Current version
}
```

**Recommendation:** Keep last 2-3 versions only

### Debugging

To debug version detection:
1. Check AsyncStorage values in React DevTools
2. Console logs in WhatsNewContext show version comparisons
3. Temporarily remove `dontShowUpdates` check to always show

Common issues:
- Dialog doesn't show: Check if content exists for current version
- Dialog shows every launch: Version keys not being saved (check AsyncStorage)
- Wrong language: Check locale detection in I18nContext

## Future Enhancements (Optional)

Ideas for future improvements:
1. Add "View Previous Updates" button to show version history
2. Add images/screenshots to changelog
3. Support markdown formatting in items
4. Add analytics to track which updates users read
5. Show badge count on settings icon for unread updates
6. Deep link to specific features mentioned in changelog

## Notes

- This implementation respects the app's offline-first architecture
- No network calls required - all content bundled
- Follows existing patterns (Context API, usePersistedState, InputLabel)
- Fully integrated with i18n system
- Accessibility-friendly (respects font size preferences)
- Material Design 3 styling matches app theme
