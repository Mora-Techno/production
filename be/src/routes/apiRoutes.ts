import Elysia from "elysia";
import todoRoutes from "./todoRoutes";
import noteRoutes from "./noteRoutes";
import calendarRoutes from "./calendarRoutes";
import musicRoutes from "./musicRoutes";
import notificationRoutes from "./notificationRoutes";
import settingsRoutes from "./settingsRoutes";

const apiRoutes = new Elysia({ prefix: "/api" })
  .use(todoRoutes)
  .use(noteRoutes)
  .use(calendarRoutes)
  .use(musicRoutes)
  .use(notificationRoutes)
  .use(settingsRoutes);

export default apiRoutes;
