# React Native Clean Architecture Template 🚀

A robust, production-ready React Native template built with **Clean Architecture**, **TypeScript**, and **AI-First** principles. This project serves as a foundational starting point for scalable mobile applications, featuring a modular structure and pre-configured essential libraries.

> **Tip:** This template is designed to work seamlessly with a companion **CLI tool** that extracts modular pieces (Theme, Components, Navigation, Network, Firebase, etc.) to jumpstart your development.

## 📂 Project Structure

The project follows a **Modular Architecture**. Each feature is a self-contained module in `src/modules/` containing its own layers:

```
src/
├── components/       # Shared UI components (Core & Form)
├── config/           # App-wide configuration (API, Storage)
├── modules/          # Feature Modules
│   ├── authentication/
│   ├── products/     # Example CRUD module
│   └── examples/     # UI Component Showcase
├── navigation/       # Root navigation configuration
├── providers/        # App-wide providers (Theme, Auth, QueryClient)
└── theme/            # Design tokens (Colors, Typography, Spacing)
```

### Module Anatomy (Clean Architecture)
Each module (e.g., `src/modules/products/`) is divided into:
1.  **Domain:** Entities, Repository Interfaces, Errors (Pure TS, no React/Lib dependencies).
2.  **Application:** Use Cases, State Management (Zustand/Query), Logic.
3.  **Infrastructure:** API calls, Database implementation, Third-party adapters.
4.  **UI:** Screens, Components, Navigation.

## 🚀 Getting Started

### Prerequisites
- Node.js (v22+ recommended)
- Ruby (for CocoaPods)
- JDK 17+
- Android Studio & Xcode (for iOS)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/alejandro-technology/react-native-template.git
    cd rncatemplate
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install iOS Pods:**
    ```bash
    cd ios && bundle install && bundle exec pod install && cd ..
    # or
    npm run pod-cocoa && npm run pod-install
    ```

### Running the App

- **Start Metro Bundler:**
  ```bash
  npm start
  ```

- **Run on iOS:**
  ```bash
  npm run ios
  ```

- **Run on Android:**
  ```bash
  npm run android
  ```

## 🛠 Available Scripts

- `npm run lint`: Run ESLint.
- `npm run test`: Run Jest tests.
- `npm run clean-android`: Deep clean Android build.
- `npm run clean-ios`: Deep clean iOS build (DerivedData + Pods).
- `npm run clean-watch`: Reset Watchman (fixes Metro issues).

## 🧩 Included Modules

- **Authentication:** Complete Sign In / Sign Up flow with Firebase integration.
- **Products:** A full CRUD example demonstrating the 4-layer architecture with listing, details, and creation forms.
- **Users:** A module for user profile management.
- **Examples:** A gallery of UI components to visualize the design system.

---
