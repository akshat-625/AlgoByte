import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Problem {
  name: string;
  videoLink?: string;
  problemLink?: string;
  difficulty: string;
  completed?: boolean;
  comment?: string;
}

interface TopicsTableProps {
  topics: {
    id: string;
    title: string;
    problems: Problem[];
  }[];
  onToggleProblem: (topicId: string, problemName: string) => void;
  onUpdateNotes: (topicId: string, problemName: string, notes: string) => void;
}

const getDifficultyColor = (difficulty: string) => {
  const normalizedDifficulty = difficulty.toLowerCase().trim();
  switch (normalizedDifficulty) {
    case "easy":
      return "bg-green-100 text-green-800 font-medium";
    case "medium":
      return "bg-yellow-100 text-yellow-800 font-medium";
    case "hard":
      return "bg-red-100 text-red-800 font-medium";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const TopicsTable = ({ topics, onToggleProblem, onUpdateNotes }: TopicsTableProps) => {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Status</TableHead>
            <TableHead>Problem</TableHead>
            <TableHead className="w-[100px]">Difficulty</TableHead>
            <TableHead className="w-[200px]">Resources</TableHead>
            <TableHead className="w-[300px]">Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topics.map((topic) => (
            <>
              <TableRow key={topic.id} className="bg-muted/50">
                <TableCell colSpan={5} className="font-bold">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => toggleTopic(topic.id)}
                    >
                      {expandedTopics.has(topic.id) ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                      }
                    </Button>
                    <span>{topic.title}</span>
                  </div>
                </TableCell>
              </TableRow>
              {expandedTopics.has(topic.id) && topic.problems.map((problem) => (
                <TableRow key={`${topic.id}-${problem.name}`}>
                  <TableCell>
                    <Checkbox
                      checked={problem.completed}
                      onCheckedChange={() => onToggleProblem(topic.id, problem.name)}
                    />
                  </TableCell>
                  <TableCell>{problem.name}</TableCell>
                  <TableCell>
                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {problem.problemLink && (
                        <a
                          href={problem.problemLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 hover:opacity-80"
                          title={`Solve on ${problem.problemLink.includes('leetcode') ? 'LeetCode' : 'GeeksforGeeks'}`}
                        >
                          <img 
                            src={problem.problemLink.includes('leetcode') 
                              ? "https://leetcode.com/favicon.ico"
                              : "https://www.geeksforgeeks.org/favicon.ico"} 
                            alt={problem.problemLink.includes('leetcode') ? "LeetCode" : "GeeksforGeeks"}
                            className="w-5 h-5"
                          />
                        </a>
                      )}
                      {problem.videoLink && (
                        <a
                          href={problem.videoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 hover:opacity-80"
                          title="Watch on YouTube"
                        >
                          <img 
                            src="https://www.youtube.com/favicon.ico" 
                            alt="YouTube"
                            className="w-5 h-5"
                          />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                  <textarea
  value={problem.comment || ""}
  onChange={(e) =>
    onUpdateNotes(topic.id, problem.name, e.target.value)
  }
  placeholder="Add your comment..."
  className="w-full h-[60px] text-xs p-2 rounded-md border resize-none
             bg-white text-black placeholder-gray-500
             dark:bg-gray-800 dark:text-white dark:placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                      {problem.comment && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="shrink-0"
                          onClick={() => onToggleProblem(topic.id, problem.name)}
                        >
                          Done
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopicsTable;