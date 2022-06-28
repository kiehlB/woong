export type HeaderTopicItemProps = {
  id?: number;
  title?: string;
  svg?: React.ReactNode;
};

function HeaderTopicItem({ title }: HeaderTopicItemProps) {
  return (
    <div className="py-0.5 mr-2 mb-1 ">
      <div className="flex items-center justify-center w-32 px-3 py-1 bg-black text-white  rounded-3xl  font-Roboto    text-[0.75rem]">
        {title}
      </div>
    </div>
  );
}

export default HeaderTopicItem;
