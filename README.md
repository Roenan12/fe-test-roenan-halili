# Workout Renderer Component

## Overview

This project implements a clean, user-friendly React component for displaying structured workout data from JSON. The design emphasizes clarity, modularity, and a modern UI using TailwindCSS. **TypeScript** is used throughout for type safety and maintainability.

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

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the app.
