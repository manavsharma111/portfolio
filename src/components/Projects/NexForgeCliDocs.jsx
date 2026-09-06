import { motion } from 'framer-motion'

const commands = [
  {
    name: 'login',
    icon: '🔐',
    desc: 'Authenticate your local machine with your NexForge account.',
    usage: 'nexforge login',
    details: [
      'Prompts you for your personal CLI Token (from Dashboard).',
      'Prompts you for your Project ID.',
      'Saves your credentials securely in ~/.nexforge/config.json.'
    ]
  },
  {
    name: 'init',
    icon: '✨',
    desc: 'Initialize a new NexForge project right from your terminal without opening the browser.',
    usage: 'nexforge init',
    details: [
      'Asks for your Project Name and Framework.',
      'Automatically registers the project on NexForge servers and links your current directory.'
    ]
  },
  {
    name: 'create',
    icon: '🏗️',
    desc: 'The ultimate project generator. Scaffold a fully configured project (React, Next.js, Vue, MERN, Postgres, MySQL) with an interactive UI, blazing fast copy, and Zero Bloat dependency selection!',
    usage: 'nexforge create',
    details: [
      'Select your Stack: Fullstack, Frontend Only, or Backend Only.',
      'Zero-Bloat Dependency Selection: Inject only the packages you need (GSAP, Redux, AI SDKs).',
      'Lightning-fast install with no bloated templates.'
    ]
  },
  {
    name: 'deploy',
    icon: '🚀',
    desc: 'Package and deploy your current directory to NexForge.',
    usage: 'nexforge deploy',
    details: [
      'Instantly zips your source code (ignoring node_modules, .git, .env).',
      'Uploads to NexForge backend servers.',
      'Automatically connects to the live WebSocket log stream.',
      'Returns your live deployment URL upon success.'
    ]
  },
  {
    name: 'env',
    icon: '🌐',
    desc: 'Manage your environment variables securely.',
    usage: 'nexforge env push\nnexforge env pull',
    details: [
      'push: Reads your local .env file and securely pushes all variables to your live project.',
      'pull: Fetches all environment variables from your live project into a local .env file.'
    ]
  },
  {
    name: 'logs',
    icon: '📜',
    desc: 'Stream live build and deployment logs for your project.',
    usage: 'nexforge logs',
    details: [
      'Connects to the NexForge WebSocket server and streams real-time logs for any ongoing deployment pipelines.'
    ]
  },
  {
    name: 'rollback',
    icon: '⏪',
    desc: 'Instantly revert your live website to a previous stable deployment.',
    usage: 'nexforge rollback',
    details: [
      'Fetches a list of your recent successful and failed deployments.',
      'Instantly updates symbolic links on the server to serve the older version.',
      'Zero downtime and no rebuild required.'
    ]
  }
]

export default function NexForgeCliDocs() {
  return (
    <div className="w-full mt-10 space-y-12 text-textMain">
      
      {/* Intro Header */}
      <div className="glass p-8 rounded-3xl border border-cyan/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 blur-[100px] rounded-full pointer-events-none" />
        <h3 className="text-3xl font-heading font-bold mb-4 flex items-center gap-4 text-white">
          <span>NexForge CLI</span>
          <span className="text-2xl">🚀</span>
        </h3>
        <p className="text-lg text-textMuted mb-6 leading-relaxed">
          The official Command Line Interface for <strong>NexForge</strong> - Your custom Platform as a Service (PaaS). 
          Deploy, manage, and scale your applications directly from your terminal with zero friction!
        </p>
        
        <div className="bg-cyan/10 border border-cyan/20 rounded-xl p-6 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan rounded-l-xl" />
          <h4 className="text-xl font-bold text-cyan mb-2 flex items-center gap-2">
            <span>🌟</span> Special Feature: Project Folder Structure Generator
          </h4>
          <p className="text-textMuted leading-relaxed">
            Try <code className="bg-background/80 px-2 py-1 rounded text-cyan">nexforge create</code> to instantly scaffold Fullstack, React, Next.js, Vue, MongoDB, MySQL, and Postgres projects! It features an interactive UI and a <strong>Zero-Bloat Dependency Selection</strong> system that injects only the packages you want for lightning-fast setups.
          </p>
          <p className="text-sm text-cyan/70 mt-3 italic">
            Note: nexforge create is a standalone tool. You can use it to generate projects instantly without needing to log in!
          </p>
        </div>
      </div>

      {/* Installation */}
      <div>
        <h3 className="text-2xl font-heading font-bold mb-6 text-white border-b border-white/10 pb-4">
          Installation
        </h3>
        <p className="text-textMuted mb-4">You can install the CLI globally via NPM:</p>
        <div className="bg-[#0d1117] border border-white/10 rounded-xl p-4 font-mono text-sm text-cyan/90 flex items-center gap-4">
          <span className="text-white/30 select-none">$</span>
          <span>npm install -g nexforge-cli</span>
        </div>
      </div>

      {/* Available Commands */}
      <div>
        <h3 className="text-2xl font-heading font-bold mb-8 text-white border-b border-white/10 pb-4">
          Available Commands
        </h3>
        
        <div className="space-y-8">
          {commands.map((cmd, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1 }}
              key={cmd.name} 
              className="glass p-6 md:p-8 rounded-2xl border border-white/5 hover:border-cyan/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{cmd.icon}</span>
                <h4 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="text-textMuted text-sm font-normal select-none">{idx + 1}.</span>
                  <code className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-cyan font-mono text-lg group-hover:bg-cyan/10 group-hover:border-cyan/30 transition-colors">
                    nexforge {cmd.name}
                  </code>
                </h4>
              </div>
              
              <p className="text-textMain mb-6">
                <strong>Description:</strong> {cmd.desc}
              </p>

              <div className="mb-6">
                <div className="text-sm text-textMuted mb-2 uppercase tracking-widest font-semibold">Usage</div>
                <div className="bg-[#0d1117] border border-white/10 rounded-xl p-4 font-mono text-sm text-pink/90 leading-loose">
                  {cmd.usage.split('\n').map((line, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-white/30 select-none">$</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {cmd.details.length > 0 && (
                <div>
                  <div className="text-sm text-textMuted mb-3 uppercase tracking-widest font-semibold">Details</div>
                  <ul className="space-y-2">
                    {cmd.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3 text-textMuted">
                        <span className="text-cyan mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
    </div>
  )
}
