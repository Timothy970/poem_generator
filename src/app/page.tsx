import { PoemGenerator } from "@/components/poem-generator";
import { FloralMuseTitle } from "@/components/floral-muse-title";
import Image from "next/image";

export default function FloralMusePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Floral background"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="-z-10 opacity-40"
        data-ai-hint="floral aesthetic"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-transparent to-background/70 -z-10" />
      
      <header className="py-10 md:py-16 backdrop-blur-sm bg-background/30">
        <div className="container mx-auto px-4">
          <FloralMuseTitle />
        </div>
      </header>
      <main className="flex-grow">
        <PoemGenerator />
      </main>
      <footer className="text-center p-6 text-muted-foreground text-sm backdrop-blur-sm bg-background/30">
        <p>&copy; {new Date().getFullYear()} Floral Muse. All rights reserved.</p>
      </footer>
    </div>
  );
}
