import Elysia from 'elysia';
import authRoutes from './authRoutes';
import todoRoutes from './todoRoutes';
import noteRoutes from './noteRoutes';
import calendarRoutes from './calendarRoutes';
import musicRoutes from './musicRoutes';
import notificationRoutes from './notificationRoutes';
import companyRoutes from './companyRoutes';
import workstationRoutes from './workstationRoutes';
import subscriptionRoutes from './subscriptionRoutes';

class ApiRouter {
  public apiRouter;

  constructor() {
    this.apiRouter = new Elysia({ prefix: '/api' }).derive(() => ({
      json(data: any, status = 200) {
        return new Response(JSON.stringify(data), {
          status,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    }));
    this.routes();
  }

  private routes() {
    this.apiRouter
      .use(authRoutes)
      .use(companyRoutes)
      .use(workstationRoutes)
      .use(subscriptionRoutes)
      .use(todoRoutes)
      .use(noteRoutes)
      .use(calendarRoutes)
      .use(musicRoutes)
      .use(notificationRoutes);
  }
}

export default new ApiRouter().apiRouter;
