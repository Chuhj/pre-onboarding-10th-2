import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { SearchResultType } from '../types/search';
import { searchDiseaseWithCache } from '../api/search';
import debounce from '../utils/debounce';
import ResultBox from './ResultBox';

export default function Search() {
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [input, setInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedResult, setSearchedResult] = useState<SearchResultType[]>([]);

  const displayedResult = searchedResult.slice(0, 7);
  const LAST_INDEX_RESULT = displayedResult.length - 1;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    setIsLoading(true);
    setInput(value);
    setSelectedIndex(-1);

    if (value.length === 0) {
      setSearchedResult([]);
      setIsLoading(false);
      return;
    }

    try {
      const searchedResult = await searchDiseaseWithCache(value);
      setSearchedResult(searchedResult);
      setIsResultOpen(true);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const debounceHandleChange = debounce(handleChange, 300);

  const handleFocus = () => {
    setIsResultOpen(true);
  };

  const handleBlur = () => {
    setIsResultOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { code } = e;
    if (code === 'ArrowDown') {
      e.preventDefault();
      if (!isResultOpen && displayedResult.length > 0) {
        setIsResultOpen(true);
        setSelectedIndex(0);
        return;
      }
      setSelectedIndex((prevId) => (LAST_INDEX_RESULT > prevId ? prevId + 1 : prevId));
    } else if (code === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prevId) => (0 < prevId ? prevId - 1 : prevId));
    } else if (code === 'Escape') {
      setIsResultOpen(false);
    }
  };

  const handleHoverItem = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="relative font-normal leading-[1.6] -tracking-[0.018em]">
      <div
        className={`flex w-[490px] items-center rounded-[42px] border-2 bg-white
          pr-[8px] text-[1.125rem] ${isResultOpen ? 'border-blue-500' : 'border-white'}`}
      >
        <div className="relative flex-grow py-[20px] pl-[24px] pr-[10px]">
          {!isResultOpen && input.length === 0 && (
            <div className="pointer-events-none absolute flex items-center text-gray-400">
              <div className="mr-[12px]">
                <SearchIcon width={16} height={16} />
              </div>
              질환명을 입력해 주세요.
            </div>
          )}

          <input
            className="w-full leading-[1.15] outline-none"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={debounceHandleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button className="flex h-[48px] w-[48px] items-center justify-center rounded-[100%] bg-[#007BE9] text-white">
          <SearchIcon width={21} height={21} />
        </button>
      </div>
      {isResultOpen && (
        <ResultBox
          displayedResult={displayedResult}
          isLoading={isLoading}
          input={input}
          selectedIndex={selectedIndex}
          handleHoverItem={handleHoverItem}
        />
      )}
    </div>
  );
}
