import { SearchResultType } from '../types/search';
import { ReactComponent as SearchIcon } from '../assets/search.svg';

interface ResultItemProps {
  item: SearchResultType;
  index: number;
  isSelected: boolean;
  handleHoverItem: (index: number) => void;
}

export default function ResultItem({ item, index, isSelected, handleHoverItem }: ResultItemProps) {
  return (
    <li
      key={item.id}
      className={`flex w-full cursor-pointer items-center gap-[12px] px-[24px] py-[8px] text-[1rem] ${
        isSelected && 'bg-gray-50'
      }`}
      onMouseOver={() => handleHoverItem(index)}
    >
      <SearchIcon width={16} height={16} className="mt-[4px] text-gray-400" />
      {item.name}
    </li>
  );
}
