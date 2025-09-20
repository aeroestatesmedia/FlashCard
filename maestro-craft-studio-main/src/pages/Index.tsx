import { Brain, CreditCard, TrendingUp, Zap, Plus, BookOpen, Target, Clock } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DeckCard } from "@/components/deck/DeckCard";
import { FlashcardPreview } from "@/components/flashcard/FlashcardPreview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: "Cards Studied Today",
      value: 47,
      description: "Keep up the momentum!",
      icon: CreditCard,
      trend: { value: 12, label: "vs yesterday", isPositive: true },
      variant: "gradient" as const
    },
    {
      title: "Current Streak",
      value: "12 days",
      description: "Personal best: 28 days",
      icon: TrendingUp,
      trend: { value: 8, label: "vs last week", isPositive: true },
      variant: "learning" as const
    },
    {
      title: "AI Generations",
      value: "7/10",
      description: "Daily quota remaining",
      icon: Brain,
      variant: "default" as const
    },
    {
      title: "Mastery Rate",
      value: "78%",
      description: "Across all decks",
      icon: Target,
      trend: { value: 5, label: "this month", isPositive: true },
      variant: "gradient" as const
    }
  ];

  const recentDecks = [
    {
      id: "1",
      name: "Advanced JavaScript Concepts",
      description: "ES6+, async/await, closures, and more",
      cardCount: 45,
      studiedToday: 12,
      masteryProgress: 78,
      lastStudied: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isAiGenerated: true,
      difficulty: "advanced" as const
    },
    {
      id: "2", 
      name: "Spanish Vocabulary",
      description: "Common phrases and daily conversation",
      cardCount: 128,
      studiedToday: 25,
      masteryProgress: 56,
      lastStudied: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      difficulty: "intermediate" as const
    },
    {
      id: "3",
      name: "Medical Terminology",
      description: "Anatomy and medical procedures",
      cardCount: 67,
      studiedToday: 8,
      masteryProgress: 34,
      lastStudied: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      difficulty: "advanced" as const
    }
  ];

  const quickStart = {
    front: "What is React's useEffect hook used for?",
    back: "useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM. It runs after every completed render.",
    difficulty: "medium" as const
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Ready to continue your learning journey? Let's make today count.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Continue Last Session
          </Button>
          <Button className="gap-2 gradient-ai">
            <Plus className="h-4 w-4" />
            Create with AI
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
            variant={stat.variant}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Decks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent Decks</h2>
            <Button variant="ghost" className="text-primary hover:text-primary">
              View All →
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentDecks.map((deck) => (
              <DeckCard
                key={deck.id}
                deck={deck}
                onStudy={(id) => console.log("Study deck:", id)}
                onEdit={(id) => console.log("Edit deck:", id)}
                onDelete={(id) => console.log("Delete deck:", id)}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions & Preview */}
        <div className="space-y-6">
          {/* Quick Study Preview */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Quick Study
              </CardTitle>
              <CardDescription>
                Practice with a sample flashcard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FlashcardPreview
                front={quickStart.front}
                back={quickStart.back}
                difficulty={quickStart.difficulty}
                size="sm"
              />
            </CardContent>
          </Card>

          {/* Today's Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Today's Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Study 50 cards</span>
                <Badge variant="secondary" className="bg-learning-medium/10 text-learning-medium">
                  47/50
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Review 3 decks</span>
                <Badge variant="secondary" className="bg-learning-easy/10 text-learning-easy">
                  3/3 ✓
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Use AI generator</span>
                <Badge variant="outline">
                  0/1
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Study Streak */}
          <Card className="bg-gradient-to-br from-learning-easy/5 to-learning-medium/5 border-learning-easy/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-learning-easy" />
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-learning-easy">12</div>
                <p className="text-sm text-muted-foreground">days in a row</p>
                <p className="text-xs text-muted-foreground">
                  Keep going! You're on fire 🔥
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
