import { useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Navigation from "@/components/Navigation";
import TopicsTable from "@/components/TopicsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import topicsData from "@/data/algobyteTopics.json";
import { supabase } from "@/supabaseClient";
import { Menu, Sun, Moon, User, Info, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Status = "not-started" | "in-progress" | "completed";

interface Subtopic {
  name: string;
  videoLink?: string;
  problemLink?: string;
  comment?: string;
  completed?: boolean;
}

interface Topic {
  id: string;
  title: string;
  difficulty: string;
  subtopics: Subtopic[];
  status: Status;
}

const Dashboard = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [username, setUsername] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // ✅ Load topics
  useEffect(() => {
    const saved = localStorage.getItem("algobyte_topics");
    if (saved) {
      setTopics(JSON.parse(saved));
    } else {
      setTopics(
        topicsData.map((topic) => ({
          ...topic,
          status: topic.status as Status,
        }))
      );
    }
  }, []);

  // ✅ Save progress
  useEffect(() => {
    if (topics.length > 0) {
      localStorage.setItem("algobyte_topics", JSON.stringify(topics));
    }
  }, [topics]);

  // ✅ Fetch username
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (user) {
          const { data, error } = await supabase
            .from("user_profiles")
            .select("username")
            .eq("user_id", user.id)
            .single();

          if (error) throw error;
          if (data) setUsername(data.username);
        }
      } catch (err) {
        console.error("Error fetching username:", err);
      }
    };

    fetchUsername();
  }, []);

  // ✅ Toggle subtopic completion
  const toggleSubtopic = (topicId: string, subName: string) => {
    setTopics((prev) =>
      prev.map((t) => {
        if (t.id !== topicId) return t;

        const updatedSubtopics = t.subtopics.map((s) =>
          s.name === subName ? { ...s, completed: !s.completed } : s
        );

        const completedCount = updatedSubtopics.filter((s) => s.completed).length;
        const progress = completedCount / updatedSubtopics.length;

        let newStatus: Status = "not-started";
        if (progress === 1) newStatus = "completed";
        else if (progress > 0) newStatus = "in-progress";

        return { ...t, subtopics: updatedSubtopics, status: newStatus };
      })
    );
  };

  // ✅ Update comment text
  const updateComment = (topicId: string, subName: string, comment: string) => {
    setTopics((prev) =>
      prev.map((t) => {
        if (t.id !== topicId) return t;
        return {
          ...t,
          subtopics: t.subtopics.map((s) =>
            s.name === subName ? { ...s, comment } : s
          ),
        };
      })
    );
  };

  // ✅ Stats
  const completedTopics = topics.filter((t) => t.status === "completed").length;
  const totalSubtopics = topics.reduce(
    (acc, topic) => acc + topic.subtopics.length,
    0
  );
  const completedSubtopics = topics.reduce(
    (acc, topic) => acc + topic.subtopics.filter((sub) => sub.completed).length,
    0
  );
  const overallProgress = totalSubtopics
    ? Math.round((completedSubtopics / totalSubtopics) * 100)
    : 0;

  const completedByDifficulty = {
    easy: topics
      .filter((t) => t.difficulty.toLowerCase() === "easy")
      .reduce((acc, t) => acc + t.subtopics.filter((s) => s.completed).length, 0),
    medium: topics
      .filter((t) => t.difficulty.toLowerCase() === "medium")
      .reduce((acc, t) => acc + t.subtopics.filter((s) => s.completed).length, 0),
    hard: topics
      .filter((t) => t.difficulty.toLowerCase() === "hard")
      .reduce((acc, t) => acc + t.subtopics.filter((s) => s.completed).length, 0),
  };

  const totalByDifficulty = {
    easy: topics
      .filter((t) => t.difficulty.toLowerCase() === "easy")
      .reduce((acc, t) => acc + t.subtopics.length, 0),
    medium: topics
      .filter((t) => t.difficulty.toLowerCase() === "medium")
      .reduce((acc, t) => acc + t.subtopics.length, 0),
    hard: topics
      .filter((t) => t.difficulty.toLowerCase() === "hard")
      .reduce((acc, t) => acc + t.subtopics.length, 0),
  };

  // ✅ Reset progress
  const resetProgress = () => {
    const resetTopics = topics.map((topic) => ({
      ...topic,
      status: "not-started" as Status,
      subtopics: topic.subtopics.map((sub) => ({
        ...sub,
        completed: false,
        comment: "",
      })),
    }));
    setTopics(resetTopics);
    localStorage.setItem("algobyte_topics", JSON.stringify(resetTopics));
  };

  // ✅ Toggle Theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30 text-foreground transition-colors">
      <Navigation />

      {/* Floating Settings Menu */}
      <div className="absolute top-4 right-6">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <Menu size={22} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50">
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <User className="mr-2" size={18} /> Profile
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="mr-2" size={18} /> : <Moon className="mr-2" size={18} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={() => navigate("/about")}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Info className="mr-2" size={18} /> About
            </button>
            <button
              onClick={() => (window.location.href = "mailto:ajhawar770@gmail.com")}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Mail className="mr-2" size={18} /> Contact Us
            </button>
          </div>
        )}
      </div>

      {/* Dashboard Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        <DashboardHeader
          userName={username || "User"}
          totalCompleted={completedTopics}
          totalTopics={topics.length}
          overallProgress={overallProgress}
          onNewSession={resetProgress}
          completedByDifficulty={completedByDifficulty}
          totalByDifficulty={totalByDifficulty}
        />

        <div className="w-full">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">All Topics</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="not-started">Not Started</TabsTrigger>
            </TabsList>

            {["all", "in-progress", "completed", "not-started"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-6">
                <TopicsTable
                  topics={topics
                    .filter((topic) => tab === "all" || topic.status === tab)
                    .map((topic) => ({
                      id: topic.id,
                      title: topic.title,
                      problems: topic.subtopics.map((sub) => ({
                        name: sub.name,
                        videoLink: sub.videoLink,
                        problemLink: sub.problemLink,
                        difficulty: topic.difficulty,
                        completed: sub.completed,
                        comment: sub.comment,
                      })),
                    }))}
                  onToggleProblem={toggleSubtopic}
                  onUpdateNotes={updateComment}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
