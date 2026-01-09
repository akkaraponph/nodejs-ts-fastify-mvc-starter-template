import { FastifyInstance } from "fastify";
import { verifyToken } from "./auth.middleware";

export const protectedRoutes = async (
  app: FastifyInstance,
  routesToProtect: any
) => {
  app.addHook("onRequest", async (request, reply) => {
    try {
      // Get the URL path without query string
      const urlPath = request.url.split('?')[0];
      
      // Check if the exact path matches
      if (routesToProtect[urlPath]) {
        await verifyToken(request);
        return;
      }
      
      // Check if any route pattern matches (for routes with parameters like :id)
      for (const routePattern in routesToProtect) {
        if (routesToProtect[routePattern]) {
          // Convert route pattern to regex (e.g., "/api/articles/update/:id" -> "/api/articles/update/[^/]+")
          const patternRegex = new RegExp('^' + routePattern.replace(/:[^/]+/g, '[^/]+') + '$');
          if (patternRegex.test(urlPath)) {
            await verifyToken(request);
            return;
          }
        }
      }
    } catch (error) {
      reply.send(error);
    }
  });
};

export default { protectedRoutes };
