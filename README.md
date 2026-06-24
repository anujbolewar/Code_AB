<div align="center">
  <h1>Code AB</h1>
  <p>A high-performance, browser-native IDE powered by WebContainers and Local AI.</p>
</div>

---

## Features

- **Local Execution** — Spin up a Node.js environment directly in your browser using StackBlitz WebContainers. No servers required.
- **AI Copilot** — Built-in Vercel AI SDK and Ollama integration for context-aware, streaming code assistance.
- **Desktop-grade Editor** — Full Monaco Editor integration with multi-tab support, syntax highlighting, and persistent Zustand file storage.
- **Integrated Terminal** — Fully functional xterm.js emulation connected directly to the underlying container shell.
- **Premium Aesthetics** — Custom pure-black Shadcn UI system built on Next.js 15.

## Stack

**Frontend:** Next.js 15, Tailwind CSS, Shadcn UI, Zustand  
**IDE Core:** Monaco Editor, WebContainers, xterm.js  
**AI Integration:** Vercel AI SDK, Ollama  
**Backend:** NextAuth, Prisma  

## Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/anujbolewar/Code_AB.git
   cd Code_AB
   npm install
   ```

2. **Environment Setup**
   Configure your `.env` with `DATABASE_URL` and `AUTH_SECRET`, then push the schema:
   ```bash
   npx prisma db push
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   *(Ensure your local Ollama instance is running for the AI Copilot).*

---
<div align="center">
  <i>Built for the modern web.</i>
</div>
