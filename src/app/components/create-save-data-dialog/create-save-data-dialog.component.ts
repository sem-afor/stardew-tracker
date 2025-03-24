import { Component, Inject } from '@angular/core';
import { SaveFile } from '../../models/save-file.model'; 
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-create-save-data-dialog',
  standalone: true,
  imports: [ MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule, 
    FormsModule,
    CommonModule],
  templateUrl: './create-save-data-dialog.component.html',
  styleUrl: './create-save-data-dialog.component.scss'
})
export class CreateSaveDataDialogComponent {
  saveData: Character;

  constructor(public dialogRef: MatDialogRef<CreateSaveDataDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Character
  ){
    this.saveData = data;
  }

  save() {
    this.dialogRef.close(this.saveData);
  }

  cancel() {
    this.dialogRef.close();
  }

}
