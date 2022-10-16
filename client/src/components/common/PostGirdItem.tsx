import * as React from 'react';
import { motion } from 'framer-motion';
import Dot from './TagsDot';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import RatioImage from './RatioImage';

function BigPostGridItem({ thumbnail, title, createAt, difficulty }) {
  return (
    <div className="col-span-3 mxl:col-span-4 auto-rows-fr">
      <PostGridStyled className="grid bg-[#2b2f36] rounded-lg h-full">
        {thumbnail ? (
          <RatioImage
            widthRatio={1.916}
            heightRatio={1.2}
            src={thumbnail}
            className="w-full object-cover rounded-xl h-full"
          />
        ) : (
          <RatioImage
            widthRatio={1.916}
            heightRatio={1.2}
            src="img/noImg.jpg"
            className="w-full object-cover rounded-xl h-full"
          />
        )}

        <div className="flex text-white bg-[#2b2f36] flex-col justify-center px-4 rounded-lg mmd:py-8">
          <div className="text-[2rem] leading-10 font-semibold  break-all line-clamp-3">
            {title}
          </div>
          <div className="text-[#F0B90B] font-normal mt-2 mb-4 text-[1.25rem]">
            {DateTime.fromISO(createAt).toLocaleString().slice(0, -1)}
          </div>
          <div className="flex items-center">
            <Dot css={difficulty} /> {difficulty}
          </div>
        </div>
      </PostGridStyled>
    </div>
  );
}

function SecondBigPostGridItem({ thumbnail, title, createAt, difficulty }) {
  return (
    <div className="col-span-3 mxl:col-span-4">
      <PostGridStyled className="grid bg-[#2b2f36] rounded-lg h-full">
        <div className="flex text-white bg-[#2b2f36] flex-col justify-center px-4 rounded-lg mmd:py-8">
          <div className="text-[2rem] leading-10 font-semibold  break-all line-clamp-3">
            {title}
          </div>
          <div className="text-[#F0B90B] font-normal mt-2 mb-4 text-[1.25rem]">
            {DateTime.fromISO(createAt).toLocaleString().slice(0, -1)}
          </div>
          <div className="flex items-center">
            <Dot css={difficulty} /> {difficulty}
          </div>
        </div>

        {thumbnail ? (
          <RatioImage
            widthRatio={1.916}
            heightRatio={1.2}
            src={thumbnail}
            className="w-full object-cover rounded-xl h-full"
          />
        ) : (
          <RatioImage
            widthRatio={1.916}
            heightRatio={1.2}
            src="img/noImg.jpg"
            className="w-full object-cover rounded-xl h-full"
          />
        )}
      </PostGridStyled>
    </div>
  );
}

function MediumPostGridItem({ thumbnail, title, createAt, difficulty }) {
  return (
    <div className="col-span-1 rounded-lg bg-[#2b2f36] relative mxl:col-span-2 mmd:col-span-4">
      {thumbnail ? (
        <RatioImage
          widthRatio={1.916}
          heightRatio={1.2}
          src={thumbnail}
          className=" w-full object-cover rounded-xl"
        />
      ) : (
        <RatioImage
          widthRatio={1.916}
          heightRatio={1.2}
          src="img/noImg.jpg"
          className="w-full object-cover rounded-xl"
        />
      )}

      <div className="text-[#fff] px-4 pt-2 break-all py-24">
        <div className=" text-[1.3rem] leading-8 font-semibold break-all line-clamp-2 mmd:text-[2rem]">
          {title}
        </div>
      </div>
      <div className="absolute bottom-0 p-4">
        <div className="text-[#F0B90B] font-normal mt-2 mb-2 text-[1rem] mmd:text-[1.25rem]">
          {DateTime.fromISO(createAt).toLocaleString().slice(0, -1)}
        </div>
        <div className="text-[#fff] flex items-center text-sm">
          <Dot css={difficulty} /> {difficulty}
        </div>
      </div>
    </div>
  );
}

function SmallPostGridItem({ thumbnail, title, createAt, difficulty }) {
  return (
    <div className="col-span-2 mxl:col-span-4">
      <div className="grid bg-[#2b2f36] rounded-lg">
        <PostSmallGridStyled className="grid">
          {thumbnail ? (
            <img
              src={thumbnail}
              className=" w-full object-cover min-h-[6.1875rem] rounded-lg"
            />
          ) : (
            <img
              src="img/noImg.jpg"
              className="w-full object-cover min-h-[6.1875rem] rounded-lg"
            />
          )}

          <div className="text-white flex items-center px-4 text-[1.3rem] font-semibold">
            <div className="text-[1.3rem] leading-8 font-semibold break-all line-clamp-1 mmd:py-8">
              {title}
            </div>
          </div>
        </PostSmallGridStyled>
      </div>
    </div>
  );
}

const PostGridStyled = styled.div`
  grid-template-columns: minmax(auto, 468px) 1fr;

  ${media.custom(768)} {
    grid-template-columns: none;
  }
`;

const BigPostGridStyled = styled.div`
  grid-template-columns: minmax(auto, 568px) 1fr;

  ${media.custom(768)} {
    grid-template-columns: none;
  }
`;

const PostSmallGridStyled = styled.div`
  grid-template-columns: minmax(auto, 176px) 1fr;

  ${media.custom(768)} {
    grid-template-columns: none;
  }
`;

export { BigPostGridItem, MediumPostGridItem, SmallPostGridItem, SecondBigPostGridItem };
