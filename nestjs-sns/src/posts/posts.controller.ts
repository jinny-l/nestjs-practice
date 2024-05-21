import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: '뉴진스',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 0,
    commentCount: 0,
  },
  {
    id: 2,
    author: '뉴진스',
    title: '뉴진스 해린',
    content: '메이크업 고치고 있는 해린',
    likeCount: 0,
    commentCount: 0,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === parseInt(id));

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post = {
      id: posts[posts.length - 1].id + 1,
      author: author,
      title: title,
      content: content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  @Patch(':id')
  putPost(
    @Param('id', ParseIntPipe) id: number,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    const post = posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => (prevPost.id === id ? post : prevPost));
  }

  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    posts = posts.filter((post) => post.id !== id);

    return id;
  }
}
