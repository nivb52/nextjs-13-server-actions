
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


# Using Endpoints

## using the config
```typescript
import getConfig from '@/app/config/development';

const config = getConfig();
.
.
.
  try {
        const posts = await fetch(config.api + '/content')
            .then(res => {
                return res.json()
            }) || [];
        post = posts[0]
    } catch (err) {
        console.error('error: retriving data for Blog post slug: ', req.params.slug, ' err:', err);
    }
```
## Using SSG
```typescript
export async function generateStaticParams() {
    try {
        const posts: Post[] = await fetch(config.api + '/content')
            .then(res => {
                return res.json()
            });
        return posts.map(post => { slug: post.slug });
    } catch (err) {
        console.error('error: retriving data for Blog, ', err);
    }
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
