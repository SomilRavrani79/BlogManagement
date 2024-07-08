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

  getBlogs(pageNumber: number = 1, pageSize: number = 5, searchTerm :  any, sortBy : any,direction : any,id?: number): Observable<GenericResponse<PaginatedResult<Blog[]>> | GenericResponse<Blog>> {
    const params = {
      pageNumber:pageNumber ,
      pageSize:pageSize,
      searchTerm: searchTerm ?? '',
      sortBy: sortBy ?? 'date',
      direction: direction ?? 'asc',
      id: id ?? null
    };

    return this.http.post<GenericResponse<PaginatedResult<Blog[]>> | GenericResponse<Blog>>(this.apiUrl+ '/GetData', params );
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
