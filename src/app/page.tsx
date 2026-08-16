import { PoemGenerator } from "@/components/poem-generator";
import { LyriqaTitle } from "@/components/lyriqa-title";
import Image from "next/image";

export default function LyriqaPage() {
  return (
    <div className="h-screen max-h-screen flex flex-col text-foreground relative overflow-hidden">
      {/* Immersive background image with slow panning animation */}
      <Image
        src="/lyriqa_mystical_bg.png"
        alt="Lyriqa ambient background"
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        quality={90}
        priority
        className="z-0 opacity-75 animate-slow-pan pointer-events-none brightness-105 contrast-110"
      />
      {/* Balanced dark teal overlay for optimal text legibility while keeping image vivid */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/25 to-background/70 z-10 pointer-events-none backdrop-blur-[1px]" />
      
      {/* Content wrapper rendered on top of the background and gradient */}
      <div className="relative z-20 flex flex-col h-screen max-h-screen overflow-hidden">
        <header className="py-3 md:py-5 flex-none">
          <div className="container mx-auto px-4">
            <LyriqaTitle />
          </div>
        </header>
        <main className="flex-grow overflow-hidden flex items-center justify-center py-2 px-4 md:px-8">
          <PoemGenerator />
        </main>
        <footer className="text-center py-2.5 text-emerald-200/80 text-[11px] font-medium tracking-wide border-t border-emerald-500/20 flex-none bg-slate-950/70 backdrop-blur-md">
          <p>&copy; {new Date().getFullYear()} Lyriqa. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
