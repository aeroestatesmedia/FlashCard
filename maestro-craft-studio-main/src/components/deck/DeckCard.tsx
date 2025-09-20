import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, Play, Edit, Trash2, Brain } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DeckCardProps {
  deck: {
    id: string;
    name: string;
    description?: string;
    cardCount: number;
    studiedToday: number;
    masteryProgress: number;
    lastStudied?: Date;
    isAiGenerated?: boolean;
    difficulty?: "beginner" | "intermediate" | "advanced";
  };
  onStudy?: (deckId: string) => void;
  onEdit?: (deckId: string) => void;
  onDelete?: (deckId: string) => void;
  className?: string;
}

const difficultyColors = {
  beginner: "bg-learning-easy/10 text-learning-easy",
  intermediate: "bg-learning-medium/10 text-learning-medium",
  advanced: "bg-learning-hard/10 text-learning-hard",
};

export function DeckCard({ 
  deck, 
  onStudy, 
  onEdit, 
  onDelete, 
  className 
}: DeckCardProps) {
  const progressColor = deck.masteryProgress >= 80 
    ? "bg-learning-easy" 
    : deck.masteryProgress >= 50 
      ? "bg-learning-medium" 
      : "bg-learning-hard";

  const handleStudy = () => {
    onStudy?.(deck.id);
  };

  const handleEdit = () => {
    onEdit?.(deck.id);
  };

  const handleDelete = () => {
    onDelete?.(deck.id);
  };

  return (
    <Card className={cn(
      "group transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-card/50 backdrop-blur-sm",
      className
    )}>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{deck.name}</CardTitle>
              {deck.isAiGenerated && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Brain className="h-3 w-3 mr-1" />
                  AI
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {deck.cardCount} cards
              </Badge>
              {deck.difficulty && (
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", difficultyColors[deck.difficulty])}
                >
                  {deck.difficulty}
                </Badge>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Deck
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Deck
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {deck.description && (
          <CardDescription className="text-sm">
            {deck.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Mastery Progress</span>
            <span className="font-medium">{deck.masteryProgress}%</span>
          </div>
          <Progress 
            value={deck.masteryProgress} 
            className="h-2"
            style={{ 
              background: `linear-gradient(to right, ${progressColor} 0%, ${progressColor} ${deck.masteryProgress}%, hsl(var(--muted)) ${deck.masteryProgress}%)` 
            }}
          />
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{deck.studiedToday} studied today</span>
          {deck.lastStudied && (
            <span>
              Last: {deck.lastStudied.toLocaleDateString()}
            </span>
          )}
        </div>

        <Button 
          onClick={handleStudy}
          className="w-full group/button"
          variant="default"
        >
          <Play className="h-4 w-4 mr-2 group-hover/button:translate-x-1 transition-transform" />
          Start Studying
        </Button>
      </CardContent>
    </Card>
  );
}