"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generatePoem, type GeneratePoemInput } from "@/ai/flows/generate-poem";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, PenTool, Sparkles, Feather } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const poemStyles = [
  "Haiku",
  "Sonnet",
  "Free Verse",
  "Limerick",
  "Ode",
  "Ballad",
  "Villanelle",
  "Acrostic",
  "Cinquain"
];

const FormSchema = z.object({
  theme: z.string().min(3, { message: "Theme must be at least 3 characters." }).max(100),
  style: z.string({ required_error: "Please select a poem style." }),
});

type PoemFormValues = z.infer<typeof FormSchema>;

export function PoemGenerator() {
  const [generatedPoem, setGeneratedPoem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PoemFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      theme: "",
    },
  });

  const onSubmit: SubmitHandler<PoemFormValues> = async (data) => {
    setIsLoading(true);
    setGeneratedPoem(null);
    try {
      const input: GeneratePoemInput = {
        theme: data.theme,
        style: data.style,
      };
      const result = await generatePoem(input);
      if (result.success) {
        setGeneratedPoem(result.poem);
        toast({
          title: "Poem Generated!",
          description: "Your masterpiece awaits.",
        });
      } else {
        setGeneratedPoem(result.error);
        toast({
          title: result.isRateLimit ? "Rate Limit Exceeded" : "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating poem:", error);
      setGeneratedPoem("Failed to generate poem. Please try again.");
      toast({
        title: "Error",
        description: "An unexpected client-side error occurred. Please check the console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl h-full flex flex-col md:flex-row gap-6 items-stretch overflow-hidden">
      {/* Left panel: Form Controls */}
      <Card className="flex-1 flex flex-col h-full bg-slate-950/75 backdrop-blur-md border-emerald-500/30 shadow-2xl shadow-black/50 rounded-xl overflow-hidden transition-all duration-300">
        <CardHeader className="space-y-1 p-5 pb-2 border-b border-emerald-500/15">
          <CardTitle className="text-xl font-bold flex items-center gap-3 text-emerald-50">
            <PenTool className="h-5 w-5 text-amber-400" />
            Shape Your Verses
          </CardTitle>
          <CardDescription className="text-xs text-emerald-200/90 font-medium">
            Define a theme and style, then let the system weave them into poetry.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 pt-4 flex-grow flex flex-col justify-center overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs font-bold tracking-wider uppercase text-emerald-200">Theme</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Autumn winds, Whispers of the sea" 
                        {...field} 
                        className="text-sm bg-black/60 border-emerald-500/40 focus:border-amber-400 text-white rounded-lg h-11 focus:ring-2 focus:ring-amber-400/30 placeholder:text-emerald-200/60 backdrop-blur-xs font-medium"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs font-bold tracking-wider uppercase text-emerald-200">Style</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-sm bg-black/60 border-emerald-500/40 focus:border-amber-400 text-white rounded-lg h-11 focus:ring-2 focus:ring-amber-400/30 backdrop-blur-xs font-medium">
                          <SelectValue placeholder="Select a poetry style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-slate-950/95 border-emerald-500/40 text-emerald-50 rounded-lg shadow-2xl backdrop-blur-md">
                        {poemStyles.map((style) => (
                          <SelectItem key={style} value={style} className="text-sm hover:bg-emerald-900/40 focus:bg-emerald-900/50 cursor-pointer transition-colors duration-150 text-emerald-100 font-medium">
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-300" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full text-sm font-bold py-5 rounded-lg btn-glow bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-slate-950 shadow-lg shadow-amber-500/20 transition-all duration-300 active:scale-[0.99]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-slate-950" />
                    Weaving words...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 text-slate-950" />
                    Generate Poem
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Right panel: Poem output display */}
      <Card className="flex-1 flex flex-col h-full bg-slate-950/75 backdrop-blur-md border-emerald-500/30 shadow-2xl shadow-black/50 rounded-xl overflow-hidden transition-all duration-300">
        <CardHeader className="space-y-1 p-5 pb-2 border-b border-emerald-500/15">
          <CardTitle className="text-xl font-bold flex items-center gap-3 text-emerald-50">
            <Feather className="h-5 w-5 text-emerald-400" />
            The Canvas
          </CardTitle>
          <CardDescription className="text-xs text-emerald-200/90 font-medium">
            {isLoading ? "Channeling the muse..." : (generatedPoem ? "Your generated creation:" : "Where your lines will take form.")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 pt-4 flex-grow flex flex-col overflow-hidden">
          <div className="flex-grow h-0 overflow-y-auto border border-emerald-500/30 p-6 bg-black/60 backdrop-blur-xs rounded-lg custom-scrollbar">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[180px] space-y-3">
                <Loader2 className="h-10 w-10 animate-spin text-amber-400" />
                <p className="text-emerald-200 font-serif italic text-sm animate-pulse">Consulting the ether...</p>
              </div>
            ) : generatedPoem ? (
              <div className="fade-in-text flex flex-col justify-center min-h-full py-2">
                <pre className="whitespace-pre-wrap text-emerald-50 text-base md:text-lg font-serif italic leading-relaxed text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {generatedPoem}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[180px] text-center space-y-3 opacity-80">
                <Feather className="h-10 w-10 text-amber-400/80 animate-bounce" style={{ animationDuration: '4s' }} />
                <p className="text-emerald-200/90 font-serif italic text-base font-medium">Awaiting the spark of creation...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
