import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError, AuthenticationError } from 'apollo-server-express';
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

  async findAll() {
    const comment = await this.commentRepository;
    const comments = await comment.find();
    return comments;
  }

  async create(user, commentBody: CreateCommentRequest): Promise<Comments> {
    const { post_id, comment_id, text } = commentBody;

    if (!user) {
      throw new AuthenticationError('Not Logged In');
    }
    const getPost = await this.PostRepository;
    const getComment = await this.commentRepository;
    const comment = new Comments();

    if (comment_id) {
      const commentTarget = await getComment.findOne({
        where: {
          id: comment_id,
        },
      });
      if (!commentTarget) {
        throw new ApolloError('Target comment is not found', 'NOT_FOUND');
      }

      comment.reply = comment_id;

      commentTarget.has_replies = true;
      await getComment.save(commentTarget);
    }

    // const newComment = await getComment.create({
    //   user_id: user.id,
    //   text: text,
    //   post_id: post_id,
    // });

    // await getComment.save(newComment);

    const post = await getPost.findOne({
      where: {
        id: commentBody.post_id,
      },
    });

    if (commentBody.comment_id) {
      const commentReply = await getComment.findOne({
        where: {
          id: commentBody.comment_id,
        },
      });

      comment.reply = commentBody.comment_id;
      commentReply.has_replies = true;
      await getComment.save(commentReply);
    }

    comment.user_id = user.id;
    comment.text = commentBody.text;
    comment.post_id = commentBody.post_id;

    await getComment.save(comment);

    return comment;
  }

  async remove(user, commentBody) {
    const getPost = await this.PostRepository;
    const getComment = await this.commentRepository;
    const comment = new Comments();

    const findcomment = await getComment.findOne({
      where: {
        id: commentBody.id,
      },
    });

    findcomment.deleted = true;

    await getComment.remove(findcomment);

    return true;
  }

  async edit(user, commentBody): Promise<Comments> {
    const getPost = await this.PostRepository;
    const getComment = await this.commentRepository;
    const comment = new Comments();

    const findcomment = await getComment.findOne({
      where: {
        id: commentBody.id,
      },
    });

    findcomment.text = commentBody.text;

    await getComment.save(findcomment);

    return findcomment;
  }
}
