export type AchievementId =
  | "master_procrastinator"
  | "deadline_dodger"
  | "professional_overthinker"
  | "excuse_artist"
  | "time_bender"
  | "darkness_embracer";

export interface Achievement {
  id: AchievementId;
  emoji: string;
  name: string;
  description: string;
  secret: string;
}

export const achievements: Achievement[] = [
  {
    id: "master_procrastinator",
    emoji: "🏅",
    name: "Master Procrastinator",
    description: "Spent 2 minutes on this page without starting a single thing.",
    secret: "Your inertia is legendary.",
  },
  {
    id: "deadline_dodger",
    emoji: "🏃",
    name: "Deadline Dodger",
    description: "Clicked 'Start Working' and then chickened out.",
    secret: "A true professional knows when NOT to begin.",
  },
  {
    id: "professional_overthinker",
    emoji: "🤔",
    name: "Professional Overthinker",
    description: "Opened Settings 3 times without changing anything.",
    secret: "Analysis paralysis is a skillset.",
  },
  {
    id: "excuse_artist",
    emoji: "🎨",
    name: "Excuse Artist",
    description: "Generated 5 different excuses. All of them excellent.",
    secret: "Creativity applied to the wrong domain, but still creativity.",
  },
  {
    id: "time_bender",
    emoji: "⏳",
    name: "Time Bender",
    description: "Reset the Pomodoro timer 3 times.",
    secret: "Why do work in 25 minutes when you can reset forever?",
  },
  {
    id: "darkness_embracer",
    emoji: "🌑",
    name: "Darkness Embracer",
    description: "Activated Dark Mode on this app. You monster.",
    secret: "Also: your eyes are now permanently damaged. Worth it.",
  },
];
