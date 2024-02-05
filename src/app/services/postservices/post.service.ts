import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BlogPost } from '../../models/blogModels/blogPost.model';
import { BlogRequest } from '../../models/blogModels/blogRequest.model';
import { comment } from '../../models/commentModels/comment.model';
import { CommentRequest } from '../../models/commentModels/commentRequest.model';

@Injectable({
  providedIn: 'root'
})
export class PostService  {
  private apiBaseUrl = environment.apiBaseUrl;
  private accessToken: string | null = null;

  constructor(private http: HttpClient) { }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  logout(): void {
    this.accessToken = null;
  }
 
  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return headers;
  } 

  getBlogPosts(): Observable<BlogPost[]> {
    const headers = this.getHeaders();
    return this.http.get<BlogPost[]>(`${this.apiBaseUrl}/api/Blogs`, { headers });
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    const headers = this.getHeaders();
    return this.http.get<BlogPost>(`${this.apiBaseUrl}/api/Blogs/${id}`, { headers });
  }

  addBlogPost(blogAdd: BlogRequest): Observable<BlogRequest> {
    const headers = this.getHeaders();
    return this.http.post<BlogPost>(`${this.apiBaseUrl}/api/Blogs`, blogAdd, { headers });
  }

  getComments(blogId: string): Observable<comment[]>{
    const headers = this.getHeaders();
    return this.http.get<comment[]>(`${this.apiBaseUrl}/api/Comments/${blogId}`, { headers })
  }

  addComment(comment:CommentRequest, blogId: string): Observable<CommentRequest>{
    const headers = this.getHeaders();
    return this.http.post<CommentRequest>(`${this.apiBaseUrl}/api/Comments/${blogId}`, { headers })
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiBaseUrl}/api/Images`, formData);
  }

  getFullImageUrl(filePath: string): string {
    const baseUrl = this.apiBaseUrl;
    const relativePath = filePath.replace('file:///', '').replace(/\\/g, '/');
    const filename = relativePath.substring(relativePath.lastIndexOf('/') + 1);
    return `${baseUrl}/static/images/${filename}`;
  }
}
