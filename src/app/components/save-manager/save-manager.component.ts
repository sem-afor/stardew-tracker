import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SaveFile } from '../../models/save-file.model';
import { CommonModule } from '@angular/common';
import { SaveFileService } from '../../services/save-file.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateSaveDataDialogComponent } from '../create-save-data-dialog/create-save-data-dialog.component';
import { Character } from '../../models/character.model';
import { Router } from '@angular/router';
import { Calendar, CalendarDay } from '../../models/calendar.model';
  

/**
    The Save Manager page shows all save files.
    When you select a save, it loads the data (character, progress, etc.).
    Other pages (Calendar, Tracker, Bundles) use the currently loaded save to display info.
    The Undo (Memento) pattern could track changes while playing.
 */

@Component({
  selector: 'app-save-manager',
  standalone: true,
  imports: [NavbarComponent, MatButtonModule, CommonModule, MatCardModule],
  templateUrl: './save-manager.component.html',
  styleUrl: './save-manager.component.scss'
})
export class SaveManagerComponent implements OnInit {

  saveFiles: SaveFile[] = [];
  selectedSave: SaveFile | null = null;

  constructor(
    private matDialog: MatDialog,
    private saveFileService: SaveFileService,
    private router: Router) {}

  ngOnInit(): void {
    this.loadSaves();
  }

  async loadSaves(): Promise<void> {
    console.log("load saves");
    this.saveFiles = await this.saveFileService.getAllSaves();
    console.log("loaded saves");
  }

  openSave(save: SaveFile) {
    this.selectedSave = save;
    console.log("load save:");
    console.log(this.selectedSave.name); 
    
    this.router.navigate(['/tracker', save.name]); 
  }

  async createSave() {
    console.log("creating mock for create save");

    const defaultData: Character = {
      name: '',   
      farmName: '',          
      farmType: 'Standard',      
      favoriteThing: '',    
      appearance: {
        skin: 1,                  
        hair: 1,                  
        shirt: 1,               
        pants: 1,                 
        eyeColor: '#6A5ACD',      
        hairColor: '#8B4513',     
        pantColor: '#228B22'      
      }}
    
    const dialogRef = this.matDialog.open(CreateSaveDataDialogComponent, {
      width: '500px',  
      height: 'auto',  
      data: defaultData 
    });
  
    const result = await dialogRef.afterClosed().toPromise();  
  
    if (result) {
      const newSaveFile: SaveFile = {
        id: '1', // Unique ID prvidded by save service
        name: result.name + '_' + result.farmName + '_' + 'Farm',  
        currentDate: { day: 1, season: "Spring", year: 1 },
        character: result, 
        tasks: [],  
        animals: [],  
        bundlesCompleted: [], 
        calendars: [this.createDefaultCalendar()],  
        goldenWalnutLocations: [] 
      };
  
      this.saveFileService.createSave(newSaveFile);
      this.loadSaves();
    }
  }  
  
  createDefaultCalendar(): Calendar {
    const days: CalendarDay[] = [];

    for (let day = 1; day <= 28; day++) {
      const calendarDay: CalendarDay = {
        day: day,
        notes: '', 
        events: [] 
      };
      days.push(calendarDay);
    }
  
    return {
      season: 'Spring', 
      year: 1,         
      days: days        
    };
  }

  editSave(save: SaveFile) {
    this.selectedSave = save;
    // todo edit specific save name
  }

  async deleteSave(saveName: string) {
    await this.saveFileService.deleteSave(saveName);
    await this.loadSaves();
    if (this.selectedSave?.name === saveName) {
      this.selectedSave = null;
    }
  }

  exportSave(){
    // todo
  }

  exportAllSaves(){
    // todo
  }

  // for mocking
  addSunnyFarm() {
    const newSaveFile : SaveFile = {
      id: '1',
      name: "Sunny",
      currentDate: { day: 15, season: "Fall", year: 3 },
      character: {
        name: "Alex",
        farmName: "Sunny",
        farmType: "Standard",
        favoriteThing: "Coffee",
        loveInterest: {
          name: "Leah",
          heartEvents: [
            { day: 12, season: "Spring", description: "Heart Event 1", type: "Heart Event", completed: true },
            { day: 22, season: "Summer", description: "Heart Event 2", type: "Heart Event", completed: false }
          ],
          likedGifts: ["Wine", "Salad"],
          lovedGifts: ["Goat Cheese", "Truffle"],
          neutralGifts: ["Apple"],
          dislikedGifts: ["Quartz"],
          hatedGifts: ["Driftwood"]
        },
        appearance: {
          skin: 2,
          hair: 1,
          shirt: 4,
          pants: 2,
          eyeColor: "#6A5ACD",
          hairColor: "#8B4513",
          pantColor: "#228B22"
        }
      },
      tasks: [
        { name: "Water crops", completed: true },
        { name: "Visit Pierre's", completed: false }
      ],
      animals: [
        { name: "Bessie", species: "Cow", barnType: "Barn" },
        { name: "Chirpy", species: "Chicken", barnType: "Coop" }
      ],
      bundlesCompleted: [
        { id: "101", name: "Spring Crops Bundle", itemsRequired: [
          { name: "Parsnip", completed: true },
          { name: "Green Bean", completed: false }
        ]}
      ],
      calendars: [this.createDefaultCalendar()],
      goldenWalnutLocations: [
        { location: "Beach", amount: 5, completed: false },
        { location: "Jungle", amount: 3, completed: true }
      ]
    };

    this.saveFileService.createSave(newSaveFile);
    this.loadSaves();
  }
}