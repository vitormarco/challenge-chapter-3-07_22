import { ReactNode } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: Array<{
      heading: string;
      body: Array<{
        text: string;
      }>;
    }>;
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): ReactNode {
  return <h1>{post.first_publication_date}</h1>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient({});
  // const posts = await prismic.getByType(TODO);

  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const prismic = getPrismicClient({});
  // const response = await prismic.getByUID(params);

  return {
    props: {
      post: {
        first_publication_date: 'hello',
      },
    },
  };
};
