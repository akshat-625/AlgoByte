import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Code2, Flame, Trophy } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import type { Row } from "@/integrations/supabase/types";

type Profile = Row<'user_profiles'>;

interface DifficultyStats {
  easy: number;
  medium: number;
  hard: number;
}

interface DashboardHeaderProps {
  userName?: string;
  totalCompleted: number;
  totalTopics: number;
  overallProgress: number;
  onNewSession: () => void;
  completedByDifficulty: DifficultyStats;
  totalByDifficulty: DifficultyStats;
}

const DashboardHeader = ({ 
  userName = "Learner",
  totalCompleted,
  totalTopics,
  overallProgress,
  onNewSession,
  completedByDifficulty,
  totalByDifficulty
}: DashboardHeaderProps) => {
  const [username, setUsername] = useState(userName);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchUsername() {
      if (!user) return;

      try {
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('username')
          .eq('user_id', user.id)
          .single<Profile>();

        if (error) {
          console.error('Error fetching username:', error);
          return;
        }

        if (profile) {
          setUsername(profile?.username || userName);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchUsername();
  }, [user, userName]);
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, <span className="text-primary">{userName}</span>! 👋
          </h1>
          <p className="text-muted-foreground">
            Keep the momentum going. Let's solve some problems today!
          </p>
        </div>
        <Button 
          className="shadow-glow-primary"
          onClick={onNewSession}
        >
          <Code2 className="w-4 h-4 mr-2" />
          New Practice Session
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Difficulty Stats */}
        <div className="p-6 rounded-lg bg-gradient-card border border-border hover:shadow-glow-accent transition-all">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-600 font-medium">Easy</span>
              <span className="text-sm font-bold">{completedByDifficulty.easy}/{totalByDifficulty.easy}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-yellow-600 font-medium">Medium</span>
              <span className="text-sm font-bold">{completedByDifficulty.medium}/{totalByDifficulty.medium}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-red-600 font-medium">Hard</span>
              <span className="text-sm font-bold">{completedByDifficulty.hard}/{totalByDifficulty.hard}</span>
            </div>
          </div>
        </div>

        {/* Completed card */}
        <div className="p-6 rounded-lg bg-gradient-card border border-border hover:shadow-glow-primary transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-success/10">
              <Trophy className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Topics Completed</p>
              <p className="text-2xl font-bold text-foreground">{totalCompleted}/{totalTopics}</p>
            </div>
          </div>
        </div>

        {/* Progress card */}
        <div className="p-6 rounded-lg bg-gradient-card border border-border hover:shadow-glow-secondary transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-secondary/10">
              <Code2 className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <p className="text-2xl font-bold text-foreground">
                {overallProgress}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
