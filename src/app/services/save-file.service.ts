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

  async getAllSaves(): Promise<SaveFile[]> {
    await this.loadSaves();
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

    console.log("createsave-name = ", createSave.name);
    

    const fileName = `${createSave.name}.json`;

    // Call IPC to save the file
    window.electron.invoke('save-data', newSave, createSave.name);

    return newSave;
  }

  async deleteSave(saveName: string): Promise<void> {
    await window.electron.invoke('delete-save', saveName);
  }

  async loadSaves(): Promise<void> {
    try {
      const saves = await window.electron.invoke('load-save-data'); // Wait for the response
      this.saveFiles = saves || []; // Assign the data safely
    } catch (error) {
      console.error('Error loading saves:', error);
    }
  }

  async loadSave(filename: string): Promise<SaveFile | null> {
    try {
        const save = await window.electron.invoke('load-single-save', filename);
        if (!save) {
            console.error('Save file not found.');
            return null;
        }
        return save;
    } catch (error) {
        console.error('Error loading save:', error);
        return null;
    }
  }


  async saveChanges(save: SaveFile): Promise<void> {
    try {
      window.electron.invoke('save-data', save, save.name);
      console.log('Save updated successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  }
}
