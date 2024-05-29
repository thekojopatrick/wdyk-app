import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";

import type { Post } from "./types";
import { client } from "../common";

type Variables = { title: string; body: string; userId: number };
type Response = Post;

export const useAddPost = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: "posts/add",
      method: "POST",
      data: variables,
    }).then((response) => response.data),
});
