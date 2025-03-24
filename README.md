# StardewTracker

StardewTracker is a desktop application designed to help you track your progress in Stardew Valley saves. Initially, I created an Excel sheet to track all my data and current progress in the game, but I thought, why not build a desktop application for that? This application offers the ability to track all the features I need, and it is user-friendly and easy to use, plus I can share it with friends.

The problem it addresses is the difficulty of tracking and managing your progress in Stardew Valley in an easy-to-use, organized, and accessible way. The application helps players keep track of their in-game progress, including character stats, events, and tasks. This is particularly useful for players who have multiple saves or want a more convenient way to manage their game data.

## Patterns
This application incorporates the following design patterns:

- **Singleton Pattern**:  
  The `ElectronStoreService` class (and the `SaveFileService`) are implemented using the Singleton pattern. This ensures that there is only one instance of the `ElectronStore`, which helps in managing application settings and save data throughout the application without creating multiple instances unnecessarily.

- **Factory Pattern**:  
  The `SaveFileService` uses the Factory pattern for creating new save files. The `createSave()` method in `SaveFileService` generates a new save file, making the creation process standardized and flexible.

- **Memento Pattern**:  
  The `TrackerComponent` implements the Memento pattern for undo/redo functionality. When editing the game's data (such as notes), the application stores previous states of the game data in `Memento` objects, allowing users to undo or redo changes efficiently.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Start
Run `npx electron-forge start` to start it as desktop application. 
Run
