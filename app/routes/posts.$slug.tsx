import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { getPost } from "~/post";

export const loader: LoaderFunction = ({ params }) => {
  const { slug = "" } = params;
  const post = getPost(slug);
  return post;
};

export default function PostSlug() {
  const post: any = useLoaderData();
  return (
    <>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post.body}} />
    </>
  );
}
