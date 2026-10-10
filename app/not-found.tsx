import { ArrowRight } from "@/components/Icons";
import { Button, Container } from "@/components/ui";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-dvh items-center">
      <Container>
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">This page doesn&apos;t exist.</h1>
        <p className="mt-4 max-w-md text-muted">The link may be broken, or the page may have moved.</p>
        <Button href="/" className="mt-8" icon={<ArrowRight className="size-4" />}>
          Back to home
        </Button>
      </Container>
    </main>
  );
}
