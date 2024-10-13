This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Jobify

## Create New Next.js Project

```sh
npx create-next-app@latest projectName
```

- choose typescript and eslint

## Libraries

```sh
   npm install @clerk/nextjs@^4.27.7 @prisma/client@^5.7.0 @tanstack/react-query@^5.14.0 @tanstack/react-query-devtools@^5.14.0 dayjs@^1.11.10 next-themes@^0.2.1 recharts@^2.10.3
   npm install prisma@^5.7.0 -D
```

## shadcn/ui

[Docs](https://ui.shadcn.com/)

- follow Next.js install steps (starting with 2)
- open another terminal window (optional)

```sh
npx shadcn@latest init
```

- setup Button

```sh
npx shadcn@latest add button
```

[Icons](https://lucide.dev/guide/packages/lucide-react)

page.tsx

```tsx
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Button>default button</Button>
      <Button variant="outline" size="icon">
        <Camera />
      </Button>
    </div>
  );
}
```

## Challenge - Build the Home Page (app/page.tsx)

1. **Import necessary modules and components:**

   - Import the `Image` component from 'next/image' for displaying images.
   - Import the `Logo` and `LandingImg` SVG files from the assets directory.
   - Import the `Button` component from the UI components directory.
   - Import the `Link` component from 'next/link' for navigation.

2. **Define the `Home` component:**

   - This component doesn't receive any props.

3. **Inside the `Home` component, return the JSX:**

   - The main wrapper is a `main` HTML element.
   - Inside `main`, there are two main sections: `header` and `section`.
   - The `header` contains the `Image` component that displays the `Logo`.
   - The `section` contains a `div` and an `Image` component.
   - The `div` contains a `h1` heading, a `p` paragraph, and a `Button` component.
   - The `Button` component wraps a `Link` component that navigates to the '/add-job' route when clicked.
   - The `Image` component displays the `LandingImg`.

4. **Apply CSS classes for styling:**

   - CSS classes are applied to the elements for styling. These classes are from Tailwind CSS, a utility-first CSS framework.

5. **Export the `Home` component as the default export of the module.**

## Layout and Home Page

- setup title and description
- add favicon
- setup home page

layout.tsx

```tsx
export const metadata: Metadata = {
  title: "Jobify Dev",
  description: "Job application tracking system for job hunters",
};
```

page.tsx

```tsx
import Image from "next/image";
import Logo from "../assets/logo.svg";
import LandingImg from "../assets/main.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 ">
        <Image src={Logo} alt="logo" />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-md mt-4 ">
            Welcome to Jobify app. This is the best place for you to find your
            dream job. Software Engineer? Data Scientist? Economist? Accountant?
            Doesn't Matter. Here, we have every single opportunity for you to
            view it, love it and then, apply to it!
          </p>
          <Button asChild className="mt-4">
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>
        <Image src={LandingImg} alt="landing" className="hidden lg:block " />
      </section>
    </main>
  );
}
```

## Favicon and Logo (optional)

- [Favicon](https://favicon.io/)
- [Undraw](https://undraw.co/)
- [Logo - Figma File](https://www.figma.com/community/file/1319010578601364983/jobify-logo-public)

## Challenge - Setup Dashboard Pages

- create add-job, jobs and stats pages
- group them in (dashboard)
- setup a layout file (just pass children)

## Dashboard Pages

- create add-job, jobs and stats pages
- group them in (dashboard)
- setup a layout file (just pass children)

(dashboard)/layout.tsx

```tsx
function layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
export default layout;
```

## Challenge - Add Clerk Auth

- setup new app, configure fields - (or use existing)
- add ENV Vars
- wrap layout in Clerk Provider
- add middleware
- set only home page public
- restart dev server

## Clerk Auth

- setup new app, configure fields - (or use existing)
- add ENV Vars
- wrap layout
- add middleware
- make '/' public
- restart dev server

layout.tsx

```tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

middleware.tsx

```tsx
import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

## Challenge - Build the links.tsx Component

1. **Create File and Import necessary modules and components:**

   - create utils/links.tsx
   - Import the `AreaChart`, `Layers`, and `AppWindow` components from 'lucide-react' for displaying icons.

2. **Define the `NavLink` type:**

   - This type has three properties: `href` (a string), `label` (a string), and `icon` (a React Node).

3. **Define the `links` constant:**

   - This constant is an array of `NavLink` objects.
   - Each object represents a navigation link with a `href`, `label`, and `icon`.

4. **Define the navigation links:**

   - The first link has a `href` of '/add-job', a `label` of 'add job', and an `icon` of `<Layers />`.
   - The second link has a `href` of '/jobs', a `label` of 'all jobs', and an `icon` of `<AppWindow />`.
   - The third link has a `href` of '/stats', a `label` of 'stats', and an `icon` is not defined yet.

5. **Export the `links` constant:**
   - This constant can be imported in other components to create navigation menus.

## Links Data

- create utils/links.tsx

utils/links.tsx

```tsx
import { AreaChart, Layers, AppWindow } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/add-job",
    label: "add job",
    icon: <Layers />,
  },
  {
    href: "/jobs",
    label: "all jobs",
    icon: <AppWindow />,
  },
  {
    href: "/stats",
    label: "stats",
    icon: <AreaChart />,
  },
];

export default links;
```

## Challenge - Dashboard Layout

- create following components :

  - Sidebar
  - Navbar
  - LinksDropdown
  - ThemeToggle

- setup (dashboard/layout.tsx)

1. **Import necessary modules and components:**

   - Import `Navbar` and `Sidebar` components.
   - Import `PropsWithChildren` from 'react'.

2. **Define the `layout` component:**

   - This component receives `children` as props.

3. **Return the JSX:**

   - The main wrapper is a `main` element with a grid layout.
   - The first `div` contains the `Sidebar` component and is hidden on small screens.
   - The second `div` spans 4 columns on large screens and contains the `Navbar` component and the `children`.

4. **Export the `layout` component.**
   dashboard/layout.tsx

## Dashboard Layout

- create following components :

  - Sidebar
  - Navbar
  - LinksDropdown
  - ThemeToggle

(dashboard/layout.tsx)

```tsx
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <main className="grid lg:grid-cols-5">
      {/* first-col hide on small screen */}
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen">
        <Sidebar />
      </div>
      {/* second-col hide dropdown on big screen */}

      <div className="lg:col-span-4">
        <Navbar />
        <div className="py-16 px-4 sm:px-8 lg:px-16">{children}</div>
      </div>
    </main>
  );
}
export default layout;
```

## Challenge - Build Sidebar Component

1. **Import necessary modules and components:**

   - Import `Logo`, `links`, `Image`, `Link`, `Button`, and `usePathname`.

2. **Define the `Sidebar` component:**

   - Use `usePathname` to get the current route.

3. **Return the JSX:**

   - The main wrapper is an `aside` element.
   - Inside `aside`, display the `Logo` using `Image`.
   - Map over `links` to create `Button` components for each link.
   - Each `Button` wraps a `Link` that navigates to the link's `href`.

4. **Export the `Sidebar` component.**

## Sidebar

- render links and logo
- check the path, if active use different variant
  Sidebar.tsx

```tsx
"use client";
import Logo from "@/assets/images/logo.svg";
import links from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="py-4 px-8 bg-muted h-full">
      <Image src={Logo} alt="logo" className="mx-auto" />
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map((link) => {
          return (
            <Button
              asChild
              key={link.href}
              variant={pathname === link.href ? "default" : "link"}
            >
              <Link href={link.href} className="flex items-center gap-x-2 ">
                {link.icon} <span className="capitalize">{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
}
export default Sidebar;
```

## Challenge - Build Navbar Component

1. **Import necessary modules and components:**

   - Import `LinksDropdown`, `UserButton` from '@clerk/nextjs', and `ThemeToggle`.

2. **Define the `Navbar` component:**

   - This component doesn't receive any props.

3. **Return the JSX:**

   - The main wrapper is a `nav` element with Tailwind CSS classes for styling.
   - Inside `nav`, there are two `div` elements.
   - The first `div` contains the `LinksDropdown` component.
   - The second `div` contains the `ThemeToggle` and `UserButton` components.

4. **Export the `Navbar` component.**

## Navbar

Navbar.tsx

```tsx
import LinksDropdown from "./LinksDropdown";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between">
      <div>
        <LinksDropdown />
      </div>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
export default Navbar;
```
