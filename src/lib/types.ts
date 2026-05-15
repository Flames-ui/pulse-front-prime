export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  altText: string;
  category: string;
  tags: string[];
  author: string;
  authorAvatar: string;
  authorBio: string;
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  viewCount: number;
  featured: boolean;
  status: 'draft' | 'published';
  templateId?: number;
  faqs: { question: string; answer: string }[];
  reactions: {
    helpful: number;
    notHelpful: number;
    like: number;
    heart: number;
    insightful: number;
  };
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  description: string;
  color: string;
}

export interface Tag {
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  createdAt: string;
  status: string;
  reactions: { like: number; heart: number; insightful: number };
  replies: Reply[];
}

export interface Reply {
  id: string;
  commentId: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  createdAt: string;
  reactions: { like: number; heart: number; insightful: number };
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  ownerName: string;
  contactEmail: string;
  siteUrl: string;
  logoUrl?: string;
  faviconUrl?: string;
  defaultAuthor: string;
  postsPerPage: number;
  googleAnalyticsId: string;
  searchConsoleTag: string;
  socials: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    whatsapp?: string;
  };
  adsense: {
    publisherId?: string;
    slots: {
      header?: string;
      inContent?: string;
      sidebar?: string;
      footer?: string;
    };
    enabled: boolean;
  };
  newsletter: {
    enabled: boolean;
  };
}