# Graph Report - Rohit-Gupta-v0  (2026-08-21)

## Corpus Check
- 104 files · ~67,914 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 584 nodes · 840 edges · 62 communities (44 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.69)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `94d72a5a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 53|Community 53]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 79 edges
2. `TodoPage()` - 52 edges
3. `Carousel` - 17 edges
4. `compilerOptions` - 16 edges
5. `Button` - 12 edges
6. `Pagination()` - 11 edges
7. `scripts` - 7 edges
8. `buttonVariants` - 7 edges
9. `tailwind` - 6 edges
10. `aliases` - 6 edges

## Surprising Connections (you probably didn't know these)
- `cn()` --calls--> `clsx`  [INFERRED]
  lib/utils.ts → package.json
- `Rohit Gupta Portfolio` --references--> `Rohit Gupta Resume 2025`  [EXTRACTED]
  README.md → Rohit-Gupta-Resume 2025.pdf
- `Todo UI Test Suite` --conceptually_related_to--> `Rohit Gupta Portfolio`  [AMBIGUOUS]
  tests/README.md → README.md
- `AlertDialogHeader()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert-dialog.tsx → lib/utils.ts
- `AlertDialogFooter()` --calls--> `cn()`  [EXTRACTED]
  components/ui/alert-dialog.tsx → lib/utils.ts

## Communities (62 total, 18 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (36): useIsMobile(), SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle (+28 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (25): geistMono, geistSans, metadata, viewport, education, experience, featured, Home() (+17 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (35): Action, ActionType, addToRemoveQueue(), dispatch(), genId(), listeners, memoryState, reducer() (+27 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (17): devDependencies, autoprefixer, eslint, eslint-config-next, jsdom, postcss, tailwindcss, @tailwindcss/postcss (+9 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (37): dependencies, class-variance-authority, clsx, @emotion/is-prop-valid, framer-motion, lucide-react, next, next-themes (+29 more)

### Community 5 - "Community 5"
Cohesion: 0.14
Nodes (15): timelineData, SkillBadge(), SkillBadgeProps, Skill, SkillCategory(), SkillCategoryProps, SkillsGrid(), FilterCategory (+7 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (49): combobox, setItemSpy, user, metadata, buildSeedTasks(), createId(), formatSeedDescription(), formatSeedLink() (+41 more)

### Community 7 - "Community 7"
Cohesion: 0.24
Nodes (12): ButtonProps, buttonVariants, Calendar(), CalendarProps, Pagination(), PaginationContent, PaginationEllipsis(), PaginationItem (+4 more)

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (9): Checkbox, HoverCardContent, PopoverContent, Switch, ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 11 - "Community 11"
Cohesion: 0.12
Nodes (14): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut() (+6 more)

### Community 12 - "Community 12"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 13 - "Community 13"
Cohesion: 0.17
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 14 - "Community 14"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 15 - "Community 15"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 16 - "Community 16"
Cohesion: 0.20
Nodes (9): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+1 more)

### Community 17 - "Community 17"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 18 - "Community 18"
Cohesion: 0.27
Nodes (13): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+5 more)

### Community 19 - "Community 19"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 20 - "Community 20"
Cohesion: 0.22
Nodes (8): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle

### Community 21 - "Community 21"
Cohesion: 0.29
Nodes (6): code:bash (pnpm install), code:powershell (.\run-project.ps1), Content Sources, Local Development, One-shot PowerShell Flow, Rohit Gupta Portfolio

### Community 22 - "Community 22"
Cohesion: 0.40
Nodes (6): graphify, graphify, Deploy GitHub Pages, Rohit Gupta Portfolio, Rohit Gupta Resume 2025, Todo UI Test Suite

### Community 24 - "Community 24"
Cohesion: 0.19
Nodes (11): cn(), Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator() (+3 more)

### Community 25 - "Community 25"
Cohesion: 0.40
Nodes (4): Coverage Focus, Overview, Structure, Todo UI Test Suite

### Community 26 - "Community 26"
Cohesion: 0.21
Nodes (6): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, RadioGroup, RadioGroupItem

### Community 31 - "Community 31"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

### Community 32 - "Community 32"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 33 - "Community 33"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 35 - "Community 35"
Cohesion: 0.67
Nodes (3): circle, path, rect

### Community 39 - "Community 39"
Cohesion: 0.67
Nodes (3): circle, path, rect

## Ambiguous Edges - Review These
- `Rohit Gupta Portfolio` → `Todo UI Test Suite`  [AMBIGUOUS]
  tests/README.md · relation: conceptually_related_to

## Knowledge Gaps
- **283 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+278 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Rohit Gupta Portfolio` and `Todo UI Test Suite`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `Community 24` to `Community 0`, `Community 2`, `Community 4`, `Community 5`, `Community 6`, `Community 7`, `Community 8`, `Community 11`, `Community 12`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 19`, `Community 20`, `Community 26`, `Community 31`, `Community 32`, `Community 33`, `Community 40`?**
  _High betweenness centrality (0.285) - this node is a cross-community bridge._
- **Why does `clsx` connect `Community 4` to `Community 24`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _283 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05226480836236934 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05975609756097561 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08974358974358974 - nodes in this community are weakly interconnected._