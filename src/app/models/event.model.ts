import { Season } from "./current-date.model";

export interface StardewEvent {
    day: number;
    season: Season;
    description: string;
    type?: 'Festival' | 'Heart Event' | 'Custom';  // custom for ex wedding
    completed?: boolean;
}  