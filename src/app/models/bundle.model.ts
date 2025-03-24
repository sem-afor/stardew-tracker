export interface ItemRequired {
    name: string;
    completed: boolean;
}

export interface Bundle {
    id: string;
    name: string;
    itemsRequired: ItemRequired[];
  }