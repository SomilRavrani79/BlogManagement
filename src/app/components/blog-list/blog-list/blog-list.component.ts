import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { Blog, PaginatedResult } from 'src/app/models/blog.model/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, AfterViewInit {
  blogs: Blog[] = [];
  dataSource = new MatTableDataSource<Blog>();
  displayedColumns: string[] = ['username', 'dateCreated', 'text', 'actions'];
  showDeleteMessage = false;
  pageSize = 5;
  pageNumber = 1;
  totalBlogs = 0;
  searchTerm: string = '';
  sortBy: string = 'date';
  loading: boolean = false;
  private searchSubject: Subject<string> = new Subject();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private blogService: BlogService, private dialog: MatDialog, private router: Router) {
    this.blogService.refreshNeeded.subscribe(() => {
      this.loadBlogs();
    });
  }

  ngOnInit(): void {
    this.loadBlogs();

    // Debounce search input
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.loadBlogs();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadBlogs(): void {
    this.loading = true;
    this.blogService.getBlogs(this.pageNumber, this.pageSize, this.searchTerm, this.sortBy).subscribe(
      (data: any) => {
        this.blogs = data.data.items;
        this.totalBlogs = data.data.totalCount;
        this.dataSource.data = this.blogs;
        this.loading = false;
      },
      error => {
        console.error('Error fetching blogs:', error);
        this.loading = false;
      }
    );
  }

  deleteBlog(id: number): void {
    const dialogRef = this.showAlert('Confirm Delete', 'Are you sure you want to delete this blog?');

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.blogService.deleteBlog(id).subscribe(
          () => {
            this.showDeleteMessage = true;
            this.loadBlogs();
            this.showAlert('Success', 'Record deleted successfully', true);
          },
          error => {
            this.showAlert('Error', 'Something Went Wrong', true);
          }
        );
      }
    });
  }

  showAlert(title: string, message: string, confirm?: boolean): MatDialogRef<AlertDialogComponent, any> {
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
    this.searchSubject.next(inputElement.value);
  }

  onSortChange(sort: Sort): void {
    this.sortBy = sort.active;
    this.loadBlogs();
  }
}
