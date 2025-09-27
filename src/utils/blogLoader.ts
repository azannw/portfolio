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
    id: '3',
    title: 'Why and How to Learn Tech as a Medical Student',
    date: '2025-01-16',
    slug: 'why-how-learn-tech-medical-student',
    excerpt: 'Want to stand out from thousands of other medical students? Discover how learning tech can give you multiple career pathways, reduce stress, and open doors most medical students never even know exist.',
    content: `If you're a medical student feeling uncertain about your career path, watching seniors struggle to find good opportunities, or simply curious about how technology is changing healthcare, you're in the right place.

Let's be honest about the current situation. Many doctors are unemployed or not getting the job they desired for. You've probably heard the usual advice: "Try the USMLE pathway," "Open your own clinic," or "Start a hospital." But anyone actually in the field knows exactly how practical these suggestions really are. Some pathways are incredibly expensive, others are oversaturated, and many are extremely time-consuming with no guarantee of success.

But here's what most people don't tell you: there's a completely different path that combines your medical knowledge with technology skills. And it's more accessible than you think.

## Stand Out from the Crowd: Why Tech is Your Secret Weapon

If you want to stand out from the rest of the medical students in your class, your medical college, and thousands of other medical students across the country, you need something extra and special. Learning tech skills gives you exactly that advantage.

Think about it. In your class of 200 medical students, how many do you think know how to code? How many understand AI, data analysis, or app development? Probably less than 5. This scarcity is your opportunity.

When you have tech skills alongside your medical knowledge, you suddenly have multiple pathways available to you. You're not stuck waiting for a residency spot or hoping for a job in a saturated market. You can work in healthcare tech companies, start your own digital health venture, work remotely for international companies, or even pivot completely to tech if needed. This flexibility reduces stress significantly because you're not putting all your eggs in one basket.

## The Pakistani Healthcare Tech Landscape: Real Opportunities

Pakistan's healthcare tech industry is booming, and there are numerous ongoing projects actively looking for medical professionals who understand technology.

Companies like Sehat Kahani are revolutionizing telemedicine in Pakistan, connecting rural patients with urban doctors through technology. Marham has created one of the largest doctor-patient platforms in the country. Oladoc is transforming how people book medical appointments. These aren't just foreign concepts - these are Pakistani companies, built by Pakistanis, solving Pakistani problems.

The Pakistan Software Houses Association (P@SHA) reports that the country's IT exports have crossed $2.6 billion, with healthcare technology being one of the fastest-growing sectors. This growth means opportunities, funding, and most importantly, jobs for people who understand both medicine and technology.

## The Financial Reality: High Rewards for the Dedicated

The healthcare tech industry offers competitive compensation, especially for medical professionals with tech skills who are rare and valuable. Senior healthcare tech professionals in Pakistan earn significantly more than their traditional medical counterparts, with many earning even more through consulting, freelancing, or running their own ventures. Those who work remotely for international companies can earn substantially higher amounts in foreign currency.

But these opportunities are only for the dedicated and expert ones. This isn't a get-rich-quick scheme. The healthcare tech industry rewards expertise, consistency, and deep understanding of both domains.

The investment required is primarily time and learning. Unlike traditional medical specializations that require expensive equipment, years of residency, or costly examinations, breaking into healthcare tech requires mainly dedication to learning and building skills. A laptop, internet connection, and 6-12 months of focused learning can open doors to opportunities that traditional medical paths might not offer for years.

## Key Domains Where You Can Make Impact

**Telemedicine Platforms** represent one of the fastest-growing areas. Medical professionals with tech skills are leading these innovations, designing user interfaces that doctors actually want to use, and building systems that handle the complexity of medical consultations remotely.

**AI in Medical Imaging** is where radiologists and technologists are building AI systems that can detect cancer, analyze X-rays, and assist in diagnoses. Pakistani startups are entering this space, creating solutions specifically for local healthcare challenges.

**Health Data Analytics** represents a massive opportunity because hospitals generate enormous amounts of data, but most of it goes unused. There aren't enough people who understand both the medical significance of the data and how to analyze it technically.

**Medical Device Software** development is expanding rapidly. Pakistani companies are developing innovative medical devices, but they need medical professionals who can ensure these devices actually solve real clinical problems.

## Your Learning Roadmap: Practical Steps

### Phase 1: Foundation Building (2-3 months)

Learning programming fundamentals should be your first priority. Python is your best friend here because it's beginner-friendly and widely used in healthcare tech. Start with free resources like Python.org's tutorial or Codecademy's Python course. Spend at least one hour daily writing actual code, not just watching tutorials.

Understanding how the internet works comes next. You don't need to become a networking expert, but understanding basics like how websites work, what APIs are, and how data flows between systems will help you later.

Getting comfortable with data is essential because healthcare is fundamentally about collecting, analyzing, and acting on patient data. Learn basic statistics and data analysis through Khan Academy's excellent free courses.

### Phase 2: Choose Your Domain (1 month research)

Pick one area that genuinely interests you:

**AI and Machine Learning in Healthcare** involves building systems that analyze medical data and assist in diagnosis. Start with [Andrew Ng's Machine Learning course](https://www.coursera.org/learn/machine-learning) on Coursera, then move to his [DeepLearning.AI](https://www.deeplearning.ai/) specialization.

**Telemedicine Development** focuses on building platforms that connect patients with doctors remotely. Start with web development fundamentals, then learn about healthcare-specific requirements like HIPAA compliance and secure video calling.

**Health Data Analytics** involves analyzing hospital data to improve operations and patient outcomes. Start with statistics and data visualization, then move to database management. Python, R, SQL, and Tableau are your main tools.

### Phase 3: Deep Dive Learning (3-6 months)

Use [roadmap.sh](https://roadmap.sh/) for detailed learning paths. For AI/ML, follow the [AI and Data Scientist Roadmap](https://roadmap.sh/ai-data-scientist). For web development, follow the [Frontend](https://roadmap.sh/frontend) and [Backend](https://roadmap.sh/backend) roadmaps. For mobile development, check the [Android](https://roadmap.sh/android) and [iOS](https://roadmap.sh/ios) roadmaps.

Dedicate at least 2 hours daily to focused learning. Consistency is key - it's better to study 2 hours every day than to cram for 10 hours once a week.

### Phase 4: Build Real Projects (2-3 months)

Create original projects that solve real problems. For AI/ML, build a system that analyzes medical images. For web development, create a telemedicine platform. For mobile apps, design a medication reminder app. Document your projects well and make them available on GitHub.

### Phase 5: Connect and Get Support

Join our [MedTech WhatsApp Community](https://chat.whatsapp.com/BTtOPTQArHZCQE54csLQhF) where medical students learning tech share resources, ask questions, and support each other. This community is specifically for people like you who are combining medicine with technology.

Also join healthcare IT professionals on LinkedIn, attend local tech meetups in cities like Karachi and Lahore, and contribute to open source healthcare projects on GitHub.

## Getting Started Today

**Week 1**: Choose Python as your first programming language and complete a beginner course. Spend 1-2 hours daily actually writing code.

**Week 2-3**: Pick your domain of interest. Research real companies in that space, both international and Pakistani.

**Month 2-3**: Follow the appropriate roadmap from [roadmap.sh](https://roadmap.sh/) for your chosen domain. Build small practice projects.

**Month 4-6**: Build a significant project that showcases your skills. Make it as realistic and polished as possible.

**Month 6+**: Start contributing to open source projects, networking with professionals, and looking for opportunities.

## Common Concerns Addressed

"I don't have time" - You need consistent 1-2 hours daily, not 8 hours. Many successful healthcare tech professionals started while in medical school.

"I'm not good at math" - Most practical applications don't require advanced mathematics. The math from FSc is sufficient to get started.

"What if I learn the wrong thing" - Start with fundamentals and pick one domain. You can always pivot later, and foundational skills transfer between domains.

The healthcare industry is transforming rapidly, and there's room for medical professionals who understand both medicine and technology. Your medical background isn't a limitation - it's your superpower in the tech world. The combination of clinical knowledge and technical skills is rare and valuable.

Join our [MedTech community](https://chat.whatsapp.com/BTtOPTQArHZCQE54csLQhF), start learning today, and discover opportunities that most of your classmates don't even know exist.`
  },
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