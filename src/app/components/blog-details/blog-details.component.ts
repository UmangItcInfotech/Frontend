import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { BlogPost } from '../../models/blogModels/blogPost.model';
import { CommentRequest } from '../../models/commentModels/commentRequest.model';
import { PostService } from '../../services/postservices/post.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [ DatePipe, FormsModule, RouterModule, CommonModule, RouterOutlet ],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {
  blogPost: BlogPost;
  featuredImageUrl: SafeResourceUrl;
  comments: any[];
  showAddCommentForm: boolean = false;
  newComment: CommentRequest = { commentText: '', userEmail: '', blogId: '' };

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.postService.getBlogPostById(postId).subscribe(blogPost => {
      this.blogPost = blogPost;

      this.featuredImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blogPost.featuredImageUrl);
    });

    // Load comments when the component initializes
    this.loadComments(postId);

    // Set blogId for the new comment
    this.newComment.blogId = postId;
  }

  viewComments(): void {
    // Load comments when the "View Comments" button is clicked
    const postId = this.route.snapshot.paramMap.get('id');
    this.loadComments(postId);
  }

  addComment(): void {
    this.postService.addComment(this.newComment, this.newComment.blogId).subscribe(
      comment => {
        // Reload comments after adding a new comment
        this.loadComments(this.newComment.blogId);

        // Reset the newComment object
        this.newComment = { commentText: '', userEmail: '', blogId: this.newComment.blogId };
      },
      error => {
        console.error('Error adding comment:', error);
      }
    );
  }

  private loadComments(blogId: string): void {
    this.postService.getComments(blogId).subscribe(
      comments => {
        this.comments = comments;
      },
      error => {
        console.error('Error fetching comments:', error);
      }
    );
  }
}