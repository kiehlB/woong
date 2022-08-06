import type { NextPage } from 'next';
import PageTemplate from '../../components/base/PageTemplate';
import { Button, LinkButton } from '../../components/common/Button';
import PostCard from '../../components/common/PostCard';
import PostTitle from '../../components/common/PostTitle';
import Main from '../../components/main';
import TagItem from '../../components/tags/TagItem';
import Bicycle from '../../static/svg/bicycle';
import Swing from '../../static/svg/swing';

const Home: NextPage = () => {
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

        <div className="grid  grid-cols-2 gap-8 bg-[#FAFAFA] items-center py-4  ">
          <div className="col-span-1    py-8 pl-[2.5rem] ">
            <div className="font-medium font-Roboto leading-10 text-[2.5rem]">
              Earn crypto by learning about blockchain
            </div>
            <div className="text-[1.25rem] leading-7 mt-4 ">
              Build your blockchain knowledge, complete quizzes, and earn free crypto.
            </div>
            <Button size="medium" variant="secondary" className="mt-10">
              Get Start
            </Button>
          </div>
          <div className="col-span-1 z-10 ">
            <Swing />
          </div>
        </div>

        <div className="grid  grid-cols-2 gap-8 bg-[#FAFAFA] items-center py-4  ">
          <div className="col-span-1    py-8 pl-[2.5rem] ">
            <div className="font-medium font-Roboto leading-10 text-[2.5rem]">
              Earn crypto by learning about blockchain
            </div>
            <div className="text-[1.25rem] leading-7 mt-4 ">
              Build your blockchain knowledge, complete quizzes, and earn free crypto.
            </div>
            <Button size="medium" variant="secondary" className="mt-10">
              Get Start
            </Button>
          </div>
          <div className="col-span-1 z-10 ">
            <Bicycle />
          </div>
        </div>
      </div>

      <div className="bg-[#14151A]">
        <div className="w-[71rem] mx-auto  mxl:w-[80%]">
          <div className="text-white">Topics : </div>
          <div className="text-[#aeb4bc] flex flex-1 flex-wrap  gap-4">
            <TagItem />
          </div>
          <div>Difficulty:</div>
          <div className="grid grid-cols-4">
            <div className="col-span-3">
              <div
                className="grid"
                style={{
                  gridTemplateColumns: 'minmax(auto,368px) 1fr',
                }}>
                <img className="hello" />
                <div className="flex border-2 ">
                  <div>What Is SKALE (SKL)?</div>
                  <div>Jul 7, 2022 5m</div>
                  <div>Intermediate</div>
                </div>
              </div>
            </div>
            <div className="col-span-1 border-2">
              <img src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/53d32e7fc0944c3e899d0315866d67b6.png" />
            </div>
            <div className="col-span-1">d</div>
            <div className="col-span-3">
              <div
                className="grid"
                style={{
                  gridTemplateColumns: 'minmax(auto,368px) 1fr',
                }}>
                <img className="hello" />
              </div>
            </div>
            <div className="col-span-2">
              <div
                className="grid border-2"
                style={{
                  gridTemplateColumns: 'minmax(auto,176px) 1fr',
                }}>
                <img src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/53d32e7fc0944c3e899d0315866d67b6.png" />
              </div>
            </div>
            <div className="grid border-">
              <div
                className="grid border-2"
                style={{
                  gridTemplateColumns: 'minmax(auto,176px) 1fr',
                }}>
                <img src="https://public.bnbstatic.com/static/academy/uploads-thumbnails/53d32e7fc0944c3e899d0315866d67b6.png" />
              </div>
            </div>
          </div>
        </div>
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
