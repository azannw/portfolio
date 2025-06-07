export interface BlogPost {
  id: string
  title: string
  date: string
  content: string
  excerpt: string
  slug: string
}

// Function to parse frontmatter from markdown content
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return {
      frontmatter: {},
      content: content
    }
  }
  
  const frontmatterText = match[1]
  const markdownContent = match[2]
  
  const frontmatter: Record<string, string> = {}
  frontmatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
    }
  })
  
  return {
    frontmatter,
    content: markdownContent
  }
}

// Function to generate excerpt from content
function generateExcerpt(content: string, maxLength: number = 150): string {
  // Remove markdown syntax for excerpt
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .trim()
  
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  return plainText.substring(0, maxLength).trim() + '...'
}

// Function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Sample blog posts (these will be replaced when you add .md files)
export const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'Why is FAST so famous for its CS?',
    date: '2025-05-22',
    slug: 'fast-cs-why-famous',
    excerpt: 'I first heard about FAST when I was in my second year of college. It was my biology teacher who mentioned it casually in class.',
    content: `I first heard about FAST when I was in my second year of college. It was my biology teacher who mentioned it casually in class. He talked about FAST and GIKI, and at that time both names were completely new to me. I remember telling him, "Sir, this is very interesting stuff and our field is kinda boring." I didn't know what computer science really was, but something about that conversation stuck with me.

After that day, whenever someone mentioned computer science, FAST would almost always come up. People spoke about it like it was the gold standard. Everyone had something to say about how strong FAST's computer science program is, and I started to wonder what made it so special.

Before I actually stepped into the world of computer science, I went deep into researching FAST. I wanted to know what this university really is, why it gets so much respect, and what makes its graduates stand out. So here's what I found and what I've experienced since then.

## The Foundation

FAST was the first university in Pakistan to introduce computer science as a proper degree. It all began back in the early 80s with a small setup in Karachi. At that time it was affiliated with Karachi University and had only a handful of students, but the vision was clear even then. This wasn't someone's personal venture or a business setup. 

FAST was started as a foundation university by **Agha Hasan Abedi**, a man whose name not many people know today, but whose contribution to education in Pakistan is beyond incredible. With just some donation money and a vision to bring advanced science and technology to the country, he laid the roots of what would become one of the top tech institutions in Pakistan. From that small beginning, FAST now has campuses in six major cities and continues to grow stronger every year.

## The Ragra Culture

FAST is known for producing some of the most skilled and hardworking computer science graduates in the country. But it's not just luck. The secret behind this is something every FAST student knows too well. It's the **ragra**. Yes, the grind, the struggle, the non-stop pressure that defines student life here. 

Maybe I'll write a full blog on what ragra really means, but for now just know that FAST doesn't let you relax. The exams are difficult, the grading is strict, and the deadlines never end. But this is exactly what builds resilience and real-world skills.

## Silicon Valley Connection

There was a time when companies like Microsoft would come directly to FAST for hiring. They would visit the campus, take interviews, and pick students straight from there. The university became known for sending many of its graduates to big tech firms in Silicon Valley. Even though that direct hiring pipeline isn't active anymore, the impact it left still echoes in the tech circles of Pakistan.

The alumni network of FAST is huge and powerful. You'll find FAST graduates in companies like Google, Meta, Amazon and so many others. I was listening to a podcast where a FASTian, now working at Google, shared a story about his flight to the US. He found other FASTians on the same plane. And when he reached Google, there were even more FASTians already working there, not recent graduates, but people from the early batches who had already made their mark.

That's what amazed me. Even back then, FAST had found its way into Silicon Valley. It wasn't some recent phenomenon. The university had been quietly producing talent that made it to the top long before social media started hyping things up.

## Alumni Stories

I once interviewed a FASTian from one of the early batches, **Nauman Anwar**, and he shared a lot of his experiences from those initial days, how FAST shaped his mindset, and how the university's culture back then built the foundation for so many future success stories.

And it's not just the tech industry. Many people in Pakistan's entertainment world are also FAST graduates. You'll find them leading teams, building startups, launching products, and even creating viral content. FASTians are everywhere. From classrooms to boardrooms.

## Engineering Over Research

One thing I always found interesting is how FAST focuses more on producing strong engineers than chasing research. Unlike some other universities in Pakistan that are all about papers and publications, FAST's main goal has always been clear: **Train students so well that they can step into the industry and start contributing from day one.**

It's about preparing real-world problem solvers. People who can build startups, work under pressure, and adapt to tough environments. The four years at FAST are not easy. Surviving the program itself is an achievement. But that's what makes the graduates different. It's hard, and that's the point. If it were easy, everyone would have done it.

## The Legacy Continues

Today, even after so many years, the name still stands strong. The Foundation for Advancement of Science and Technology, known widely as FAST, and its computing school NUCES, continues to be the top choice for students who are serious about computer science.

If you've ever wondered why people talk about FAST with such respect, this is why. It's not about hype. It's about the results. The students, the alumni, the grind, the culture. All of it comes together to create something that's honestly hard to describe unless you've experienced it yourself.

And maybe that's what makes FAST so different.`
  },
  {
    id: '2',
    title: 'Transitioning from Pre-Medical to FAST',
    date: '2025-05-01',
    slug: 'pre-med-to-fast-transition',
    excerpt: 'How a Pre-Med Student Can Get Into FAST for Computing Programs? If you are a pre-medical student thinking about switching to Computer Science at FAST, the first thing you need to do is pause and ask yourself one simple question: Do I really want to do this?',
    content: `## How a Pre-Med Student Can Get Into FAST for Computing Programs?

If you are a pre-medical student thinking about switching to Computer Science at FAST, the first thing you need to do is pause and ask yourself one simple question: **Do I really want to do this?**

Because this decision changes everything.

Shifting from pre-med to Computer Science is not just about choosing another degree. It is about starting fresh with a completely different mindset. If your answer is yes, and you are fully ready to commit, then do not waste any more time. Start now.

## The Additional Mathematics Exam

The very first requirement is the **Additional Mathematics exam**. If you are from a pre-med background, FAST makes this exam compulsory for admission into CS. Passing it is not optional. If you fail, your admission will be cancelled, even if you get a great score on the entry test.

This is the point where many pre-med students feel a wave of doubt. It is natural. You have spent the past two years with biology, chemistry, and physics. Now suddenly you are expected to solve trigonometry, algebra, functions, and calculus within a few months.

It feels unfair. You start comparing yourself with students who have been doing maths for years. But here is the truth: **It is not about how much time others had. It is about how well you use your time now.**

## How to Study Smart

The best approach is not to study just for the sake of passing. **Learn the concepts deeply.** Every topic, every example, and every exercise from your textbook matters. These same concepts will return in your first-year university courses like Calculus, Digital Logic Design, and Programming. 

Some exercises are more important than others. I remember one teacher casually saying:

> "I would recommend solving this particular exercise twenty times."

He did not expect anyone to actually do that. But I did. I repeated each question in that exercise so many times that my hands started solving them automatically. It felt like I had trained my muscle memory.

That is the level of focus and repetition you need when you are short on time.

## Resources You Should Use

When it comes to preparation, you might hear people say things like, "Join KIPS" or "Go to an academy."

But honestly, **you can prepare much more effectively at home.**

- **Watch the full Hashim Zia playlist on YouTube.** It is one of the best and most complete resources for the FAST entry test.
- **Practice from KIPS books.**
- **Solve FAST past papers** to get familiar with the paper style.
- **Keep your FSc books close,** because they form your base.
- If you ever get stuck on a question, especially from KIPS books, **use the Maqsad App** (Not a paid promotion; it was genuinely helpful for me). Its doubt-solve feature is extremely helpful. You just take a picture of your question, and it gives you a clear and fast solution.

It can save hours of confusion.

## Discipline Matters More Than Hours

Another thing that really helps is having a routine. If you find it hard to stay focused at home, study at a teacher's place or somewhere outside your room. What matters is **consistency**. You do not need to study all day, but you do need to study every day.

## Entry Test Options

Once your Additional Maths exam is cleared, you can apply to FAST through one of three options:

1. **SAT**
2. **NAT**
3. **NU Entry Test**

For most students, especially those from a pre-med background, the **NU Entry Test** is the most suitable. It is designed with FAST's own format and is the easiest to prepare for using Hashim Zia's videos.

## Final Advice

In the end, remember this. Just because you did not study maths in college does not mean you cannot succeed in CS. **You are not behind. You are just coming from a different starting point.** What matters now is how committed you are and how well you manage your time and energy.

The road is not easy, but it is clear. Stay consistent. Practice with purpose. Use the right resources. Believe that you can catch up. And once you do, you will not just pass the test. You will walk into FAST with confidence, knowing you earned your seat in one of the top CS programs in Pakistan.`
  }
]

// Function to load blog posts (this will be enhanced when you add .md files)
export async function loadBlogPosts(): Promise<BlogPost[]> {
  // For now, return sample posts
  // Later, this will dynamically load from .md files
  return samplePosts
}

// Function to get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await loadBlogPosts()
  return posts.find(post => post.slug === slug) || null
}

// Function to process markdown file content into BlogPost
export function processMarkdownFile(filename: string, content: string): BlogPost {
  const { frontmatter, content: markdownContent } = parseFrontmatter(content)
  
  const title = frontmatter.title || filename.replace('.md', '').replace(/-/g, ' ')
  const date = frontmatter.date || new Date().toISOString().split('T')[0]
  const excerpt = frontmatter.excerpt || generateExcerpt(markdownContent)
  const slug = frontmatter.slug || createSlug(title)
  const id = slug
  
  return {
    id,
    title,
    date,
    excerpt,
    slug,
    content: `---
title: ${title}
date: ${date}
excerpt: ${excerpt}
---

${markdownContent}`
  }
} 