import { useState } from 'react';
import { Tags } from '../base/Header';
import TagItem from './TagItem';

export type TagListProps = {
  tag: any;
};

function TagList({ tag }: TagListProps) {
  const [queryValue, setQuery] = useState<string>('');

  function toggleTag(tag: string) {
    setQuery(q => {
      // create a regexp so that we can replace multiple occurrences (`react node react`)
      const expression = new RegExp(tag, 'ig');

      const newQuery = expression.test(q) ? q.replace(expression, '') : `${q} ${tag}`;

      // trim and remove subsequent spaces (`react   node ` => `react node`)
      return newQuery.replace(/\s+/g, ' ').trim();
    });
  }

  return (
    <div>
      {tag?.map(e => (
        <TagItem key={e.id} Toogle={toggleTag} tag={e.name} />
      ))}
    </div>
  );
}

export default TagList;
