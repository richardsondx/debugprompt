'use client';

import Script from 'next/script'

/**
 * @input None - Component is self-contained and doesn't accept props
 * @output Renders Google Analytics scripts for tracking
 */

/**
 * GoogleAnalytics Component
 * Implements Google Analytics tracking for the application
 */
export default function GoogleAnalytics() {
  return (
    <>
      {/* Step 1: Load Google Analytics Tag */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4K9C2NJZMH"
        strategy="afterInteractive"
      />
      
      {/* Step 2-4: Initialize and configure Google Analytics */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4K9C2NJZMH');
        `}
      </Script>
    </>
  )
}
