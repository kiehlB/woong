import React, { useEffect, useState, useCallback } from 'react';
import { getScrollTop } from '../../lib/utils';
import { usePostViewerState } from './PostViewerContext';
import styled, { css } from 'styled-components';

export interface PostTocProps {}

const Headings = ({ headings, activeId }) => {
  console.log(headings);
  return (
    <ul>
      {headings?.map(heading => (
        <li key={heading.id} className={heading.id === activeId ? 'active' : ''}>
          <a
            href={`#${heading.id}`}
            onClick={e => {
              e.preventDefault();
              document.querySelector(`#${heading.id}`).scrollIntoView({
                behavior: 'smooth',
              });
            }}>
            {heading.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = React.useState([]);

  React.useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('main h2, main h3'));

    // Created a list of headings, with H3s nested
    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

const getNestedHeadings = headingElements => {
  const nestedHeadings = [];

  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === 'H2') {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};

const useIntersectionObserver = setActiveId => {
  const headingElementsRef = React.useRef({});
  React.useEffect(() => {
    const callback = headings => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      // Get all headings that are currently visible on the page
      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach(key => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = id =>
        headingElements.findIndex(heading => heading.id === id);

      // If there is only one visible heading, this is our "active" heading
      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
        // If there is more than one visible heading,
        // choose the one that is closest to the top of the page
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b): any => getIndexFromId(a.target.id) > getIndexFromId(b.target.id),
        );

        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      root: document.querySelector('iframe'),
      rootMargin: '500px',
    });

    const headingElements = Array.from(document.querySelectorAll('h2, h3'));

    headingElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

const TocItem = styled.div<{ active: boolean }>`
  display: block;
  transition: 0.125s all ease-in;
  a {
    &:hover {
      color: black;
    }
    text-decoration: none;
    color: inherit;
  }
  ${props =>
    props.active &&
    css`
      color: black;
      transform: scale(1.05);
    `}
  & + & {
    margin-top: 4px;
  }
`;

const TableOfContents = () => {
  const [activeId, setActiveId] = React.useState();
  const { nestedHeadings } = useHeadingsData();
  const { toc } = usePostViewerState();
  useIntersectionObserver(setActiveId);

  console.log(nestedHeadings);
  console.log(toc?.slice);
  return (
    <nav aria-label="Table of contents">
      <Headings headings={toc?.slice(1)} activeId={activeId} />
    </nav>
  );
};

const PostToc: React.FC<PostTocProps> = () => {
  const [activeId, setActiveId] = React.useState();
  const { nestedHeadings } = useHeadingsData();

  // const { toc } = usePostViewerState();
  // const [activeId, setActiveId] = useState<null | string>(null);
  // const [headingTops, setHeadingTops] = useState<
  //   | null
  //   | {
  //       id: string;
  //       top: number;
  //     }[]
  // >(null);

  // const updateTocPositions = useCallback(() => {
  //   console.log('hello');
  //   if (!toc) return;

  //   const scrollTop = getScrollTop();
  //   const headingTops = toc.map(({ id }) => {
  //     const el = document.getElementById(id);

  //     if (!el) {
  //       return {
  //         id,
  //         top: 0,
  //       };
  //     }

  //     const top = el.getBoundingClientRect().top + scrollTop;

  //     return {
  //       id,
  //       top,
  //     };
  //   });

  //   setHeadingTops(headingTops);
  // }, [toc]);

  // useEffect(() => {
  //   updateTocPositions();
  //   let prevScrollHeight = document.body.scrollHeight;
  //   let timeoutId: ReturnType<typeof setTimeout> | null = null;
  //   function checkScrollHeight() {
  //     const scrollHeight = document.body.scrollHeight;
  //     if (prevScrollHeight !== scrollHeight) {
  //       updateTocPositions();
  //     }
  //     prevScrollHeight = scrollHeight;
  //     timeoutId = setTimeout(checkScrollHeight, 250);
  //   }
  //   timeoutId = setTimeout(checkScrollHeight, 250);
  //   return () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //   };
  // }, [updateTocPositions]);

  // const onScroll = useCallback(() => {
  //   const scrollTop = getScrollTop();
  //   if (!headingTops) return;
  //   const currentHeading = [...headingTops].reverse().find(headingTop => {
  //     return scrollTop >= headingTop.top - 4;
  //   });
  //   if (!currentHeading) {
  //     setActiveId(null);
  //     return;
  //   }

  //   setActiveId(currentHeading.id);
  // }, [headingTops]);

  // useEffect(() => {
  //   window.addEventListener('scroll', onScroll);
  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   };
  // }, [onScroll]);

  // useEffect(() => {
  //   onScroll();
  // }, [onScroll]);

  // if (!toc || !headingTops) return null;

  return (
    <div>
      <div>dd</div>
      <TableOfContents />
    </div>
  );
};

export default PostToc;
