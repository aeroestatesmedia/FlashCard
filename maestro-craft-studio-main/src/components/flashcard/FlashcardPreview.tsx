import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlashcardPreviewProps {
  front: string;
  back: string;
  difficulty?: "new" | "easy" | "medium" | "hard";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const difficultyColors = {
  new: "bg-learning-new/10 text-learning-new border-learning-new/20",
  easy: "bg-learning-easy/10 text-learning-easy border-learning-easy/20",
  medium: "bg-learning-medium/10 text-learning-medium border-learning-medium/20",
  hard: "bg-learning-hard/10 text-learning-hard border-learning-hard/20",
};

const sizeClasses = {
  sm: "h-32 text-sm",
  md: "h-48 text-base",
  lg: "h-64 text-lg",
};

export function FlashcardPreview({ 
  front, 
  back, 
  difficulty = "new", 
  className,
  size = "md"
}: FlashcardPreviewProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className={cn("relative w-full max-w-md mx-auto", className)}>
      <div className="relative perspective-1000">
        <Card 
          className={cn(
            "relative cursor-pointer border-2 transition-all duration-300 hover:shadow-lg",
            sizeClasses[size],
            "flashcard-flip",
            isFlipped && "flipped"
          )}
          onClick={handleFlip}
        >
          {/* Front of card */}
          <div className="flashcard-front absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <Badge 
                variant="outline" 
                className={difficultyColors[difficulty]}
              >
                {difficulty}
              </Badge>
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex-1 flex items-center justify-center text-center">
              <p className="font-medium leading-relaxed">{front}</p>
            </div>
            
            <div className="text-center">
              <span className="text-xs text-muted-foreground">Click to reveal answer</span>
            </div>
          </div>

          {/* Back of card */}
          <div className="flashcard-back absolute inset-0 p-6 flex flex-col justify-between bg-muted/5">
            <div className="flex items-center justify-between mb-4">
              <Badge 
                variant="outline" 
                className={difficultyColors[difficulty]}
              >
                Answer
              </Badge>
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex-1 flex items-center justify-center text-center">
              <p className="leading-relaxed text-muted-foreground">{back}</p>
            </div>
            
            <div className="text-center">
              <span className="text-xs text-muted-foreground">Click to return to question</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Alternative toggle view for non-flip interaction */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleAnswer}
          className="text-xs"
        >
          {showAnswer ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </Button>
      </div>

      {/* Answer preview when toggled */}
      {showAnswer && (
        <Card className="mt-2 p-3 bg-muted/50 border-dashed animate-slide-in">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Answer:</strong> {back}
          </p>
        </Card>
      )}
    </div>
  );
}