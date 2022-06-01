export type HeaderMenuItemsProps = {
    id?: number;
    title?: string;
    subTitle: string;
    svg?: any;
  };
  
  function HeaderMenuItems({ title, svg, subTitle }: HeaderMenuItemsProps) {
    return (
      <div className='p-4 hover:bg-[#FAFAFA] rounded-lg'>
        <div className='flex items-center'>
          <div className='bg-[#FAFAFA] p-2 mr-4 rounded-lg'>{svg}</div>
          <div className='flex flex-col '>
            <div className='text-xs font-medium'>{title}</div>
            <div className='text-[0.625rem] truncate w-52 text-[#474D57]'>
              {subTitle}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default HeaderMenuItems;