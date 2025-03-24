import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { SaveFile } from '../../models/save-file.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SaveFileService } from '../../services/save-file.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Calendar } from '../../models/calendar.model';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule, FormsModule],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss'
})
export class TrackerComponent implements OnInit {
  saveData: SaveFile | null = null;
  editingDay: number | null = null;
  notes: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private saveFileService: SaveFileService
  ) {}

  ngOnInit() {
    console.log("need to load save");
    
    this.route.paramMap.subscribe(async params => {
      const filename = params.get('filename');
      console.log("filename: ", filename);
      
      if (filename) {
        this.loadSave(filename);
      }
    });
  }

  async loadSave(filename: string) {
    try {
      console.log("loadsave filename ", filename);
      this.saveData = await this.saveFileService.loadSave(filename);

      if (!this.saveData || !this.saveData.calendars?.length) {
        console.error('Save file or calendars not found.');
        this.router.navigate(['/save-manager']); // Redirect if save is not found or has no calendars
      } else {
        this.initializeNotes(); // Initialize notes after loading the save data
      }
    } catch (error) {
      console.error('Error loading save:', error);
    }
  }

  initializeNotes() {
    if (this.saveData?.calendars?.[0]) {
      // Initialize the notes object with empty notes from the calendar days
      this.saveData.calendars[0].days.forEach((day) => {
        this.notes[day.day] = day.notes || ''; // Assigning default empty string if no notes exist
      });
    }
  }

  saveChanges() {
    if (this.saveData) {
      // Update the notes in the calendar
      this.saveData.calendars[0].days.forEach((day) => {
        if (this.notes[day.day] !== day.notes) {
          day.notes = this.notes[day.day]; // Update the notes for the day
        }
      });

      // Save the updated `saveData` with the modified notes
      this.saveFileService.createSave(this.saveData); // Assuming `createSave` updates the save file
      console.log('Saving changes...');
    }
  }
}
