import { Elysia, t } from 'elysia';
import { getPosts, CreatePost } from '../controllers/PostController';

class PostRouter {
  public postRouter;

  constructor() {
    this.postRouter = new Elysia({ prefix: '/posts' });
    this.routes();
  }

  private routes() {
    this.postRouter.get('/', () => getPosts());
    this.postRouter.post('/', async ({ body }) => await CreatePost(body), {
      body: t.Object({
        title: t.String({ minLength: 4, maxLength: 100 }),
        content: t.String({ minLength: 4, maxLength: 100 }),
      }),
    });
  }
}

export default new PostRouter().postRouter;
