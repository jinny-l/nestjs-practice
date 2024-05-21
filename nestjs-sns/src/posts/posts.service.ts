import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
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

@Injectable()
export class PostsService {
  getAllPosts() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  createPost(author: string, title: string, content: string) {
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

  updatePost(id: number, author: string, title: string, content: string) {
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

    return post;
  }

  deletePost(id: number) {
    posts = posts.filter((post) => post.id !== id);

    return id;
  }
}
