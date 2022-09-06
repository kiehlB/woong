export type AddTagProps = {
  className?: string;
};

function AddTag({ className }: AddTagProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="#76808F"
      className={className}>
      <path d="M4 11H20V13H4V11Z" />
      <path d="M13 4V20H11V4H13Z" />
    </svg>
  );
}

export default AddTag;
