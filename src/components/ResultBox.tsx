import { SearchResultType } from '../types/search';
import ResultItem from './ResultItem';

interface ResultBoxProps {
  displayedResult: SearchResultType[];
  isLoading: boolean;
  input: string;
  selectedIndex: number;
  handleHoverItem: (index: number) => void;
}

export default function ResultBox({
  displayedResult,
  isLoading,
  input,
  selectedIndex,
  handleHoverItem,
}: ResultBoxProps) {
  return (
    <ul className="absolute mt-[6px] w-full rounded-[20px] bg-white pb-[16px] pt-[24px]">
      <div className="w-full px-[24px] text-[13px] text-gray-500">
        {isLoading ? <>검색 중...</> : <>추천 검색어</>}
      </div>
      {displayedResult.length > 0 && input.length > 0 ? (
        displayedResult.map((item, index) => (
          <ResultItem
            key={item.id}
            item={item}
            index={index}
            isSelected={index === selectedIndex}
            handleHoverItem={handleHoverItem}
          />
        ))
      ) : (
        <div className="px-[24px] py-[8px]">검색어 없음.</div>
      )}
    </ul>
  );
}
