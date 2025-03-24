import { Injectable } from '@angular/core';
import { SaveFile } from '../models/save-file.model';
import { ElectronStoreService } from './electron-store-service';

// FACTORY
export class SaveFileFactory {
  static createNewSave(createSave: SaveFile): SaveFile {
    // Abstract the creation logic into the factory class
    const newSave: SaveFile = {
      id: Date.now().toString(),
      name: createSave.name,
      currentDate: { day: 1, season: 'Spring', year: 1 },
      character: createSave.character,
      tasks: createSave.tasks,
      animals: createSave.animals,
      bundlesCompleted: createSave.bundlesCompleted,
      calendars: createSave.calendars,
      goldenWalnutLocations: createSave.goldenWalnutLocations
    };

    return newSave;
  }
}


// SINGLETON 
// behaving like a Singleton due to Angular's dependency injection system and the @Injectable({ providedIn: 'root' }) decorator
@Injectable({
  providedIn: 'root',
})
export class SaveFileService {
  private saveFiles: SaveFile[] = [];
  appSettings: any;

  constructor(private electronStoreService: ElectronStoreService) {
    this.loadSaves();  
    this.appSettings = this.electronStoreService.getData('appSettings');
  }

  saveSettings(): void {
    // Save settings to Electron store
    this.electronStoreService.setData('appSettings', this.appSettings);
  }

  clearSettings(): void {
    // Clear settings from Electron store
    this.electronStoreService.deleteData('appSettings');
  }

  saveVillagerData(villagerData: any) {
    this.electronStoreService.setData('villagerData', villagerData);
  }

  loadVillagerData() {
    return this.electronStoreService.getData('villagerData');
  }

  saveEventData(eventData: any) {
    this.electronStoreService.setData('eventData', eventData);
  }

  loadEventData() {
    return this.electronStoreService.getData('eventData');
  }

  async getAllSaves(): Promise<SaveFile[]> {
    await this.loadSaves();
    return this.saveFiles;
  }

  getSaveById(id: string): SaveFile | undefined {
    return this.saveFiles.find(save => save.id === id);
  }

  createSave(createSave: SaveFile): SaveFile {
    // Use the FACTORY to create the new SaveFile
    const newSave: SaveFile = SaveFileFactory.createNewSave(createSave);
    const fileName = `${createSave.name}.json`;
    window.electron.invoke('save-data', newSave, createSave.name);
    return newSave;
  }
  

  async deleteSave(saveName: string): Promise<void> {
    await window.electron.invoke('delete-save', saveName);
  }

  async loadSaves(): Promise<void> {
    try {
      const saves = await window.electron.invoke('load-save-data'); 
      this.saveFiles = saves || []; 
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
