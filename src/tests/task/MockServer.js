import { rest } from "msw";
import { setupServer } from "msw/node";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const handlers = [
  /**
   * taskFolders mock
   */
  rest.get(BASE_URL + "task-folders/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{}]));
  }),
  rest.post(BASE_URL + "task-folders/create/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{}]));
  }),
  rest.patch(BASE_URL + "task-folders/edit/1/", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json([{}]));
  }),
  rest.delete(BASE_URL + "task-folders/delete/1/", (req, res, ctx) => {
    return res(ctx.status(204), ctx.json([{}]));
  }),
  rest.get(BASE_URL + "task-folders/1/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{}]));
  }),

  /**
   * tasks mocks
   */
  rest.post(BASE_URL, +"tasks/create/", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json([{}]));
  }),
  rest.patch(BASE_URL, +"tasks/edit/1/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{}]));
  }),
  rest.delete(BASE_URL, +"tasks/delete/1/", (req, res, ctx) => {
    return res(ctx.status(204), ctx.json([{}]));
  }),
];
export default setupServer(...handlers);
