import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface TopicCardProps {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "not-started" | "in-progress" | "completed";
  progress: number;
  problemsCount: number;
}

const TopicCard = ({ title, difficulty, status, progress, problemsCount }: TopicCardProps) => {
  const difficultyColors = {
    Easy: "bg-success/10 text-success border-success/20",
    Medium: "bg-accent/10 text-accent border-accent/20",
    Hard: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const statusIcons = {
    "not-started": <Circle className="w-5 h-5 text-muted-foreground" />,
    "in-progress": <Clock className="w-5 h-5 text-secondary" />,
    completed: <CheckCircle2 className="w-5 h-5 text-success" />,
  };

  const statusLabels = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return (
    <Card className="group p-6 hover:shadow-glow-primary transition-all duration-300 bg-gradient-card border-border">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={difficultyColors[difficulty]}>
                {difficulty}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {problemsCount} problems
              </span>
            </div>
          </div>
          {statusIcons[status]}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{statusLabels[status]}</span>
            <span className="font-medium text-foreground">{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action button */}
        <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-colors">
          {status === "not-started" ? "Start Learning" : "Continue"}
        </Button>
      </div>
    </Card>
  );
};

export default TopicCard;
