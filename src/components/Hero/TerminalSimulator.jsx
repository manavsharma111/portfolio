import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

const INITIAL_LINES = [
  { text: "$ nexforge deploy --prod", type: "command" },
  { text: "> Analyzing project...", type: "info" },
  { text: "> Deploying to edge network...", type: "info" },
  { text: "✓ Deployed successfully!", type: "success" },
  { text: "Type 'help' for available commands.", type: "system" }
]

const COMMANDS = {
  help: [
    { text: "Available commands:", type: "system" },
    { text: "  whoami   - View my profile summary", type: "info" },
    { text: "  skills   - List my technical skills", type: "info" },
    { text: "  contact  - Get my contact info", type: "info" },
    { text: "  clear    - Clear terminal window", type: "info" },
  ],
  whoami: [
    { text: "Name: Manav Sharma", type: "info" },
    { text: "Role: MERN Stack Developer & System Architect", type: "info" },
    { text: "Passion: Building scalable, high-performance web applications.", type: "success" }
  ],
  skills: [
    { text: "Frontend: React.js, Next.js, TailwindCSS, Three.js", type: "info" },
    { text: "Backend: Node.js, Express, MongoDB, PostgreSQL, Redis", type: "info" },
    { text: "DevOps: Docker, AWS, CI/CD, Nginx", type: "info" }
  ],
  contact: [
    { text: "Email: manav.sharma@example.com", type: "url" },
    { text: "GitHub: github.com/manavsharma", type: "url" },
    { text: "LinkedIn: linkedin.com/in/manavsharma", type: "url" }
  ],
  clear: []
}

export default function TerminalSimulator() {
  const [history, setHistory] = useState(INITIAL_LINES)
  const [input, setInput] = useState("")
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  // Auto scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase()
      const newHistory = [...history, { text: `$ ${input}`, type: "command" }]
      
      if (cmd === 'clear') {
        setHistory([])
      } else if (COMMANDS[cmd]) {
        setHistory([...newHistory, ...COMMANDS[cmd]])
      } else if (cmd !== "") {
        setHistory([...newHistory, { text: `Command not found: ${cmd}. Type 'help' for a list of commands.`, type: "system" }])
      }
      
      setInput("")
    }
  }

  const getLineColor = (type) => {
    switch (type) {
      case "command": return "text-white font-semibold"
      case "success": return "text-emerald-400 font-semibold"
      case "url": return "text-cyan"
      case "system": return "text-pink italic"
      default: return "text-[#A1A1AA]"
    }
  }

  return (
    <motion.div 
      drag 
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      className="w-full max-w-lg bg-[#0a0a0a]/90 backdrop-blur-md border border-[#222] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,217,255,0.15)] cursor-grab"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#222] bg-[#111]">
        <div className="w-3 h-3 rounded-full bg-[#EF4444]/80"></div>
        <div className="w-3 h-3 rounded-full bg-[#EAB308]/80"></div>
        <div className="w-3 h-3 rounded-full bg-[#22C55E]/80"></div>
        <span className="ml-3 text-xs text-[#555] font-mono select-none">
          visitor@manav-portfolio — zsh
        </span>
      </div>

      {/* Terminal Body */}
      <div ref={containerRef} className="p-5 font-mono text-sm leading-7 h-[280px] overflow-y-auto custom-scrollbar">
        {history.map((line, i) => (
          <div key={i} className={getLineColor(line.type)}>
            {line.text}
          </div>
        ))}
        
        {/* Active Input Line */}
        <div className="flex items-center mt-1">
          <span className="text-white font-semibold mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-cyan"
            spellCheck="false"
            autoComplete="off"
            autoFocus
          />
        </div>
      </div>
    </motion.div>
  )
}
