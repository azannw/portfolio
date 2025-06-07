# Azan Waseem - Portfolio Website

A modern, dark-themed portfolio website built with React, TypeScript, and TailwindCSS. Features a terminal/hacker aesthetic with smooth animations and responsive design.

## 🚀 Features

- **Dark Theme**: Professional dark color scheme with red accents
- **Terminal Aesthetic**: Hacker-style design with monospace fonts
- **Responsive Design**: Works perfectly on desktop and mobile
- **Dynamic IP Display**: Fetches real user IP address
- **Typewriter Animations**: Smooth text animations in hero section
- **Blog System**: Markdown-powered blog with syntax highlighting
- **Social Sharing**: Share blog posts on WhatsApp, Facebook, LinkedIn
- **Fixed Navigation**: Smooth scrolling navigation bar
- **Community Section**: CS Connect Pakistan information

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Vite** - Build tool
- **React Markdown** - Blog post rendering
- **Rehype Highlight** - Syntax highlighting

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/azannw/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🌐 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Configure custom domain if needed

### Vercel/Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## 📝 Content Management

### Adding Blog Posts
1. Add new blog posts to `src/utils/blogLoader.ts`
2. Follow the existing format with frontmatter
3. Posts automatically appear in the blog section

### Updating Projects
1. Edit the projects array in `src/components/Projects.tsx`
2. Add project details, links, and descriptions

## 🎨 Customization

### Colors
- Primary: `#1a1a1a` (Dark background)
- Accent: `#ff4c4c` (Red)
- Text: `#e0e0e0` (Light gray)

### Fonts
- Display: Space Grotesk
- Mono: JetBrains Mono
- Sans: Inter

## 📱 Responsive Breakpoints

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🔗 Links

- **Website**: [csconnect.pk](https://csconnect.pk)
- **GitHub**: [azannw](https://github.com/azannw)
- **LinkedIn**: [azanw](https://linkedin.com/in/azanw)
- **YouTube**: [@csconnectpk](https://youtube.com/@csconnectpk)

## 📄 License

MIT License - feel free to use this code for your own portfolio!

---

Built with ❤️ by [Azan Waseem](https://github.com/azannw) 