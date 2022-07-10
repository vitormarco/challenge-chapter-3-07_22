import { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { FiUser, FiCalendar } from 'react-icons/fi';

import { useState } from 'react';
import Header from '../components/Header';
import { Main } from '../template/Main';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): ReactElement {
  const [results, setResults] = useState(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  const handleFetchPosts = (nextPageToFetch: string): void => {
    fetch(nextPageToFetch)
      .then(res => res.json())
      .then(res => {
        setResults(oldState => [...oldState, ...res.results]);
        setNextPage(res.nex_page);
      });
  };

  return (
    <>
      <div className={commonStyles.container}>
        <Header />
      </div>
      <Main>
        <ul className={styles.list}>
          {results.map(post => (
            <li key={post.uid} className={styles.listItem}>
              <Link href={`/post/${post.uid}`}>
                <a>
                  <div className={styles.textContent}>
                    <h2>{post.data.title}</h2>
                    <p>{post.data.subtitle}</p>
                  </div>
                  <div className={styles.infoContent}>
                    <div>
                      <FiCalendar size={20} />

                      <time>
                        {format(
                          new Date(post.first_publication_date),
                          'dd LLL yyyy',
                          { locale: ptBr }
                        )}
                      </time>
                    </div>
                    <div>
                      <FiUser size={20} />
                      <span>{post.data.author}</span>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        {nextPage && (
          <button
            className={styles.button}
            type="button"
            onClick={() => handleFetchPosts(postsPagination.next_page)}
          >
            Carregar mais posts
          </button>
        )}
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', {
    pageSize: 20,
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: postsResponse.results.map(post => ({
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    })),
  };

  return {
    props: {
      postsPagination,
    },
    revalidate: 60 * 60 * 12, // 12 hours
  };
};
