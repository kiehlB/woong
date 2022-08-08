export type HeaderMenuItemsProps = {
  id?: number;
  title?: string;
  subTitle: string;
  svg?: React.ReactNode;
};

function HeaderMenuItems({ title, svg, subTitle }: HeaderMenuItemsProps) {
  return (
    <div className="p-4 hover:bg-[#FAFAFA] rounded-lg">
      <div className="flex items-center">
        <div className="bg-[#FAFAFA] p-2 mr-4 rounded-lg">{svg}</div>
        <div className="flex flex-col ">
          <div className="text-[0.875rem] leading-5  text-[#1E2329] font-Roboto font-medium">
            {title}
          </div>
          <div className="text-[0.7rem] truncate w-52 text-[#707A8A] leading-5 font-normal  font-Roboto   ">
            {subTitle}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderMenuItems;
