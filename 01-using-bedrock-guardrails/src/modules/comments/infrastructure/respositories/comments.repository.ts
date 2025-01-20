import { Injectable } from "@nestjs/common";
import { Comment } from "@modules/comments/domain/entities/comment.entity";

@Injectable()
export class CommentsRepository {
  private comments: Comment[] = [];

  save(comment: Comment): Comment {
    this.comments.push(comment);
    return comment;
  }
}