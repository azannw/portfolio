import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { BlogPost, loadBlogPosts } from '../utils/blogLoader'
import ShareButtons from './ShareButtons'

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blogPosts = await loadBlogPosts()
        setPosts(blogPosts)
      } catch (error) {
        console.error('Error loading blog posts:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

  if (selectedPost) {
    return (
      <section className="min-h-screen py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-dark-bg">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedPost(null)}
            className="font-mono text-accent-red hover:underline mb-8 flex items-center transition-colors"
          >
            ← back to posts
          </button>
          
          <article className="max-w-none">
            <div className="mb-12">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-light-text mb-6 leading-tight">
                {selectedPost.title}
              </h1>
              <div className="font-mono text-gray-400 text-sm">
                Published on {new Date(selectedPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            
            <div className="prose-custom">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl md:text-3xl font-bold font-display text-light-text mt-12 mb-6 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl md:text-2xl font-bold font-display text-light-text mt-10 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg md:text-xl font-semibold font-display text-light-text mt-8 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-300 leading-relaxed mb-6 font-sans text-lg">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none text-gray-300 mb-6 space-y-3 ml-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-gray-300 mb-6 space-y-3 ml-4">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start">
                      <span className="text-accent-red mr-3 mt-1 flex-shrink-0">→</span>
                      <span className="font-sans text-lg leading-relaxed">{children}</span>
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-accent-red pl-6 my-6 italic text-gray-400">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className
                    if (isInline) {
                      return (
                        <code className="bg-gray-800 text-accent-red px-2 py-1 rounded font-mono text-sm border border-gray-700">
                          {children}
                        </code>
                      )
                    }
                    return <code className={className}>{children}</code>
                  },
                  pre: ({ children }) => (
                    <pre className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-6 overflow-x-auto">
                      {children}
                    </pre>
                  ),
                  a: ({ children, href }) => (
                    <a 
                      href={href} 
                      className="text-accent-red hover:underline transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-light-text font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-gray-300 italic">{children}</em>
                  )
                }}
              >
                {selectedPost.content}
              </ReactMarkdown>
            </div>
            
            {/* Share Buttons */}
            <div className="mt-12 mb-8">
              <ShareButtons 
                title={selectedPost.title}
                url={window.location.href}
              />
            </div>
            
            {/* Go to Homepage Button */}
            <div className="mt-8">
              <button
                onClick={() => {
                  setSelectedPost(null);
                  const heroElement = document.getElementById('hero');
                  if (heroElement) {
                    heroElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="font-mono text-accent-red hover:underline transition-colors flex items-center gap-2"
              >
                → go to homepage
              </button>
            </div>
          </article>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-2xl md:text-3xl font-bold mb-12 text-light-text">
          ~/blog
        </h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="font-mono text-gray-400">Loading posts...</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="font-mono text-gray-400 mb-4">No blog posts found</div>
            <p className="text-gray-500 font-sans">
              Add .md files to the blog directory to see posts here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="cursor-pointer group"
                onClick={() => setSelectedPost(post)}
              >
                <div className="font-mono mb-2">
                  <span className="text-accent-red">$</span>
                  <span className="text-light-text ml-2">cat {post.slug}.md</span>
                </div>
                
                <div className="ml-4 border-l-2 border-gray-600 pl-4 pb-6">
                  <h3 className="font-display text-xl font-semibold text-light-text mb-3 group-hover:text-accent-red transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-3 font-sans leading-relaxed">
                    {post.excerpt}
                  </p>
                  <p className="font-mono text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Blog 