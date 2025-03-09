//memento pattern (Undo/Redo for Progress & Notes)
// Memento: Stores a snapshot of SaveFile state
class Memento {
    constructor(public state: SaveFile) {}
  }
  
  // Originator: The SaveFile that changes
  class SaveFileOriginator {
    private state!: SaveFile;
  
    setState(state: SaveFile) {
      this.state = { ...state }; // Deep copy to prevent reference issues
    }
  
    saveToMemento(): Memento {
      return new Memento({ ...this.state });
    }
  
    restoreFromMemento(memento: Memento) {
      this.state = { ...memento.state };
    }
  
    getState(): SaveFile {
      return this.state;
    }
  }
  
  // Caretaker: Stores history of SaveFile states
  class Caretaker {
    private history: Memento[] = [];
  
    save(memento: Memento) {
      this.history.push(memento);
    }
  
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