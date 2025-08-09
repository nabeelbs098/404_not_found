import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PartyPopper, RotateCcw } from 'lucide-react';
import EmojiRain from '@/components/emoji-rain';

export default function CompletionPage() {
  return (
    <>
      <EmojiRain emoji="🎉" />
      <audio src="https://cdn.pixabay.com/audio/2022/08/29/audio_368a865f3c.mp3" autoPlay loop controls className="hidden" />
      <div className="min-h-full w-full bg-gradient-to-br from-green-200/30 via-cyan-200/20 to-blue-300/30">
        <div className="container mx-auto px-4 py-8 sm:py-16 flex items-center justify-center min-h-full">
          <div className="w-full max-w-2xl text-center">
            <Card className="shadow-2xl bg-card/80 backdrop-blur-sm animate-fade-in-up">
              <CardHeader className="items-center">
                <PartyPopper className="h-20 w-20 text-accent mb-4" />
                <CardTitle className="font-headline text-5xl md:text-6xl tracking-tighter">
                  Congratulations!
                </CardTitle>
                <CardDescription className="font-body text-lg md:text-xl text-muted-foreground pt-2">
                  You've reached the end of the tale.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-8 pb-8">
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-bold">
                  നീ പൊന്നപ്പനല്ലടാ തങ്കപ്പനാ തങ്കപ്പൻ
                </p>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-bold">
                  അമൃതയ്‌ക്കൊപ്പം കരഞ്ഞും, ഊർമിള ദേവിക്കൊപ്പം ദേഷ്യപ്പെട്ടും അർജുനൊപ്പം ഞെട്ടിയും നിങ്ങൾ ചന്ദനമഴ വിജയകരമായി വായിച്ചു പൂർത്തിയാക്കിയിരിക്കുന്നു..
                </p>

                <div className="pt-4">
                  <Button asChild size="lg" className="rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Link href="/">
                      <RotateCcw className="mr-2 h-5 w-5" />
                      Play Again
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
