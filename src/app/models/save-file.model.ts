import { Animal } from "./animal.model";
import { Bundle } from "./bundle.model";
import { Calendar } from "./calendar.model";
import { Character } from "./character.model";
import { CurrentDate } from "./current-date.model";
import { StardewEvent } from "./event.model";
import { GoldenWalnutLocation } from "./golden-walnut-location.model";
import { Task } from "./task.model";

export interface SaveFile {
    id: string;
    name: string;
    currentDate: CurrentDate;
    character: Character;
    tasks: Task[];  
    animals: Animal[];  
    bundlesCompleted: Bundle[];
    calendars: Calendar[];
    goldenWalnutLocations: GoldenWalnutLocation[];
  }