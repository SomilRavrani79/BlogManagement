import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.getErrorMessage(error);
        this.showAlert('Error', errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'Network error: Please check your internet connection.';
      case 400:
        return 'Bad Request: The request was invalid.';
      case 401:
        return 'Unauthorized: Access is denied due to invalid credentials.';
      case 403:
        return 'Forbidden: You don’t have permission to access the requested resource.';
      case 404:
        return 'Not Found: The requested resource could not be found.';
      case 500:
        return 'Internal Server Error: An error occurred on the server.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  }

  private showAlert(title: string, message: string): void {
    this.dialog.open(AlertDialogComponent, {
      data: { title, message }
    });
  }
}
