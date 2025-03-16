import { Season } from "./current-date.model";
import { StardewEvent } from "./event.model";

export interface CalendarDay {
  day: number;  
  notes?: string;  // Optional notes for the day
  events: StardewEvent[];  // Stardew Valley events (festivals, birthdays, etc.)
}

export interface Calendar {
  season: Season;
  year: number;
  days: CalendarDay[];
}
