//factory pattern (Creating Save Files)
class SaveFile {
    constructor(
      public name: string,
      public farmName: string,
      public character: string
    ) {}
  }
  
  // Factory for creating SaveFile objects
  class SaveFileFactory {
    static createSaveFile(name: string, farmName: string, character: string): SaveFile {
      return new SaveFile(name, farmName, character);
    }
  }
  
  /*
  // Example usage:
  const save1 = SaveFileFactory.createSaveFile("Playthrough 1", "Sunny Farm", "Alex");
  console.log(save1);
  */