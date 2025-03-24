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
import { Caretaker, Memento, SaveFileOriginator } from '../../services/undo.service';

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

  saveFile = new SaveFileOriginator();
  history : Caretaker = new Caretaker();

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
        this.router.navigate(['/save-manager']); 
      } else {
        this.initializeNotes(); 
      }
    } catch (error) {
      console.error('Error loading save:', error);
    }
  }

  initializeNotes() {
    if (this.saveData?.calendars?.[0]) {
      this.saveData.calendars[0].days.forEach((day) => {
        this.notes[day.day] = day.notes || ''; 
      });
    }
  }

  // Save the current state as a MEMENTO
  saveState() {
    if (this.saveData) {
      this.saveFile.setState(this.saveData); 
      this.history.save(this.saveFile.saveToMemento()); 
    }
  }
  
  // Undo the changes by restoring the previous state
  undoChanges() {
    const previousMemento = this.history.undo(); 
    if (previousMemento) {
      this.saveFile.restoreFromMemento(previousMemento);
      this.saveData = this.saveFile.getState();
      this.initializeNotes(); 
      console.log('Undo: Restored previous state');
    } else {
      console.log('No previous state to undo.');
    }
  }
  
  // Redo the changes by restoring the next state
  redoChanges() {
    const nextMemento = this.history.redo();
    if (nextMemento) {
      this.saveFile.restoreFromMemento(nextMemento);
      this.saveData = this.saveFile.getState(); 
      this.initializeNotes(); 
      console.log('Redo: Restored next state');
    } else {
      console.log('No next state to redo.');
    }
  }
  
  
  saveChanges() {
    if (this.saveData) {
      this.saveData.calendars[0].days.forEach((day) => {
        if (this.notes[day.day] !== day.notes) {
          console.log("saved note " + day.notes + " for day " + day.day);
          
          day.notes = this.notes[day.day]; 
        }
      });

      this.saveFileService.createSave(this.saveData); 
      console.log('Saving changes...');
      this.saveState(); 
    }
  }

  // Track edits to the notes
  onNoteEdit(day: number) {
  this.saveState();
  this.editingDay = null; 
}

}
