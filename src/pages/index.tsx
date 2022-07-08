import { GetStaticProps } from 'next';
import Link from 'next/link';

import { getPrismicClient } from '../services/prismic';

import { FaUser, FaCalendar } from 'react-icons/fa';

import Header from 'src/components/Header';
import { Main } from 'src/template/Main';

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

export default function Home({ postsPagination }: HomeProps) {
  console.log(postsPagination);

  return (
    <>
      <div className={commonStyles.container}>
        <Header />
      </div>
      <Main>
        <ul>
          <li>
            <Link href="#">
              <a>
                <h2>Criando um app CRA do zero</h2>
                <p>
                  Tudo sobre como criar a sua primeira aplicação utilizando
                  Create React App
                </p>
                <div>
                  <div>
                    <FaCalendar size={20} />
                    <time>19 Abr 2021</time>
                  </div>
                  <div>
                    <FaUser size={20} />
                    <span>Danilo Vieira</span>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        </ul>
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', {
    pageSize: 1,
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
