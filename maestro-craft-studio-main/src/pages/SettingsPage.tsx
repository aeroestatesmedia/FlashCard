import { useState } from "react";
import { Settings, User, Bell, Palette, Database, Shield, Crown, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    studyGoals: true,
    newCards: false,
    weeklyReport: true
  });

  const [preferences, setPreferences] = useState({
    theme: "dark",
    language: "en",
    studyGoal: "50",
    autoPlay: false,
    soundEffects: true
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Customize your learning experience
          </p>
        </div>
        
        <Button className="gap-2 gradient-premium">
          <Crown className="h-4 w-4" />
          Upgrade to Pro
        </Button>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account" className="gap-2">
            <User className="h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Palette className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="subscription" className="gap-2">
            <Crown className="h-4 w-4" />
            Subscription
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Free Plan
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Learning Statistics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-primary">15</div>
                    <p className="text-sm text-muted-foreground">Total Decks</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-learning-easy">1,247</div>
                    <p className="text-sm text-muted-foreground">Cards Studied</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-learning-medium">42</div>
                    <p className="text-sm text-muted-foreground">Study Streak</p>
                  </div>
                </div>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Study Preferences</CardTitle>
              <CardDescription>
                Customize how you study and interact with flashcards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={preferences.theme} onValueChange={(value) => 
                    setPreferences({...preferences, theme: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={preferences.language} onValueChange={(value) => 
                    setPreferences({...preferences, language: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studyGoal">Daily Study Goal (cards)</Label>
                <Input 
                  id="studyGoal" 
                  type="number" 
                  value={preferences.studyGoal}
                  onChange={(e) => setPreferences({...preferences, studyGoal: e.target.value})}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto-play audio</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically play audio for cards with audio content
                    </p>
                  </div>
                  <Switch
                    checked={preferences.autoPlay}
                    onCheckedChange={(checked) => 
                      setPreferences({...preferences, autoPlay: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Sound effects</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for interactions and feedback
                    </p>
                  </div>
                  <Switch
                    checked={preferences.soundEffects}
                    onCheckedChange={(checked) => 
                      setPreferences({...preferences, soundEffects: checked})
                    }
                  />
                </div>
              </div>

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Control when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Daily study reminder</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminded to study at your preferred time
                    </p>
                  </div>
                  <Switch
                    checked={notifications.dailyReminder}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, dailyReminder: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Study goal achievements</Label>
                    <p className="text-sm text-muted-foreground">
                      Celebrate when you reach your daily goals
                    </p>
                  </div>
                  <Switch
                    checked={notifications.studyGoals}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, studyGoals: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>New cards available</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when new cards are ready for review
                    </p>
                  </div>
                  <Switch
                    checked={notifications.newCards}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, newCards: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Weekly progress report</Label>
                    <p className="text-sm text-muted-foreground">
                      Get a summary of your learning progress
                    </p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReport}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, weeklyReport: checked})
                    }
                  />
                </div>
              </div>

              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Subscription Plan
              </CardTitle>
              <CardDescription>
                Manage your subscription and billing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-muted/50 border border-dashed">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Free Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      10 AI generations per day
                    </p>
                  </div>
                  <Badge variant="secondary">Current Plan</Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Daily AI quota:</span>
                    <span>10 generations</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deck limit:</span>
                    <span>5 decks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cloud sync:</span>
                    <span>✓ Included</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-lg">Pro Plan</h3>
                  <Badge className="gradient-premium">Recommended</Badge>
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span>Daily AI quota:</span>
                    <span>100 generations</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deck limit:</span>
                    <span>Unlimited</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Priority support:</span>
                    <span>✓ Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Advanced analytics:</span>
                    <span>✓ Included</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold">$9.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <Button className="gap-2 gradient-premium">
                    <CreditCard className="h-4 w-4" />
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Control your data and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Data analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve the app by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Crash reporting</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically send crash reports to help fix bugs
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Data Management</h4>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Database className="h-4 w-4" />
                    Export My Data
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Shield className="h-4 w-4" />
                    Download Privacy Report
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Delete My Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;