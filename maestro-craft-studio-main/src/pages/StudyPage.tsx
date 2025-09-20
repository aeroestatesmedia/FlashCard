import { useState } from "react";
import { Play, Pause, RotateCcw, CheckCircle, XCircle, Brain, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FlashcardPreview } from "@/components/flashcard/FlashcardPreview";

const StudyPage = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isStudyActive, setIsStudyActive] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Mock study session data
  const studySession = {
    deckName: "Advanced JavaScript Concepts",
    totalCards: 15,
    studiedCards: 7,
    correctAnswers: 5,
    incorrectAnswers: 2,
    timeSpent: 480, // seconds
    cards: [
      {
        id: "1",
        front: "What is closure in JavaScript?",
        back: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. It gives you access to an outer function's scope from an inner function.",
        difficulty: "medium" as const
      },
      {
        id: "2", 
        front: "Explain the difference between let, const, and var",
        back: "var is function-scoped and can be redeclared, let is block-scoped and can be reassigned but not redeclared, const is block-scoped and cannot be reassigned or redeclared.",
        difficulty: "easy" as const
      },
      {
        id: "3",
        front: "What is the event loop in JavaScript?",
        back: "The event loop is a mechanism that handles asynchronous operations in JavaScript. It continuously checks the call stack and task queues, moving tasks from queues to the call stack when it's empty.",
        difficulty: "hard" as const
      }
    ]
  };

  const currentCard = studySession.cards[currentCardIndex];
  const progressPercentage = (studySession.studiedCards / studySession.totalCards) * 100;
  const accuracyPercentage = studySession.studiedCards > 0 
    ? Math.round((studySession.correctAnswers / studySession.studiedCards) * 100)
    : 0;

  const handleNext = () => {
    if (currentCardIndex < studySession.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleAnswer = (correct: boolean) => {
    // In real app, this would update the spaced repetition algorithm
    console.log(`Answer marked as: ${correct ? 'correct' : 'incorrect'}`);
    if (currentCardIndex < studySession.cards.length - 1) {
      setTimeout(handleNext, 500);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            Study Session
          </h1>
          <p className="text-muted-foreground mt-2">
            {studySession.deckName}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-learning-new/10 text-learning-new">
            Card {currentCardIndex + 1} of {studySession.totalCards}
          </Badge>
          <Button 
            variant={isStudyActive ? "destructive" : "default"}
            className="gap-2"
            onClick={() => setIsStudyActive(!isStudyActive)}
          >
            {isStudyActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isStudyActive ? "Pause" : "Start"} Session
          </Button>
        </div>
      </div>

      {/* Study Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
            <Progress value={progressPercentage} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-learning-easy/5 to-learning-medium/5 border-learning-easy/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-learning-easy">{accuracyPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              {studySession.correctAnswers}/{studySession.studiedCards} correct
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/5 to-muted/5 border-secondary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(studySession.timeSpent)}</div>
            <p className="text-xs text-muted-foreground">
              Avg: {Math.round(studySession.timeSpent / Math.max(studySession.studiedCards, 1))}s/card
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-learning-medium/5 to-learning-hard/5 border-learning-medium/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {studySession.totalCards - studySession.studiedCards}
            </div>
            <p className="text-xs text-muted-foreground">
              Cards left to study
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Study Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-to-br from-background via-background to-muted/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Current Card
                  <Badge 
                    variant="outline" 
                    className={
                      currentCard.difficulty === "easy" ? "bg-learning-easy/10 text-learning-easy" :
                      currentCard.difficulty === "medium" ? "bg-learning-medium/10 text-learning-medium" :
                      "bg-learning-hard/10 text-learning-hard"
                    }
                  >
                    {currentCard.difficulty}
                  </Badge>
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FlashcardPreview
                front={currentCard.front}
                back={currentCard.back}
                difficulty={currentCard.difficulty}
                size="lg"
                className="w-full"
              />

              {/* Study Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentCardIndex === 0}
                >
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="destructive"
                    className="gap-2"
                    onClick={() => handleAnswer(false)}
                  >
                    <XCircle className="h-4 w-4" />
                    Hard
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="gap-2"
                    onClick={() => handleAnswer(false)}
                  >
                    Again
                  </Button>
                  
                  <Button 
                    className="gap-2 bg-learning-easy hover:bg-learning-easy/90"
                    onClick={() => handleAnswer(true)}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Good
                  </Button>
                  
                  <Button 
                    className="gap-2 bg-learning-medium hover:bg-learning-medium/90"
                    onClick={() => handleAnswer(true)}
                  >
                    Easy
                  </Button>
                </div>

                <Button 
                  variant="outline" 
                  onClick={handleNext}
                  disabled={currentCardIndex === studySession.cards.length - 1}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Session Overview</CardTitle>
              <CardDescription>
                Track your learning progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cards studied:</span>
                  <span className="font-medium">
                    {studySession.studiedCards}/{studySession.totalCards}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Correct answers:</span>
                  <span className="font-medium text-learning-easy">
                    {studySession.correctAnswers}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Incorrect answers:</span>
                  <span className="font-medium text-learning-hard">
                    {studySession.incorrectAnswers}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Session time:</span>
                  <span className="font-medium">
                    {formatTime(studySession.timeSpent)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Study Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Take your time to think before revealing the answer</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Be honest with your self-assessment</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Focus on understanding, not just memorization</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Review difficult cards more frequently</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudyPage;