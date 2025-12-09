export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  
  // Fetch the original blog.html
  const baseUrl = url.origin;
  const blogHtmlResponse = await fetch(`${baseUrl}/blog.html`);
  let html = await blogHtmlResponse.text();
  
  // Only modify for the specific SFML blog post
  if (slug === 'sfml-3-setup-visual-studio-insiders-windows') {
    const customImage = 'https://azanw.com/sfml-vs-preview.png';
    
    // Replace OG image
    html = html.replace(
      /<meta property="og:image" id="og-image" content="[^"]*" \/>/,
      `<meta property="og:image" id="og-image" content="${customImage}" />`
    );
    
    // Replace Twitter image
    html = html.replace(
      /<meta property="twitter:image" id="twitter-image" content="[^"]*" \/>/,
      `<meta property="twitter:image" id="twitter-image" content="${customImage}" />`
    );
  }
  
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
