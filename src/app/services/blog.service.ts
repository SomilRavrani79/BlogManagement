import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Blog, GenericResponse } from '../models/blog.model/blog';

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

  getBlogs(): Observable<Blog[]> {
    return this.http.get<GenericResponse<Blog[]>>(this.apiUrl).pipe(
      map(response => response.data) // Extract data from the generic response
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
