import { useState } from "react";
import { Brain, Sparkles, Send, Plus, Download, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FlashcardPreview } from "@/components/flashcard/FlashcardPreview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AIGeneratorPage = () => {
  const [prompt, setPrompt] = useState("");
  const [deckName, setDeckName] = useState("");
  const [cardCount, setCardCount] = useState("10");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCards, setGeneratedCards] = useState<Array<{
    front: string;
    back: string;
    difficulty: "new" | "easy" | "medium" | "hard";
  }>>([]);

  // Mock AI quota (in real app, this would come from backend)
  const aiQuota = { used: 7, total: 10 };
  const quotaPercentage = (aiQuota.used / aiQuota.total) * 100;

  const mockCards = [
    {
      front: "What is the Virtual DOM in React?",
      back: "The Virtual DOM is a programming concept where a 'virtual' representation of the UI is kept in memory and synced with the 'real' DOM. It's a JavaScript object that describes what the UI should look like.",
      difficulty: "medium" as const
    },
    {
      front: "Explain React Hooks",
      back: "React Hooks are functions that let you use state and other React features in functional components. They allow you to reuse stateful logic between components without changing your component hierarchy.",
      difficulty: "medium" as const
    },
    {
      front: "What is JSX?",
      back: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It gets transpiled to React.createElement() calls.",
      difficulty: "easy" as const
    }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || aiQuota.used >= aiQuota.total) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setGeneratedCards(mockCards);
      setIsGenerating(false);
    }, 3000);
  };

  const promptSuggestions = [
    "JavaScript ES6+ features and modern syntax",
    "Spanish conversational phrases for beginners",
    "Medical terminology for nursing students",
    "Python data structures and algorithms",
    "World history major events and dates",
    "Biology cell structure and functions"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            AI Flashcard Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Transform any topic into intelligent flashcards with AI
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge 
            variant="secondary" 
            className={`${quotaPercentage > 80 ? 'bg-learning-hard/10 text-learning-hard' : 'bg-learning-new/10 text-learning-new'}`}
          >
            {aiQuota.used}/{aiQuota.total} AI generations today
          </Badge>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Cards
          </Button>
        </div>
      </div>

      {/* AI Quota Status */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            Daily AI Quota
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress 
            value={quotaPercentage} 
            className="h-2"
          />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {aiQuota.used} of {aiQuota.total} generations used
            </span>
            <span className="font-medium">
              {aiQuota.total - aiQuota.used} remaining
            </span>
          </div>
          {quotaPercentage > 80 && (
            <div className="flex items-center gap-2 text-sm text-learning-hard">
              <span>⚠️ Running low on AI generations</span>
              <Button size="sm" variant="outline" className="h-6 text-xs">
                Upgrade to Pro
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generation Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Generate Flashcards
              </CardTitle>
              <CardDescription>
                Describe what you want to learn and let AI create perfect flashcards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deckName">Deck Name</Label>
                <Input
                  id="deckName"
                  placeholder="e.g., React Fundamentals"
                  value={deckName}
                  onChange={(e) => setDeckName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">Learning Topic</Label>
                <Textarea
                  id="prompt"
                  placeholder="Describe what you want to learn about. Be specific for better results..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardCount">Number of Cards</Label>
                  <Select value={cardCount} onValueChange={setCardCount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 cards</SelectItem>
                      <SelectItem value="10">10 cards</SelectItem>
                      <SelectItem value="15">15 cards</SelectItem>
                      <SelectItem value="20">20 cards</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating || aiQuota.used >= aiQuota.total}
                className="w-full gap-2 gradient-ai"
              >
                {isGenerating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Generating Cards...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Generate Flashcards
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Prompt Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Start Ideas</CardTitle>
              <CardDescription>
                Try these popular learning topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {promptSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-3 hover:bg-muted/50"
                    onClick={() => setPrompt(suggestion)}
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generated Cards Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Generated Cards
                {generatedCards.length > 0 && (
                  <Badge variant="secondary">{generatedCards.length} cards</Badge>
                )}
              </CardTitle>
              <CardDescription>
                Preview and customize your AI-generated flashcards
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      AI is creating your flashcards...
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse" />
                    ))}
                  </div>
                </div>
              ) : generatedCards.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {generatedCards.length} cards generated
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit All
                      </Button>
                      <Button size="sm" className="gap-1">
                        <Plus className="h-3 w-3" />
                        Save to Deck
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {generatedCards.map((card, index) => (
                      <FlashcardPreview
                        key={index}
                        front={card.front}
                        back={card.back}
                        difficulty={card.difficulty}
                        size="sm"
                        className="w-full"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    Generated flashcards will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIGeneratorPage;