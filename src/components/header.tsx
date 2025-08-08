import Link from "next/link";
import { EmotiScrollLogo } from "./icons";

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 md:px-8 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-center sm:justify-start">
        <Link href="/" className="flex items-center gap-2 group">
          <EmotiScrollLogo className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
          <span className="font-headline text-2xl font-bold tracking-tight text-foreground">
<<<<<<< HEAD
            അഭിനയിച്ചു വായിക്കാം- Drama overload edition😝👯🏻‍♀
=======
            EmotiScroll
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
          </span>
        </Link>
      </div>
    </header>
  );
}
