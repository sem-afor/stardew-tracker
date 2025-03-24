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

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule, FormsModule  ],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss'
})
export class TrackerComponent implements OnInit {
  saveData: SaveFile | null = null;

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
        if (!this.saveData) {
            console.error('Save file not found.');
            this.router.navigate(['/save-manager']); // Redirect if save is not found
        }
    } catch (error) {
        console.error('Error loading save:', error);
    }
  }

  days: number[] = Array.from({ length: 28 }, (_, i) => i + 1);
  notes: { [key: number]: string } = {};
  editingDay: number | null = null;

  saveChanges() {
    // Implement logic for saving changes, possibly using the `notes` object
    console.log('Saving changes...');
  }
}