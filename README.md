# Disney Character Explorer

A Next.js application showcasing Disney characters with modern web development practices and optimal performance.

## 🚀 Deployment

The application is deployed and accessible at:
[https://disney-next-react-app.vercel.app/](https://disney-next-react-app.vercel.app/)

### Navigation

- The main navigation is available on the search and home pages via the avatar button on the top right, next to the search bar.

### Available Routes

- `/` - Home page with featured characters and local search
- `/search` - Full search functionality with debounced API calls
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
- Automatic static optimization where applicable
- Built-in image optimization with next/image
- API routes and server actions for backend functionality
- Efficient page routing and dynamic paths
- Meta framework benefits (TypeScript, file-based routing)

### Performance Optimizations

- Debounced search with React Query for efficient API calls
- Skeleton loading states for better UX
- Server-side rendering for initial page loads
- Client-side navigation for smooth transitions
- Image optimization and lazy loading
- HTTP-only cookies for secure profile management

### User Experience

- Responsive design across all device sizes
- Accessible navigation with keyboard support
- Semantic HTML structure
- Loading states (like skeleton tiles for search) and error boundaries
- Clean and intuitive UI

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

- Character search with debounced API calls
- Profile management with server-side storage
- Detailed character information pages
- Responsive navigation menu
- Featured characters section that is statically generated at build time and revalidated every hour
- Error handling and loading states

## 🔍 Technical Details

- Server-side rendering for `/character/[id]` and profile pages, and some for home
- Client-side search with React Query for caching
- HTTP-only cookies for secure profile storage
- Next.js Image component for optimal image loading
- CSS Modules for scoped styling
- TypeScript for type safety
- Accessibility features throughout

## 📝 Notes

Some future follow-up ideas

- I would like to add the Mickey Mouse pointer cursor to more interactive elements.
  Right now all such elements still do at least have hover color changes and good tab accessibility outlines.
- I would like to use the NavMenu component everywhere and refactor layouts a little so that the <nav> element is outside the main tag. Right now it's only used via the avatar button next to the search bar on the home and search pages.
- Pagination for search results. Right now we only return 8 results so no need yet.
- Some unit tests

This project uses the Disney API for educational purposes only. All character content belongs to Disney.
