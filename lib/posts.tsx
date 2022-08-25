import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
// eslint-disable-next-line import/no-namespace
import * as remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(): {
  date: string;
  title: string;
  id: string;
}[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/u, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,

      ...(matterResult.data as {
        date: string;
        title: string;
      }),
    };
  });

  // Sort posts by date
  return allPostsData.sort((abc, bdev) => {
    if (abc.date < bdev.date) {
      return 1;
    }

    return -1;
  });
}

export function getAllPostIds(): {
  params: {
    id: string;
  };
}[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/u, ''),
    },
  }));
}

export async function getPostData(id: string): Promise<any> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,

    ...(matterResult.data as {
      date: string;
      title: string;
    }),
  };
}
