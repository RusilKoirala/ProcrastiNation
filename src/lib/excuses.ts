export const excuses = [
  "Your brain needs a firmware update. Please restart creativity.exe and try again.",
  "Mercury is in retrograde. All productive activity is contractually suspended until further notice.",
  "You deserve a snack break. Studies show 94% of great ideas happen near the fridge.",
  "Your motivation module has encountered an unexpected error. Roll back to yesterday's intentions.",
  "The project scope is still crystallizing. Starting now would be premature optimization.",
  "Your focus is performing scheduled maintenance. Estimated completion: never.",
  "A higher-priority task has been detected: staring at the ceiling and thinking.",
  "Your inner child is requesting a 45-minute creative recharge session.",
  "The universe is not aligned for deep work today. Please consult your horoscope.",
  "You're currently in ideation mode. Execution is a phase 2 concern.",
  "Neural pathways are buffering. Please enjoy this complimentary loading screen.",
  "According to your digital wellness score, you have already peak-performed today.",
  "Your keyboard's chakras are misaligned. A brief meditation is required before typing.",
  "The task at hand has been delegated to Future You, who is reportedly more motivated.",
  "Cognitive load is at 97%. Offloading non-essential thoughts to tomorrow.",
  "An urgent meeting with your couch has just appeared on your calendar.",
  "Beta-testing procrastination strategies requires not doing the thing. For science.",
  "Task complexity was re-evaluated. It now qualifies as a 'next quarter' initiative.",
];

export function getRandomExcuse(): string {
  return excuses[Math.floor(Math.random() * excuses.length)];
}
