import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://giantpulse.name.ng'),
  title: {
    default: 'GIANT PULSE | MASTER YOUR DIGITAL ENGINE',
    template: '%s | GIANT PULSE',
  },
  description: 'High-performance blueprints for digital growth and content architecture.',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': '/feed.xml',
      'application/json': '/feed.json',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://giantpulse.name.ng',
    siteName: 'Giant Pulse',
    images: [
      {
        url: '/api/og?title=MASTER%20YOUR%20DIGITAL%20ENGINE&category=SYSTEM%20READY',
        width: 1200,
        height: 630,
        alt: 'Giant Pulse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@giantpulse',
    creator: '@giantpulse',
  },
};