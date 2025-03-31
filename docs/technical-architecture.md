# Technical Architecture

## Overview

Campanha de Louvor is a cross-platform mobile application built using React Native and Expo. This architecture allows the app to run on both Android and iOS devices from a single codebase.

## Technology Stack

- **Frontend Framework**: React Native
- **Development Platform**: Expo
- **Language**: TypeScript/JavaScript
- **Date Handling**: date-fns library
- **State Management**: React Context API

## Key Components

### DataContext

The application uses React's Context API to provide data throughout the component tree. The `DataContext` is responsible for:

- Loading the campaign data from JSON files
- Calculating the current week and day of the campaign
- Providing the relevant theme, attribute, and Bible verses to components

### Data Storage

Campaign data is stored in static JSON files, organized by language:
- `data.pt-br.json` - Brazilian Portuguese data

### Calculation Logic

The application includes a `calculateCurrentDay` function that:
- Takes the base date from environment variables
- Calculates the current day of the campaign based on today's date
- Returns the appropriate week and day indices

## Environment Configuration

The application uses environment variables via Expo's configuration system:
- `EXPO_PUBLIC_BASE_DATE`: The starting date of the campaign in YYYY-MM-DD format 