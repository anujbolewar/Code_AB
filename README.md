
## AI Request Flow

```mermaid
flowchart TD
	%% Client Layer
	subgraph Client["Client (Browser)"]
		UI["Next.js App (UI)"]
		Dashboard["Dashboard"]
		Playground["Playground / Editor"]
		AIChat["AI Chat Panel"]
		UI --> Dashboard
		UI --> Playground
		UI --> AIChat
	end

	%% Frontend Application Layer
	subgraph Frontend["Frontend (Next.js App Router)"]
		Layouts["Layouts & Providers"]
		Modules["Feature Modules (modules/*)"]
		State["Client & Server State"]
	end

	%% Backend Layer
	subgraph Backend["Backend (Next.js API)"]
		API["API Routes"]
		Services["Service Layer"]
		Domain["Domain Logic"]
		Auth["Auth & Session (NextAuth)"]
	end

	%% AI Layer
	subgraph AI["AI Orchestration Layer"]
		Context["Context Builder"]
		Prompt["Prompt Composer"]
		ModelRouter["Model Router"]
		Stream["Streaming Response"]
	end

	%% Execution Layer
	subgraph Exec["Execution Layer"]
		WebContainers["WebContainers (Sandboxed)"]
	end

	%% Database
	subgraph DB["Data Layer"]
		Prisma["Prisma ORM"]
		Postgres["PostgreSQL"]
	end

	%% External AI Providers
	subgraph Providers["AI Providers"]
		OpenAI["OpenAI / External LLMs"]
		LocalLLM["Local / Future Models"]
	end

	%% Connections
	UI --> Frontend
	Frontend --> API
	API --> Auth
	API --> Services
	Services --> Domain

	Services --> Context
	Context --> Prompt
	Prompt --> ModelRouter
	ModelRouter --> OpenAI
	ModelRouter --> LocalLLM
	ModelRouter --> Stream
	Stream --> UI

	Services --> Prisma
	Prisma --> Postgres

	Playground --> WebContainers
```
# CodeAB – System Architecture

```mermaid
flowchart TD
	%% Client Layer
	subgraph Client["Client (Browser)"]
		UI["Next.js App (UI)"]
		Dashboard["Dashboard"]
		Playground["Playground / Editor"]
		AIChat["AI Chat Panel"]
		UI --> Dashboard
		UI --> Playground
		UI --> AIChat
	end

	%% Frontend Application Layer
	subgraph Frontend["Frontend (Next.js App Router)"]
		Layouts["Layouts & Providers"]
		Modules["Feature Modules (modules/*)"]
		State["Client & Server State"]
	end

	%% Backend Layer
	subgraph Backend["Backend (Next.js API)"]
		API["API Routes"]
		Services["Service Layer"]
		Domain["Domain Logic"]
		Auth["Auth & Session (NextAuth)"]
	end

	%% AI Layer
	subgraph AI["AI Orchestration Layer"]
		Context["Context Builder"]
		Prompt["Prompt Composer"]
		ModelRouter["Model Router"]
		Stream["Streaming Response"]
	end

	%% Execution Layer
	subgraph Exec["Execution Layer"]
		WebContainers["WebContainers (Sandboxed)"]
	end

	%% Database
	subgraph DB["Data Layer"]
		Prisma["Prisma ORM"]
		Postgres["PostgreSQL"]
	end

	%% External AI Providers
	subgraph Providers["AI Providers"]
		OpenAI["OpenAI / External LLMs"]
		LocalLLM["Local / Future Models"]
	end

	%% Connections
	UI --> Frontend
	Frontend --> API
	API --> Auth
	API --> Services
	Services --> Domain

	Services --> Context
	Context --> Prompt
	Prompt --> ModelRouter
	ModelRouter --> OpenAI
	ModelRouter --> LocalLLM
	ModelRouter --> Stream
	Stream --> UI

	Services --> Prisma
	Prisma --> Postgres

	Playground --> WebContainers
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
