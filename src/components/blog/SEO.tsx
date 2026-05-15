import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'collection';
  canonical?: string;
  category?: string;
  tags?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

/**
 * Robust SEO component that works in both Next.js and Vite environments.
 * Uses Helmet from react-helmet-async.
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  type = 'website',
  canonical,
  category,
  tags,
  publishedTime,
  modifiedTime,
  noindex = false,
}) => {
  const siteName = "Giant Pulse";
  const siteUrl = "https://giantpulse.name.ng";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDesc = "The ultimate resource for digital entrepreneurs. Real strategies for giant growth.";
  const fullDesc = description || defaultDesc;
  
  // Safe path detection
  const getPath = () => {
    if (typeof window === 'undefined') return '';
    return window.location.pathname.replace(/^\//, '');
  };
  
  const fullUrl = canonical || (title ? `${siteUrl}/${getPath()}` : siteUrl);
  
  const defaultImage = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/e2ece76b-b86a-4302-8d56-503f7b107d3b/giant-pulse-branding-image-6814c7d8-1778816359774.webp";
  const fullImage = image || defaultImage;

  // JSON-LD logic
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? "BlogPosting" : type === 'collection' ? "CollectionPage" : "WebSite",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "headline": title || siteName,
    "description": fullDesc,
    "image": fullImage,
    "author": {
      "@type": "Person",
      "name": "Agbasionwe Emmanuel Chiemelie",
      "url": `${siteUrl}/author/agbasionwe-emmanuel-chiemelie`
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": defaultImage
      }
    }
  };

  if (type === 'article') {
    jsonLd.datePublished = publishedTime;
    jsonLd.dateModified = modifiedTime || publishedTime;
    jsonLd.articleSection = category;
    jsonLd.keywords = tags?.join(', ');
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-image-preview:large" />}
      <link rel="canonical" href={fullUrl} />

      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@giantpulse" />

      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};