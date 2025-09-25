# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

**Development Server:**
- `npm run dev` or `npm start` - Start development server on port 3000
- `npm run serve` - Preview production build

**Build & Type Checking:**
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run test` - Run Vitest tests

**API Generation:**
- `npm run generate:api` - Download OpenAPI spec and generate API client code
- `npm run dev:api` - Watch mode for API generation

**Mobile Development:**
- `npm run android` - Build and sync with Android Capacitor

**Storybook:**
- `npm run storybook` - Start Storybook development server on port 6006
- `npm run build-storybook` - Build Storybook for production
- `npm run chromatic` - Deploy to Chromatic

## Architecture Overview

**Framework Stack:**
- React 19 with TypeScript
- TanStack Router for file-based routing
- TanStack Query for server state management
- Capacitor for mobile app functionality
- Vite for build tooling
- Tailwind CSS + shadcn/ui components

**Project Structure:**
- `/src/routes/` - File-based routing with TanStack Router
- `/src/components/` - Reusable UI components organized by feature
- `/src/api/` - Auto-generated API client from OpenAPI spec using Orval
- `/src/contexts/` - React contexts (Auth, Theme)
- `/src/hooks/` - Custom React hooks
- `/src/pages/` - Page components
- `/src/types/` - TypeScript type definitions

**API Integration:**
- Uses Orval to generate React Query hooks from OpenAPI spec
- API client configured with custom axios instance in `src/api/axiosInstance.tsx`
- All API operations are strongly typed with 5-minute stale time

**Key Features:**
- Authentication system with Firebase integration
- Topic-based news feed with timeline visualization
- Mobile-first responsive design
- Pull-to-refresh functionality
- Push notifications via Firebase Cloud Messaging
- User activity tracking and analytics

**State Management:**
- Server state: TanStack Query with React Query hooks
- Authentication state: AuthContext provider
- Theme state: ThemeProvider for light/dark mode

**Routing Patterns:**
- Root layout in `src/routes/__root.tsx`
- Nested routes like `/topics/$topicId/events/$eventId`
- Route components export Route object with loaders for data fetching

**Component Organization:**
- UI components in `/src/components/ui/` (shadcn/ui based)
- Feature components organized by domain (topic, feed, auth, layout)
- Storybook stories for component documentation and testing