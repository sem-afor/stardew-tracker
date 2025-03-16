export interface StardewEvent {
    date: string;
    description: string;
    type?: 'Festival' | 'Heart Event' | 'Custom';  // custom for ex wedding
    completed?: boolean;
}
// todo  