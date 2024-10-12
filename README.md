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

## Assets

- main course repo
  - nextjs-jobify-app/assets

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
