import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { Blog } from 'src/app/models/blog.model/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {
  blogForm: FormGroup;
  showSuccessMessage = false;
  @Output() blogCreated = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private blogService: BlogService, private dialog: MatDialog) {
    this.blogForm = this.fb.group({
      username: ['', Validators.required],
      text: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.blogForm.valid) {
      const newBlog: Blog = {
        id: 0,
        username: this.blogForm.get('username')?.value,
        dateCreated: new Date(),
        text: this.blogForm.get('text')?.value
      };
      this.blogService.createBlog(newBlog).subscribe(
        () => {
          this.blogForm.reset();
          Object.keys(this.blogForm.controls).forEach(key => {
            this.blogForm.get(key)?.setErrors(null);
          });
          
          this.blogCreated.emit();
          this.showAlert('Success', 'New record added successfully', true);
        },
        error => console.error(error)
      );
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.blogForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
  showAlert(title: string, message: string, confirm : boolean): void {
    this.dialog.open(AlertDialogComponent, {
      data: { title, message, confirm }
    });
  }
}
