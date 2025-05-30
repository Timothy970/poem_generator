import { Flower2 } from 'lucide-react';

export function FloralMuseTitle() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Flower2 className="h-16 w-16 text-primary" />
      <h1 className="text-5xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary-foreground">
        Floral Muse
      </h1>
      <p className="text-muted-foreground text-lg">Craft poetry inspired by nature's beauty.</p>
    </div>
  );
}
