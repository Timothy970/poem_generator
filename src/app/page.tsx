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
        className="z-0 opacity-85 animate-slow-pan pointer-events-none contrast-125"
      />
      {/* Premium dark teal gradient overlay for optimal readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/35 to-background/60 z-10 pointer-events-none" />
      
      {/* Content wrapper rendered on top of the background and gradient */}
      <div className="relative z-20 flex flex-col h-screen max-h-screen overflow-hidden">
        <header className="py-4 md:py-6 flex-none">
          <div className="container mx-auto px-4">
            <LyriqaTitle />
          </div>
        </header>
        <main className="flex-grow overflow-hidden flex items-center justify-center py-2 px-4 md:px-8">
          <PoemGenerator />
        </main>
        <footer className="text-center py-2 text-muted-foreground/50 text-[10px] border-t border-border/10 flex-none bg-background/40 backdrop-blur-sm">
          <p>&copy; {new Date().getFullYear()} Lyriqa. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
