import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Blog, GenericResponse, PaginatedResult } from '../models/blog.model/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/Blog`;

  private refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refreshNeeded() {
    return this.refreshNeeded$;
  }

  getBlogs(pageNumber: number = 1, pageSize: number = 5): Observable<PaginatedResult<Blog[]>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<GenericResponse<PaginatedResult<Blog[]>>>(this.apiUrl, { params }).pipe(
      map(response => response.data)
    );
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<GenericResponse<Blog>>(this.apiUrl, blog).pipe(
      map(response => response.data),
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<GenericResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }
}
