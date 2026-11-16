# MA Automobile

Website for **Muslim Aleem Automobile Ltd** (RC: 7394953), specialists in Range Rover, Mercedes-Benz, Rolls-Royce and other exotic cars in Mabushi, Abuja.

Built with Next.js, TypeScript, Tailwind CSS and Framer Motion.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Updating the content

Everything you are likely to change lives in two files:

| What | Where |
| --- | --- |
| Cars for sale, parts and oils in the Market-Place, services, FAQ | `src/lib/data.ts` |
| Company name, address, email | `src/lib/site.ts` |
| Founder story and photo | `Founder` in `src/components/Sections.tsx` |

To show a real photo for a part or a car, place the image in `public/parts` or `public/cars` and set the `image` field on that entry, for example `image: "/cars/range-rover.jpg"`. To show a price, fill in the `price` field.

## Deploying on Vercel

1. Go to https://vercel.com/new and import this GitHub repository.
2. Set the project name to `maautomobile`. Vercel detects Next.js on its own, so leave every other setting as it is.
3. Press Deploy. The site goes live at `https://maautomobile.vercel.app` if that name is free.

If you later connect a custom domain, add an environment variable named `NEXT_PUBLIC_SITE_URL` with the full address, for example `https://www.yourdomain.com`.
