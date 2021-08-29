import { rest } from "msw";
import { setupServer } from "msw/node";
import NAMES from "../const/names";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const handlers = [
  /**
   * taskFolders mock
   */
  rest.get(BASE_URL + NAMES.V1 + "task-folders/", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "0449cb4a-bef4-403e-b366-ce103e420364",
          name: "project C",
          person: "2122ad68-20eb-4043-b139-53e7c3905176",
          task_count: 3,
          updated_at: "2021-04-30T11:54:33.538682+09:00",
          created_at: "2021-04-30T11:54:33.538497+09:00",
        },
        {
          id: "0449cb4a-bef4-403e-b366-ce103e402264",
          name: "project B",
          person: "2122ad68-20eb-4043-b139-53e7c3905176",
          task_count: 2,
          updated_at: "2021-04-30T11:54:33.538682+09:00",
          created_at: "2021-04-30T11:54:33.538497+09:00",
        },
        {
          id: "0449cb4a-bef4-403e-b366-ce103e414364",
          name: "project A",
          person: "2122ad68-20eb-4043-b139-53e7c3905176",
          task_count: 1,
          updated_at: "2021-04-30T11:54:33.538682+09:00",
          created_at: "2021-04-30T11:54:33.538497+09:00",
        },
      ])
    );
  }),
  rest.post(BASE_URL + NAMES.V1 + "task-folders/create/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{}]));
  }),
  rest.patch(BASE_URL + NAMES.V1 + "task-folders/edit/1/", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json([{}]));
  }),
  rest.delete(
    BASE_URL + NAMES.V1 + "task-folders/delete/1/",
    (req, res, ctx) => {
      return res(ctx.status(204), ctx.json([{}]));
    }
  ),
  rest.get(BASE_URL + NAMES.V1 + "task-folders/1/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{}]));
  }),

  /**
   * tasks mocks
   */
  rest.post(BASE_URL + NAMES.V1 + "tasks/create/", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json([{}]));
  }),
  rest.patch(BASE_URL + NAMES.V1 + "tasks/edit/1/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{}]));
  }),
  rest.delete(BASE_URL + NAMES.V1 + "tasks/delete/1/", (req, res, ctx) => {
    return res(ctx.status(204), ctx.json([{}]));
  }),
];
export default setupServer(...handlers);
