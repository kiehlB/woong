export type HeaderMenuItemsProps = {
  id?: number;
  title?: string;
  subTitle: string;
  svg?: React.ReactNode;
};

function HeaderMenuItems({ title, svg, subTitle }: HeaderMenuItemsProps) {
  return (
    <div className='p-4 hover:bg-[#FAFAFA] rounded-lg'>
      <div className='flex items-center'>
        <div className='bg-[#FAFAFA] p-2 mr-4 rounded-lg'>{svg}</div>
        <div className='flex flex-col '>
          <div className='text-xs   text-[#1E2329] font-bold'>{title}</div>
          <div className='text-[0.75rem] truncate w-52 text-[#707A8A] leading-normal font-medium'>
            {subTitle}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderMenuItems;
