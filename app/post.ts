import path from "path";
import fs from "fs/promises";
import fm from "front-matter";
import { fileURLToPath } from "url";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export type Posts = {
  id: number;
  title: string;
  slug: string;
};

export type PostAttributes = {
  title: string;
};

type PostMarkDown = {
    attributes: PostAttributes ,
    body: string
}

const postsPath = path.join(__dirname, "..", "posts");
console.log(postsPath);

export const getPosts = async () => {
  const files = await fs.readdir(postsPath);

  return Promise.all(
    files.map(async (filename) => {
      const files = await fs.readFile(path.join(postsPath, filename), "utf8");
      const { attributes }: { attributes: PostAttributes } = fm(
        files.toString()
      );
      return {
        slug: filename.replace(".md", ""),
        title: attributes.title,
      };
    })
  );
};

export const getPost = async (slug: string) => {
  const files = await fs.readFile(path.join(postsPath, `${slug}.md`), "utf8");
  const { attributes, body } : PostMarkDown = fm(files.toString());
  return {
    slug,
    title: attributes.title,
    body: marked(body),
  };
};
