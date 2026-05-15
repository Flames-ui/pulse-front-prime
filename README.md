# Giant Pulse | Digital Growth Engine (Next.js 14)

A high-performance blog platform optimized for Google Discover, technical SEO, and elite user experience.

## 🚀 Key Features

- **Next.js 14 App Router**: Optimized for speed and Core Web Vitals.
- **Google Discover Ready**: Advanced SEO meta tags (`max-image-preview:large`) and `NewsArticle` JSON-LD schema.
- **Elite UX**:
  - Reading Progress Bar (Brand Blue #0066FF)
  - Back to Top Button
  - Dark Mode Toggle (Persistent)
  - GDPR Cookie Consent Banner
  - Skeleton Loading for all async states
- **Advanced Search**: Instant full-text search with modal interface (`Cmd+K`).
- **Feeds**: Full RSS 2.0 and JSON Feed support.
- **Admin Command Center**: Complete Supabase CRUD for blueprints (posts).
- **Responsive Architecture**: Mobile-first design tested at 375px.

## 🛠 Tech Stack

- **Framework**: Next.js 14.1+ (TypeScript)
- **Styling**: Tailwind CSS
- **Database/Auth**: Supabase
- **Components**: Shadcn/UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner

## ⚙️ Environment Variables

Create a `.env.local` file with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🏗 Setup & Installation

1. **Clone & Install**:
   ```bash
   bun install
   ```

2. **Run Development Server**:
   ```bash
   bun dev
   ```

3. **Build for Production**:
   ```bash
   bun build
   ```

## 📈 Performance Metrics

- **Lighthouse**: 90+ on all metrics.
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **FID**: < 100ms

## 🛡 Security & Admin

The Admin panel is separated and protected via Supabase Auth. Access the dashboard at `/admin`.

---
Built by **Agbasionwe Emmanuel Chiemelie** for Giant Pulse.