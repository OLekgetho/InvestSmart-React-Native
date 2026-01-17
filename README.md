# InvestSmart – React Native Mobile App

[![Expo](https://img.shields.io/badge/Expo-51+-purple)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.75+-blue)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/Styling-NativeWind-38BDF8)](https://www.nativewind.dev)

## Overview

InvestSmart is a cross-platform mobile investment app built with React Native and Expo. It provides users with financial market information, portfolio overview, and investment insights using the InvestSmart backend services.

This app serves as the user-facing frontend of the InvestSmart ecosystem and communicates with your Spring Boot backend to display data, interact with user accounts, and present market information in a mobile-friendly UI.

This app communicates exclusively with the Spring Boot backend, which orchestrates business logic and financial data retrieval.

### Core idea:
*The mobile app focuses purely on user experience and presentation, while all business logic lives on the backend*


## Purpose of This App

The React Native app exists to:

* Provide a mobile-first interface for InvestSmart users
* Display investment portfolios and market-related data
* Communicate securely with the Spring Boot backend
* Present financial data in a user-friendly and responsive UI
* Serve as a cross-platform solution (Android & iOS)

*This app does not fetch market data directly and does not contain business logic.*

### System Architecture

*The InvestSmart application follows a multi-backend architecture:*

```sh
┌─────────────────────┐
│  React Native App   │
│  (Expo Go)          │
└─────────▲───────────┘
          │ 
          │
┌─────────┴───────────┐
│  Spring Boot API    │
│  (Main Backend)     │
│                     │
│ - Business Logic    │
│ - Users             │
│ - Portfolios        │
│ - Validation        │
└─────────▲───────────┘
          │ REST API
          │
┌─────────┴───────────┐
│ Python YFinance API │
│ (This Service)      │
│                     │
│ - Market Data       │
│ - Historical Prices │
│ - Data Formatting   │
└─────────▲───────────┘
          │
          │ yfinance
          │
┌─────────┴───────────┐
│ Yahoo Finance       │
│ (External Provider) │
└─────────────────────┘

```

## Quick Start
### Prerequisites

* Node.js (LTS recommended)
* npm or yarn
* Expo CLI
* Expo Go app (for physical device testing)

### Local Development

```sh
# 1. Clone the repository
git clone https://github.com/OLekgetho/InvestSmart-React-Native.git
cd InvestSmart-React-Native

# 2. Install dependencies
npm install

# 3. Start the Expo development server
npx expo start
```

## Feedback & Contributions

Contributions, suggestions, and improvements are welcome.
If you’d like to extend this service, optimize performance, or integrate additional data sources, feel free to open an issue or submit a pull request.


#### *Made with ❤️ © 2025–2026 Ofentse Lekgetho*
