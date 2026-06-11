export const currentStudent = {
  id: "s1",
  name: "Hakeem Bello",
  email: "hakeem@example.com",
  avatar: null,
};

export const courseBanners = {
  "c1": "/images/social-media-banner.png",
  "c2": "/images/react-banner.png",
  "c3": "/images/uiux-banner.png",
  "c4": "/images/marketing-banner.png",
  "c5": "/images/content-banner.png",
};

export const courses = [
  // ═══════════════════════════════════════════════════
  // COURSE 1: Social Media Management (50%)
  // ═══════════════════════════════════════════════════
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
            notes: `## Understanding the Social Media Landscape

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
4. Choose platforms that suit your content strengths`,
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
            notes: `## Building a Content Strategy

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
- 10% Community / UGC (User Generated Content)`,
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
            notes: `## Writing Captions That Convert

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
- "Link in bio to get started today."`,
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
            notes: `## Designing Visuals for Social Media

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
| CapCut | Video editing for Reels/TikTok |`,
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
          {
            id: "l5",
            title: "Creating Video Content for Reels & TikTok",
            duration: "25 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Creating Video Content for Reels & TikTok

Short-form video is the most consumed content format in 2026. Mastering it is non-negotiable.

### The 3-Second Rule

You have 3 seconds to stop the scroll. Your hook must be:
- Visual (motion, face, text overlay)
- Auditory (music trend, voiceover hook)
- Emotional (curiosity, surprise, relatability)

### Video Structure

1. **Hook** (0–3 sec) – Pattern interrupt
2. **Value** (3–20 sec) – Teach, entertain, or inspire
3. **CTA** (last 3 sec) – Follow, comment, or click link

### Editing Tips

- Use trending audio (but make it relevant)
- Add captions — 80% watch without sound
- Keep it under 60 seconds for maximum reach`,
            assignment: {
              instructions:
                "Create a 30–60 second Reel or TikTok video for a brand. Include a hook, value delivery, and CTA. Upload the video file.",
            },
            reflection: {
              prompt:
                "What was your biggest challenge in creating short-form video content?",
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
            id: "l6",
            title: "Understanding Social Media Analytics",
            duration: "16 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Understanding Social Media Analytics

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
| Impressions | CTR |`,
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
            id: "l7",
            title: "Building an Organic Growth Strategy",
            duration: "22 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Building an Organic Growth Strategy

Paid ads amplify. Organic growth sustains. You need both — but organic is your foundation.

### The 4 Engines of Organic Growth

**1. Consistency**
Post on a schedule your audience can predict. 3–5x per week is a solid starting point.

**2. Community Engagement**
Reply to every comment in the first hour. Engage with 10–20 accounts in your niche daily.

**3. Hashtag & SEO Strategy**
Use a mix of niche (under 500K posts), mid-range (500K–5M), and broad hashtags. Optimise your bio for search keywords.

**4. Collaboration**
Partner with complementary creators for shoutouts, joint Lives, and co-created content.`,
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

  // ═══════════════════════════════════════════════════
  // COURSE 2: React Fundamentals (80%)
  // ═══════════════════════════════════════════════════
  {
    id: "c2",
    title: "React Fundamentals",
    instructor: "Engr. David Johnson",
    description:
      "Build modern, interactive web applications from the ground up using React. Covers components, state, hooks, routing, and best practices for scalable front-end development.",
    thumbnail: null,
    price: 59999,
    enrolled: true,
    progress: 80,
    completedLessons: ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"],
    modules: [
      {
        id: "rm1",
        title: "Module 1 – React Basics",
        lessons: [
          {
            id: "r1",
            title: "Introduction to React & JSX",
            duration: "15 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## Introduction to React & JSX

React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components.

### Why React?

- **Component-Based** – Build encapsulated components that manage their own state
- **Declarative** – Design simple views for each state in your application
- **Learn Once, Write Anywhere** – React Native for mobile, Next.js for full-stack

### JSX Explained

JSX is a syntax extension for JavaScript. It looks like HTML but lives inside JavaScript.

\`\`\`jsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}
\`\`\`

### Key Rules

1. JSX expressions must have one parent element
2. Use \`className\` instead of \`class\`
3. Use \`camelCase\` for attributes (e.g., \`onClick\`, \`tabIndex\`)`,
            assignment: {
              instructions:
                "Create a simple React component that renders a personal profile card with your name, role, and a short bio. Use JSX and export it as a default component.",
            },
            reflection: {
              prompt:
                "How does the component-based approach change the way you think about building UIs?",
            },
            comments: [
              {
                id: "rc1",
                author: "Tunde Adeyemi",
                text: "JSX felt weird at first but now I can't imagine writing React without it!",
                timestamp: "2026-05-20T09:15:00Z",
                replies: [],
              },
            ],
            rating: 5,
          },
          {
            id: "r2",
            title: "Components & Props",
            duration: "18 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## Components & Props

Props are how you pass data from parent to child components. They make components reusable and dynamic.

### Functional Components

\`\`\`jsx
function Greeting({ name, role }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Role: {role}</p>
    </div>
  );
}
\`\`\`

### Props Are Read-Only

A component must never modify its own props. This is a fundamental rule of React.

### Prop Types & Default Props

Always define prop types for better debugging and documentation:

\`\`\`jsx
Greeting.defaultProps = {
  role: "Student",
};
\`\`\``,
            assignment: {
              instructions:
                "Build a reusable 'CourseCard' component that accepts title, instructor, progress, and thumbnail as props. Render 3 different course cards in a parent component.",
            },
            reflection: {
              prompt:
                "What are the benefits of making components reusable rather than hard-coding everything?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "r3",
            title: "State & Event Handling",
            duration: "20 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## State & Event Handling

State allows components to remember information and re-render when that information changes.

### useState Hook

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

### Event Handling

- Use \`onClick\`, \`onChange\`, \`onSubmit\` etc.
- Pass a function, not a function call: \`onClick={handleClick}\` not \`onClick={handleClick()}\``,
            assignment: {
              instructions:
                "Create a simple todo list app with useState. It should allow adding items, marking them complete, and deleting them. Submit the component code.",
            },
            reflection: {
              prompt:
                "What was confusing about state at first, and what helped it click for you?",
            },
            comments: [
              {
                id: "rc2",
                author: "Ngozi Eze",
                text: "The difference between props and state finally makes sense. Props = data in, State = data that changes.",
                timestamp: "2026-05-22T14:20:00Z",
                replies: [
                  {
                    id: "rr1",
                    author: "Hakeem Bello",
                    text: "Exactly! That distinction is everything.",
                    timestamp: "2026-05-22T15:00:00Z",
                  },
                ],
              },
            ],
            rating: null,
          },
        ],
      },
      {
        id: "rm2",
        title: "Module 2 – Hooks & Effects",
        lessons: [
          {
            id: "r4",
            title: "useEffect & Lifecycle Methods",
            duration: "22 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## useEffect & Lifecycle Methods

useEffect lets you perform side effects in functional components — data fetching, subscriptions, or manually changing the DOM.

### Basic Syntax

\`\`\`jsx
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
\`\`\`

### Dependency Array Rules

- **No array** – Runs after every render
- **Empty \`[]\`** – Runs once on mount
- **With values** – Runs when those values change

### Common Use Cases

1. Fetching data from an API
2. Setting up event listeners
3. Updating document title`,
            assignment: {
              instructions:
                "Build a component that fetches and displays a list of users from the JSONPlaceholder API. Show loading state and handle errors gracefully.",
            },
            reflection: {
              prompt:
                "What side effects have you encountered in your own projects, and how did you handle them before React?",
            },
            comments: [],
            rating: 5,
          },
          {
            id: "r5",
            title: "Custom Hooks",
            duration: "16 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## Custom Hooks

Custom hooks let you extract component logic into reusable functions. They must start with \`use\`.

### Example: useLocalStorage

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
\`\`\`

### Benefits

- Cleaner components
- Reusable logic across the app
- Easier testing`,
            assignment: {
              instructions:
                "Create a custom hook called \`useFetch\` that handles loading, error, and data states for any API endpoint. Use it in a component to fetch course data.",
            },
            reflection: {
              prompt:
                "What repetitive logic in your current codebase could be turned into a custom hook?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "r6",
            title: "useContext for Global State",
            duration: "19 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## useContext for Global State

Context provides a way to pass data through the component tree without prop drilling.

### Creating Context

\`\`\`jsx
const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
\`\`\`

### Consuming Context

\`\`\`jsx
const { user } = useContext(UserContext);
\`\`\`

### When to Use

- User authentication state
- Theme preferences
- Language / localization`,
            assignment: {
              instructions:
                "Build a theme toggle (light/dark mode) using React Context. Wrap your app in a ThemeProvider and consume it in a Navbar component.",
            },
            reflection: {
              prompt:
                "Have you experienced 'prop drilling' before? How would Context have solved it?",
            },
            comments: [
              {
                id: "rc3",
                author: "David Johnson",
                text: "Context is powerful but don't overuse it. For complex state, consider Redux or Zustand.",
                timestamp: "2026-05-25T10:00:00Z",
                replies: [],
              },
            ],
            rating: null,
          },
        ],
      },
      {
        id: "rm3",
        title: "Module 3 – Routing & Advanced Patterns",
        lessons: [
          {
            id: "r7",
            title: "React Router v6",
            duration: "24 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## React Router v6

React Router is the standard library for routing in React applications.

### Basic Setup

\`\`\`jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

### Navigation

\`\`\`jsx
import { Link, useNavigate } from 'react-router-dom';

// Declarative
<Link to="/courses">Courses</Link>

// Programmatic
const navigate = useNavigate();
navigate('/courses');
\`\`\`

### Dynamic Routes & useParams

\`\`\`jsx
const { id } = useParams();
\`\`\``,
            assignment: {
              instructions:
                "Set up a multi-page LMS app with routes for Dashboard, My Courses, Course Detail, and Profile. Use nested routes for course modules.",
            },
            reflection: {
              prompt:
                "How does client-side routing improve user experience compared to traditional server-side routing?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "r8",
            title: "Performance Optimization",
            duration: "21 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## Performance Optimization

React is fast by default, but large apps need optimization.

### React.memo

Prevents re-renders when props haven't changed:

\`\`\`jsx
const ExpensiveComponent = React.memo(function MyComponent({ data }) {
  // ...
});
\`\`\`

### useMemo & useCallback

- \`useMemo\` – Memoize expensive calculations
- \`useCallback\` – Memoize functions to prevent child re-renders

### Code Splitting

\`\`\`jsx
const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>
\`\`\`

### Virtualization

For long lists, use \`react-window\` or \`react-virtualized\` to render only visible items.`,
            assignment: {
              instructions:
                "Optimize a slow component using React.memo, useMemo, and lazy loading. Measure the before/after performance using React DevTools Profiler.",
            },
            reflection: {
              prompt:
                "What performance issues have you noticed in React apps, and which technique would you try first?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "r9",
            title: "Testing React Components",
            duration: "23 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Testing React Components

Testing ensures your components work as expected and prevents regressions.

### Jest + React Testing Library

\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments count on click', () => {
  render(<Counter />);
  const button = screen.getByText(/count/i);
  fireEvent.click(button);
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
\`\`\`

### Testing Best Practices

1. Test behaviour, not implementation
2. Use \`getByRole\` and \`getByLabelText\` for accessibility
3. Mock external dependencies
4. Write tests before fixing bugs`,
            assignment: {
              instructions:
                "Write unit tests for your Todo List app. Test adding, completing, and deleting todos. Aim for 80%+ coverage.",
            },
            reflection: {
              prompt:
                "How do you currently test your code, and how would automated testing change your workflow?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "r10",
            title: "Deploying React Apps",
            duration: "15 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Deploying React Apps

The final step — getting your app live.

### Build Process

\`\`\`bash
npm run build
\`\`\`

This creates an optimized production build in the \`build/\` folder.

### Deployment Options

| Platform | Best For |
|----------|----------|
| Vercel | Next.js, automatic CI/CD |
| Netlify | Static sites, form handling |
| GitHub Pages | Open source projects |
| AWS S3 + CloudFront | Enterprise scale |

### Environment Variables

Use \`.env\` files for API keys and config:

\`\`\`
REACT_APP_API_URL=https://api.example.com
\`\`\`

> Note: Variables must start with \`REACT_APP_\` to be included in the build.`,
            assignment: {
              instructions:
                "Deploy your LMS app to Vercel or Netlify. Set up environment variables for API endpoints and document the deployment process.",
            },
            reflection: {
              prompt:
                "What deployment challenges do you anticipate for a production React app?",
            },
            comments: [],
            rating: null,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 3: UI/UX Design Essentials (100% ✅)
  // ═══════════════════════════════════════════════════
  {
    id: "c3",
    title: "UI/UX Design Essentials",
    instructor: "Sarah Williams",
    description:
      "Learn the principles of user-centered design, from research and wireframing to high-fidelity prototypes. Create interfaces that are both beautiful and functional.",
    thumbnail: null,
    price: 54999,
    enrolled: true,
    progress: 100,
    completedLessons: ["u1", "u2", "u3", "u4", "u5", "u6", "u7", "u8"],
    modules: [
      {
        id: "um1",
        title: "Module 1 – Design Foundations",
        lessons: [
          {
            id: "u1",
            title: "Introduction to UI/UX Design",
            duration: "14 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## Introduction to UI/UX Design

UI (User Interface) is what users see. UX (User Experience) is how they feel. Both are essential for successful digital products.

### The Design Thinking Process

1. **Empathize** – Understand your users
2. **Define** – Identify the core problem
3. **Ideate** – Brainstorm solutions
4. **Prototype** – Build testable versions
5. **Test** – Validate with real users

### UI vs UX

| UI | UX |
|----|-----|
| Visual design | User research |
| Typography & colour | Information architecture |
| Component libraries | User flows & journeys |
| Micro-interactions | Usability testing |`,
            assignment: {
              instructions:
                "Choose an app you use daily. Write a 300-word analysis of its UI strengths and UX pain points. Include screenshots.",
            },
            reflection: {
              prompt:
                "What is the difference between a beautiful interface and a usable one? Can you think of an example?",
            },
            comments: [
              {
                id: "uc1",
                author: "Aisha Mohammed",
                text: "This course completely changed how I look at apps. I now notice every micro-interaction!",
                timestamp: "2026-04-15T11:30:00Z",
                replies: [],
              },
            ],
            rating: 5,
          },
          {
            id: "u2",
            title: "Colour Theory & Typography",
            duration: "18 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## Colour Theory & Typography

Colour and type are the backbone of visual design. Master them and everything else falls into place.

### Colour Theory Basics

- **Primary Colours** – Red, Blue, Yellow
- **Secondary** – Mix of primaries
- **Tertiary** – Mix of primary + secondary

### Colour Psychology

| Colour | Emotion |
|--------|---------|
| Blue | Trust, calm, professionalism |
| Red | Urgency, passion, danger |
| Green | Growth, health, money |
| Yellow | Optimism, energy, caution |
| Purple | Luxury, creativity, wisdom |

### Typography Hierarchy

1. **Display / H1** – 48–72px, grabs attention
2. **H2** – 32–48px, section headers
3. **Body** – 16–18px, readable paragraph text
4. **Caption** – 12–14px, secondary info

### Font Pairing Rules

- Max 2–3 fonts per project
- Pair a serif with a sans-serif for contrast
- Ensure sufficient contrast ratios (WCAG 4.5:1 minimum)`,
            assignment: {
              instructions:
                "Create a colour palette and typography scale for a fintech mobile app. Document your choices with rationale. Use Figma or Adobe XD.",
            },
            reflection: {
              prompt:
                "What colour combinations do you find most appealing, and why do you think they work?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "u3",
            title: "Layout & Composition",
            duration: "20 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## Layout & Composition

Good layout guides the eye and creates visual order.

### The Grid System

- **12-column grid** – Most common, highly flexible
- **Gutters** – Space between columns (16–32px typical)
- **Margins** – Space at the edges

### Design Principles

- **Alignment** – Creates order and connection
- **Proximity** – Related items grouped together
- **Repetition** – Consistent patterns build familiarity
- **Contrast** – Highlights importance and creates hierarchy
- **Balance** – Visual weight distributed evenly

### F-Layout & Z-Layout

- **F-Layout** – Users scan top-left to right, then down (good for text-heavy pages)
- **Z-Layout** – Eye moves in a Z pattern (good for landing pages with clear CTA)`,
            assignment: {
              instructions:
                "Design a landing page layout using a 12-column grid. Apply alignment, proximity, and contrast principles. Submit your Figma file.",
            },
            reflection: {
              prompt:
                "Which design principle do you think is most often overlooked, and what happens when it is?",
            },
            comments: [
              {
                id: "uc2",
                author: "Sarah Williams",
                text: "Great work on the grid exercises this week. Your layouts are really improving!",
                timestamp: "2026-04-18T09:00:00Z",
                replies: [],
              },
            ],
            rating: 5,
          },
        ],
      },
      {
        id: "um2",
        title: "Module 2 – User Research & Wireframing",
        lessons: [
          {
            id: "u4",
            title: "User Research Methods",
            duration: "22 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## User Research Methods

Design without research is just guesswork. Learn to understand your users before you design for them.

### Qualitative Methods

- **User Interviews** – Deep insights, small sample (5–8 users)
- **Usability Testing** – Watch users complete tasks
- **Field Studies** – Observe users in their natural environment

### Quantitative Methods

- **Surveys** – Broad trends, large sample
- **Analytics** – Behavioural data (clicks, scroll depth, time on page)
- **A/B Testing** – Compare two versions statistically

### Creating Personas

A persona is a fictional character representing your ideal user:

\`\`\`
Name: Amara, 28
Occupation: Marketing Manager
Goals: Grow her brand's social presence
Pain Points: Limited time, unclear metrics
Tech Savvy: High
\`\`\``,
            assignment: {
              instructions:
                "Conduct 3 user interviews for a food delivery app. Synthesize findings into 2 user personas and a journey map. Submit as a PDF.",
            },
            reflection: {
              prompt:
                "What assumptions about users have you had that turned out to be wrong after doing research?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "u5",
            title: "Wireframing & Low-Fidelity Prototypes",
            duration: "19 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## Wireframing & Low-Fidelity Prototypes

Wireframes are the skeleton of your design. They focus on structure, not aesthetics.

### Why Low-Fi First?

- Faster iteration
- Stakeholders focus on function, not colour
- Easier to change than high-fidelity mockups
- Cheaper to test

### Wireframe Elements

- **Boxes** – Represent images and content blocks
- **Lines** – Text placeholders
- **Buttons** – Clear call-to-action areas
- **Annotations** – Explain interactions

### Tools

| Tool | Best For |
|------|----------|
| Balsamiq | Quick sketchy wireframes |
| Figma | Collaborative, scalable |
| Miro | Workshops and brainstorming |`,
            assignment: {
              instructions:
                "Create low-fidelity wireframes for a mobile banking app. Include login, dashboard, transfer, and transaction history screens. Use Balsamiq or Figma.",
            },
            reflection: {
              prompt:
                "Why is it important to keep wireframes low-fidelity? What problems arise when you go too detailed too early?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "u6",
            title: "High-Fidelity Prototyping",
            duration: "24 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## High-Fidelity Prototyping

High-fi prototypes look and feel like the real product. They're used for stakeholder presentations and usability testing.

### From Wireframe to Hi-Fi

1. Apply your design system (colours, typography, components)
2. Add real content (not lorem ipsum)
3. Include micro-interactions and animations
4. Make it interactive with clickable hotspots

### Prototyping in Figma

- Use **Auto Layout** for responsive components
- Create **Component Variants** for buttons, inputs, cards
- Add **Smart Animate** for smooth transitions
- Use **Prototyping** mode to link screens

### Handoff to Developers

- Use **Dev Mode** in Figma
- Export assets in 1x, 2x, 3x
- Document spacing, colours, and typography tokens`,
            assignment: {
              instructions:
                "Turn your banking app wireframes into a high-fidelity interactive prototype. Include at least 5 screens with transitions. Submit the Figma prototype link.",
            },
            reflection: {
              prompt:
                "What is the most challenging part of moving from wireframes to high-fidelity designs for you?",
            },
            comments: [
              {
                id: "uc3",
                author: "Chidi Nwosu",
                text: "Auto Layout in Figma is a game changer. My components are finally responsive!",
                timestamp: "2026-04-22T16:45:00Z",
                replies: [],
              },
            ],
            rating: 5,
          },
        ],
      },
      {
        id: "um3",
        title: "Module 3 – Design Systems & Handoff",
        lessons: [
          {
            id: "u7",
            title: "Building a Design System",
            duration: "26 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## Building a Design System

A design system is a single source of truth for design and code. It ensures consistency at scale.

### Core Elements

- **Design Tokens** – Colours, typography, spacing, shadows
- **Component Library** – Reusable UI elements
- **Pattern Library** – Common layouts and flows
- **Documentation** – Usage guidelines and best practices

### Popular Design Systems

| System | Company |
|--------|---------|
| Material Design | Google |
| Human Interface | Apple |
| Polaris | Shopify |
| Carbon | IBM |
| Ant Design | Alibaba |

### Creating Your Own

1. Audit existing designs for inconsistencies
2. Define tokens based on brand guidelines
3. Build components with variants and states
4. Document usage with examples and do's/don'ts`,
            assignment: {
              instructions:
                "Create a mini design system for a travel booking app. Include colour tokens, typography scale, and 5 core components (button, input, card, navbar, footer). Document in Figma.",
            },
            reflection: {
              prompt:
                "What are the biggest challenges in maintaining a design system as a team grows?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "u8",
            title: "Developer Handoff & Collaboration",
            duration: "18 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## Developer Handoff & Collaboration

Great design is useless if developers can't implement it accurately.

### Best Practices

- **Name layers consistently** – No 'Frame 47', use 'Navbar/Container'
- **Use constraints** – Show how elements respond to screen size
- **Document interactions** – Hover states, animations, transitions
- **Provide assets** – SVG icons, PNG images, video files

### Collaboration Tools

| Tool | Purpose |
|------|---------|
| Figma Dev Mode | Inspect, copy CSS, export assets |
| Zeplin | Design handoff with annotations |
| Storybook | Component documentation for devs |
| Notion | Design documentation and specs |

### Communication Tips

- Involve developers early in the design process
- Hold design reviews with engineering present
- Be open to technical constraints and find compromises
- Celebrate successful launches together`,
            assignment: {
              instructions:
                "Prepare a developer handoff document for your travel app design system. Include component specs, spacing tokens, and interaction notes. Use Figma + Notion.",
            },
            reflection: {
              prompt:
                "How can designers and developers work better together? Share one idea you'd implement on your team.",
            },
            comments: [],
            rating: 5,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 4: Digital Marketing Strategy (35%)
  // ═══════════════════════════════════════════════════
  {
    id: "c4",
    title: "Digital Marketing Strategy",
    instructor: "Michael Brown",
    description:
      "Develop comprehensive digital marketing strategies that drive real business results. From SEO and email marketing to paid ads and analytics.",
    thumbnail: null,
    price: 45999,
    enrolled: true,
    progress: 35,
    completedLessons: ["d1", "d2"],
    modules: [
      {
        id: "dm1",
        title: "Module 1 – Marketing Fundamentals",
        lessons: [
          {
            id: "d1",
            title: "The Digital Marketing Funnel",
            duration: "16 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## The Digital Marketing Funnel

The funnel represents the customer journey from awareness to purchase and beyond.

### Stages

1. **Awareness** – Customer discovers your brand
   - Channels: SEO, social media, content marketing, PR
2. **Interest** – Customer engages with your content
   - Channels: Blog, email newsletter, webinars
3. **Consideration** – Customer evaluates your solution
   - Channels: Case studies, comparison pages, reviews
4. **Conversion** – Customer makes a purchase
   - Channels: Landing pages, checkout optimization, retargeting
5. **Retention** – Customer becomes loyal
   - Channels: Email automation, loyalty programs, community

### Metrics Per Stage

| Stage | Key Metric |
|-------|-----------|
| Awareness | Impressions, reach |
| Interest | Engagement rate, time on site |
| Consideration | Lead generation, demo requests |
| Conversion | Conversion rate, CPA |
| Retention | LTV, churn rate, NPS |`,
            assignment: {
              instructions:
                "Map the digital marketing funnel for an e-commerce brand of your choice. Identify 2 channels and 1 metric for each stage. Present as a visual diagram.",
            },
            reflection: {
              prompt:
                "Which stage of the funnel do you think most businesses neglect, and why?",
            },
            comments: [
              {
                id: "dc1",
                author: "Michael Brown",
                text: "Retention is where the real money is. Most brands focus too much on acquisition.",
                timestamp: "2026-06-01T10:00:00Z",
                replies: [
                  {
                    id: "dr1",
                    author: "Hakeem Bello",
                    text: "Totally agree. It's cheaper to keep a customer than find a new one.",
                    timestamp: "2026-06-01T11:30:00Z",
                  },
                ],
              },
            ],
            rating: null,
          },
          {
            id: "d2",
            title: "SEO Fundamentals",
            duration: "20 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## SEO Fundamentals

Search Engine Optimization is about being found when people are looking for what you offer.

### On-Page SEO

- **Title Tags** – 50–60 chars, include primary keyword
- **Meta Descriptions** – 150–160 chars, compelling CTA
- **Header Tags** – H1 for main topic, H2–H6 for subtopics
- **Alt Text** – Describe images for accessibility and SEO
- **Internal Links** – Connect related content

### Off-Page SEO

- **Backlinks** – Links from other sites to yours (quality > quantity)
- **Social Signals** – Shares, mentions, brand searches
- **Guest Posting** – Write for authoritative sites in your niche

### Technical SEO

- Site speed (Core Web Vitals)
- Mobile-friendliness
- XML sitemap
- Schema markup
- HTTPS security`,
            assignment: {
              instructions:
                "Audit a website's SEO using free tools (Google Search Console, Ubersuggest, or Screaming Frog). Identify 5 issues and provide recommendations. Submit as a report.",
            },
            reflection: {
              prompt:
                "What is the most common SEO mistake you see websites making?",
            },
            comments: [],
            rating: 5,
          },
          {
            id: "d3",
            title: "Content Marketing Strategy",
            duration: "22 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Content Marketing Strategy

Content marketing is creating valuable content to attract and retain a clearly defined audience.

### Content Types

| Type | Purpose | Example |
|------|---------|---------|
| Blog Posts | SEO, thought leadership | How-to guides |
| Videos | Engagement, tutorials | YouTube explainers |
| Podcasts | Authority, community | Industry interviews |
| Infographics | Shareability, backlinks | Data visualizations |
| Case Studies | Social proof, conversions | Client success stories |

### Content Calendar

Plan content around:
- **Business goals** – Product launches, seasonal campaigns
- **Audience needs** – Pain points, questions, interests
- **Industry events** – Conferences, holidays, trends

### Content Distribution

Create once, distribute everywhere:
1. Blog post → 2. Social snippets → 3. Email newsletter → 4. LinkedIn article → 5. YouTube video`,
            assignment: {
              instructions:
                "Create a 1-month content calendar for a SaaS company. Include 8 pieces of content across 3 formats. Map each to a funnel stage.",
            },
            reflection: {
              prompt:
                "What content format do you consume most, and what makes it effective?",
            },
            comments: [],
            rating: null,
          },
        ],
      },
      {
        id: "dm2",
        title: "Module 2 – Paid Advertising",
        lessons: [
          {
            id: "d4",
            title: "Google Ads & Search Campaigns",
            duration: "24 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Google Ads & Search Campaigns

Google Ads puts you at the top of search results — but only if you know how to use it.

### Campaign Types

- **Search** – Text ads on Google search results
- **Display** – Banner ads on websites
- **Shopping** – Product listings with images and prices
- **Video** – Ads on YouTube
- **Performance Max** – AI-driven multi-channel campaigns

### Keyword Match Types

| Match Type | Symbol | Example | Triggers For |
|------------|--------|---------|--------------|
| Broad | none | shoes | Any related search |
| Phrase | " " | "running shoes" | Searches with this phrase |
| Exact | [ ] | [running shoes] | Only this exact search |
| Negative | - | -free | Excludes searches with 'free' |

### Quality Score

Google rates your ads 1–10 based on:
- Expected click-through rate
- Ad relevance
- Landing page experience

Higher Quality Score = Lower cost per click`,
            assignment: {
              instructions:
                "Set up a mock Google Search campaign for a local bakery. Choose 10 keywords, write 3 ad variations, and define targeting. Use Google Ads Keyword Planner.",
            },
            reflection: {
              prompt:
                "What factors would make you choose paid search over organic SEO for a campaign?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "d5",
            title: "Social Media Advertising",
            duration: "21 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Social Media Advertising

Social ads let you target with incredible precision — but creativity is what converts.

### Platform Comparison

| Platform | Best For | Targeting Strength |
|----------|----------|-------------------|
| Facebook/Instagram | B2C, visual products | Interests, behaviours, lookalikes |
| LinkedIn | B2B, professional services | Job title, company, seniority |
| TikTok | Gen Z, viral content | Interests, engagement, creators |
| X (Twitter) | Real-time, news, tech | Keywords, followers, events |

### Ad Creative Best Practices

- **Hook in 3 seconds** – Stop the scroll immediately
- **Show the product** – Don't make users guess
- **One clear CTA** – "Shop Now", "Learn More", "Sign Up"
- **Test multiple variations** – A/B test images, copy, and CTAs

### Budgeting

- Start with ₦5,000–₦10,000/day for testing
- Scale winners, kill losers quickly
- Aim for ROAS (Return on Ad Spend) of 3:1 or higher`,
            assignment: {
              instructions:
                "Design a Facebook/Instagram ad campaign for a fitness app. Create 2 ad creatives (image + copy), define audience targeting, and set a budget. Present in a slide deck.",
            },
            reflection: {
              prompt:
                "What makes you stop scrolling on social media ads? Analyse 3 ads you noticed recently.",
            },
            comments: [],
            rating: null,
          },
          {
            id: "d6",
            title: "Email Marketing Automation",
            duration: "19 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Email Marketing Automation

Email has the highest ROI of any digital channel — ₦42 returned for every ₦1 spent.

### Email Types

| Type | Purpose | When to Send |
|------|---------|--------------|
| Welcome | Onboard new subscribers | Immediately after sign-up |
| Newsletter | Build relationships | Weekly/bi-weekly |
| Promotional | Drive sales | Around launches/holidays |
| Transactional | Confirm actions | Real-time (order, password reset) |
| Re-engagement | Win back inactive users | After 30–60 days of inactivity |

### Automation Flows

1. **Welcome Series** – 3–5 emails over 2 weeks
2. **Abandoned Cart** – 3 emails over 48 hours
3. **Post-Purchase** – Review request, cross-sell, referral
4. **Re-engagement** – "We miss you" + incentive

### Subject Line Tips

- Keep under 50 characters
- Use personalization (first name, location)
- Create curiosity or urgency
- A/B test everything`,
            assignment: {
              instructions:
                "Write a 5-email welcome series for an online course platform. Include subject lines, preview text, and body copy for each email. Submit as a document.",
            },
            reflection: {
              prompt:
                "What emails do you actually open, and what makes you click?",
            },
            comments: [],
            rating: null,
          },
        ],
      },
      {
        id: "dm3",
        title: "Module 3 – Analytics & Optimization",
        lessons: [
          {
            id: "d7",
            title: "Google Analytics 4",
            duration: "23 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Google Analytics 4

GA4 is the latest version of Google Analytics, built for a privacy-first, cross-device world.

### Key Differences from UA

- **Event-based** – Everything is an event (page_view, click, purchase)
- **Cross-platform** – Web + app data in one property
- **Machine learning** – Predictive metrics like purchase probability
- **Privacy-focused** – Works without cookies using modelling

### Essential Reports

| Report | What It Shows |
|--------|---------------|
| Realtime | Active users right now |
| Acquisition | Where users come from |
| Engagement | What users do on your site |
| Monetization | Revenue, e-commerce data |
| Retention | How often users return |

### Key Metrics

- **Users** – Unique visitors
- **Sessions** – A period of user activity
- **Engagement Rate** – Sessions with interaction / Total sessions
- **Average Engagement Time** – Time actively on page
- **Conversions** – Completed goals`,
            assignment: {
              instructions:
                "Set up a GA4 property for a website. Configure 3 custom events and create a custom dashboard with 5 key metrics. Document the setup process.",
            },
            reflection: {
              prompt:
                "What metrics do you think are most important for a business, and why?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "d8",
            title: "Conversion Rate Optimization",
            duration: "20 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Conversion Rate Optimization

CRO is the science of turning more visitors into customers without spending more on ads.

### The CRO Process

1. **Research** – Analytics, heatmaps, user recordings, surveys
2. **Hypothesis** – "If we change X, then Y will increase because Z"
3. **Test** – A/B test or multivariate test
4. **Analyse** – Statistical significance (95% confidence)
5. **Implement** – Roll out winners, document learnings

### Common CRO Tactics

| Tactic | Expected Impact |
|--------|-----------------|
| Simplify forms | +10–30% conversions |
| Add social proof | +5–15% trust signals |
| Urgency/scarcity | +5–10% immediate action |
| Clearer CTAs | +10–20% click-through |
| Faster load times | +7% per second improved |

### Testing Tools

- Google Optimize (free, sunset 2023)
- Optimizely (enterprise)
- VWO (mid-market)
- Unbounce (landing pages)`,
            assignment: {
              instructions:
                "Choose a landing page and create a CRO test plan. Define 2 hypotheses, design variations, and outline how you'd measure success. Submit as a structured document.",
            },
            reflection: {
              prompt:
                "What is one small change you think could significantly improve conversions on a website you visit often?",
            },
            comments: [],
            rating: null,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 5: Content Creation & Branding (15%)
  // ═══════════════════════════════════════════════════
  {
    id: "c5",
    title: "Content Creation & Branding",
    instructor: "Fatima Bello",
    description:
      "Learn how to build a powerful personal or business brand through strategic content creation. From storytelling and visual identity to platform-specific growth tactics.",
    thumbnail: null,
    price: 39999,
    enrolled: true,
    progress: 15,
    completedLessons: ["cc1"],
    modules: [
      {
        id: "ccm1",
        title: "Module 1 – Brand Foundations",
        lessons: [
          {
            id: "cc1",
            title: "Defining Your Brand Identity",
            duration: "16 min",
            completed: true,
            videoUrl: null,
            audioUrl: null,
            notes: `## Defining Your Brand Identity

Your brand is not your logo. It's the perception people have of you when you're not in the room.

### Brand Identity Components

1. **Mission** – Why you exist
2. **Vision** – Where you're going
3. **Values** – What you stand for
4. **Voice** – How you speak (tone, vocabulary, style)
5. **Visual Identity** – Logo, colours, typography, imagery

### The Brand Positioning Statement

\`\`\`
For [target audience],
[Brand] is the [category]
that [key benefit]
because [reason to believe].
\`\`\`

### Example

\`\`\`
For aspiring entrepreneurs,
Startup Nigeria is the business education platform
that provides practical, Africa-focused strategies
because it was built by founders who've done it.
\`\`\`

### Personal vs Business Brand

| Personal Brand | Business Brand |
|----------------|----------------|
| Built around you | Built around a product/service |
| Long-term asset | Can be sold/transferred |
| Authenticity is key | Consistency is key |
| Examples: Oprah, Gary Vee | Examples: Nike, Apple |`,
            assignment: {
              instructions:
                "Write a brand positioning statement for yourself or a business idea. Define your mission, vision, values, and target audience. Submit as a 1-page document.",
            },
            reflection: {
              prompt:
                "What do you want to be known for? How does that align with your current online presence?",
            },
            comments: [
              {
                id: "ccc1",
                author: "Fatima Bello",
                text: "Your brand positioning statement is your north star. Refer back to it before every piece of content.",
                timestamp: "2026-06-05T10:00:00Z",
                replies: [],
              },
            ],
            rating: null,
          },
          {
            id: "cc2",
            title: "Visual Branding & Aesthetics",
            duration: "19 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Visual Branding & Aesthetics

Your visual identity is the first impression. Make it count.

### Logo Design Principles

- **Simple** – Recognizable at any size
- **Memorable** – Distinctive and unique
- **Timeless** – Avoid trends that age quickly
- **Versatile** – Works in colour, black & white, and at small sizes
- **Appropriate** – Fits your industry and audience

### Colour Psychology for Brands

| Colour | Industry Fit |
|--------|--------------|
| Blue | Tech, finance, healthcare |
| Green | Eco, wellness, finance |
| Red | Food, entertainment, urgency |
| Black | Luxury, fashion, premium |
| Orange | Creative, energetic, affordable |
| Purple | Beauty, spirituality, luxury |

### Typography Pairing Examples

| Heading | Body | Mood |
|---------|------|------|
| Playfair Display | Inter | Elegant, editorial |
| Montserrat | Open Sans | Modern, friendly |
| Roboto Condensed | Roboto | Clean, professional |`,
            assignment: {
              instructions:
                "Create a visual brand identity for a coffee shop. Include a logo concept, colour palette (5 colours), and font pairing. Present as a brand board in Figma or Canva.",
            },
            reflection: {
              prompt:
                "What brands have the most memorable visual identities to you, and what makes them stick?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "cc3",
            title: "Storytelling for Brands",
            duration: "22 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Storytelling for Brands

Facts tell. Stories sell. Great brands are built on compelling narratives.

### The Brand Story Framework

1. **The Origin** – Why was the brand created? What problem did the founder face?
2. **The Struggle** – What obstacles were overcome? What was at stake?
3. **The Breakthrough** – What changed? What insight unlocked growth?
4. **The Mission** – What are you here to do? Who do you serve?
5. **The Vision** – Where are you going? What does the world look like if you succeed?

### Storytelling Formats

| Format | Best For | Length |
|--------|----------|--------|
| Founder Story | About page, pitch decks | 300–500 words |
| Customer Stories | Case studies, social proof | 200–400 words |
| Behind-the-Scenes | Social media, vlogs | 30–90 sec video |
| Value Stories | Blog posts, newsletters | 500–1200 words |

### Emotional Triggers

- **Aspiration** – "This could be you."
- **Relatability** – "I've been there too."
- **Curiosity** – "Here's what nobody tells you."
- **Urgency** – "Don't wait until it's too late."`,
            assignment: {
              instructions:
                "Write your brand's founder story using the 5-part framework. Keep it between 300–500 words. Then create a 60-second video script for the same story.",
            },
            reflection: {
              prompt:
                "What is a brand story that has stayed with you? Why did it resonate?",
            },
            comments: [],
            rating: null,
          },
        ],
      },
      {
        id: "ccm2",
        title: "Module 2 – Platform-Specific Content",
        lessons: [
          {
            id: "cc4",
            title: "Instagram Content Strategy",
            duration: "20 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Instagram Content Strategy

Instagram rewards engagement, consistency, and creativity. Learn what works in 2026.

### Content Formats & Their Purpose

| Format | Best For | Max Length |
|--------|----------|------------|
| Reels | Reach, discovery, viral potential | 90 sec |
| Carousels | Education, depth, saves | 10 slides |
| Stories | Behind-the-scenes, polls, links | 15 sec per slide |
| Feed Posts | Brand aesthetics, announcements | Single image |

### The Content Buckets Framework

Divide your content into 4 buckets:

1. **Educate** – Tips, how-tos, industry insights (40%)
2. **Entertain** – Memes, trends, relatable moments (25%)
3. **Engage** – Questions, polls, community spotlights (20%)
4. **Convert** – Product showcases, testimonials, offers (15%)

### Optimal Posting Times (West Africa)

| Day | Best Time |
|-----|-----------|
| Mon–Fri | 8–9 AM, 12–2 PM, 7–9 PM |
| Sat | 10 AM–12 PM |
| Sun | 12–2 PM |`,
            assignment: {
              instructions:
                "Create a 2-week Instagram content calendar for your brand. Include 8 posts across Reels, Carousels, and Stories. For each, specify the content bucket, caption hook, and visual concept.",
            },
            reflection: {
              prompt:
                "What type of Instagram content do you engage with most, and why?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "cc5",
            title: "YouTube & Long-Form Video",
            duration: "24 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## YouTube & Long-Form Video

YouTube is the second largest search engine. It's not just a social platform — it's a discovery engine.

### Video Types That Perform

| Type | Avg. Length | Best For |
|------|-------------|----------|
| Tutorials / How-To | 8–15 min | Search discovery, authority |
| Vlogs | 10–20 min | Building connection, personality |
| Reviews | 8–12 min | Purchase decisions, affiliate |
| Listicles | 8–12 min | Entertainment, shareability |
| Interviews | 20–60 min | Authority, networking |

### YouTube SEO Essentials

- **Title** – 60–70 chars, include primary keyword
- **Thumbnail** – High contrast, face close-up, 3 words max
- **Description** – First 2 lines are critical (above the fold)
- **Tags** – Mix of broad and specific keywords
- **Chapters** – Timestamps help navigation and SEO

### Retention Strategies

- Hook in the first 5–8 seconds
- Pattern interrupt every 3–5 minutes (graphic, question, change of pace)
- Tease what's coming next
- End with a strong CTA (subscribe, next video)`,
            assignment: {
              instructions:
                "Script and storyboard a 10-minute YouTube tutorial for your niche. Include a title, thumbnail concept, chapter breakdown, and retention hooks at 3 intervals.",
            },
            reflection: {
              prompt:
                "What YouTube channels do you watch consistently, and what keeps you coming back?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "cc6",
            title: "LinkedIn & Professional Branding",
            duration: "18 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## LinkedIn & Professional Branding

LinkedIn is no longer just a resume site. It's the #1 platform for B2B influence and thought leadership.

### Optimizing Your Profile

- **Headline** – More than your job title. Include your value proposition.
- **Banner** – Professional, branded, with a clear message.
- **About Section** – Story-driven. Problem → Solution → Credibility → CTA.
- **Featured** – Pin your best content, case study, or lead magnet.
- **Activity** – Comment thoughtfully on 5–10 posts daily before posting your own.

### Content That Works on LinkedIn

| Format | Engagement | Best For |
|--------|-----------|----------|
| Text-only posts | Highest reach | Insights, stories, opinions |
| Document carousels | High saves | Frameworks, step-by-step guides |
| Selfie-style posts | High connection | Personal stories, behind-the-scenes |
| Polls | High comments | Market research, engagement bait |
| Video (3–5 min) | Growing | Tutorials, thought leadership |

### The LinkedIn Content Formula

1. **Hook** – Bold statement or counterintuitive idea
2. **Story** – Personal experience or client example
3. **Lesson** – One clear, actionable takeaway
4. **CTA** – Discussion question or link`,
            assignment: {
              instructions:
                "Optimize your LinkedIn profile (or create a mock one). Write 3 LinkedIn posts using the content formula, each targeting a different goal: thought leadership, lead generation, and community building.",
            },
            reflection: {
              prompt:
                "How do you currently use LinkedIn? What's one change you'll make after this lesson?",
            },
            comments: [],
            rating: null,
          },
        ],
      },
      {
        id: "ccm3",
        title: "Module 3 – Monetization & Growth",
        lessons: [
          {
            id: "cc7",
            title: "Monetizing Your Content",
            duration: "26 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Monetizing Your Content

Content creation is a skill. Monetization turns that skill into a business.

### Revenue Streams for Creators

| Stream | Effort | Income Potential | Time to First Income |
|--------|--------|-----------------|---------------------|
| Brand Sponsorships | Medium | High (₦500K–5M/post) | 3–6 months |
| Affiliate Marketing | Low | Medium (₦50K–500K/mo) | 1–3 months |
| Digital Products | High (upfront) | Very High (passive) | 2–4 months |
| Coaching/Consulting | High (ongoing) | Very High | 1–3 months |
| Platform Ad Revenue | Low | Low–Medium | 6–12 months |
| Speaking Engagements | Medium | High (per event) | 6–12 months |

### The Monetization Ladder

1. **Free Content** → Build audience and trust
2. **Affiliate Products** → First revenue while you build
3. **Low-Ticket Offer** (₦5,000–₦20,000) → eBook, template, mini-course
4. **Mid-Ticket Offer** (₦50,000–₦200,000) → Course, group program
5. **High-Ticket Offer** (₦500,000+) → Coaching, done-for-you service

### Pricing Your Offers

- Don't price based on effort. Price based on value/outcome.
- A ₦50,000 course that helps someone earn ₦500,000 is a bargain.
- Test pricing with a small audience before launching publicly.`,
            assignment: {
              instructions:
                "Design your monetization ladder. Identify 1 affiliate product, 1 low-ticket offer, and 1 mid-ticket offer you could create. Include pricing, format, and a launch timeline.",
            },
            reflection: {
              prompt:
                "Which monetization stream feels most aligned with your skills and audience? Why?",
            },
            comments: [],
            rating: null,
          },
          {
            id: "cc8",
            title: "Building a Content Team",
            duration: "22 min",
            completed: false,
            videoUrl: null,
            audioUrl: null,
            notes: `## Building a Content Team

You can't scale content alone. Eventually, you need a team.

### Roles to Hire (In Order)

1. **Video Editor** – Frees up the most time. Hire first.
2. **Graphic Designer** – Thumbnails, carousels, brand assets.
3. **Content Writer** – Captions, newsletters, blog posts.
4. **Community Manager** – Replies, DMs, engagement.
5. **Strategist / Producer** – Content calendar, research, analytics.

### When to Hire

| Revenue | Team Size |
|---------|-----------|
| ₦0–500K/mo | Solo (use tools, templates) |
| ₦500K–2M/mo | 1–2 freelancers (editor + designer) |
| ₦2M–5M/mo | 3–5 people (part-time or full-time) |
| ₦5M+/mo | Full team with strategist |

### Managing Creatives

- Use **Notion** or **ClickUp** for content calendars and SOPs
- Give clear briefs — don't make your team guess
- Review with Loom videos, not long meetings
- Celebrate wins publicly, give feedback privately`,
            assignment: {
              instructions:
                "Create a content team hiring plan. Identify the first 2 roles you'd hire for, write a job description for each, and outline your onboarding SOP in 5 steps.",
            },
            reflection: {
              prompt:
                "What tasks take up most of your content creation time, and which could you delegate first?",
            },
            comments: [],
            rating: null,
          },
        ],
      },
    ],
  },
];

// ─── HELPERS ────────────────────────────────────────

export function getLesson(courseId, lessonId) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return null;
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, course, module: mod };
  }
  return null;
}

export function getAllLessons(courseId) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return [];
  return course.modules.flatMap((m) => m.lessons);
}

export function getCourseById(courseId) {
  return courses.find((c) => c.id === courseId);
}

export function getStudentCourses() {
  return courses.filter((c) => c.enrolled);
}

export function getCourseProgress(courseId) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return 0;
  const totalLessons = getAllLessons(courseId).length;
  if (totalLessons === 0) return 0;
  return Math.round((course.completedLessons.length / totalLessons) * 100);
}