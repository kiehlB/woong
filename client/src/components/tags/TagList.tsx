import TagItem from './TagItem';

export type TagListProps = {};

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

function TagList({}: TagListProps) {
  return (
    <div>
      {a?.map(e => (
        // <TagItem key={e.id} />
        <div>d</div>
      ))}
    </div>
  );
}

export default TagList;
