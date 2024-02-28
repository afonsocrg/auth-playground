import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { withCookies } from "itty-router";
import { createCors } from "./utils/cors";
import { ACCESS_REFRESH_ENDPOINT, authenticateUser } from "auth";
import {
  CreateTodo,
  ListTodos,
  GetTodo,
  EditTodo,
  CompleteTodo,
  IncompleteTodo,
  DeleteTodo,
  Login,
  Logout,
  Register,
  Refresh,
  GetProfile,
  EditProfile,
  DeleteProfile,
} from "./endpoints";
import { debugResponse } from "utils/debug";

export const router = OpenAPIRouter({
  docs_url: "/docs",
});

const { preflight, corsify } = createCors({
  origins: [
    "http://localhost:5173",
    "https://auth-playground.afonsocrg.com",
    "https://auth-playground.pages.dev",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // It looks like the methods are not working...
  headers: {
    "Access-Control-Allow-Credentials": true,
  },
});

// checks preflight
router.all("*", preflight);

// automatically parses request cookies into request.cookies
router.all("*", withCookies);

router.post("/auth/register", Register);
router.post("/auth/login", Login);
router.get(ACCESS_REFRESH_ENDPOINT, Refresh);
// BELOW THIS LINE ALL ROUTES ARE AUTHENTICATED
router.all("*", authenticateUser);
router.post("/auth/logout", Logout);

router.post("/api/todos/", CreateTodo);
router.get("/api/todos/", ListTodos);
router.get("/api/todos/:id/", GetTodo);
router.delete("/api/todos/:id/", DeleteTodo);
router.put("/api/todos/:id", EditTodo);
router.post("/api/todos/:id/done", CompleteTodo);
router.delete("/api/todos/:id/done", IncompleteTodo);

router.get("/api/profile", GetProfile);
router.put("/api/profile", EditProfile);
router.delete("/api/profile", DeleteProfile);

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
    return await router.handle(request, env, ctx).then(corsify);
  },
};
