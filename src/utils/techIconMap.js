/**
 * Maps tech names used in the portfolio to their tech-stack-icons component names.
 * Icons available at: https://www.tech-stack-icons.com/
 */
export const TECH_ICON_MAP = {
  // Languages
  'JavaScript': 'js',

  'Python': 'python',
  'HTML': 'html',
  'CSS': 'css',
  'C++': 'cpp',
  'C': 'c',
  'Java': 'java',

  // Frontend
  'React': 'reactjs',
  'React.js': 'reactjs',
  'React 18': 'reactjs',
  'React 19': 'reactjs',
  'Next.js': 'nextjs2',
  'Vue': 'vuejs',
  'Vite': 'vitejs',
  'Tailwind CSS': 'tailwindcss',
  'Tailwind': 'tailwindcss',
  'TailwindCSS': 'tailwindcss',
  'Tailwind CSS v4': 'tailwindcss',
  'Framer Motion': 'framer',
  'Three.js': 'threejs',
  'Three.js / R3F': 'threejs',
  'R3F': 'reactjs',
  'Redux': 'redux',
  'Redux Toolkit': 'redux',
  'Zustand': 'reactjs', // fallback to react icon for zustand
  'GSAP': 'gsap',

  // Backend
  'Node.js': 'nodejs',
  'Node': 'nodejs',
  'Express.js': 'expressjs',
  'Express': 'expressjs',
  'Express v5': 'expressjs',
  'BullMQ': 'redis', // fallback to redis for queue
  'Socket.io': 'socketio',

  // Databases
  'MongoDB': 'mongodb',
  'PostgreSQL': 'postgres',
  'MySQL': 'mysql',
  'Redis': 'redis',
  'Prisma': 'prisma',

  // Cloud / DevOps
  'AWS': 'aws',
  'Docker': 'docker',
  'Kubernetes': 'kubernetes',
  'Nginx': 'nginx',
  'Git': 'git',
  'GitHub': 'github',
  'Vercel': 'vercel',
  'Cloudflare': 'cloudflare',
  'Cloudflare R2': 'cloudflare',
  'Firebase': 'firebase',
  'Supabase': 'supabase',
  'Cloudinary': 'cloudinary',

  // Tools
  'GraphQL': 'graphql',
  'Socket.io': 'socketio',
  'Stripe': 'stripe',
  'Razorpay': 'razorpay',
  'Jest': 'jest',
  'OpenAI': 'openai',
  'FFmpeg': 'ffmpeg',
  'Axios': 'axios',
  'React Router DOM': 'reactrouter',
  'Mongoose': 'mongoose',
  'JWT': 'jwt',
}

/**
 * Get the tech-stack-icons component name for a given tech name.
 * Returns null if no mapping exists.
 */
export function getTechIconName(techName) {
  return TECH_ICON_MAP[techName] || null
}

const INVERT_ICONS = [
  'github',
  'vercel',
  'threejs',
  'nextjs2',
  'framer',
  'expressjs',
  'socketio',
  'openai',
  'jwt',
  'prisma'
]

/**
 * Returns true if the icon is black by default and needs to be inverted for dark mode.
 */
export function needsInvert(iconName) {
  return INVERT_ICONS.includes(iconName)
}
