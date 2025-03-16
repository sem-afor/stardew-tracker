import { StardewEvent } from "./event.model";

export type RelationshipStatus = 'Neutral' | 'Friend' | 'Girlfriend' | 'Boyfriend' | 'Spouse' | 'Wife' | 'Husband' | 'Ex-Husband' | 'Ex-Wife';

export interface Villager {
    name: string;
    heartEvents: StardewEvent[];
    likedGifts: string[];
    lovedGifts: string[];
    neutralGifts: string[];
    dislikedGifts: string[];
    hatedGifts: string[];
  }

  /* EXAMPLE
  const elliott: Character = {
  name: "Elliott",
  portrait: "elliott.png",
  likedGifts: ["Duck Feather", "Pomegranate"],
  lovedGifts: ["Crab Cakes", "Lobster"],
  neutralGifts: ["Apple", "Cheese"],
  dislikedGifts: ["Quartz"],
  hatedGifts: ["Amaranth"],
  heartEvents: [
    { date: "Spring 12", description: "Meet Elliott at the beach." }
  ],
  relationshipStatus: "Friend"
}; */