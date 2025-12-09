export const config = {
  runtime: 'edge',
};

// Blog post images mapping
const blogImages = {
  'sfml-3-setup-visual-studio-insiders-windows': 'https://azanw.com/sfml-vs-preview.png',
  // Add more custom images here as needed
};

// Blog post titles mapping
const blogTitles = {
  'sfml-3-setup-visual-studio-insiders-windows': 'Complete Guide to Setting up SFML 3 in Visual Studio Community Insiders on Windows',
};

// Blog post descriptions mapping  
const blogDescriptions = {
  'sfml-3-setup-visual-studio-insiders-windows': 'A step-by-step setup that actually works for SFML 3 with Visual Studio Community Insiders on Windows.',
};

export default async function handler(request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  
  // If no slug provided, redirect to homepage blog section
  if (!slug) {
    return Response.redirect(`${url.origin}/#blog`, 302);
  }
  
  // Fetch the original blog.html directly  
  const baseUrl = url.origin;
  const blogHtmlUrl = `${baseUrl}/blog.html?slug=${slug}`;
  const blogHtmlResponse = await fetch(blogHtmlUrl, {
    headers: {
      'Accept': 'text/html',
    },
  });
  
  if (!blogHtmlResponse.ok) {
    return new Response('Blog template not found', { status: 404 });
  }
  
  let html = await blogHtmlResponse.text();
  
  // Get custom image for this slug, or use default
  const customImage = blogImages[slug] || 'https://azanw.com/link-preview.png';
  const customTitle = blogTitles[slug] || 'Blog | Azan Waseem';
  const customDescription = blogDescriptions[slug] || 'Thoughts on software, community, and technology.';
  const pageUrl = `https://azanw.com/blog?slug=${slug}`;
  
  // Replace OG meta tags
  html = html.replace(
    /<meta property="og:image" id="og-image" content="[^"]*" ?\/?>/,
    `<meta property="og:image" id="og-image" content="${customImage}" />`
  );
  
  html = html.replace(
    /<meta property="og:title" id="og-title" content="[^"]*" ?\/?>/,
    `<meta property="og:title" id="og-title" content="${customTitle}" />`
  );
  
  html = html.replace(
    /<meta property="og:description" id="og-description" content="[^"]*" ?\/?>/,
    `<meta property="og:description" id="og-description" content="${customDescription}" />`
  );
  
  html = html.replace(
    /<meta property="og:url" id="og-url" content="[^"]*" ?\/?>/,
    `<meta property="og:url" id="og-url" content="${pageUrl}" />`
  );
  
  // Replace Twitter meta tags
  html = html.replace(
    /<meta property="twitter:image" id="twitter-image" content="[^"]*" ?\/?>/,
    `<meta property="twitter:image" id="twitter-image" content="${customImage}" />`
  );
  
  html = html.replace(
    /<meta property="twitter:title" id="twitter-title" content="[^"]*" ?\/?>/,
    `<meta property="twitter:title" id="twitter-title" content="${customTitle}" />`
  );
  
  html = html.replace(
    /<meta property="twitter:description" id="twitter-description" content="[^"]*" ?\/?>/,
    `<meta property="twitter:description" id="twitter-description" content="${customDescription}" />`
  );
  
  html = html.replace(
    /<meta property="twitter:url" id="twitter-url" content="[^"]*" ?\/?>/,
    `<meta property="twitter:url" id="twitter-url" content="${pageUrl}" />`
  );
  
  // Update page title
  html = html.replace(
    /<title id="page-title">[^<]*<\/title>/,
    `<title id="page-title">${customTitle} | Azan Waseem</title>`
  );
  
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
