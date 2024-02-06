import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { BlogPost } from '../../models/blogModels/blogPost.model';
import { CommentRequest } from '../../models/commentModels/commentRequest.model';
import { PostService } from '../../services/postservices/post.service';
import { BlogRequest } from '../../models/blogModels/blogRequest.model';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [ DatePipe, FormsModule, RouterModule, CommonModule, RouterOutlet ],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {
  blogPost: BlogRequest = new BlogRequest('', '', '', '', new Date(), '', '');
  featuredImageUrl: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private postService: PostService) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.postService.getBlogPostById(postId).subscribe(blogPost => {
      this.blogPost = blogPost;

      this.featuredImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blogPost.featuredImageUrl);
    });
  }
}