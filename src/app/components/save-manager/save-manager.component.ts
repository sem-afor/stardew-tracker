import { Component } from '@angular/core';

@Component({
  selector: 'app-save-manager',
  standalone: true,
  imports: [],
  templateUrl: './save-manager.component.html',
  styleUrl: './save-manager.component.scss'
})
export class SaveManagerComponent {
  /**
   *  View all save files (list of playthroughs)
      Create a new save file (start a new playthrough)
      Load a save file (open and continue a playthrough)
      Rename or delete a save file
      Export or import a save file (optional, for backing up progress)

      ------------------------------
      |  🌾 Save Manager           |
      ------------------------------
      |  ✅ Farm Name: "Sunny Farm" |
      |     Year 3, Fall 15        |
      |     🏠 Owner: Alex         |
      |     [🔄 Load] [✏ Rename] [❌ Delete] |
      ------------------------------
      |  ➕ Create New Save        |
      ------------------------------

      The Save Manager page shows all save files.
      When you select a save, it loads the data (character, progress, etc.).
      Other pages (Calendar, Tracker, Bundles) use the currently loaded save to display info.
      The Undo (Memento) pattern could track changes while playing.
   */
}
