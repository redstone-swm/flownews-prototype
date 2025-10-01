# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server on port 3000
- `npm run start` - Alias for dev command
- `npm run build` - Build for production (runs vite build && tsc)
- `npm run serve` - Preview production build
- `npm run test` - Run Vitest tests

### Mobile Development
- `npm run android` - Build and sync to Android platform, then open in Android Studio

### Storybook
- `npm run storybook` - Start Storybook dev server on port 6006
- `npm run build-storybook` - Build Storybook for production
- `npm run chromatic` - Deploy to Chromatic for visual testing

## Project Architecture

This is a **React-based mobile-first news application** built with modern web technologies and deployed as a Capacitor hybrid app.

### Technology Stack
- **Frontend**: React 19 + TypeScript
- **Mobile**: Capacitor 7 (hybrid mobile app framework)
- **Routing**: TanStack Router with file-based routing
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Testing**: Vitest with Playwright browser testing
- **UI Components**: Radix UI primitives with custom styling
- **Firebase**: Push notifications and messaging
- **API**: Auto-generated API clients from OpenAPI using Orval

### Application Structure

#### Core Features
- **News Topic Flow**: Carousel-based topic browsing with timeline events
- **User Authentication**: OAuth-based login with token management
- **Push Notifications**: Firebase FCM integration for native mobile notifications
- **Feedback System**: User feedback collection for topics and suggestions
- **Mobile-First**: Optimized for mobile devices with native app deployment

#### Key Architectural Patterns

**Authentication Flow**:
- Context-based auth state (`src/contexts/AuthContext.tsx`)
- Token stored in Capacitor storage
- Automatic token refresh and user data fetching

**Data Management**:
- TanStack Query for all server state
- Custom hooks for API operations (`src/hooks/`)
- Auto-generated API clients from OpenAPI spec using Orval

**Routing Structure**:
```
/                    - Main topic carousel page
/topics/{topicId}    - Individual topic timeline
/topics/{topicId}/events/{eventId} - Specific event view
/auth/login         - Authentication page
/auth/callback      - OAuth callback handler
```

**Component Organization**:
- `components/ui/` - Reusable UI primitives (shadcn/ui)
- `components/topic/` - Topic-specific components
- `components/auth/` - Authentication components
- `components/feedback/` - User feedback modals and forms
- `components/layout/` - Navigation and layout components

#### API Integration
- OpenAPI specification drives API client generation
- Orval config generates TypeScript clients for topic-related endpoints
- Custom API modules for user management and feedback
- Axios-based HTTP client with authentication interceptors

#### Mobile-Specific Features
- Capacitor integration for native device features
- Push notification handling with deep linking
- Native storage for tokens and preferences
- Custom URL scheme handling for deep links

### Development Workflow

**API Changes**: When OpenAPI spec changes, regenerate API clients:
1. Update `openapi.yaml`
2. Run `npx orval` to regenerate API clients
3. Update imports and types as needed

**Mobile Testing**: Use `npm run android` to test on Android devices or emulator.

**Component Development**: Use Storybook for isolated component development and testing.

### Key Dependencies Note
- Uses React 19 (latest)
- TanStack Router for type-safe routing
- Capacitor 7 for mobile deployment
- Firebase for push notifications
- Orval for API client generation from OpenAPI specs