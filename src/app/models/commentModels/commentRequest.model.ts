export class CommentRequest {
    constructor(
      public commentText?: string,
      public userEmail?: string,
      public blogId?: string
    ) {}
  }
  