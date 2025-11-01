import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, TrendingUp, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-card border border-primary/20 animate-scale-in">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Track Every Byte of Your DSA Journey</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Master DSA with{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AlgoByte
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered companion for organizing, tracking, and conquering Data Structures & Algorithms
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/dashboard">
              <Button size="lg" className="group shadow-glow-primary hover:shadow-glow-primary">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline">
                View Dashboard
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-gradient-card border border-border hover:shadow-glow-primary transition-all">
              <div className="p-3 rounded-full bg-primary/10">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Topic Tracking</h3>
              <p className="text-sm text-muted-foreground text-center">
                Organize DSA topics with visual progress rings
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-gradient-card border border-border hover:shadow-glow-secondary transition-all">
              <div className="p-3 rounded-full bg-secondary/10">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground">Smart Analytics</h3>
              <p className="text-sm text-muted-foreground text-center">
                Track streaks, progress, and identify weak areas
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-gradient-card border border-border hover:shadow-glow-accent transition-all">
              <div className="p-3 rounded-full bg-accent/10">
                <Code2 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Revision Notes</h3>
              <p className="text-sm text-muted-foreground text-center">
                Add personal notes and comments per topic
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
