import { useState } from "react";
import { Plus, Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeckCard } from "@/components/deck/DeckCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DecksPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  // Mock deck data
  const allDecks = [
    {
      id: "1",
      name: "Advanced JavaScript Concepts",
      description: "ES6+, async/await, closures, and advanced patterns",
      cardCount: 45,
      studiedToday: 12,
      masteryProgress: 78,
      lastStudied: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isAiGenerated: true,
      difficulty: "advanced" as const
    },
    {
      id: "2",
      name: "Spanish Vocabulary",
      description: "Common phrases and daily conversation starters",
      cardCount: 128,
      studiedToday: 25,
      masteryProgress: 56,
      lastStudied: new Date(Date.now() - 1000 * 60 * 60 * 24),
      difficulty: "intermediate" as const
    },
    {
      id: "3",
      name: "Medical Terminology",
      description: "Anatomy, procedures, and medical abbreviations",
      cardCount: 67,
      studiedToday: 8,
      masteryProgress: 34,
      lastStudied: new Date(Date.now() - 1000 * 60 * 60 * 4),
      difficulty: "advanced" as const
    },
    {
      id: "4",
      name: "React Fundamentals",
      description: "Components, hooks, state management basics",
      cardCount: 32,
      studiedToday: 15,
      masteryProgress: 89,
      lastStudied: new Date(Date.now() - 1000 * 60 * 30),
      isAiGenerated: true,
      difficulty: "beginner" as const
    },
    {
      id: "5",
      name: "German Grammar",
      description: "Cases, verb conjugations, and sentence structure",
      cardCount: 78,
      studiedToday: 0,
      masteryProgress: 23,
      lastStudied: new Date(Date.now() - 1000 * 60 * 60 * 48),
      difficulty: "intermediate" as const
    },
    {
      id: "6",
      name: "Data Structures & Algorithms",
      description: "Arrays, trees, graphs, sorting, and searching",
      cardCount: 156,
      studiedToday: 18,
      masteryProgress: 45,
      lastStudied: new Date(Date.now() - 1000 * 60 * 60 * 6),
      isAiGenerated: true,
      difficulty: "advanced" as const
    }
  ];

  const filteredDecks = allDecks.filter(deck => {
    const matchesSearch = deck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deck.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterBy === "all" || 
                         (filterBy === "ai" && deck.isAiGenerated) ||
                         (filterBy === "manual" && !deck.isAiGenerated) ||
                         (filterBy === "beginner" && deck.difficulty === "beginner") ||
                         (filterBy === "intermediate" && deck.difficulty === "intermediate") ||
                         (filterBy === "advanced" && deck.difficulty === "advanced");
    
    return matchesSearch && matchesFilter;
  });

  const totalCards = allDecks.reduce((sum, deck) => sum + deck.cardCount, 0);
  const avgMastery = Math.round(allDecks.reduce((sum, deck) => sum + deck.masteryProgress, 0) / allDecks.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Decks</h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize your flashcard collections
          </p>
        </div>
        
        <Button className="gap-2 gradient-ai">
          <Plus className="h-4 w-4" />
          Create New Deck
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Decks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allDecks.length}</div>
            <p className="text-xs text-muted-foreground">{totalCards} total cards</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-learning-easy/5 to-learning-medium/5 border-learning-easy/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Mastery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgMastery}%</div>
            <p className="text-xs text-muted-foreground">Across all decks</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-secondary/5 to-muted/5 border-secondary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">AI Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allDecks.filter(d => d.isAiGenerated).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((allDecks.filter(d => d.isAiGenerated).length / allDecks.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search decks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Decks</SelectItem>
              <SelectItem value="ai">AI Generated</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Showing {filteredDecks.length} of {allDecks.length} decks
        </span>
        {searchQuery && (
          <Badge variant="secondary" className="text-xs">
            Search: "{searchQuery}"
          </Badge>
        )}
        {filterBy !== "all" && (
          <Badge variant="secondary" className="text-xs">
            Filter: {filterBy}
          </Badge>
        )}
      </div>

      {/* Decks Grid/List */}
      {filteredDecks.length > 0 ? (
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }>
          {filteredDecks.map((deck) => (
            <DeckCard
              key={deck.id}
              deck={deck}
              onStudy={(id) => console.log("Study deck:", id)}
              onEdit={(id) => console.log("Edit deck:", id)}
              onDelete={(id) => console.log("Delete deck:", id)}
              className={viewMode === "list" ? "max-w-none" : ""}
            />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center py-12 text-center">
          <CardContent>
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            </div>
            <CardTitle className="mb-2">No decks found</CardTitle>
            <CardDescription className="mb-4">
              {searchQuery 
                ? `No decks match "${searchQuery}"`
                : "Create your first deck to get started"
              }
            </CardDescription>
            <Button className="gap-2 gradient-ai">
              <Plus className="h-4 w-4" />
              Create Your First Deck
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DecksPage;