//memento pattern (Undo/Redo for Progress & Notes)

import { SaveFile } from "../models/save-file.model";

// MEMENTO: Stores a snapshot of SaveFile state
export class Memento {
  constructor(public saveDataState: SaveFile) {}
}

  // Originator: The SaveFile that changes
  export class SaveFileOriginator {
    private state!: SaveFile;

    setState(state: SaveFile) {
        this.state = { ...state }; // Deep copy to prevent reference issues
    }

    // Save the current state to a Memento
    saveToMemento(): Memento {
        return new Memento({ ...this.state });
    }

    restoreFromMemento(memento: Memento) {
        this.state = { ...memento.saveDataState };
    }

    getState(): SaveFile {
        return this.state;
    }
}

  
  // Caretaker: Stores history of SaveFile states
  export class Caretaker {
    private mementos: Memento[] = []; 
    private currentIndex: number = -1;
  
    save(memento: Memento): void {
      // If we are in the middle of a history sequence, clear any "redo" history
      this.mementos = this.mementos.slice(0, this.currentIndex + 1);
      this.mementos.push(memento);
      this.currentIndex++;
      console.log("added memento, current index = " + this.currentIndex);
    }
  
    undo(): Memento | null {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        console.log("undo, current index = " + this.currentIndex);
        return this.mementos[this.currentIndex];
      }
      return null;
    }
  
    redo(): Memento | null {
      if (this.currentIndex < this.mementos.length - 1) {
        this.currentIndex++;
        console.log("redo, current index = " + this.currentIndex);
        return this.mementos[this.currentIndex];
      }
      return null;
    }
  }