import { Post, Category, Tag } from './types';

export const CEO_NAME = "Agbasionwe Emmanuel Chiemelie";
export const CEO_AVATAR = "https://storage.googleapis.com/dala-prod-public-storage/attachments/6a68ec0b-f5d7-47ed-9279-9a0df21e2924/1778791119180_FB_IMG_1774710278214.jpg";
export const CEO_BIO = "Founder of Giant Pulse. Committed to making the digital economy accessible through clear, helpful, and honest strategies. Architect of high-performance content ecosystems.";

export const CATEGORIES: Category[] = [
  { name: 'Blogging', slug: 'blogging', count: 42, description: 'Learn how to start and grow a successful blog.', color: '#0066FF' },
  { name: 'Monetization', slug: 'monetization', count: 35, description: 'Simple ways to make money from your work.', color: '#FF6B00' },
  { name: 'SEO', slug: 'seo', count: 48, description: 'How to show up on Google so your readers can find you.', color: '#0A0F1E' },
  { name: 'Tools', slug: 'tools', count: 29, description: 'The best tools to help you create better content.', color: '#22C55E' },
  { name: 'Case Studies', slug: 'case-studies', count: 24, description: 'Real stories of successful blogs.', color: '#A855F7' },
];

const IMAGES = [
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/e2ece76b-b86a-4302-8d56-503f7b107d3b/hero-image-1-4189d7c2-1778817233713.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/e2ece76b-b86a-4302-8d56-503f7b107d3b/hero-image-2-694246a3-1778817234348.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/e2ece76b-b86a-4302-8d56-503f7b107d3b/hero-image-3-936870c5-1778817234277.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/e2ece76b-b86a-4302-8d56-503f7b107d3b/hero-image-4-b55975a9-1778817234240.webp"
];

const mainTitles = [
  "How to Start a Blog That People Love to Read",
  "Simple Ways to Make Money from Your Website",
  "How to Get More People to Visit Your Blog",
  "The Best Easy Tools for New Bloggers",
  "A Step-by-Step Guide to Success with SEO",
  "Why Using Simple Language Helps You Grow Faster",
  "How to Answer Your Readers' Biggest Questions",
  "Practical Tips for Growing Your Online Audience",
  "How to Build Trust with Your Readers Every Day",
  "The Only Guide You Need to Start Monetizing Your Content"
];

export const MOCK_POSTS: Post[] = mainTitles.map((title, i) => ({
  id: `${i + 1}`,
  title,
  slug: title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/ +/g, '-'),
  excerpt: `Learn exactly how to master ${title} with this comprehensive guide from Agbasionwe Emmanuel Chiemelie.`,
  content: `
    <h2>The Foundation of ${title}</h2>
    <p>Success in the digital landscape isn't about complexity; it's about clarity. When we talk about ${title}, we're looking at a fundamental shift in how creators interact with their audience.</p>
    <h3>Step 1: Define Your Purpose</h3>
    <p>Before you dive into the technical details, you must understand your 'why'. Why are you pursuing ${title}? What is the end goal for your readers?</p>
    <img src="${IMAGES[(i + 1) % IMAGES.length]}" alt="Architecture of digital success" />
    <h3>Step 2: Execution and Consistency</h3>
    <p>Consistency is the currency of the internet. You don't need a massive team; you need a sustainable system.</p>
    <blockquote>"The best time to start was yesterday. The second best time is right now." — Agbasionwe Emmanuel Chiemelie</blockquote>
  `,
  featuredImage: IMAGES[i % IMAGES.length],
  altText: `High-performance visual for ${title}`,
  category: CATEGORIES[i % CATEGORIES.length].name,
  tags: [CATEGORIES[i % CATEGORIES.length].slug, 'growth', 'masterclass'],
  author: CEO_NAME,
  authorAvatar: CEO_AVATAR,
  authorBio: CEO_BIO,
  publishedDate: `2026-05-${10 + i}`,
  updatedDate: `2026-05-${12 + i}`,
  readTime: `${8 + i} min read`,
  viewCount: 4500 + (i * 1234),
  featured: i < 3,
  status: 'published',
  templateId: i % 6,
  faqs: [
    { question: `Is ${title} still viable in 2026?`, answer: "Absolutely. In fact, it is more important than ever to have a clear strategy." },
  ],
  reactions: { helpful: 120 + i, notHelpful: 2, like: 80 + i, heart: 40 + i, insightful: 30 + i }
}));

// Added missing functions for old pages
export async function getCategoryBySlug(slug: string) {
  return CATEGORIES.find(c => c.slug === slug) || null;
}

export async function getPostsByCategory(categoryName: string) {
  const posts = MOCK_POSTS.filter(p => p.category === categoryName);
  return { posts, total: posts.length };
}

export async function getTagBySlug(slug: string) {
  return { name: slug, slug };
}

export async function getPostsByTag(tagSlug: string) {
  const posts = MOCK_POSTS.filter(p => p.tags.includes(tagSlug));
  return { posts, total: posts.length };
}