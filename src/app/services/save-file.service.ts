import { Injectable } from '@angular/core';
import { SaveFile } from '../models/save-file.model';

// Factory
@Injectable({
  providedIn: 'root',
})
export class SaveFileService {
  private saveFiles: SaveFile[] = [];

  constructor() {
    this.loadSaves();
  }

  getAllSaves(): SaveFile[] {
    return this.saveFiles;
  }

  getSaveById(id: string): SaveFile | undefined {
    return this.saveFiles.find(save => save.id === id);
  }

  createSave(name: string, farmName: string, character: string): SaveFile {
    const newSave: SaveFile = {
      id: Date.now().toString(), // Unique ID for now
      name,
      currentDate: { day: 1, season: 'Spring', year: 1 }, // Default values
      character: {
        name: character,
        farmName,
        farmType: 'Standard',
        favoriteThing: '',
        loveInterest: undefined,
        appearance: { skin: 1, hair: 1, shirt: 1, pants: 1, eyeColor: '', hairColor: '', pantColor: '' },
      },
      tasks: [],
      animals: [],
      bundlesCompleted: [],
      calendars: [],
      goldenWalnutLocations: [],
    };
    this.saveFiles.push(newSave);
    this.saveToLocalStorage();
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
