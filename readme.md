# Portfolio Website with Prisma

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black.svg?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-orange.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-blue.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A dynamic, database-driven personal portfolio website built with Next.js and Mongoose. This full-stack application allows for easy management of projects, blog posts, skills, and testimonials through a PostgreSQL backend, enabling seamless content updates without redeploying the site. Perfect for developers looking to showcase their work with real-time data persistence and admin capabilities.

## Demo Credentials

- **Email**: `admin@portfolio.com`
- **Password**: `admin123`
- **Website**: [https://portfolio-website-prisma.vercel.app](https://portfolio-website-prisma.vercel.app)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Dynamic Content Management**: Admin dashboard to CRUD projects, blog posts, and skills via Mongoose-powered API.
- **Responsive Design**: Mobile-first layout with Tailwind CSS for seamless viewing across devices.
- **SEO Optimized**: Next.js SSR and metadata for improved search rankings.
- **Authentication**: Secure login for admin using NextAuth.js (optional integration).
- **Blog & Projects Showcase**: Fetch and display content from the database with infinite scrolling and search.
- **Contact Form**: Server-side form handling with email notifications.
- **Performance Focused**: Image optimization, code splitting, and lazy loading for fast load times.

## Tech Stack

| Category           | Technology                         |
| ------------------ | ---------------------------------- |
| **Framework**      | Next.js 15                         |
| **Language**       | TypeScript 5                       |
| **Styling**        | Tailwind CSS 4                     |
| **Database**       | Mongodb                            |
| **Authentication** | NextAuth.js (optional)             |
| **Build Tool**     | npm/bun                            |
| **Other**          | ESLint, Prettier, Zod (validation) |

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/muhammadranju/portfolio-website-prisma.git
   cd portfolio-website-prisma
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Environment Variables**
   Create a `.env.local` file:

   ```
   DATABASE_URL="mongodb+srv://username:password@cluster0.jzvet.mongodb.net/portfolio-prisma?retryWrites=true&w=majority"
   NEXTAUTH_SECRET="your-nextauth-secret"  # If using auth
   NEXTAUTH_URL="http://localhost:3000"
   EMAIL_SERVER="your-email-server-url"    # For contact form
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   # or
   bun dev
   ```
   Access at `http://localhost:3000`.

## Usage

- **Frontend**: Browse sections like Home, Projects, Blog, About, and Contact.
- **Admin Panel**: Navigate to `/admin` (after auth) to manage content. Use Prisma Studio for quick DB inspections:

- **Seed Data**: Populate the DB with sample projects and posts:
  ```bash
  npm run db:seed
  ```
- **Build for Production**:
  ```bash
  npm run build
  npm start
  ```

## Deployment

- **Vercel (Recommended)**: Link your GitHub repo; auto-deploys with Prisma integration via Vercel Postgres.
- **Railway or Render**: For custom DB hosting.

Configure `DATABASE_URL` in your hosting provider's env vars.

## Project Structure

```
portfolio-website-prisma/
├── prisma/
│   ├── schema.prisma      # Database models
│   └── migrations/        # DB migrations
├── src/
│   ├── app/               # Next.js App Router
│   ├── components/        # Reusable UI components
│   ├── lib/               # Utilities, Prisma client
│   ├── data/              # Static data (fallback)
│   └── actions/           # Server actions for forms
├── public/                # Static assets
├── README.md
├── package.json
├── next.config.js
└── tailwind.config.js
```

## Contributing

Contributions are welcome to enhance this portfolio's functionality! Follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/add-blog-search`).
3. Commit changes (`git commit -m 'feat: implement blog search with Prisma queries'`).
4. Push to branch (`git push origin feature/add-blog-search`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Author**: Muhammad Ranju ([@muhammadranju](https://github.com/muhammadranju))
- **Email**: [mdranju23@gmail.com](mailto:mdranju23@gmail.com)
- **Issues**: Report bugs or ideas [here](https://github.com/muhammadranju/portfolio-website-prisma/issues)
