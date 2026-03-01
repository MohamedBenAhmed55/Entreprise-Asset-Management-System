import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let summary = 'Application Error';
      let detail = 'An unexpected error occurred.';

      // Check if it's a Spring Boot RFC 7807 ProblemDetails response
      if (error.error && error.error.title) {
        summary = error.error.title;
        detail = error.error.detail || 'No additional details provided.';
      }
      // Check if the backend is completely down
      else if (error.status === 0) {
        summary = 'Network Error';
        detail = 'Could not connect to the server. Is Spring Boot running?';
      }
      // Fallback for standard HTTP errors
      else {
        summary = `Error ${error.status}`;
        detail = error.message;
      }

      // Fire the global toast notification
      messageService.add({
        severity: 'error',
        summary: summary,
        detail: detail,
        life: 5000 // Stays on screen for 5 seconds
      });

      // Pass the error along just in case a specific component wants to handle it too
      return throwError(() => error);
    })
  );
};
