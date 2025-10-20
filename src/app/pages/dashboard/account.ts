import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MedicareService } from '../service/medicare.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, CardModule, ToastModule],
  providers: [MessageService, MedicareService],
  template: `
    <div class="flex justify-center min-h-screen px-4">
      <div class="bg-white rounded-3xl w-full max-w-md">
        <p-toast />

        <h2 class="text-2xl font-semibold mb-4 text-center">My Details</h2>

        <form #form="ngForm" (ngSubmit)="updateDetails()" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium text-gray-600">Name</label>
            <input
              type="text"
              pInputText
              [(ngModel)]="user.name"
              name="name"
              required
              class="w-full"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label class="block mb-1 font-medium text-gray-600">Email</label>
            <input
              type="email"
              pInputText
              [(ngModel)]="user.email"
              name="email"
              required
              class="w-full"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label class="block mb-1 font-medium text-gray-600">Address</label>
            <textarea
              pInputText
              [(ngModel)]="user.address"
              name="address"
              rows="3"
              class="w-full"
              required
              placeholder="Enter your address"
            ></textarea>
          </div>

          <p-button
            label="Update Details"
            icon="pi pi-save"
            styleClass="w-full mt-4"
            [disabled]="form.invalid || loading"
            (onClick)="updateDetails()"
          ></p-button>
        </form>
      </div>
    </div>
  `
})
export class AccountComponent implements OnInit {
  private medicare = inject(MedicareService);
  private messageService = inject(MessageService);

  user = {
    name: '',
    email: '',
    address: ''
  };
  loading = false;

  ngOnInit() {
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.loading = true;
    this.medicare.getUserDetails().subscribe({
      next: (res) => {
        this.user = res?.user || this.user;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showMessage('Failed to load user details', 'error');
      }
    });
  }

  updateDetails() {
    if (!this.user.name || !this.user.email) {
      this.showMessage('Name and Email are required', 'error');
      return;
    }

    this.loading = true;
    this.medicare.saveUserDetails(this.user.name, this.user.email, this.user.address).subscribe({
      next: () => {
        this.loading = false;
        this.showMessage('Details updated successfully!', 'success');
      },
      error: () => {
        this.loading = false;
        this.showMessage('Something went wrong', 'error');
      }
    });
  }

  private showMessage(summary: string, severity: 'success' | 'error') {
    setTimeout(() => {
      this.messageService.add({ severity, summary, life: 3000 });
    });
  }
}
