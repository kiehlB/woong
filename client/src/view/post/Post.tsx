import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRef, useState, useEffect, useCallback } from 'react';
import {
  AnimatePresence,
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
  useIsPresent,
} from 'framer-motion';
import PageTemplate from '../../components/base/PageTemplate';
import useGetPost from './hooks/useGetPost';
import HeaderTopicItem from '../../components/base/HeaderTopicItem';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { getScrollTop } from '../../lib/utils';
import useGetComments from '../../components/comment/hooks/useGetComments';
import Comments from '../../components/comment/Comments';
import CommentForm from '../../components/comment/CommentForm';
import useCreateComment from '../../components/comment/hooks/useCreateComment';
import useGetUser from '../../components/auth/hooks/useWhoAmI';
import { toast, ToastContainer } from 'react-nextjs-toast';
import { useRouter } from 'next/router';
import useDeleteComment from '../../components/comment/hooks/useDeleteComment';
import useEditComment from '../../components/comment/hooks/useEditComment';
import useGetTags from '../../components/tags/hooks/usegetTags';
import { DateTime } from 'luxon';
import { Button } from '../../components/common/Button';
import Dot from '../../components/common/TagsDot';
import usePostLike from '../../components/post/hooks/usePostLike';
import usePostUnLike from '../../components/post/hooks/usePostUnlike';
import SubComments from '../../components/comment/SubComments';
import SubCommentsForm from '../../components/comment/SubCommentsForm';
import useIsPostLike from '../../components/post/hooks/isPostLike';

