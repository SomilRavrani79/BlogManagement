import { Component, OnInit } from '@angular/core';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { Blog, PaginatedResult } from 'src/app/models/blog.model/blog';
import { BlogService } from 'src/app/services/blog.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  showDeleteMessage = false;
  pageSize = 5;
  pageNumber = 1;
  totalBlogs = 0;
  searchTerm: string = '';
  sortBy: string = 'date';
  constructor(private blogService: BlogService, private dialog: MatDialog, private router: Router) {
    this.blogService.refreshNeeded.subscribe(() => {
      this.loadBlogs();
    });
  }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getBlogs(this.pageNumber, this.pageSize,this.searchTerm, this.sortBy).subscribe(
      (data:any) => {
        this.blogs = data.data.items;
        this.totalBlogs = data.data.totalCount;
      },
      error => {
        console.error('Error fetching blogs:', error);
      }
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

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.loadBlogs();
  }
  editBlog(id: number): void {
    this.router.navigate(['/add-blog'], { queryParams: { id } });
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    this.loadBlogs(); // Or refresh the blogs based on the search term
  }

  onSortChange(sortBy: string): void {
    this.sortBy = sortBy;
    this.loadBlogs();
  }
}
