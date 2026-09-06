export const projects = [
  {
    slug: 'nexforge',
    name: 'NexForge',
    tagline: 'Deploy applications with a single CLI command. Zero-downtime rollbacks. Real-time telemetry.',
    description: 'A self-hosted Platform-as-a-Service that lets developers deploy applications with a single CLI command. Handles build orchestration, zero-downtime rollbacks, dynamic subdomain routing, real-time telemetry monitoring, and AI-assisted deployment queries.',
    tech: ['React (Vite)', 'Node.js', 'Express', 'MongoDB', 'Redis', 'BullMQ', 'Socket.io', 'Cloudflare R2', 'PM2', 'GitHub OAuth', 'Commander.js', 'Archiver', 'Chalk', 'Ora', 'Recharts', 'OpenAI', 'Groq SDK', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
    accentColor: '#00d9ff',
    image: '/project_image/Nexforge.png',
    metrics: [
      { label: 'Sustained throughput', value: 128, suffix: '+ req/s', note: '(peak: 150 req/s)' },
      { label: 'Median response time', value: 366, suffix: 'ms' },
      { label: 'Success rate', value: 100, suffix: '%', note: 'across 1,000 requests' },
      { label: 'Errors/Timeouts', value: 0, suffix: '' },
      { label: 'Weekly organic downloads', value: 1076, suffix: '+' }
    ],
    architecture: [
      { title: 'Upload & Queue', description: 'CLI archive + PAT upload -> Redis/BullMQ queue' },
      { title: 'Worker Orchestration', description: 'Worker extracts and runs npm install + npm run build' },
      { title: 'Static Storage', description: 'Static files pushed to Cloudflare R2' },
      { title: 'Routing Update', description: 'MongoDB routing entry updated' },
      { title: 'Traffic Serving', description: 'Express reverse proxy serves traffic' },
      { title: 'Telemetry', description: 'Socket.io streams real-time telemetry' }
    ],
    deepDive: [
      { title: 'Architecture & Load Testing', content: 'Architected a self-hosted PaaS backend exposing build, deployment, and telemetry APIs; load-tested with Autocannon and Artillery under 50 concurrent connections, achieving 128+ req/s sustained throughput, 366ms median latency, and 100% success rate across 1,000 requests with zero errors.' },
      { title: 'CI/CD Pipeline', content: 'Engineered a CI/CD pipeline using BullMQ + Redis to orchestrate 50+ simultaneous build jobs, with PM2 lifecycle management and symlink-based artifact swapping for zero-downtime rollbacks during deployments. Pipeline: CLI archive + PAT upload -> Redis/BullMQ queue -> worker extract & npm build -> Cloudflare R2 storage -> MongoDB route update -> Express reverse proxy -> Socket.io telemetry.' },
      { title: 'CLI & Authentication', content: 'Published nexforge-cli on npm with dual-token Personal Access Token authentication and dynamic artifact pruning, reducing deployment upload sizes by ~90% through intelligent compression.' },
      { title: 'Real-time Telemetry', content: 'Integrated Socket.io + Recharts for real-time build logs and hardware telemetry with sub-100ms state synchronization, enabling live build and queue monitoring with dashboard visibility.' },
      { title: 'AI Features', content: 'Context-aware AI assistant using OpenAI + Groq SDK' },
      { customComponent: 'NexForgeCliDocs' }
    ],
    github: 'https://github.com/manavsharma111',
    liveDemo: 'https://nexforge-sandy.vercel.app/'
  },
  {
    slug: 'anime-stream',
    name: 'Adaptive HLS',
    tagline: 'Netflix-like anime streaming with FFmpeg transcoding, adaptive bitrate, and real-time progress.',
    description: 'A full-stack anime streaming platform with adaptive HLS playback. Admin uploads raw video, FFmpeg transcodes into multiple resolutions, segments stored on Cloudflare R2, users stream via HLS.js with adaptive quality switching.',
    tech: ['React 18', 'Node.js', 'Express', 'MongoDB', 'Redis', 'BullMQ', 'Fluent-FFmpeg', 'Cloudflare R2', 'Socket.io', 'HLS.js', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Recharts', 'Anilist API', 'Jikan API'],
    accentColor: '#ff006e',
    image: '/project_image/ABS_HLS_home.png',
    metrics: [
      { label: 'Virtual users concurrent', value: 650, suffix: '' },
      { label: 'Sustained throughput', value: 50, suffix: ' req/s' },
      { label: 'Success rate', value: 99, suffix: '.89%' },
      { label: 'Median response time', value: 2, suffix: '.14s' }
    ],
    architecture: [
      { title: 'Upload & Queue', description: 'Raw video upload -> BullMQ worker queue' },
      { title: 'Processing', description: 'FFmpeg probe (audio/subs) + transcode' },
      { title: 'Storage', description: 'R2 chunk storage' },
      { title: 'Adaptive Playback', description: 'HLS master.m3u8 adaptive playback' },
      { title: 'Live Progress', description: 'Socket.io live progress streaming' }
    ],
    deepDive: [
      { title: 'Adaptive-Bitrate Transcoding Engine', content: 'Built an adaptive-bitrate HLS transcoding engine supporting 1080p/720p/480p with multi-audio tracks and soft subtitles using BullMQ + Fluent-FFmpeg for asynchronous background processing of heavy raw video data.' },
      { title: 'Decoupled Video Pipeline', content: 'Designed a decoupled video pipeline using BullMQ workers and Cloudflare R2 for chunk storage, keeping CPU-intensive transcoding workloads off the main API request path for improved responsiveness. Pipeline: Raw video upload -> BullMQ worker queue -> FFmpeg probe (audio/subs) + transcode -> R2 chunk storage -> HLS master.m3u8 adaptive playback -> Socket.io live progress streaming.' },
      { title: 'Load-Tested Performance', content: 'Load-tested browsing and API workflows with Autocannon and Artillery using 650 virtual users generating 1,950 HTTP requests at 50 req/s sustained throughput; achieved 99.89% success rate with 2.14s median response time under constrained free-tier compute.' },
      { title: 'FFmpeg Worker Deep Dive', content: 'Engineered FFmpeg worker with ffprobe media analysis and a split-filter pipeline that decodes HEVC 10-bit video once and simultaneously encodes 1080p/720p/480p H.264 streams, saving 50%+ CPU over sequential encoding. Fine-tuned presets and threads for 512MB RAM servers, reducing processing time of 25-min episodes by ~45% (4h → 2.25h) with zero OOM crashes; generates MP4 fallbacks, thumbnail sprite sheets, and batches segments to Cloudflare R2.' },
      { title: 'Frontend & Metadata', content: 'Redux Toolkit for state. Anilist (GraphQL) + Jikan (REST) for metadata. Google OAuth2 SSO, JWT access/refresh.' }
    ],
    github: 'https://github.com/manavsharma111',
    liveDemo: 'https://anime-streaming-website-seven.vercel.app/'
  },
  {
    slug: 'crochella',
    name: 'Crochella',
    tagline: '3D product visualization, real-time delivery tracking, multi-vendor payments with escrow.',
    description: 'Production-grade multi-vendor e-commerce with immersive 3D product visualization, real-time delivery tracking on interactive maps, multi-vendor order splitting, Razorpay payments with webhook verification and delayed escrow payouts, AI-powered recommendations, and automated PDF invoicing.',
    tech: ['React 19', 'Vite', 'Three.js', 'R3F', 'Redux Toolkit', 'Zustand', 'Tailwind CSS v4', 'Framer Motion', 'GSAP', 'Lenis', 'Leaflet', 'Socket.io', 'Node.js', 'Express v5', 'MongoDB', 'Redis', 'BullMQ', 'Razorpay', 'Cloudinary', 'PDFKit', 'Passport.js', 'JWT', 'OpenAI'],
    accentColor: '#8b5cf6',
    image: '/project_image/Crochella.png',
    metrics: [
      { label: 'Peak throughput', value: 354, suffix: '+ req/s' },
      { label: 'Median response time', value: 50, suffix: '.9ms' },
      { label: 'Brute-force deflected', value: 3272, suffix: '' },
      { label: 'Total requests (10s)', value: 4000, suffix: '' }
    ],
    architecture: [
      { title: 'Checkout & Payment', description: 'Cart checkout -> Razorpay payment + webhook verification' },
      { title: 'Order Splitting', description: 'Order split into vendor sub-orders' },
      { title: 'Task Queue', description: 'BullMQ queue (receipts/payouts)' },
      { title: 'Real-Time Alerts', description: 'Socket.io vendor alerts' },
      { title: 'Escrow Payouts', description: 'Delayed escrow payout release' }
    ],
    deepDive: [
      { title: 'Scalable Marketplace Architecture', content: 'Engineered a scalable multi-tenant marketplace with 3+ separate dashboards (customer/admin/delivery); real-time Socket.io order tracking with Leaflet maps; Razorpay payment processing with automated PDF invoice generation.' },
      { title: '3D Product Visualization', content: 'Built an interactive 3D product catalog using Three.js, GSAP ScrollTrigger, Lenis, and Framer Motion, achieving 60+ FPS during interactive scrolling; Chrome DevTools profiling observed 126.7 FPS during testing.' },
      { title: 'Real-Time Delivery Tracking', content: 'Architected live delivery-tracking system with sub-100ms geospatial state synchronization using Socket.io and Leaflet maps; decoupled heavy workloads through BullMQ queues; integrated Razorpay payments and Cloudinary CDN.' },
      { title: 'Performance Optimization & Security', content: 'Optimized marketplace performance through Redis caching, rate-limiting, and NoSQL injection prevention; load-tested with Autocannon and Artillery reaching 354+ req/s peak throughput with 50.9ms median latency, and rate-limiter deflecting 3,200+ brute-force requests with zero server crashes.' },
      { title: 'Order & Payment Pipeline', content: 'Pipeline: Cart checkout -> Razorpay payment + webhook verification -> order split into vendor sub-orders -> BullMQ queue (receipts/payouts) -> Socket.io vendor alerts -> delayed escrow payout release.' },
      { title: 'AI Integrations', content: 'OpenAI + Groq SDK + Google GenAI for recommendations, search, content generation.' }
    ],
    github: 'https://github.com/manavsharma111',
    liveDemo: 'https://crochella-six.vercel.app/'
  },
  {
    slug: 'wolf',
    name: 'Wolf',
    tagline: 'Real-time chat, media sharing, Reels-style Loops, and a premium glassmorphism UI.',
    description: 'Feature-rich social media with real-time messaging, media sharing (posts, images, videos, "Loops" — Reels-style content), interactive feeds with likes/comments/saves, follow system, and premium glassmorphism UI with custom micro-animations.',
    tech: ['React (Vite)', 'Redux Toolkit', 'Tailwind CSS', 'Socket.io', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Cloudinary', 'Multer', 'JWT', 'React Router DOM', 'Lucide React', 'Axios'],
    accentColor: '#00d9ff',
    image: '/project_image/wolf.png',
    metrics: [
      { label: 'Real-time messaging', value: 0, suffix: ' Polling', note: 'Pure WebSocket' }
    ],
    architecture: [
      { title: 'Post Creation', description: 'User creates post -> Redux dispatch -> API upload -> Cloudinary CDN' },
      { title: 'Real-Time Broadcast', description: 'Socket.io broadcasts to followers in real-time' },
      { title: 'Live Update', description: 'Feed updates live, no refresh needed' }
    ],
    deepDive: [
      { title: 'Real-time Chat & Notifications', content: 'Socket.io-powered messaging and live interaction notifications' },
      { title: 'Media Sharing', content: 'Image, video, Loop (Reels) uploads via Cloudinary + Multer' },
      { title: 'Interactive Feed', content: 'Like, comment, save, dynamic Explore page' },
      { title: 'Follow System', content: 'Connect, view profiles, build network' },
      { title: 'Secure Auth', content: 'JWT + secure cookies + encrypted passwords' },
      { title: 'Premium UI', content: 'Glassmorphism with custom animations (animate-explode) in Tailwind CSS' },
      { title: 'Frontend State', content: 'Centralized Redux Toolkit state for auth, posts, user profiles, real-time updates' }
    ],
    github: 'https://github.com/manavsharma111',
    liveDemo: 'https://wolf-murex-alpha.vercel.app/'
  },
  {
    slug: 'portfolio',
    name: 'Portfolio',
    tagline: 'Awwwards-inspired immersive developer portfolio with 3D WebGL and cinematic animations.',
    description: 'An interactive, highly performant developer portfolio built to showcase production-grade backend systems and system design expertise. Features a cinematic dark-themed aesthetic with WebGL-powered 3D backgrounds, custom scroll logic, and butter-smooth text animations.',
    tech: ['React 19', 'Vite', 'Three.js', 'React Three Fiber', 'GSAP', 'Framer Motion', 'Tailwind CSS v4', 'Lenis', 'Lucide React'],
    accentColor: '#e6edf3',
    image: '/project_image/portfulio.png',
    metrics: [
      { label: 'Render performance', value: 60, suffix: ' FPS', note: 'stable 3D scenes' },
      { label: 'Lighthouse score', value: 100, suffix: '%', note: 'Accessibility & SEO' }
    ],
    architecture: [
      { title: 'WebGL Canvas', description: 'React Three Fiber handles 3D rendering context separately from DOM' },
      { title: 'Scroll Hijacking', description: 'Lenis intercepts scroll for fluid inertia' },
      { title: 'Animation Engine', description: 'GSAP ScrollTrigger coordinates DOM elements with scroll' }
    ],
    deepDive: [
      { title: 'High-Performance Typography', content: 'Built a custom zero-lag letter-by-letter reveal engine using native CSS transitions and requestAnimationFrame, bypassing React render bottlenecks completely.' },
      { title: 'Immersive 3D/WebGL', content: 'Integrated dynamic WebGL rendering with interactive particles and fluid simulations that respond to user scroll, while maintaining a strict 60 FPS target.' },
      { title: 'Cinematic UX/UI', content: 'Designed a meticulous dark-mode aesthetic with neon accents (Cyan & Purple), glassmorphism UI elements, and magnetic buttons for a premium "Awwwards" feel.' },
      { title: 'Mobile First 3D', content: 'Engineered responsive logic that scales down complex 3D scenes and scroll hijackers on touch devices, ensuring zero jank on mobile phones without sacrificing the visual identity.' }
    ],
    github: 'https://github.com/manavsharma111/portfolio',
    liveDemo: 'https://manav-sharma-portfolio.vercel.app'
  },
  {
    slug: 'ai-finance-dashboard',
    name: 'AI Finance',
    tagline: 'AI-powered MERN finance dashboard with Groq & Gemini financial advisory.',
    description: 'An advanced Personal Finance Dashboard that simplifies smart expense tracking and provides personalized financial insights. Powered by a modern MERN stack and integrated with dual LLM engines (Groq LLaMA 3.3 & Gemini 1.5 Flash) featuring an intelligent 1-hour sliding cache.',
    tech: ['React 19', 'Tailwind v4', 'Node.js', 'Express', 'MongoDB', 'Gemini AI', 'Groq AI', 'Recharts', 'Nodemailer', 'Framer Motion', 'GSAP', 'tsParticles'],
    accentColor: '#f97316',
    image: '/project_image/aifinance.png',
    metrics: [
      { label: 'LLM Response Cache', value: 1, suffix: ' hr', note: 'reduces API costs' },
      { label: 'AI Engines', value: 2, suffix: '', note: 'Groq + Gemini fallback' }
    ],
    architecture: [
      { title: 'Secure Auth', description: 'OTP-verified signups & JWT session management' },
      { title: 'AI Advisory Engine', description: 'Dual LLM engines with MongoDB caching' },
      { title: 'Data Export', description: 'SheetJS (XLSX) and CSV stream exports' }
    ],
    deepDive: [
      { title: 'Cognitive AI Insights', content: 'Integrated Groq SDK (LLaMA 3.3) and Google Generative AI (Gemini 1.5 Flash) as a fallback engine to provide expert financial advisory based on 30-day transaction trends. Engineered a high-performance 1-hour sliding cache in MongoDB to minimize API costs and rate limiting.' },
      { title: 'Dynamic Analytics Engine', content: 'Built interactive comparative analytics using custom Recharts SVG Pie Charts to visualize income/expense distribution across daily, weekly, and monthly timeframes.' },
      { title: 'Secure Authentication Suite', content: 'Implemented robust OTP-verified signups and password resets via Nodemailer, secured by JSON Web Tokens and BcryptJS hashing with complete automated self-serve reset paths.' },
      { title: 'Premium UI/UX Ecosystem', content: 'Developed a glassmorphic dark interface using Tailwind CSS v4, augmented with interactive tsParticles backgrounds and 3D parallax tilt effects using Framer Motion (useMotionValue, useSpring) and GSAP.' }
    ],
    github: 'https://github.com/manavsharma111/AI-Finance-Dashboard',
    liveDemo: 'https://ai-finance-dashboard-frontend.vercel.app'
  }
]
