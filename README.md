# Disney Character Explorer

A Next.js application showcasing Disney characters with modern web development practices and optimal performance.

## 🚀 Deployment

The application is deployed and accessible at:
[https://disney-next-react-app.vercel.app/](https://disney-next-react-app.vercel.app/)

### Navigation

- The main navigation is available on the search and home pages via the avatar button on the top right, next to the search bar.

### Available Routes

- `/` - Home page with featured characters and local search
- `/search` - Full search functionality with debounced API calls, caching, skeleton loading states, and query parameters
- `/character/:id` - Individual character details and media appearances
- `/profile` - User profile view with Disney preferences
- `/profile/edit` - Profile creation and editing interface

All production routes are protected and require authentication (Github/Gitlab/email) through Vercel's platform.

## ⚙️ Technology Choices

### PNPM Package Manager

- Faster installation times through efficient hard linking
- Disk space optimization with content-addressable storage
- Strict dependency management preventing phantom dependencies
- Better monorepo support (though not used in this project)

### Next.js Framework

- Server-side rendering for optimal performance and SEO
- Static optimization and pregeneration where applicable
- Built-in image optimization with next/image
- API routes and server actions for backend functionality
- Efficient page routing and dynamic paths
- Meta framework benefits (TypeScript, file-based routing)

### Performance Optimizations

- Debounced search with React Query caching for efficient API calls
- Skeleton loading states for better UX
- Server-side rendering for initial page loads
- Build-time pre-generation and server-side caching of featured characters
- Client-side navigation for smooth transitions
- Advanced image optimization:
  - AVIF format prioritized for superior compression and quality (50-90% smaller than JPEG)
  - WebP fallback for broader browser support
  - Priority loading for above-the-fold character images
  - Lazy loading for grid and featured images
- HTTP-only cookies for secure profile management

### User Experience

- Responsive design across all device sizes
- Accessible navigation with keyboard support
- Semantic HTML structure
- Loading states (like skeleton tiles for search) and error boundaries
- Clean and intuitive UI/UX

## 🛠 Setup & Installation

1. Install PNPM globally (if not already installed):

```bash
npm install -g pnpm
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm run dev
```

4. For production:

```bash
pnpm run build
pnpm run start
```

5. Main routes

- /
- /character/[id]
- /profile
- /profile/edit
- /search

## 🌟 Features

- Character search with skeleton loading states, query parameters, caching and debounced API calls
- Profile management with server-side storage
- Detailed character information pages
- Responsive navigation menu
- Featured characters section that is statically generated at build time and revalidated every hour
- Error handling and loading states

## 🔍 Technical Details

- Server-side rendering for `/character/[id]` and profile pages, and some for home
- Static pregeneration and caching for featured characters
- Debounced client-side search with skeleton loading states, query parameters and React Query for caching
- HTTP-only cookies for secure profile storage
- Next.js Image component for optimal image loading (lazy/priority loading, prefer avif format)
- CSS Modules for scoped styling
- TypeScript for type safety
- Accessibility features throughout
- Code Quality Enforcement:
  - ESLint configuration with Next.js and TypeScript rules
  - Prettier formatting with standardized rules
  - Available npm scripts:
    - `pnpm lint` - Check for code quality issues with ESLint
    - `pnpm format` - Auto-format all files with Prettier
    - `pnpm format:check` - Verify formatting compliance with Prettier
- Comprehensive unit testing setup with Jest and React Testing Library
- Isolated server and client component testing with proper mocking strategies
- Testing for date utility function

## 📋 Future Enhancements

### Navigation & Layout

- Refactor navigation implementation for better accessibility and user experience
  - Move NavMenu component with `<nav>` tag outside of `<main>` tag
  - Standardize navigation pattern across all routes
  - Navigation menu is currently limited to top right avatar button usage on home and search pages

### Functionality

- Add pagination support for search results
  - Current implementation limited to 8 results per query
  - Prepare for scaling with larger result sets
  - Consider implementing infinite scroll as alternative

### Testing

✅ Current Test Coverage:

- Unit tests for core server and client components (Character profile page, SearchBar, ClientHomeContent)
- Date utility function tests
- Proper test isolation with mocked data

🔄 Future Test Improvements:

- Add integration tests for search functionality
- Expand component test coverage
- Add E2E tests for critical user flows
- Test error boundaries and loading states

This project uses the Disney API for educational purposes only. All character content belongs to Disney.
