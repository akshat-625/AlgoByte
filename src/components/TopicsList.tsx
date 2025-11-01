import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  isCompleted: boolean;
  link: string;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  problems: Problem[];
  progress: number;
}

const topics: Topic[] = [
  {
    id: "arrays",
    title: "Arrays",
    description: "Master array problems from basic to advanced",
    progress: 0,
    problems: [
      {
        id: "set-matrix-zeros",
        title: "Set Matrix Zeros",
        difficulty: "Medium",
        isCompleted: false,
        link: "/problem/set-matrix-zeros"
      },
      {
        id: "pascal-triangle",
        title: "Pascal's Triangle",
        difficulty: "Easy",
        isCompleted: false,
        link: "/problem/pascal-triangle"
      },
      // Add more problems here
    ]
  },
  {
    id: "linked-list",
    title: "Linked List",
    description: "Essential linked list patterns and techniques",
    progress: 0,
    problems: [
      {
        id: "reverse-linked-list",
        title: "Reverse a Linked List",
        difficulty: "Easy",
        isCompleted: false,
        link: "/problem/reverse-linked-list"
      },
      {
        id: "detect-cycle",
        title: "Detect Cycle in Linked List",
        difficulty: "Medium",
        isCompleted: false,
        link: "/problem/detect-cycle"
      },
      // Add more problems here
    ]
  }
  // Add more topics here
];

const getDifficultyColor = (difficulty: Problem["difficulty"]) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "Hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const TopicsList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">DSA Topics</h2>
      <div className="grid gap-6">
        {topics.map((topic) => (
          <Card key={topic.id} className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-bold">{topic.title}</h3>
                <p className="text-gray-600">{topic.description}</p>
              </div>
              <div className="text-right">
                <div className="mb-2">{topic.progress}% Complete</div>
                <Progress value={topic.progress} className="w-[200px]" />
              </div>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value={topic.id}>
                <AccordionTrigger>View Problems</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 mt-4">
                    {topic.problems.map((problem) => (
                      <a
                        key={problem.id}
                        href={problem.link}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={problem.isCompleted}
                            onChange={() => {}}
                            className="h-5 w-5 rounded border-gray-300"
                          />
                          <span>{problem.title}</span>
                        </div>
                        <Badge className={getDifficultyColor(problem.difficulty)}>
                          {problem.difficulty}
                        </Badge>
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopicsList;