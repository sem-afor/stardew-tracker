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
      name: '',               // Default character name
      farmName: '',          // Default farm name
      farmType: 'Standard',       // Default farm type
      favoriteThing: '',    // Default favorite thing
      appearance: {
        skin: 1,                  // Default skin tone
        hair: 1,                  // Default hair style
        shirt: 1,                 // Default shirt style
        pants: 1,                 // Default pants style
        eyeColor: '#6A5ACD',      // Default eye color
        hairColor: '#8B4513',     // Default hair color
        pantColor: '#228B22'      // Default pant color
      }}
    
    // Open the dialog to let the user fill out save details
    const dialogRef = this.matDialog.open(CreateSaveDataDialogComponent, {
      width: '500px',  // Adjust width to your liking
      height: 'auto',  // Let the height adjust automatically based on content
      //position: { top: '50%', left: '50%' },  // Center the dialog
      //panelClass: 'center-dialog',  // Use a custom class for styling
      data: defaultData // Pass the initial save data here (empty if you want to fill in the form)
    });
  
    // After the dialog closes, you can access the result
    const result = await dialogRef.afterClosed().toPromise();  // Wait for the dialog to close
  
    if (result) {
      // If the user provided data, create the new save file
      const newSaveFile: SaveFile = {
        id: '1', // Unique ID
        name: result.name + '_' + result.farmName + '_' + 'Farm',  // Use name from dialog (or default)
        currentDate: { day: 1, season: "Spring", year: 1 },
        character: result, // Take character data from the dialog
        tasks: [],  // Populate with default tasks
        animals: [],  // Populate with default animals
        bundlesCompleted: [],  // Populate with default bundles
        calendars: [],  // Populate with default calendars
        goldenWalnutLocations: []  // Populate with default walnut locations
      };
  
      // Call the service to save this data
      this.saveFileService.createSave(newSaveFile);
      this.loadSaves();
    }
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
      calendars: [
        {
          season: "Fall",
          year: 3,
          days: [
            { day: 1, events: [{ day: 1, season: "Fall", description: "Fall Festival", type: "Festival", completed: false }] },
            { day: 15, notes: "Leah's Birthday", events: [] }
          ]
        }
      ],
      goldenWalnutLocations: [
        { location: "Beach", amount: 5, completed: false },
        { location: "Jungle", amount: 3, completed: true }
      ]
    };

    this.saveFileService.createSave(newSaveFile);
    this.loadSaves();
  }
}