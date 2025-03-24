import { Injectable } from '@angular/core';
import { SaveFile } from '../models/save-file.model';

@Injectable({
  providedIn: 'root',
})
export class SaveFileService {
  private saveFiles: SaveFile[] = [];

  constructor() {
    this.loadSaves();  // Load save files when the service is instantiated
  }

  getAllSaves(): SaveFile[] {
    return this.saveFiles;
  }

  getSaveById(id: string): SaveFile | undefined {
    return this.saveFiles.find(save => save.id === id);
  }

  createSave(createSave: SaveFile): SaveFile {
    const newSave: SaveFile = {
      id: Date.now().toString(), // Unique ID for the new save file
      name: createSave.name,
      currentDate: { day: 1, season: 'Spring', year: 1 }, // Default values
      character: createSave.character,
      tasks: createSave.tasks, // todo load empty example tasks ?
      animals: createSave.animals, // todo add chickens if with the one farm otherwise load empty 
      bundlesCompleted: createSave.bundlesCompleted, // todo load empty (no remix) bundles
      calendars: createSave.calendars, // todo load empty calendar and add birthday ? 
      goldenWalnutLocations: createSave.goldenWalnutLocations // todo load empty walnut locations
    };

    const fileName = `${createSave.character.farmName}-${Date.now()}.json`;

    // Call IPC to save the file
    //ipcRenderer.invoke('save-data', newSave, createSave.character.farmName);

    return newSave;
  }

  deleteSave(id: string): void {
    this.saveFiles = this.saveFiles.filter(save => save.id !== id);
    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void {
    localStorage.setItem('saveFiles', JSON.stringify(this.saveFiles));
  }

  loadSaves(): void {
    const data = localStorage.getItem('saveFiles');
    if (data) {
      this.saveFiles = JSON.parse(data);
    }
  }
}
