export type FilterButtonProps = {};

function FilterButton({}: FilterButtonProps) {
  return (
    <div className="w-28 bg-[#02c07633] h-9 flex justify-center items-center rounded-lg">
      <div className="bg-[#02C076] rounded-[50%] w-2 h-2 mr-2" />
      <div className="text-[#474D57]">Beginner</div>
    </div>
  );
}

export default FilterButton;
