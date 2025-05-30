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
import { Loader2, Wand2 } from "lucide-react";
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
      setGeneratedPoem(result.poem);
      toast({
        title: "Poem Generated!",
        description: "Your masterpiece awaits.",
      });
    } catch (error) {
      console.error("Error generating poem:", error);
      setGeneratedPoem("Failed to generate poem. Please try again.");
      toast({
        title: "Error",
        description: "Could not generate poem. Please check the console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 items-start">
      <Card className="md:w-1/2 w-full shadow-xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold flex items-center gap-2">
            <Wand2 className="h-7 w-7 text-accent" />
            Create Your Poem
          </CardTitle>
          <CardDescription>Enter a theme and select a style to begin.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Theme</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Spring rain, Silent mountains" {...field} className="text-base"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Style</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-base">
                          <SelectValue placeholder="Select a poem style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {poemStyles.map((style) => (
                          <SelectItem key={style} value={style} className="text-base">
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full text-lg py-6 rounded-md">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Poem"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="md:w-1/2 w-full shadow-xl rounded-lg min-h-[300px] md:min-h-0 flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">Your Poetic Creation</CardTitle>
          <CardDescription>
            {isLoading ? "Crafting your verses..." : (generatedPoem ? "Here is your poem:" : "Your poem will appear here.")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ScrollArea className="h-[300px] md:h-[400px] w-full rounded-md border border-input p-4 bg-muted/30">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : generatedPoem ? (
              <pre className="whitespace-pre-wrap text-foreground text-base leading-relaxed font-sans">
                {generatedPoem}
              </pre>
            ) : (
              <p className="text-muted-foreground text-center flex items-center justify-center h-full text-base">
                Let your imagination bloom...
              </p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
