import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Wand } from 'lucide-react';
import { storyOrder } from '@/lib/story';

export default function Home() {
  const firstEmotion = storyOrder[0];

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-8 sm:py-16 flex items-center justify-center min-h-full">
        <div className="w-full max-w-2xl text-center">
          <Card className="shadow-2xl bg-card/80 backdrop-blur-sm animate-fade-in-up">
            <CardHeader>
              <CardTitle className="font-headline text-5xl md:text-6xl tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-2">
                സ്ക്രോളിനോട് taatta..👋🏻
              </CardTitle>
              <CardDescription className="font-body text-lg md:text-xl text-muted-foreground pt-2">
                An interactive tale that unfolds with your expressions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8">
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-bold">
                എപ്പോഴും ഇങ്ങനെ സ്ക്രോൾ ചെയ്ത് മടുത്തോ? എന്നാൽ ഈ പരിപാടി ഒന്നു നോക്കിക്കേ. ഇവിടെ പേജ് മാറുന്നത് സ്ക്രോൾ ചെയ്തിട്ടല്ല, മുഖത്തെ എക്സ്പ്രഷൻ വെച്ചിട്ടാ😅! കഥയിൽ ചിരിക്കേണ്ടപ്പോൾ ചിരിക്കുക🤣,കരയേണ്ടപ്പോൾ കരയുക..ഞെട്ടേണ്ടപ്പോൾ ഞെട്ടുക... 😳ബാക്കി കാര്യം ഞങ്ങളേറ്റു. സിമ്പിൾ!🤭
              </p>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-bold">
                വെബ്ക്യാമിന് മുന്നിൽ ഒറ്റയ്ക്കിരുന്ന് ചിരിക്കുകയും കരയുകയും ചെയ്യുന്ന നിങ്ങളെ കണ്ട് വീട്ടുകാർക്ക് വട്ടാണെന്ന് തോന്നിയാൽ, ഞങ്ങൾ ഉത്തരവാദികളല്ല! 😉
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Link href={`/story/${firstEmotion}`}>
                    വായിച്ചുതുടങ്ങാം
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Link href="/mood-booster">
                    Mood Booster
                    <Wand className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
