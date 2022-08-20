import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from '../post/entitiy/post.entity';
import { Comments } from './comment.entity';
import { CreateCommentRequest } from './dto/createComment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Post)
    private readonly PostRepository: Repository<Post>,

    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

  async getUsersByIds(ids) {
    return this.commentRepository.find({
      where: { post_id: In(ids) },
    });
  }

  async findAll(id) {
    const comment = await this.commentRepository;
    const comments = await comment.find({
      where: {
        post_id: id,
      },
    });

    return comments;
  }

  async create(user, commentBody: CreateCommentRequest): Promise<Comments> {
    const getPost = await this.PostRepository;
    const getComment = await this.commentRepository;
    const comment = new Comments();

    // const post = await getPost.findOne({
    //   where: {
    //     id: commentBody.post_id,
    //   },
    // });

    // if (commentBody.comment_id) {
    //   const commentReply = await getComment.findOne({
    //     where: {
    //       id: commentBody.comment_id,
    //     },
    //   });

    //   comment.reply = commentBody.comment_id;
    //   commentReply.has_replies = true;
    //   await getComment.save(commentReply);
    // }

    comment.user_id = 1;
    comment.text = commentBody.text;
    comment.post_id = commentBody.post_id;
    comment.has_replies = true;

    await getComment.save(comment);

    return comment;
  }
}
