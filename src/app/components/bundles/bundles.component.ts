import { Component } from '@angular/core';
import { SaveFile } from '../../models/save-file.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SaveFileService } from '../../services/save-file.service';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bundles',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, MatButtonModule],
  templateUrl: './bundles.component.html',
  styleUrl: './bundles.component.scss'
})
export class BundlesComponent {
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

  saveChanges() {
    if (this.saveData) {
      this.saveFileService.saveChanges(this.saveData);
    }
  }
}
