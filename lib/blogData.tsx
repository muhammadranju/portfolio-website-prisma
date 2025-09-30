// Mock blog data - in a real app, this would come from your database
export const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "Learn how to structure large React applications using TypeScript, best practices for component architecture, and advanced patterns for maintainable code.",
    content: `
# Building Scalable React Applications with TypeScript

When building large-scale React applications, proper architecture and TypeScript integration become crucial for maintainability and developer experience. In this comprehensive guide, we'll explore the best practices and patterns that will help you create robust, scalable applications.

## Why TypeScript for React?

TypeScript brings static type checking to JavaScript, which is invaluable when working with React components. Here are the key benefits:

- **Better Developer Experience**: IntelliSense, auto-completion, and refactoring tools
- **Early Error Detection**: Catch type-related bugs during development
- **Self-Documenting Code**: Types serve as inline documentation
- **Safer Refactoring**: Confidence when making changes to large codebases

## Project Structure

A well-organized project structure is the foundation of any scalable application. Here's a recommended structure:

\`\`\`
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── forms/        # Form components
│   └── layout/       # Layout components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── types/            # TypeScript type definitions
├── stores/           # State management
└── app/              # Next.js app directory
\`\`\`

## Component Architecture Patterns

### 1. Compound Components

Compound components allow you to create flexible, reusable components that work together:

\`\`\`typescript
interface TabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

export function Tabs({ children, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

Tabs.List = TabsList
Tabs.Tab = Tab
Tabs.Panel = TabPanel
\`\`\`

### 2. Render Props Pattern

Use render props for sharing logic between components:

\`\`\`typescript
interface DataFetcherProps<T> {
  url: string
  children: (data: T | null, loading: boolean, error: Error | null) => ReactNode
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Fetch logic here...

  return children(data, loading, error)
}
\`\`\`

## Advanced TypeScript Patterns

### Generic Components

Create flexible, type-safe components using generics:

\`\`\`typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor: (item: T) => string | number
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )
}
\`\`\`

### Discriminated Unions

Use discriminated unions for type-safe state management:

\`\`\`typescript
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

function useAsyncData<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' })

  // Implementation...

  return state
}
\`\`\`

## Performance Optimization

### Memoization Strategies

Use React.memo, useMemo, and useCallback strategically:

\`\`\`typescript
const ExpensiveComponent = React.memo<Props>(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveTransformation(item))
  }, [data])

  const handleUpdate = useCallback((id: string) => {
    onUpdate(id)
  }, [onUpdate])

  return (
    // Component JSX
  )
})
\`\`\`

## Testing Strategies

Write comprehensive tests for your TypeScript React components:

\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Counter } from './Counter'

describe('Counter', () => {
  it('increments count when button is clicked', () => {
    render(<Counter initialCount={0} />)
    
    const button = screen.getByRole('button', { name: /increment/i })
    const count = screen.getByTestId('count')
    
    expect(count).toHaveTextContent('0')
    
    fireEvent.click(button)
    
    expect(count).toHaveTextContent('1')
  })
})
\`\`\`

## Conclusion

Building scalable React applications with TypeScript requires careful planning, proper architecture, and adherence to best practices. By following these patterns and principles, you'll create applications that are maintainable, performant, and enjoyable to work with.

Remember that scalability isn't just about handling more users—it's about creating code that can grow and evolve with your team and requirements.
    `,
    author: "John Doe",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Architecture"],
    featured: true,
  },
  {
    id: 2,
    title: "The Complete Guide to Next.js App Router",
    excerpt:
      "Explore the new App Router in Next.js 13+, including server components, streaming, and advanced routing patterns for modern web applications.",
    content: `
# The Complete Guide to Next.js App Router

The Next.js App Router represents a fundamental shift in how we build React applications. Introduced in Next.js 13, it brings server components, improved routing, and better developer experience to the forefront.

## What is the App Router?

The App Router is a new paradigm in Next.js that leverages React's latest features, including:

- **Server Components**: Components that render on the server
- **Streaming**: Progressive rendering for better performance
- **Nested Layouts**: Shared UI that persists across routes
- **Loading UI**: Built-in loading states
- **Error Handling**: Granular error boundaries

## File-based Routing

The App Router uses a file-based routing system with special files:

\`\`\`
app/
├── layout.tsx          # Root layout
├── page.tsx           # Home page
├── loading.tsx        # Loading UI
├── error.tsx          # Error UI
├── not-found.tsx      # 404 page
└── blog/
    ├── layout.tsx     # Blog layout
    ├── page.tsx       # Blog listing
    └── [slug]/
        └── page.tsx   # Individual blog post
\`\`\`

## Server vs Client Components

### Server Components (Default)

Server Components render on the server and can:
- Access backend resources directly
- Keep sensitive data on the server
- Reduce client-side JavaScript bundle
- Improve SEO and initial page load

\`\`\`typescript
// This is a Server Component by default
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug) // Direct database access
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
\`\`\`

### Client Components

Use the "use client" directive for interactivity:

\`\`\`typescript
'use client'

import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
\`\`\`

## Data Fetching Patterns

### Server-side Data Fetching

\`\`\`typescript
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(\`https://api.example.com/products/\${params.id}\`)
    .then(res => res.json())
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  )
}
\`\`\`

### Parallel Data Fetching

\`\`\`typescript
async function Dashboard() {
  const userPromise = getUser()
  const postsPromise = getPosts()
  const analyticsPromise = getAnalytics()
  
  const [user, posts, analytics] = await Promise.all([
    userPromise,
    postsPromise,
    analyticsPromise
  ])
  
  return (
    <div>
      <UserProfile user={user} />
      <PostsList posts={posts} />
      <Analytics data={analytics} />
    </div>
  )
}
\`\`\`

## Streaming and Suspense

Use Suspense boundaries for progressive loading:

\`\`\`typescript
import { Suspense } from 'react'

function BlogPage() {
  return (
    <div>
      <h1>My Blog</h1>
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </div>
  )
}

async function Posts() {
  const posts = await getPosts() // This can be slow
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
\`\`\`

## Route Handlers (API Routes)

Create API endpoints using route handlers:

\`\`\`typescript
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const posts = await getPosts()
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const post = await createPost(body)
  return NextResponse.json(post, { status: 201 })
}
\`\`\`

## Middleware

Implement middleware for authentication, redirects, and more:

\`\`\`typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
\`\`\`

## Best Practices

### 1. Composition over Configuration

Build reusable layouts and components:

\`\`\`typescript
// app/dashboard/layout.tsx
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
\`\`\`

### 2. Error Boundaries

Handle errors gracefully:

\`\`\`typescript
// app/dashboard/error.tsx
'use client'

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
\`\`\`

### 3. Loading States

Provide immediate feedback:

\`\`\`typescript
// app/dashboard/loading.tsx
function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  )
}
\`\`\`

## Migration from Pages Router

If you're migrating from the Pages Router:

1. **Move files**: Move pages from \`pages/\` to \`app/\`
2. **Update imports**: Change import paths as needed
3. **Convert API routes**: Move to \`app/api/\` with new format
4. **Add layouts**: Replace \`_app.tsx\` with layout components
5. **Update data fetching**: Use new patterns for server components

## Conclusion

The Next.js App Router represents the future of React development, bringing server components and improved performance to the mainstream. While there's a learning curve, the benefits in terms of performance, developer experience, and maintainability make it worth the investment.

Start by experimenting with server components in new projects, and gradually migrate existing applications as you become more comfortable with the new patterns.
    `,
    author: "John Doe",
    publishedAt: "2024-01-10",
    readTime: "12 min read",
    tags: ["Next.js", "React", "Web Development"],
    featured: true,
  },
]
