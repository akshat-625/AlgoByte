import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto shadow-md border border-border">
          <CardHeader>
            <CardTitle>About AlgoByte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              <strong>AlgoByte</strong> is an interactive platform built to help
              learners strengthen their Data Structures and Algorithms (DSA)
              skills through structured roadmaps, curated problem sets, and
              topic-wise practice plans.
            </p>

            <p>
              The project is developed using <strong>React</strong> and{" "}
              <strong>TypeScript</strong>, powered by <strong>Supabase</strong> for
              authentication and data storage. The interface is designed with{" "}
              <strong>shadcn/ui</strong> and <strong>Tailwind CSS</strong> to ensure
              a smooth, responsive, and consistent user experience across all pages.
            </p>

            <hr className="my-4 border-border" />

            <p>
              <strong>Credits & Acknowledgements:</strong> AlgoByte integrates
              freely available resources from respected learning platforms to
              support learners’ journeys:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>LeetCode</strong> and <strong>GeeksforGeeks (GFG)</strong> — for
                providing coding problems and solutions referenced through
                direct external links.
              </li>
              <li>
                <strong>Striver (Raj Vikramaditya)</strong> — for his renowned{" "}
                <strong>DSA Sheet</strong> and <strong>YouTube Playlist</strong>,
                which inspired the structure and sequence of problem-solving in
                AlgoByte.
              </li>
            </ul>

            <p>
              All linked content belongs to their respective owners.{" "}
              <strong>AlgoByte</strong> neither hosts nor reproduces any
              copyrighted material and is intended solely for{" "}
              <strong>educational and non-commercial purposes</strong>. It
              serves as a guided roadmap that directs learners to the original
              problem sources.
            </p>

            <p className="italic text-sm text-muted-foreground">
              Built with ❤️ by learners, for learners — respecting and crediting
              the amazing work of original creators.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
