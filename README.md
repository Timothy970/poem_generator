# Floral Muse — AI Poem Generator

Floral Muse is an elegant, responsive, and AI-powered poem generator. It allows users to write custom poems by providing a theme and choosing from various poetry styles. The project is built using **Next.js 15**, **Tailwind CSS**, and **Google Genkit** with the Gemini 2.0 Flash model.

---

## 🎨 Features

- **Custom Poetic Styles:** Generate poems in various styles including *Haiku, Sonnet, Free Verse, Limerick, Ode, Ballad, Villanelle, Acrostic,* and *Cinquain*.
- **Elegant UI/UX:** A responsive, themed interface with smooth animations, custom scrollbars, loading states, and toast notifications.
- **AI-Powered:** Built with Google Genkit and `@genkit-ai/googleai` using the `gemini-2.0-flash` model.
- **Developer UI Support:** Integrated with Genkit's Developer UI for inspecting and testing AI flows locally.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **AI Framework:** [Google Genkit](https://firebase.google.com/docs/genkit)
- **AI Model:** Google Gemini 2.0 Flash (`googleai/gemini-2.0-flash`)
- **Styling:** Tailwind CSS, Radix UI (accessible components), Lucide Icons
- **Language:** TypeScript

---

## ⚙️ Environment Setup

To run the application and communicate with the Gemini API, you need to configure your environment variables.

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   # Or on Windows PowerShell:
   copy .env.example .env
   ```

2. **Add your Gemini API Key:**
   Open `.env` (or `.env.local` if preferred) and add your Google Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
   > 🔑 **Note:** You can obtain a Gemini API key from the [Google AI Studio](https://aistudio.google.com/).

---

## 🚀 Getting Started

### 1. Install Dependencies
Ensure you have Node.js installed, then run:
```bash
npm install
```

### 2. Run the Development Server
Start the Next.js development server:
```bash
npm run dev
```
The application will run on **[http://localhost:9002](http://localhost:9002)**.

### 3. Run the Genkit Developer UI
To test, run, and inspect your AI flows in the Genkit local playground, open a separate terminal and start Genkit:
```bash
npm run genkit:dev
```
Or with watch mode enabled:
```bash
npm run genkit:watch
```

---

## 📂 Project Structure

Key folders and files:

*   📂 [`src/ai`](file:///c:/Users/Timothy%20Kimani/poem_generator/src/ai) — Genkit initialization and AI flows.
    *   📄 [`genkit.ts`](file:///c:/Users/Timothy%20Kimani/poem_generator/src/ai/genkit.ts) — Configures the Genkit instance and registers the Google AI plugin.
    *   📂 [`flows`](file:///c:/Users/Timothy%20Kimani/poem_generator/src/ai/flows) — Definitions of prompt schemas and generator flows.
*   📂 [`src/app`](file:///c:/Users/Timothy%20Kimani/poem_generator/src/app) — Next.js routing and layout definition.
*   📂 [`src/components`](file:///c:/Users/Timothy%20Kimani/poem_generator/src/components) — React components for the generator UI.
    *   📄 [`poem-generator.tsx`](file:///c:/Users/Timothy%20Kimani/poem_generator/src/components/poem-generator.tsx) — Main interactive panel and API call handlers.
*   📂 [`src/hooks`](file:///c:/Users/Timothy%20Kimani/poem_generator/src/hooks) — Custom React hooks (e.g. for toast messaging).

---

## 🏗️ Production Build

To build the application for production deployment:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```
