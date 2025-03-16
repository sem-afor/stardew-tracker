export interface ItemRequired {
    name: string;
    completed: boolean;
}

export interface Bundle {
    id: string;
    name: string;
    itemsRequired: ItemRequired[];
  }
  
  // UI: bundle.isCompleted = bundle.itemsRequired.every(item => item.completed);
  /*
  EXAMPLE USAGE
  const pantryBundle: Bundle = {
  id: 'pantry',
  name: 'Pantry Bundle',
  itemsRequired: [
    { name: 'Parsnip', completed: true },
    { name: 'Green Bean', completed: false },
    { name: 'Cauliflower', completed: true },
    { name: 'Potato', completed: false }
  ]
};

console.log(pantryBundle.itemsRequired[1].name); // Green Bean
console.log(pantryBundle.itemsRequired[1].completed); // false

  */