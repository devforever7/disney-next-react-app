# Disney Character Explorer

A Next.js application showcasing Disney characters with modern web development practices and optimal performance.

## 🚀 Deployment & Setup

[Live Demo](https://disney-next-react-app.vercel.app/)

### Quick Start

```bash
npm install -g pnpm
pnpm install
pnpm run dev
```

### Available Routes

- `/` - Home page with featured characters and local search
- `/search` - Full search functionality with API integration
- `/character/:id` - Individual character details
- `/profile` - User profile view
- `/profile/edit` - Profile management

## 🛠 Core Features

### Framework & Tools

- **Next.js 15+** - Server-side rendering, static optimization, image optimization, API routes
- **PNPM** - Efficient package management with hard linking and strict dependency control
- **TypeScript** - Type safety and enhanced developer experience
- **React Query** - Client state management and caching

### Performance Features

- **Rendering Optimizations**

  - Server-side rendering for character profile pages and some for home page
  - Static generation for featured content
  - Debounced search with client-side caching

- **Image Optimization**
  - Prefer AVIF format (50-90% smaller than JPEG)
  - WebP fallback support
  - Above-the-fold priority loading for character profile pages
  - Lazy loading for grid content

### User Interface

- Responsive and accessible design
- Navigation menu via avatar button
- Skeleton loading states and error boundaries
- Search with query parameters
- HTTP-only cookies for secure profile management

### Development Quality

- ESLint & Prettier configuration
- Jest & React Testing Library setup
- Unit testing for server and client components, hooks, server actions and utils.

### Follow-up

- Add more tests
- Add pagination to search results
- Move `<nav />` element outside of `<main/>` tag (`NavMenu` component)
- Ensure `NavMenu` traps focus within itself when open
- Create `Navigation` component in `components/layout` directory to handle navigation, and to consolidate `NavMenu` and `SearchBar` components.

## 📝 License & Attribution

This project uses the Disney API for educational purposes only. All character content belongs to Disney.
both
