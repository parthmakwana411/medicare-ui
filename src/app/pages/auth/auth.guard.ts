import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // check if user is logged in

  if (token) {
    return true; // allow access
  } else {
    router.navigate(['/auth/login']); // redirect to login page
    return false;
  }
};