import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/post";
import type { Posts } from "~/post";

export function loader() {
  return getPosts();
};

export default function Posts() {
  const posts = useLoaderData<Posts[]>();
  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => {
        return (
          <div key={post.id}>
            <Link to={`/posts/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
