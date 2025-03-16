import { Animal } from "./animal.model";
import { Bundle } from "./bundle.model";
import { Character } from "./character.model";
import { CurrentDate } from "./current-date.model";
import { StardewEvent } from "./event.model";

export interface SaveFile {
    id: string;
    name: string;
    currentDate: CurrentDate;
    character: Character;
    tasksCompleted: string[];  // what is this
    events: StardewEvent[]; // events completed maybe?
    animals: Animal[];  
    bundlesCompleted: Bundle[];
  }
  // todo