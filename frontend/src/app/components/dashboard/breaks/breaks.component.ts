import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavComponent } from "../dashboard-nav/dashboard-nav.component";
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ImageUploadComponent } from '../../image-upload/image-upload.component';
import { BreaksService } from '../../../services/breaks.service';
import { Break } from '../../../models/breaks/breaks.module';

@Component({
  selector: 'app-breaks',
  standalone: true,
  imports: [CommonModule, DashboardNavComponent, FormsModule, ImageUploadComponent],
  templateUrl: './breaks.component.html',
  styleUrl: './breaks.component.css'
})
export class DashboardBreaksComponent {
  breaks: Break[] = [];
  selectedFile: File | null = null;

  breakObj: any = {
    _id: '',
    brand: '',
    sport: '',
    description: '',
    price: null
  }

  constructor(
    private breaksService: BreaksService,
    private http: HttpClient
  ) {}

  ngOnInit(): void{
    this.breaksService.getBreaks().subscribe((data: any) => {
      this.breaks = data as Break[];
    });
}

//updated data
loadBreaks(){
  this.breaksService.getBreaks().subscribe((data: any) => {
  this.breaks = data;
  });
}

// Get Break
  getBreak(id: string) {
    if (id) {
      this.breaksService.getBreak(id).subscribe({
        next: (breakData) => {
          this.breakObj = breakData; // Assign the fetched data
          console.log('Fetched Break data:', this.breakObj); // Log the data
        },
        error: (error) => {
          console.error('Error fetching break:', error);
        }
      });
    } else {
      console.log('Break ID is not defined.');
    }
  }
  


   //update card
  updateBreak() {
    if(this.breakObj._id && this.breakObj){
      this.breaksService.updateBreak(this.breakObj).subscribe({
        next: (updateBreak) => {
          console.log("Card successfully updated.", updateBreak);
          this.loadBreaks();
    },
    error: (error)=>{
      console.error('error updating break: ', error)
    }
  });
  } else {
      console.log("Break id is not defined.");
    }
  }

  //delete break
  deleteBreak(id: string){
    this.breaksService.deleteBreak(id).subscribe((response)=>{
      console.log('Break deleted: ', response)
      this.loadBreaks();
    })
  }

  //Adds a new card
  addBreak() {
      // Validate the form fields
      if (!this.breakObj.brand || !this.breakObj.sport || !this.breakObj.description || !this.breakObj.price) {
        alert('All fields are required to add an break.');
        return;
      }
    
 // Convert price to a number
  this.breakObj.price = Number(this.breakObj.price);

 // Call the service to add the card
  this.breaksService.addBreak(this.breakObj).subscribe({
    next: (newCard) => {
      console.log('Card added successfully:', newCard);
     this.loadBreaks(); // Refresh the Card list
     this.resetBreakForm(); // Clear the form after adding
    },
    error: (error) => {
      console.error('Error adding card:', error);
      alert('Failed to add card. Please try again.');
    },
  });
}
  
  // Reset form fields after adding a card
  resetBreakForm() {
    this.breakObj = {
      _id: '',
      brand: '',
      sport: '',
      description: '',
      price: null
    };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }

  uploadImage(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post('/api/upload', formData).subscribe({
      next: (response) => {
        console.log('Image uploaded successfully:', response);
        alert('Image uploaded successfully');
      },
      error: (error) => {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      },
    });
  }
}
