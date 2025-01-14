import { Suspense } from "react";

import { api } from "~/trpc/server";
import { AuthShowcase } from "../_components/auth-showcase";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "../_components/posts";

//export const runtime = "edge";

export default function FeedPage() {
  // You can await this here if you don't want to show Suspense fallback below
  const posts = api.post.all();

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Feed
        </h1>
        <AuthShowcase />
        <CreatePostForm />
        <div className="w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }
          >
            <PostList posts={posts} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
