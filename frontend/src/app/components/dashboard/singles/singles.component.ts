import { Component } from '@angular/core';
import { Card } from '../../../models/singles/singles.module';
import { CommonModule } from '@angular/common';
import { DashboardNavComponent } from "../dashboard-nav/dashboard-nav.component";
import { FormsModule } from '@angular/forms';
import { SinglesService } from '../../../services/singles.service';
import { HttpClient } from '@angular/common/http';
import { ImageUploadComponent } from '../../image-upload/image-upload.component';


@Component({
  selector: 'app-singles',
  standalone: true,
  imports: [CommonModule, DashboardNavComponent, FormsModule, ImageUploadComponent],
  templateUrl: './singles.component.html',
  styleUrl: './singles.component.css'
})
export class DashboardSinglesComponent {
  singles: Card[] = [];
  selectedFile: File | null = null;

  card: any = {
    _id: '',
    firstname: '',
    lastname: '',
    sport: '',
    description: '',
    price: null
  }

  constructor(
    private singlesService: SinglesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void{
    this.singlesService.getCards().subscribe((data: any) => {
      this.singles = data as Card[];
    });
}

//updated data
loadCards(){
  this.singlesService.getCards().subscribe((data: any) => {
  this.singles = data;
  });
}

// Get Card
  getCard(id: string) {
    if (id) {
      this.singlesService.getCard(id).subscribe({
        next: (cardData) => {
          this.card = cardData; // Assign the fetched data
          console.log('Fetched card data:', this.card); // Log the data
        },
        error: (error) => {
          console.error('Error fetching employee:', error);
        }
      });
    } else {
      console.log('Card ID is not defined.');
    }
  }
  


   //update card
  updateCard() {
    if(this.card._id && this.card){
      this.singlesService.updateCard(this.card).subscribe({
        next: (updateCard) => {
          console.log("Card successfully updated.", updateCard);
          this.loadCards();
    },
    error: (error)=>{
      console.error('error updating card: ', error)
    }
  });
  } else {
      console.log("Card id is not defined.");
    }
  }

  //delete card
  deleteCard(id: string){
    this.singlesService.deleteCard(id).subscribe((response)=>{
      console.log('Employee deleted: ', response)
      this.loadCards();
    })
  }

  //Adds a new card
  addCard() {
      // Validate the form fields
      if (!this.card.firstname || !this.card.lastname || !this.card.sport || !this.card.description || !this.card.price) {
        alert('All fields are required to add an card.');
        return;
      }
    
 // Convert price to a number
  this.card.price = Number(this.card.price);

 // Call the service to add the card
  this.singlesService.addCard(this.card).subscribe({
    next: (newCard) => {
      console.log('Card added successfully:', newCard);
     this.loadCards(); // Refresh the Card list
     this.resetCardForm(); // Clear the form after adding
    },
    error: (error) => {
      console.error('Error adding card:', error);
      alert('Failed to add card. Please try again.');
    },
  });
}
  
  // Reset form fields after adding a card
  resetCardForm() {
    this.card = {
      _id: '',
      firstname: '',
      lastname: '',
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
