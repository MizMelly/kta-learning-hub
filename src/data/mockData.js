export const currentStudent = {
  id: "s1",
  name: "Hakeem Bello",
  email: "hakeem@example.com",
  avatar: null,
};

export const courses = [
  {
    id: "c1",
    title: "Social Media Management Masterclass",
    instructor: "Dr. Amara Osei",
    description:
      "Master the art of social media strategy, content creation, and audience growth across all major platforms. Built for professionals who want measurable results.",
    thumbnail: null,
    price: 49999,
    enrolled: true,
    progress: 50,
    completedLessons: ["l1", "l2", "l3"],
    modules: [
      {
        id: "m1",
        title: "Module 1 – Social Media Foundations",
        lessons: [
          {
            id: "l1",
            title: "Understanding the Social Media Landscape",
            duration: "14 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `
## Understanding the Social Media Landscape

Social media has fundamentally changed how businesses communicate with their audiences. In this lesson, we break down the major platforms, their demographics, and how to choose the right ones for your brand.

### Key Platforms in 2026

- **Instagram** – Visual storytelling, reels, and commerce
- **LinkedIn** – B2B relationships and thought leadership
- **X (Twitter)** – Real-time conversation and news
- **TikTok** – Short-form video and viral discovery
- **Facebook** – Community groups and paid ads

### The Golden Rule

> Don't try to be everywhere. Be excellent somewhere.

Start with one or two platforms where your target audience is most active, then expand deliberately.

### Platform Selection Framework

1. Define your audience age group and interests
2. Match audience to platform demographics
3. Audit your content production capacity
4. Choose platforms that suit your content strengths
            `,
            assignment: {
              instructions:
                "Research your target audience and identify the top 2 social media platforms where they are most active. Write a 300–500 word rationale explaining your choices, referencing platform demographics.",
            },
            reflection: {
              prompt:
                "What surprised you most about the social media landscape today? How does this change your approach?",
            },
            comments: [
              {
                id: "cmt1",
                author: "Amara Diallo",
                text: "The platform selection framework really clicked for me. I've been spreading myself too thin!",
                timestamp: "2026-06-07T10:22:00Z",
                replies: [
                  {
                    id: "r1",
                    author: "Hakeem Bello",
                    text: "Same here. Focus is everything.",
                    timestamp: "2026-06-07T11:05:00Z",
                  },
                ],
              },
              {
                id: "cmt2",
                author: "Chidi Nwosu",
                text: "Great intro lesson. Looking forward to the rest of the module.",
                timestamp: "2026-06-08T08:00:00Z",
                replies: [],
              },
            ],
            rating: null,
          },
          {
            id: "l2",
            title: "Building a Content Strategy",
            duration: "18 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `
## Building a Content Strategy

A content strategy is your roadmap. Without one, you're just posting and hoping.

### The 3 Pillars of Content Strategy

**1. Audience Understanding**
Know who you're talking to. Build a detailed persona — demographics, pain points, aspirations, and preferred content formats.

**2. Content Pillars**
Define 3–5 core topics your brand will consistently speak about. These become your content pillars. Everything you post should tie back to one of them.

**3. Editorial Calendar**
Plan your content weeks in advance. Consistency beats virality — every time.

### Content Mix Formula

- 40% Educational
- 30% Entertaining / Relatable
- 20% Promotional
- 10% Community / UGC (User Generated Content)
            `,
            assignment: {
              instructions:
                "Define 3 content pillars for a brand of your choice. Create a 2-week editorial calendar with at least 10 planned posts across any two platforms.",
            },
            reflection: {
              prompt:
                "How does having a content strategy change the way you think about social media posting?",
            },
            comments: [],
            rating: 5,
          },
        ],
      },
      {
        id: "m2",
        title: "Module 2 – Content Creation & Copywriting",
        lessons: [
          {
            id: "l3",
            title: "Writing Captions That Convert",
            duration: "12 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `
## Writing Captions That Convert

Your caption is the difference between a scroll and a stop.

### The Hook Formula

The first line must earn the second. Use one of:
- **A bold claim** – "Most brands are doing this wrong."
- **A question** – "What if your content could sell while you sleep?"
- **A number** – "3 caption mistakes killing your engagement."

### Structure of a High-Converting Caption

1. Hook (1–2 lines)
2. Body — value, story, or explanation
3. CTA — one clear action

### Call-to-Action Examples

- "Save this for later."
- "Drop your answer in the comments."
- "Link in bio to get started today."
            `,
            assignment: {
              instructions:
                "Write 5 Instagram captions for a product or service of your choice. Each caption must include a hook, body, and CTA. Submit as a document.",
            },
            reflection: {
              prompt:
                "Which caption hook style felt most natural to you and why?",
            },
            comments: [
              {
                id: "cmt3",
                author: "Fatima Musa",
                text: "The hook formula is gold. Used it this week and my engagement went up!",
                timestamp: "2026-06-08T14:30:00Z",
                replies: [],
              },
            ],
            rating: null,
          },
          {
            id: "l4",
            title: "Designing Visuals for Social Media",
            duration: "20 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `
## Designing Visuals for Social Media

You don't need to be a graphic designer. You need to understand visual communication.

### Core Design Principles for Social

- **Contrast** – Make your text readable against any background
- **Brand Consistency** – Use the same 2–3 colours and 1–2 fonts across all posts
- **Negative Space** – Let your design breathe; clutter kills clarity
- **Hierarchy** – Lead the eye from headline → supporting text → CTA

### Tools Recommended

| Tool | Best For |
|------|----------|
| Canva | Templates, quick turnaround |
| Adobe Express | Brand kits, professional polish |
| CapCut | Video editing for Reels/TikTok |
            `,
            assignment: {
              instructions:
                "Design 3 social media graphics (feed post size: 1080x1080px) for a brand of your choice. Export as PNG and upload here.",
            },
            reflection: {
              prompt:
                "What design principle do you find hardest to apply and why?",
            },
            comments: [],
            rating: null,
          },
        ],
      },
      {
        id: "m3",
        title: "Module 3 – Growth & Analytics",
        lessons: [
          {
            id: "l5",
            title: "Understanding Social Media Analytics",
            duration: "16 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `
## Understanding Social Media Analytics

Data without context is just noise. Learn to find the signal.

### Metrics That Actually Matter

**Reach** – How many unique accounts saw your content
**Impressions** – Total number of times your content was displayed
**Engagement Rate** – (Likes + Comments + Shares + Saves) / Reach × 100
**Click-Through Rate (CTR)** – Clicks ÷ Impressions × 100
**Follower Growth Rate** – (New followers ÷ Total followers) × 100

### Vanity Metrics vs. Value Metrics

| Vanity | Value |
|--------|-------|
| Likes | Saves |
| Follower count | Engagement rate |
| Impressions | CTR |
            `,
            assignment: {
              instructions:
                "Analyse the last 30 days of any social media account (your own or a public brand page). Write a 400-word performance report highlighting 3 key insights and 2 recommendations.",
            },
            reflection: {
              prompt:
                "What metric surprised you the most and what does it tell you about your audience?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "l6",
            title: "Building an Organic Growth Strategy",
            duration: "22 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `
## Building an Organic Growth Strategy

Paid ads amplify. Organic growth sustains. You need both — but organic is your foundation.

### The 4 Engines of Organic Growth

**1. Consistency**
Post on a schedule your audience can predict. 3–5x per week is a solid starting point.

**2. Community Engagement**
Reply to every comment in the first hour. Engage with 10–20 accounts in your niche daily.

**3. Hashtag & SEO Strategy**
Use a mix of niche (under 500K posts), mid-range (500K–5M), and broad hashtags. Optimise your bio for search keywords.

**4. Collaboration**
Partner with complementary creators for shoutouts, joint Lives, and co-created content.
            `,
            assignment: {
              instructions:
                "Build a 30-day organic growth plan for a brand. Include posting frequency, hashtag strategy, engagement tactics, and one collaboration idea. Submit as a structured document.",
            },
            reflection: {
              prompt:
                "Which growth engine do you think will be hardest to maintain and how will you overcome that challenge?",
            },
            comments: [],
            rating: null,
          },
        ],
      },
    ],
  },
];

export const getLesson = (courseId, lessonId) => {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return null;
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, course, module: mod };
  }
  return null;
};

export const getAllLessons = (courseId) => {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return [];
  return course.modules.flatMap((m) => m.lessons);
};
