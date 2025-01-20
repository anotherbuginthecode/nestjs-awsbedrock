import { IComment } from "@modules/comments/domain/interfaces/comment.interface";
import { v4 as uuidv4 } from 'uuid';

export class Comment implements IComment{
  public readonly id: string
  public readonly userid: string
  public readonly timestamp: Date


  constructor(
    public readonly message: string,
  ) {
    this.id = uuidv4();
    this.userid = uuidv4();
    this.timestamp = new Date();
  }
}