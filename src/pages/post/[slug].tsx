/* eslint-disable react/no-danger */
import { ReactNode } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { RichText } from 'prismic-dom';
import { asImageSrc } from '@prismicio/helpers';
import { FiUser, FiCalendar, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Header from '../../components/Header';
import { Main } from '../../template/Main';

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
  const router = useRouter();
  const totalWordsToRead = post.data.content.reduce((sum, contentBody) => {
    const words = RichText.asText(contentBody.body);
    const wordsQuantity = words.split(/[^A-Za-z0-9]+/g);

    return sum + wordsQuantity.length;
  }, 0);
  const timeToRead = Math.round(totalWordsToRead / 200);
  const publicationDate = format(
    new Date(post.first_publication_date),
    'dd LLL yyyy',
    {
      locale: ptBr,
    }
  );

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={commonStyles.container}>
          <Header />
        </div>
      </div>
      <Image
        src={post.data.banner.url}
        layout="responsive"
        width={1440}
        height={400}
      />
      <Main>
        <header className={styles.headerContent}>
          <h1>{post.data.title}</h1>
          <ul className={styles.listInfo}>
            <li className={styles.listInfoItem}>
              <FiCalendar size={20} />
              <time>{publicationDate}</time>
            </li>
            <li className={styles.listInfoItem}>
              <FiUser size={20} />
              <span>{post.data.author}</span>
            </li>
            <li className={styles.listInfoItem}>
              <FiClock size={20} />
              <span>{timeToRead} min</span>
            </li>
          </ul>
        </header>
        {post.data.content.map(content => (
          <div key={`${content.heading}`} className={styles.content}>
            <h2>{content.heading}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: RichText.asHtml(content.body),
              }}
            />
          </div>
        ))}
      </Main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts', {
    pageSize: 4,
  });

  const paths = posts.results.map(post => ({
    params: { slug: post.uid },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug));

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: asImageSrc(response.data.banner),
      },
      author: response.data.author,
      content: response.data.content.map(cont => ({
        heading: cont.heading,
        body: cont.body,
      })),
    },
  };

  return {
    props: {
      post,
    },
  };
};
