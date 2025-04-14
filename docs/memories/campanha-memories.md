# Campanha de Louvor - Project Memories

## Project Overview

The Campanha de Louvor (Praise Campaign) is a spiritual initiative focused on systematically praising God's attributes. It follows a structured 7-week cycle with each week dedicated to a specific theme of God's character. Each day within those weeks highlights a particular attribute of God with supporting Bible verses.

The campaign is designed to run continuously, automatically restarting after completing the 7-week cycle. The official start date for calculations is January 5th, 2025.

## Thematic Structure

The 7 themes of the campaign are:
1. The Love of God (O Amor de Deus)
2. The Holiness of God (A Santidade de Deus)
3. The Majesty of God (A Majestade de Deus)
4. The Justice of God (A Justiça de Deus)
5. The Faithfulness of God (A Fidelidade de Deus)
6. The Mercy of God (A Misericórdia de Deus)
7. The Integrity of God (A Integridade de Deus)

## Technical Implementation

The project uses a React Native/Expo mobile application that automatically:
- Determines the current week and day of the campaign based on the current date
- Displays the appropriate theme, attribute, and Bible verses for meditation
- Provides the full text of the relevant Bible passages
- Handles the cyclical nature of the campaign automatically

## Data Structure

Data is stored in language-specific JSON files:
- `data.pt-br.json` - Brazilian Portuguese version
- `data.en-us.json` - English version (King James Bible)

The JSON follows a hierarchical structure:
- Weeks (with themes)
  - Days (with attributes)
    - Bible references
      - Books
        - Chapters
          - Verses

## Development Notes

The English translation was created using the King James Version of the Bible while maintaining the same data structure as the original Portuguese version. Each attribute of God is paired with appropriate scripture passages that highlight and support that particular aspect of God's character.

The application's calculation logic uses the base date (January 5th, 2025) to determine the current position in the campaign cycle, ensuring users are shown the correct content for meditation each day. 