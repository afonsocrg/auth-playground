import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { createCors, withCookies } from "itty-router";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";
import { Login } from "endpoints/login";
import { Logout } from "endpoints/logout";
import { Register } from "endpoints/register";
import { Refresh } from "endpoints/refresh";
import { ACCESS_REFRESH_ENDPOINT, authenticateUser } from "auth";

export const router = OpenAPIRouter({
  docs_url: "/docs",
});
const { preflight, corsify } = createCors({
  // origins: ["http://localhost:5173"],
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // headers: "",
});

// checks preflight
router.all("*", preflight);

// automatically parses request cookies into request.cookies
router.all("*", withCookies);


router.post("/auth/register", Register);
router.post("/auth/login", Login);
router.get(ACCESS_REFRESH_ENDPOINT, Refresh);
router.all("*", authenticateUser);
// Logout must be authenticated!!
router.post("/auth/logout", Logout);

// Authenticated routes
router.get("/api/tasks/", TaskList);
router.post("/api/tasks/", TaskCreate);
router.get("/api/tasks/:taskSlug/", TaskFetch);
router.delete("/api/tasks/:taskSlug/", TaskDelete);

// 404 for everything else
router.all("*", () =>
  Response.json(
    {
      success: false,
      error: "Route not found",
    },
    { status: 404 }
  )
);

export default {
  fetch: async (request, env, ctx) => {
    return router.handle(request, env, ctx);
  },
};