const canvasStyles = {
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

function Realistic({ UnlikehandleSubmit, LikehandleSubmit, isLikeBoolean }) {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  return (
    <>
      {/* @ts-ignore */}
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />

      {isLikeBoolean ? (
        <button onClick={UnlikehandleSubmit} className="flex justify-center">
          <span className="w-[100px] shadow-xl bg-[#fcd535] p-6 shadow-slate-100 text-[1.5rem] rounded-full flex justify-center items-center">
            🎉
          </span>
        </button>
      ) : (
        <button
          onClick={e => {
            fire();
            LikehandleSubmit(e);
          }}
          className="flex justify-center">
          <span className="w-[100px] shadow-xl bg-[#fcd535] p-6 shadow-slate-100 text-[1.5rem] rounded-full flex justify-center items-center">
            🎉
          </span>
        </button>
      )}
    </>
  );
}

export type PostProps = {};

function Post({}: PostProps) {
  const scrollTop = getScrollTop();
  const [isComplete, setIsComplete] = useState(false);
  const { commentsLoading, commentsError, commentstData } = useGetComments();
  const {
    textOnChange,
    subTextOnChange,
    handleSubmit,
    subHandleSubmit,
    getText,
    getSubText,
    isOpen,
    setIsopen,
  } = useCreateComment();
  const router = useRouter();
  const [editComment, setEditComment] = useState(false);
  const { DeleteCommentSubmit } = useDeleteComment();
  const { EditCommentSubmit } = useEditComment();
  const [editText, setEditText] = useState('');
  const [subEditText, subSetEditText] = useState('');

  const { getUser: userData, loading: userLoding } = useGetUser();

  const { LikehandleSubmit, isLikeBoolean } = usePostLike();
  const { UnlikehandleSubmit, isUnLikeBoolean } = usePostUnLike();
  const { dataGetPost } = useIsPostLike();

  const getCcrollTop = getScrollTop();

  console.log(getCcrollTop);
  const editSubCommentInput = e => {
    subSetEditText(e.target.value);
  };

  const {
    loading: getTagsLoading,
    error: getTagsError,
    data: getTagsData,
  } = useGetTags();

  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  const IsTop = scrollTop == 0 ? true : false;

  useEffect(() => yRange.onChange(v => setIsComplete(v >= 1)), [yRange]);

  const { singlePostLoding, singlePostError, singlePostData } = useGetPost();
  /// fixed mt-[10%] bg-[#404663] shadow-lg p-6 text-[1.5rem] rounded-full flex justify-center items-center

  const [on, toggle] = useState(false);

  const findData = singlePostData?.findSinglePost;
  const findId = singlePostData?.findSinglePost?.id;

  const getComments = commentstData?.findAllComments.filter(
    el => el.post_id == router.query.id,
  );

  const editCommentInput = e => {
    setEditText(e.target.value);
  };

  const onClickNotify = e => {
    e.preventDefault();
    toast.notify(`로그인이 필요합니다`, {
      duration: 2,
      type: 'error',
    });
  };
  const onClickNotifyCheckString = e => {
    e.preventDefault();
    toast.notify(`댓글이 없습니다`, {
      duration: 2,
      type: 'error',
    });
  };

  const fixComment = () => {
    setEditComment(!editComment);
  };

  return (
    <PageTemplate tag={getTagsData} loading={!getTagsData || getTagsLoading}>
      <div className="flex h-full">
        <div className="flex justify-center w-[30%] h-full">
          <div className="w-full">
            <div className="fixed flex flex-col w-[30%] h-[40%]">
              <Realistic
                isLikeBoolean={dataGetPost?.isPostLike}
                LikehandleSubmit={LikehandleSubmit}
                UnlikehandleSubmit={UnlikehandleSubmit}
              />
              <div className="mt-2 text-center">0</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[40%] mx-auto justify-center mt-4">
          <div className="flex w-full mb-8">
            {singlePostData?.findSinglePost?.posts_tags?.map(e => (
              <HeaderTopicItem
                name={e.tag.name_filtered}
                size="small"
                key={e.id}
                disable={true}
              />
            ))}
          </div>

          <img src={singlePostData?.findSinglePost?.thumbnail} alt="thumbnail" />

          <div className="text-[#474D57]  text-[1.25rem] mt-6 mb-8">
            {`Home >  Articles >`}
            {singlePostData?.findSinglePost?.title}
          </div>
          <h1 className="text-5xl text-[#14151A] font-medium font-Roboto tracking-normal mb-4">
            {singlePostData?.findSinglePost?.title}
          </h1>

          <div className="flex items-center">
            <Button
              size="small"
              difficulty={singlePostData?.findSinglePost?.difficulty}
              className="h-9 flex justify-center items-center rounded-lg text-[#474D57]">
              <Dot css={singlePostData?.findSinglePost.difficulty} />
              {singlePostData?.findSinglePost.difficulty}
            </Button>
            <div className="text-[#76808F] ml-4 font-medium font-Roboto">
              {DateTime.fromISO(singlePostData?.findSinglePost?.created_at)
                .toLocaleString()
                .slice(0, -1)}
            </div>
          </div>
          <div
            className="pt-14"
            dangerouslySetInnerHTML={{ __html: singlePostData?.findSinglePost?.body }}
          />
        </div>
        <div className="flex justify-center w-[30%]">
          <div className="fixed mt-[10%]">{/* <Face /> */}</div>
        </div>
      </div>

      <div className="w-[40%] mx-auto mt-24 mb-12">
        <CommentForm
          findId={findId}
          handleSubmit={handleSubmit}
          getText={getText}
          textOnChange={textOnChange}
          userData={userData}
          onClickNotify={onClickNotify}
          onClickNotifyCheckString={onClickNotifyCheckString}
        />

        {!commentsLoading &&
          getComments.map((el, id) => (
            <>
              <div key={id}>
                <Comments
                  el={el}
                  editComment={editComment}
                  editText={editText}
                  editCommentInput={editCommentInput}
                  toggle={toggle}
                  on={on}
                  EditCommentSubmit={EditCommentSubmit}
                  fixComment={fixComment}
                  DeleteCommentSubmit={DeleteCommentSubmit}
                  setIsopen={setIsopen}
                  userData={userData}
                  onClickNotifyCheckString={onClickNotifyCheckString}
                />
              </div>

              {el.id == isOpen && on ? (
                <>
                  <SubCommentsForm
                    userData={userData}
                    subHandleSubmit={subHandleSubmit}
                    findData={findData}
                    onClickNotify={onClickNotify}
                    isOpen={isOpen}
                    on={on}
                    toggle={toggle}
                    onClickNotifyCheckString={onClickNotifyCheckString}
                  />
                </>
              ) : (
                ''
              )}
              {getComments.map((ele, id) => (
                <>
                  <SubComments
                    ele={ele}
                    el={el}
                    subEditText={subEditText}
                    editSubCommentInput={editSubCommentInput}
                    EditCommentSubmit={EditCommentSubmit}
                    DeleteCommentSubmit={DeleteCommentSubmit}
                    userData={userData}
                    findData={findData}
                    onClickNotifyCheckString={onClickNotifyCheckString}
                  />
                </>
              ))}
            </>
          ))}
      </div>
      {getCcrollTop > 0 ? (
        <div className="z-[100] h-full">
          <AnimatePresence initial={false}>
            <svg className="progress-icon" viewBox="0 0 60 60">
              <motion.path
                fill="none"
                strokeWidth="5"
                stroke="blue"
                initial={{ opacity: 0 }}
                strokeDasharray="0 1"
                d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                animate={{ opacity: 1 }}
                style={{
                  pathLength,
                  rotate: 90,
                  translateX: 3,
                  translateY: 3,
                  scaleX: -1, // Reverse direction of line animation
                }}
              />
              <motion.path
                fill="none"
                strokeWidth="5"
                stroke="black"
                d="M14,26 L 22,33 L 35,16"
                initial={{ opacity: 0 }}
                strokeDasharray="0 1"
                animate={{ pathLength: isComplete ? 1 : 0 }}
              />
            </svg>
          </AnimatePresence>
        </div>
      ) : (
        ''
      )}

      {/* <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style> */}
    </PageTemplate>
  );
}

export default Post;
