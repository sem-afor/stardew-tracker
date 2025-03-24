//memento pattern (Undo/Redo for Progress & Notes)

import { SaveFile } from "../models/save-file.model";

// Memento: Stores a snapshot of SaveFile state
class Memento {
  constructor(public state: SaveFile) {}
}
  
  // Originator: The SaveFile that changes
  class SaveFileOriginator {
    private state!: SaveFile;

    // Set the state of the SaveFile
    setState(state: SaveFile) {
        this.state = { ...state }; // Deep copy to prevent reference issues
    }

    // Save the current state to a Memento
    saveToMemento(): Memento {
        return new Memento({ ...this.state });
    }

    // Restore the state from a Memento
    restoreFromMemento(memento: Memento) {
        this.state = { ...memento.state };
    }

    // Get the current state
    getState(): SaveFile {
        return this.state;
    }
}

  
  // Caretaker: Stores history of SaveFile states
  class Caretaker {
    private history: Memento[] = [];

    // Save a Memento object to history
    save(memento: Memento) {
        this.history.push(memento);
    }

    // Undo: pop the last Memento object and return it
    undo(): Memento | null {
        return this.history.pop() || null;
    }
}

  
  /*
  // Example Usage:
  const saveFile = new SaveFileOriginator();
  const history = new Caretaker();
  
  saveFile.setState(SaveFileFactory.createSaveFile("Playthrough 1", "Sunny Farm", "Alex"));
  history.save(saveFile.saveToMemento()); // Save state
  
  saveFile.setState(SaveFileFactory.createSaveFile("Playthrough 2", "Moonlight Farm", "Elliott"));
  history.save(saveFile.saveToMemento()); // Save new state
  
  console.log("Current state:", saveFile.getState());
  
  // Undo
  const previousState = history.undo();
  if (previousState) saveFile.restoreFromMemento(previousState);
  
  console.log("After undo:", saveFile.getState());
  */