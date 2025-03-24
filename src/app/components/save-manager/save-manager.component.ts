import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SaveFile } from '../../models/save-file.model';
import { CommonModule } from '@angular/common';
import { SaveFileService } from '../../services/save-file.service';
  

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

  constructor(private saveFileService: SaveFileService) {}

  ngOnInit(): void {
    this.loadSaves();
  }

  loadSaves(): void {
    this.saveFiles = this.saveFileService.getAllSaves();

    // mock
    this.saveFiles = [
      {
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
      }
    ];
  }

  openSave(save: SaveFile) {
    this.selectedSave = save;
    // todo open specific save
  }

  createSave() {
    // todo add inputs to choose save name etc
    const newSave = this.saveFileService.createSave('New Save', 'New Farm', 'Player');
    this.loadSaves(); 
  }

  editSave(save: SaveFile) {
    this.selectedSave = save;
    // todo edit specific save name
  }

  deleteSave(saveId: string) {
    this.saveFileService.deleteSave(saveId);
    this.loadSaves();
    if (this.selectedSave?.id === saveId) {
      this.selectedSave = null;
    }
  }

  exportSave(){
    // todo
  }

  exportAllSaves(){
    // todo
  }
}
