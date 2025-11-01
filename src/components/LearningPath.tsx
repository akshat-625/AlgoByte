import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface Step {
  id: number;
  title: string;
  description: string;
  timeEstimate: string;
  problemCount: number;
  progress: number;
  isLocked: boolean;
}

const learningPath: Step[] = [
  {
    id: 1,
    title: "Step 1: Learn the Basics",
    description: "Pattern printing, basic maths, basic recursion, basic hashing",
    timeEstimate: "7-10 days",
    problemCount: 31,
    progress: 0,
    isLocked: false
  },
  {
    id: 2,
    title: "Step 2: Learn Important Sorting Techniques",
    description: "Sorting-I, Sorting-II, Basic problems on arrays",
    timeEstimate: "3-4 days",
    problemCount: 15,
    progress: 0,
    isLocked: true
  },
  {
    id: 3,
    title: "Step 3: Arrays",
    description: "Easy and Medium level problems on arrays",
    timeEstimate: "10-12 days",
    problemCount: 45,
    progress: 0,
    isLocked: true
  },
  {
    id: 4,
    title: "Step 4: Binary Search",
    description: "BS on 1D Arrays, 2D Arrays and on answers",
    timeEstimate: "8-10 days",
    problemCount: 35,
    progress: 0,
    isLocked: true
  },
  {
    id: 5,
    title: "Step 5: Strings",
    description: "Basic and Medium String Problems",
    timeEstimate: "6-8 days",
    problemCount: 25,
    progress: 0,
    isLocked: true
  }
];

const LearningPath = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Learning Path</h2>
      <div className="grid gap-4">
        {learningPath.map((step) => (
          <Card key={step.id} className={`p-6 ${step.isLocked ? 'opacity-60' : ''}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  {step.title}
                  {step.isLocked && (
                    <span className="text-gray-500">🔒</span>
                  )}
                </h3>
                <p className="text-gray-600 mt-1">{step.description}</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-sm text-gray-500">⏱️ {step.timeEstimate}</span>
                  <span className="text-sm text-gray-500">📝 {step.problemCount} problems</span>
                </div>
              </div>
              <Badge variant={step.isLocked ? "secondary" : "default"}>
                {step.progress}% Complete
              </Badge>
            </div>
            <Progress value={step.progress} className="h-2" />
            {step.isLocked && (
              <p className="text-sm text-gray-500 mt-2">
                Complete previous steps to unlock
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;