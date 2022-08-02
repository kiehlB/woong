import type { NextPage } from 'next';
import PageTemplate from '../../components/base/PageTemplate';
import Button from '../../components/common/Button';
import PostCard from '../../components/common/PostCard';
import PostTitle from '../../components/common/PostTitle';
import Main from '../../components/main';
import Bicycle from '../../static/svg/bicycle';
import Swing from '../../static/svg/swing';

export function getSocialMetas({
  url,
  title = 'Helping people make the world a better place through quality software',
  description = 'Make the world better with software',
}: {
  url?: string;
  title?: string;
  description?: string;
}) {
  return {
    title,
    description,
  };
}

const b = () => {
  return {
    ...(getSocialMetas({
      url: 'hello',
      title: 'a',
      description: 'd',
    }) as any),
  };
};

const Home: NextPage = () => {
  console.log(b);

  const a = [
    {
      id: 1,
      title: 'What Is PAX Gold (PAXG)?',
    },
    {
      id: 2,
      title: '1',
    },
    { id: 3, title: '1' },
    {
      id: 4,
      title: '1',
    },
    { id: 5, title: '1' },
    { id: 6, title: '1' },
    { id: 7, title: '1' },
    { id: 8, title: '1' },
    { id: 9, title: '1' },
  ];

  return (
    <PageTemplate>
      <Main />
      <div className="w-[71rem] mx-auto  mxl:w-[80%]">
        <div className="py-[3.5rem]">
          <PostTitle title="Latest Releases" subtitle="SEE ALL LATEST RELEASES  " />
          <div className="grid grid-cols-3 auto-rows-auto gap-6 mxl:grid-cols-2">
            {a?.map(e => (
              <div data-aos="fade-down" className=" shadow-lg rounded-xl">
                <PostCard article={e} />
              </div>
            ))}
          </div>
        </div>

        <div className="border-2 grid  grid-cols-2 gap-8">
          <div className="border-2 border-red-500 ">
            <div>Earn crypto by learning about blockchain</div>
            <div>
              Build your blockchain knowledge, complete quizzes, and earn free crypto.
            </div>
            <Button size="large">Get Start</Button>
          </div>
          <Swing />
        </div>
      </div>

      <Bicycle />

      <div className="bg-[#14151A]">
        <div className="text-white">Topics : </div>
        <div className="text-[#aeb4bc]"> {a?.map(e => e.title)}</div>
        <div>Difficulty:</div>
        <div> {a?.map(e => e.title)}</div>
      </div>
    </PageTemplate>
  );
};

export default Home;

{
  /* <div>
<div className="bats">
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
  <div className="bat">
    <div className="bat__head">
      <div className="bat__eye" />
      <div className="bat__eye" />
    </div>
    <div className="bat__wing" />
    <div className="bat__wing" />
  </div>
</div>
</div> */
}

{
  /* <ListTrail
              css="grid grid-cols-3 auto-rows-auto gap-6 mxl:grid-cols-2 "
              length={a.length}
              options={{
                opacity: 1,
                x: 0,
                from: { opacity: 0, x: -20 },
              }}
              renderItem={index => {
                const article = a[index];
                return (
                  <Link
                    href={`/article/[id]`}
                    as={`/article/${article.id}`}
                    scroll={false}>
                    <Section>
                      <div className="border-2 rounded-2xl">
                        <img src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/76b56862bbb4490d84dc71f32f909174.png" />
                        {article.title}
                      </div>
                    </Section>
                  </Link>
                );
              }}
            /> */
}