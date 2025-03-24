import { Villager } from "./villager.model";

export interface Character {
    name: string;      
    farmName: string;     
    farmType: string;
    favoriteThing: string;
    loveInterest?: Villager;
    appearance: {
      skin: number;
      hair: number;
      shirt: number;
      pants: number;
      eyeColor: string;
      hairColor: string;
      pantColor: string;
    };
  }