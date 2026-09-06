export const skills = [
  // Frontend
  { name: 'React 19',       stackIcon: 'react',        category: 'Frontend',  color: '#00d9ff', proficiency: 95, ecosystem: ['Vite', 'Tailwind CSS v4', 'Framer Motion', 'GSAP', 'Redux Toolkit', 'Three.js / R3F', 'Lenis', 'JavaScript'] },
  { name: 'Vite',           stackIcon: 'vitejs',       category: 'Frontend',  color: '#bd34fe', proficiency: 90, ecosystem: ['React 19', 'Tailwind CSS v4', 'JavaScript'] },
  { name: 'Tailwind CSS v4',stackIcon: 'tailwindcss',  category: 'Frontend',  color: '#06b6d4', proficiency: 95, ecosystem: ['React 19', 'Vite', 'Framer Motion', 'GSAP'] },
  { name: 'Framer Motion',  stackIcon: 'motion',       category: 'Frontend',  color: '#ff006e', proficiency: 85, ecosystem: ['React 19', 'Tailwind CSS v4', 'GSAP', 'Lenis'] },
  { name: 'GSAP',           stackIcon: 'gsap',         category: 'Frontend',  color: '#88ce02', proficiency: 85, ecosystem: ['React 19', 'Tailwind CSS v4', 'Framer Motion', 'Three.js / R3F', 'Lenis', 'JavaScript'] },
  { name: 'Three.js / R3F', stackIcon: 'threejs',      category: 'Frontend',  color: '#8b5cf6', proficiency: 80, ecosystem: ['React 19', 'GSAP', 'Framer Motion', 'JavaScript'] },
  { name: 'Redux Toolkit',  stackIcon: 'redux',        category: 'Frontend',  color: '#764abc', proficiency: 90, ecosystem: ['React 19', 'JavaScript'] },
  { name: 'Lenis',          stackIcon: null,           category: 'Frontend',  color: '#ff9900', proficiency: 85, ecosystem: ['React 19', 'GSAP', 'Framer Motion'] },

  // Backend
  { name: 'Node.js',        stackIcon: 'nodejs',       category: 'Backend',   color: '#339933', proficiency: 95, ecosystem: ['Express.js', 'REST APIs', 'MongoDB', 'Redis', 'Socket.io', 'JWT', 'PM2', 'JavaScript', 'C++'] },
  { name: 'Express.js',     stackIcon: 'expressjs',    category: 'Backend',   color: '#ffffff', proficiency: 90, ecosystem: ['Node.js', 'REST APIs', 'MongoDB', 'Mongoose', 'JWT', 'OAuth 2.0', 'Passport.js', 'Bcrypt', 'JavaScript'] },
  { name: 'REST APIs',      stackIcon: null,           category: 'Backend',   color: '#0055ff', proficiency: 90, ecosystem: ['Node.js', 'Express.js', 'Postman', 'JWT', 'OAuth 2.0'] },
  { name: 'MongoDB',        stackIcon: 'mongodb',      category: 'Backend',   color: '#47a248', proficiency: 90, ecosystem: ['Node.js', 'Express.js', 'Mongoose', 'Redis'] },
  { name: 'Mongoose',       stackIcon: 'mongoose',     category: 'Backend',   color: '#880000', proficiency: 85, ecosystem: ['MongoDB', 'Node.js', 'Express.js'] },
  { name: 'Redis',          stackIcon: 'redis',        category: 'Backend',   color: '#dc382d', proficiency: 80, ecosystem: ['Node.js', 'Express.js', 'MongoDB', 'BullMQ', 'Socket.io'] },
  { name: 'BullMQ',         stackIcon: null,           category: 'Backend',   color: '#ff6b35', proficiency: 85, ecosystem: ['Redis', 'Node.js', 'Express.js'] },
  { name: 'Socket.io',      stackIcon: 'socketio',     category: 'Backend',   color: '#010101', proficiency: 90, ecosystem: ['Node.js', 'Express.js', 'Redis', 'React 19'] },
  { name: 'JWT',            stackIcon: 'jwt',          category: 'Backend',   color: '#ff0055', proficiency: 85, ecosystem: ['Node.js', 'Express.js', 'Passport.js', 'Bcrypt', 'REST APIs'] },
  { name: 'OAuth 2.0',      stackIcon: null,           category: 'Backend',   color: '#3b5998', proficiency: 85, ecosystem: ['Node.js', 'Express.js', 'Passport.js', 'JWT', 'REST APIs'] },
  { name: 'Passport.js',    stackIcon: null,           category: 'Backend',   color: '#00d2ff', proficiency: 80, ecosystem: ['Node.js', 'Express.js', 'OAuth 2.0', 'JWT', 'Bcrypt'] },
  { name: 'Bcrypt',         stackIcon: null,           category: 'Backend',   color: '#ffd700', proficiency: 85, ecosystem: ['Node.js', 'Express.js', 'Passport.js', 'JWT'] },

  // DevOps
  { name: 'Cloudflare R2',  stackIcon: 'cloudflare',   category: 'DevOps',    color: '#f6821f', proficiency: 85, ecosystem: ['Node.js', 'Express.js', 'Vercel'] },
  { name: 'Vercel',         stackIcon: 'vercel',       category: 'DevOps',    color: '#ffffff', proficiency: 90, ecosystem: ['React 19', 'Node.js', 'GitHub Actions', 'CI/CD'] },
  { name: 'Docker',         stackIcon: 'docker',       category: 'DevOps',    color: '#2496ed', proficiency: 75, ecosystem: ['Node.js', 'MongoDB', 'Redis', 'CI/CD'] },
  { name: 'GitHub Actions', stackIcon: 'github',       category: 'DevOps',    color: '#2088FF', proficiency: 85, ecosystem: ['GitHub', 'CI/CD', 'Docker', 'Vercel'] },
  { name: 'CI/CD',          stackIcon: null,           category: 'DevOps',    color: '#00d9ff', proficiency: 75, ecosystem: ['GitHub Actions', 'Docker', 'Vercel', 'Git'] },
  { name: 'PM2',            stackIcon: null,           category: 'DevOps',    color: '#2c3e50', proficiency: 80, ecosystem: ['Node.js', 'Express.js'] },
  { name: 'Autocannon',     stackIcon: null,           category: 'DevOps',    color: '#ff006e', proficiency: 85, ecosystem: ['Node.js', 'Express.js', 'Artillery'] },
  { name: 'Artillery',      stackIcon: null,           category: 'DevOps',    color: '#8b5cf6', proficiency: 85, ecosystem: ['Node.js', 'Express.js', 'Autocannon'] },

  // Languages
  { name: 'JavaScript',     stackIcon: 'js',           category: 'Languages', color: '#f7df1e', proficiency: 95, ecosystem: ['React 19', 'Node.js', 'Express.js'] },
  { name: 'C++',            stackIcon: 'cpp',          category: 'Languages', color: '#00599c', proficiency: 85, ecosystem: ['Node.js'] },
  { name: 'Python',         stackIcon: 'python',       category: 'Languages', color: '#3776ab', proficiency: 80, ecosystem: ['OpenAI', 'Groq SDK'] },

  // Tools
  { name: 'Git',            stackIcon: 'git',          category: 'Tools',     color: '#f05032', proficiency: 90, ecosystem: ['GitHub', 'GitHub Actions', 'CI/CD'] },
  { name: 'GitHub',         stackIcon: 'github',       category: 'Tools',     color: '#ffffff', proficiency: 90, ecosystem: ['Git', 'GitHub Actions', 'CI/CD'] },
  { name: 'npm',            stackIcon: 'npm',          category: 'Tools',     color: '#CB3837', proficiency: 95, ecosystem: ['Node.js', 'React 19', 'JavaScript'] },
  { name: 'Postman',        stackIcon: 'postman',      category: 'Tools',     color: '#ff6c37', proficiency: 90, ecosystem: ['REST APIs', 'Express.js', 'Node.js'] },
  { name: 'FFmpeg',         stackIcon: 'ffmpeg',       category: 'Tools',     color: '#007806', proficiency: 85, ecosystem: ['Node.js', 'Express.js'] },
  { name: 'Cloudinary',     stackIcon: 'cloudinary',   category: 'Tools',     color: '#3448c5', proficiency: 85, ecosystem: ['Node.js', 'Express.js', 'React 19'] },
  { name: 'Razorpay',       stackIcon: 'razorpay',     category: 'Tools',     color: '#0c2451', proficiency: 85, ecosystem: ['Node.js', 'Express.js', 'React 19'] },
  { name: 'Commander.js',   stackIcon: null,           category: 'Tools',     color: '#eeeeee', proficiency: 85, ecosystem: ['Node.js', 'JavaScript'] },
  { name: 'Archiver',       stackIcon: null,           category: 'Tools',     color: '#ffaa00', proficiency: 80, ecosystem: ['Node.js', 'Express.js'] },

  // AI/ML
  { name: 'OpenAI',         stackIcon: 'openai',       category: 'AI/ML',     color: '#10a37f', proficiency: 85, ecosystem: ['Python', 'Node.js', 'Google GenAI', 'Groq SDK'] },
  { name: 'Groq SDK',       stackIcon: 'groq',         category: 'AI/ML',     color: '#f55036', proficiency: 80, ecosystem: ['Python', 'Node.js', 'OpenAI', 'Google GenAI'] },
  { name: 'Google GenAI',   stackIcon: 'google',       category: 'AI/ML',     color: '#4285f4', proficiency: 75, ecosystem: ['Python', 'Node.js', 'OpenAI', 'Groq SDK'] },
]
