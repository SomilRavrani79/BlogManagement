import { Component, OnInit } from '@angular/core';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { Blog } from 'src/app/models/blog.model/blog';
import { BlogService } from 'src/app/services/blog.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  showDeleteMessage = false;

  constructor(private blogService: BlogService, private dialog: MatDialog) {
    this.blogService.refreshNeeded.subscribe(() => {
      this.loadBlogs();
    });
  }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe(
      (data: Blog[]) => this.blogs = data,
      error => console.error(error)
    );
  }


  deleteBlog(id: number): void {
    let title = 'Confirm Delete', message = 'Are you sure you want to delete this blog?';
    const dialogRef = this.showAlert(title,message);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.blogService.deleteBlog(id).subscribe(
          () => {
            this.showDeleteMessage = true;
            this.loadBlogs();
            this.showAlert('Success', 'Record deleted successfully', true);
          },
          (error) => {
            this.showAlert('Error', 'Something Went Wrong', true);
          }
        );
      }
    });
  }

  showAlert(title: string, message: string, confirm? : boolean): MatDialogRef<AlertDialogComponent, any> {
    return this.dialog.open(AlertDialogComponent, {
      data: { title, message, confirm }
    });
  }
}
