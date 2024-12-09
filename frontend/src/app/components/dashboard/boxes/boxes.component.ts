import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavComponent } from "../dashboard-nav/dashboard-nav.component";
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ImageUploadComponent } from '../../image-upload/image-upload.component';
import { Box } from '../../../models/boxes/boxes.module';
import { BoxesService } from '../../../services/boxes.service';

@Component({
  selector: 'app-boxes',
  standalone: true,
  imports: [CommonModule, DashboardNavComponent, FormsModule, ImageUploadComponent],
  templateUrl: './boxes.component.html',
  styleUrl: './boxes.component.css'
})
export class DashboardBoxesComponent {
  boxes: Box[] = [];
  selectedFile: File | null = null;

  box: any = {
    _id: '',
    brand: '',
    sport: '',
    description: '',
    price: null
  }

  constructor(
    private boxesService: BoxesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void{
    this.boxesService.getBoxes().subscribe((data: any) => {
      this.boxes = data as Box[];
    });
}

//updated data
loadBoxes(){
  this.boxesService.getBoxes().subscribe((data: any) => {
  this.boxes = data;
  });
}

// Get Box
  getBox(id: string) {
    if (id) {
      this.boxesService.getBox(id).subscribe({
        next: (boxData) => {
          this.box = boxData; // Assign the fetched data
          console.log('Fetched box data:', this.box); // Log the data
        },
        error: (error) => {
          console.error('Error fetching box:', error);
        }
      });
    } else {
      console.log('Box ID is not defined.');
    }
  }
  


   //update box
  updateBox() {
    if(this.box._id && this.box){
      this.boxesService.updateBox(this.box).subscribe({
        next: (updateBox) => {
          console.log("box successfully updated.", updateBox);
          this.loadBoxes();
    },
    error: (error)=>{
      console.error('error updating box: ', error)
    }
  });
  } else {
      console.log("Box id is not defined.");
    }
  }

  //delete break
  deleteBox(id: string){
    this.boxesService.deleteBox(id).subscribe((response)=>{
      console.log('Break deleted: ', response)
      this.loadBoxes();
    })
  }

  //Adds a new card
  addBox() {
      // Validate the form fields
      if (!this.box.brand || !this.box.sport || !this.box.description || !this.box.price) {
        alert('All fields are required to add an break.');
        return;
      }
    
 // Convert price to a number
  this.box.price = Number(this.box.price);

 // Call the service to add the card
  this.boxesService.addBox(this.box).subscribe({
    next: (newBox) => {
      console.log('Card added successfully:', newBox);
     this.loadBoxes(); // Refresh the Card list
     this.resetBoxForm(); // Clear the form after adding
    },
    error: (error) => {
      console.error('Error adding card:', error);
      alert('Failed to add card. Please try again.');
    },
  });
}
  
  // Reset form fields after adding a card
  resetBoxForm() {
    this.box = {
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
