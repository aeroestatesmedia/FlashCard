import { Brain, CreditCard, BarChart3, Settings, Plus, Zap, Crown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: BarChart3,
    description: "Learning overview & stats"
  },
  { 
    title: "My Decks", 
    url: "/decks", 
    icon: CreditCard,
    description: "Manage flashcard decks"
  },
  { 
    title: "AI Generator", 
    url: "/ai-generator", 
    icon: Brain,
    description: "Create cards with AI"
  },
  { 
    title: "Study Session", 
    url: "/study", 
    icon: Zap,
    description: "Active learning session"
  },
];

const bottomItems = [
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings,
    description: "App preferences"
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClasses = (itemPath: string) => {
    const active = isActive(itemPath);
    return active 
      ? "bg-primary/10 text-primary border-r-2 border-r-primary font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold">AI FlashLearn</span>
              <span className="text-xs text-muted-foreground">Professional Learning</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between">
        <div className="space-y-2">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
              Main
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11">
                      <NavLink 
                        to={item.url} 
                        className={`${getNavClasses(item.url)} transition-all duration-200`}
                        title={collapsed ? item.description : undefined}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && (
                          <div className="flex flex-col">
                            <span className="font-medium">{item.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {!collapsed && (
            <div className="px-3 py-2">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 border-dashed"
              >
                <Plus className="h-4 w-4" />
                Quick Deck
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2 border-t border-border pt-4">
          {!collapsed && (
            <div className="px-3 py-2">
              <div className="rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-4 w-4 text-primary" />
                  <Badge variant="secondary" className="text-xs">PRO</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Unlock unlimited AI generations
                </p>
                <Button size="sm" className="w-full gradient-premium">
                  Upgrade Now
                </Button>
              </div>
            </div>
          )}
          
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11">
                      <NavLink 
                        to={item.url} 
                        className={getNavClasses(item.url)}
                        title={collapsed ? item.description : undefined}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}