import { Season } from "./current-date.model";
import { StardewEvent } from "./event.model";

export interface CalendarDay {
  day: number;  
  notes?: string;  
  events: StardewEvent[];  
}

export interface Calendar {
  season: Season;
  year: number;
  days: CalendarDay[];
}
