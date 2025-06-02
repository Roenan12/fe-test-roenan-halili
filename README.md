# Workout Renderer Component

## Overview

This project implements a clean, user-friendly React component for displaying structured workout data from JSON. The design emphasizes clarity, modularity, and a modern UI using TailwindCSS.

## Assumptions

- The workout JSON structure is consistent and includes: name, description, discipline, duration, and an array of segments, each with blocks.
- Each block is one of: `duration_interval`, `rest`, or `set` (which may contain nested blocks).
- The UI uses the structured data fields (`type`, `duration`, `intensity`, etc.) as the source of truth, not the `render` string.
- Block titles are determined by type and context (e.g., "Jog" for easy intervals in warmup/cool down, "Rest" for rest blocks).
- Intensity and discipline are visually indicated with badges and icons for clarity.
- The design is clean, modern, and mobile-friendly, with clear visual hierarchy and accessible color contrast.
- Recursion is used to handle nested sets in the workout structure.
- The component is intended for use in a React + TailwindCSS + Next.js environment.

## Approach

- **Component Architecture:**
  - The UI is broken down into clear, reusable components:
    - `Workout` (main container)
    - `WorkoutHeader` (title, description, duration, discipline badge)
    - `Segment` (for each workout section)
    - `Block` (for each step, including recursive rendering for sets)
- **Data-Driven Rendering:**
  - The component uses the raw structured data (type, duration, intensity, etc.) as the source of truth, ensuring flexibility and accuracy.
- **Modern UI/UX:**
  - TailwindCSS is used for a cohesive, accessible, and responsive design.
  - Visual hierarchy is established with dark cards, clear section headers, and color-coded badges/bars for intensity and discipline.
  - Icons and badges provide quick visual cues without clutter.
- **Best Practices:**
  - Functional, stateless React components with clear prop interfaces.
  - Recursion is used for nested sets, keeping the code DRY and maintainable.
  - All styling is handled via Tailwind utility classes for consistency and rapid iteration.

## Usage

Simply pass your workout JSON data to the `Workout` component:

```jsx
<Workout workout={workoutData} />
```

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
