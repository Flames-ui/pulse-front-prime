import React from 'react';
import { CEO_NAME } from '@/lib/data';

export const metadata = {
  title: "Privacy Policy | Giant Pulse",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-20">
      <div className="max-w-3xl mx-auto blog-content">
        <h1>PRIVACY PROTOCOL</h1>
        <p>Your data is yours. Giant Pulse only collects the minimum required information to deliver high-performance content and maintain our growth engine.</p>
        <h2>Data Collection</h2>
        <p>We collect email addresses for our newsletter and technical data (cookies) to optimize site performance.</p>
        <h2>Third Parties</h2>
        <p>We use Supabase for database management and Vercel for hosting. Both comply with global security standards.</p>
        <p>Last updated: May 2026.</p>
      </div>
    </div>
  );
}