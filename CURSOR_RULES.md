# CURSOR_RULES.md — Anime Portfolio (Multi-Route, Award-Winning)

> Place this file at the ROOT of your project. Cursor reads it automatically as project context.

## Project Overview
Award-winning, Awwwards-level developer portfolio for Manav Sharma. Multi-page React SPA with React Router, anime-inspired dark aesthetic, 3D interactive character, scroll-driven animations, premium micro-interactions, and a DEDICATED full-page deep-dive for EACH project.

## Tech Stack (do NOT change)
- React 19 + Vite (NOT Next.js — pure SPA) — **JavaScript, NOT TypeScript**
- React Router DOM v7 (multi-route)
- Tailwind CSS v4
- GSAP + ScrollTrigger + @gsap/react (scroll + timeline animations)
- Lenis (lenis package) for smooth scroll
- Three.js + @react-three/fiber + @react-three/drei + @react-three/postprocessing
- Framer Motion (page transitions, hover, layout animations)
- @dnd-kit/core (draggable skill icons)

## Rules
- **USE JavaScript (.jsx / .js files), NOT TypeScript (.tsx / .ts)**
- Vite template: `npm create vite@latest portfolio -- --template react` (NOT react-ts)
- Do NOT add type annotations, interfaces, or generics
- Do NOT install @types/three or any @types packages

## Routes
```
/              -> Home (Hero + 3D character + featured projects + stats)
/projects      -> Projects hub (cards for all 4 projects, animated grid)
/projects/nexforge    -> NexForge deep-dive page
/projects/anime-stream -> Anime Stream deep-dive page
/projects/crochella   -> Crochella deep-dive page
/projects/wolf        -> Wolf deep-dive page
/skills        -> Skills (bouncing + draggable icons, interactive)
/about         -> About (bio, journey, stats)
/achievements  -> Achievements (timeline)
/contact       -> Contact (form + social links)
*              -> 404 (anime-themed)
```

## Design System
- Background: #050510 (near-black, subtle blue tint)
- Primary accent: #00d9ff (cyan neon)
- Secondary accent: #ff006e (hot pink)
- Tertiary accent: #8b5cf6 (purple)
- Text: #e6edf3, Muted: #8b949e
- Card bg: rgba(13, 17, 23, 0.6)
- Card border: rgba(0, 217, 255, 0.15)
- Gradient: linear-gradient(135deg, #00d9ff, #8b5cf6, #ff006e)
- Glassmorphism: backdrop-filter: blur(12px), bg: rgba(255,255,255,0.03), border: 1px solid rgba(255,255,255,0.08)
- Fonts: "Space Grotesk" (headings), "Inter" (body) — Google Fonts
- Neon glow: text-shadow: 0 0 20px rgba(0,217,255,0.3)
- Sakura petals: slow drifting, pink/white, low opacity, 8-12 max

## Award-Winning Animation Effects (implement ALL)
1. Page transitions: Framer Motion AnimatePresence, clip-path wipe between routes
2. Text scramble effect on headings (chars randomize then settle)
3. 3D tilt cards (mouse-tracking perspective transform)
4. Parallax scroll layers (background moves slower than foreground)
5. Marquee/infinite scroll text (tech stack ticker)
6. Glitch effect on hover (RGB split)
7. SVG path drawing (section dividers, icons draw themselves on scroll)
8. Magnetic buttons (cursor attraction)
9. Custom neon cursor with comet trail
10. 0-100% page loader
11. Scroll progress bar (gradient, glowing)
12. GSAP ScrollTrigger pinned sections (project deep-dives)
13. Aurora gradient background (animated mesh gradient)
14. Reveal masks (clip-path animations on scroll)
15. Number count-up animations

## Performance Rules (CRITICAL — #1 Priority)
1. ONLY animate: transform, opacity, filter. NEVER: top, left, margin, width, height.
2. Add will-change + translateZ(0) on animated elements. Clear willChange after animation.
3. GSAP: force3D: true on all tweens. gsap.config({ nullTargetWarn: false }).
4. Three.js Canvas: dpr={[1, 2]}, frameloop="always".
5. Mobile (< 768px): disable 3D canvas, custom cursor, backdrop-filter, parallax, sakura petals (0-2).
6. React.memo, useMemo, useCallback. Lazy load routes (React.lazy + Suspense).
7. content-visibility: auto on below-fold sections.
8. @media (hover: hover) for hover effects.
9. Code split per route.
10. Lighthouse target: 90+ Performance.

## Code Rules
- Do NOT use any UI component library (no MUI, Chakra, shadcn). Tailwind + custom CSS only.
- Do NOT use Next.js. Pure Vite + React SPA with React Router.
- Every animation must have a purpose.
- SmoothScroll.jsx code is FINAL — do not modify the Lenis/GSAP pattern.
- Project data (metrics, tech stacks) is FINAL — do not fabricate numbers.
- Each project gets its OWN dedicated route/page with full deep-dive.

## Contact Info
- Email: manavsharma3825@gmail.com
- GitHub: https://github.com/manavsharma111
- LeetCode: (add profile link)
- Location: Bhopal, India

## File Structure
```
public/
  models/character.glb
src/
  components/
    SmoothScroll.jsx
    Layout/
      RootLayout.jsx          (Outlet + Navbar + ScrollProgress + CustomCursor + Aurora bg)
      Navbar.jsx              (glassmorphism, animated underline, mobile hamburger)
      CustomCursor.jsx
      ScrollProgress.jsx
      Aurora.jsx              (animated mesh gradient background)
      PageTransition.jsx      (Framer Motion clip-path wipe wrapper)
    Hero/
      Hero.jsx
      HeroCharacter.jsx        (3D VRoid character)
      HeroCharacterFallback.jsx
      HeroText.jsx             (text scramble + char split)
    Projects/
      ProjectsHub.jsx          (grid of all 4 project cards)
      ProjectCard.jsx         (3D tilt card)
      ProjectData.js          (all 4 projects full data)
      ProjectPage.jsx         (reusable deep-dive layout — used by each project route)
      sections/               (per-project custom sections)
        NexForgeSections.jsx
        AnimeStreamSections.jsx
        CrochellaSections.jsx
        WolfSections.jsx
    Skills/
      Skills.jsx
      SkillIcon.jsx           (bouncing on hover + draggable)
      SkillData.js
    About/
      About.jsx
      StatsCounter.jsx
    Achievements/
      Achievements.jsx
      Timeline.jsx
    Contact/
      Contact.jsx
    Shared/
      TextScramble.jsx         (reusable text scramble hook/component)
      TiltCard.jsx             (3D mouse-tracking perspective card)
      Marquee.jsx              (infinite scroll text ticker)
      GlitchText.jsx           (RGB split glitch on hover)
      MagneticButton.jsx
      SectionDivider.jsx       (SVG path drawing animation)
      RevealMask.jsx           (clip-path reveal on scroll)
      CountUp.jsx              (number count-up)
      SakuraPetals.jsx
  hooks/
    useGsap.js
    useCountUp.js
    useMediaQuery.js           (mobile detection)
  routes/
    router.jsx                 (React Router config with lazy imports)
  utils/
    animations.js
  pages/
    Home.jsx
    ProjectsHubPage.jsx
    ProjectDetailPage.jsx      (generic — takes project slug, renders sections)
    SkillsPage.jsx
    AboutPage.jsx
    AchievementsPage.jsx
    ContactPage.jsx
    NotFound.jsx
  App.jsx
  main.jsx
  index.css
```
