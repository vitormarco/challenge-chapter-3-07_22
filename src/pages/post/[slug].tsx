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
  const tempoContent = {
    content: [
      {
        body: [
          {
            type: 'paragraph',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            spans: [],
          },
          {
            type: 'paragraph',
            text: 'Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.',
            spans: [],
          },
          {
            type: 'paragraph',
            text: 'Ut venenatis mauris vel libero pretium, et pretium ligula faucibus. Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam venenatis.',
            spans: [],
          },
        ],
        heading: 'Proin et varius',
      },
      {
        body: [
          {
            type: 'paragraph',
            text: 'Nulla auctor sit amet quam vitae commodo. Sed risus justo, vulputate quis neque eget, dictum sodales sem. In eget felis finibus, mattis magna a, efficitur ex. Curabitur vitae justo consequat sapien gravida auctor a non risus. Sed malesuada mauris nec orci congue, interdum efficitur urna dignissim. Vivamus cursus elit sem, vel facilisis nulla pretium consectetur. Nunc congue.',
            spans: [
              {
                start: 27,
                end: 32,
                type: 'em',
              },
              {
                start: 365,
                end: 376,
                type: 'strong',
              },
            ],
          },
          {
            type: 'paragraph',
            text: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam consectetur massa nec metus condimentum, sed tincidunt enim tincidunt. Vestibulum fringilla risus sit amet massa suscipit eleifend. Duis eget metus cursus, suscipit ante ac, iaculis est. Donec accumsan enim sit amet lorem placerat, eu dapibus ex porta. Etiam a est in leo pulvinar auctor. Praesent sed vestibulum elit, consectetur egestas libero.',
            spans: [],
          },
          {
            type: 'paragraph',
            text: 'Ut varius quis velit sed cursus. Nunc libero ante, hendrerit eget consectetur vel, viverra quis lectus. Sed vulputate id quam nec tristique. Etiam lorem purus, imperdiet et porta in, placerat non turpis. Cras pharetra nibh eu libero ullamcorper, at convallis orci egestas. Fusce ut est tellus. Donec ac consectetur magna, nec facilisis enim. Sed vel tortor consectetur, facilisis felis non, accumsan risus. Integer vel nibh et turpis.',
            spans: [
              {
                start: 141,
                end: 158,
                type: 'hyperlink',
                data: {
                  link_type: 'Media',
                  name: 'christopher-gower-m_HRfLhgABo-unsplash.jpg',
                  kind: 'image',
                  url: 'https://images.prismic.io/criando-projeto-do-zero/95494d57-eee2-4adb-9883-befa9829abca_christopher-gower-m_HRfLhgABo-unsplash.jpg?auto=compress,format',
                  size: '876817',
                  height: '2584',
                  width: '3882',
                },
              },
            ],
          },
          {
            type: 'paragraph',
            text: 'Nam eu sollicitudin neque, vel blandit dui. Aliquam luctus aliquet ligula, sed:',
            spans: [],
          },
          {
            type: 'list-item',
            text: 'Suspendisse ac facilisis leo. Sed nulla odio, aliquam ut lobortis vitae, viverra quis risus. Vivamus pulvinar enim sit amet elit porttitor bibendum. Nulla facilisi. Aliquam libero libero, porta ac justo vitae, dapibus convallis sapien. Praesent a nibh pretium, ultrices urna eget, vulputate felis. Phasellus ac sagittis ipsum, a congue lectus. Integer interdum ut velit vehicula volutpat. Nulla facilisi. Nulla rhoncus metus lorem, sit amet facilisis ipsum faucibus et. Lorem ipsum.',
            spans: [],
          },
          {
            type: 'list-item',
            text: 'Curabitur a rutrum ante. Praesent in justo sagittis, dignissim quam facilisis, faucibus dolor. Vivamus sapien diam, faucibus sed sodales sed, tincidunt quis sem. Donec tempus ipsum massa, ut fermentum ante molestie consectetur. In hac habitasse platea dictumst. Sed non finibus nibh, vitae dapibus arcu. Sed lorem magna, imperdiet non pellentesque et, rhoncus ac enim. Class aptent taciti sociosqu ad litora torquent per conubia.',
            spans: [],
          },
          {
            type: 'paragraph',
            text: 'Praesent ac sapien eros. Suspendisse potenti. Morbi eu ante nibh. Proin dictum, tellus ut molestie tincidunt, urna tortor sodales velit, ut tempor lectus ipsum nec sapien. Nulla nec purus vitae libero aliquet posuere non et sapien. Cras in erat rhoncus, dignissim ligula iaculis, faucibus orci. Donec ligula neque, imperdiet vitae mauris eget, egestas varius massa. Praesent ornare nisi at dui dapibus, ac tristique felis.',
            spans: [],
          },
          {
            type: 'paragraph',
            text: 'Phasellus maximus urna lacus, non imperdiet ex blandit sit amet. Vivamus et tellus est. Mauris ligula elit, placerat non tellus a, dictum porttitor urna. Phasellus mollis turpis id suscipit dapibus. In dolor.',
            spans: [],
          },
          {
            type: 'paragraph',
            text: 'Sed sit amet euismod sapien, non eleifend erat. Vivamus et quam odio. Integer nisi lacus, maximus sit amet turpis in, luctus molestie sem. Duis sit amet euismod erat. Fusce pulvinar ex neque, egestas cursus nulla ullamcorper vel. Pellentesque mollis erat egestas est rhoncus, sit amet sodales massa ullamcorper. Etiam auctor ante a neque facilisis tristique. Proin ultricies fringilla turpis, eget tempus elit imperdiet non. Quisque.',
            spans: [],
          },
          {
            type: 'paragraph',
            text: 'Etiam eu tortor placerat, varius orci non, ornare nunc. Cras suscipit in ligula ultricies lacinia. Pellentesque at tristique sapien, et scelerisque leo. Donec eu nisi at magna tristique luctus vel at turpis. Nam vestibulum ornare ex cursus vulputate. In elementum tellus at sapien bibendum, id maximus mauris convallis. Donec facilisis porta lobortis. Vivamus mauris diam, pretium ac dolor.',
            spans: [],
          },
          {
            type: 'paragraph',
            text: 'Pellentesque et consequat arcu, ac laoreet ante. Nam non.',
            spans: [
              {
                start: 49,
                end: 56,
                type: 'strong',
              },
            ],
          },
        ],
        heading: 'Cras laoreet mi',
      },
    ],
  };
  const timeToRead = tempoContent.content.reduce((sum, contentBody) => {
    const words = RichText.asText(contentBody.body);
    const wordsQuantity = words.split(/[^A-Za-z0-9]+/g);

    return sum + wordsQuantity.length;
  }, 0);

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
        <header>
          <h1>{post.data.title}</h1>
          <ul>
            <li>
              <FiCalendar size={20} />
              <time>
                {format(new Date(post.first_publication_date), 'dd LLL yyyy', {
                  locale: ptBr,
                })}
              </time>
            </li>
            <li>
              <FiUser size={20} />
              <span>{post.data.author}</span>
            </li>
            <li>
              <FiClock size={20} />
              <span>{Math.round(timeToRead / 150)} min</span>
            </li>
          </ul>
        </header>
        {post.data.content.map(content => (
          <div key={`${content.heading}`}>
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
