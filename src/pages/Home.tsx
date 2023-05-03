import Search from '../components/Search';

export default function Home() {
  return (
    <div className="h-full bg-[#CAE9FF]">
      <div className="mx-auto flex max-w-[1040px] flex-col items-center pt-[8.5rem]">
        <h1 className="mb-[40px] text-center text-[2.125rem] font-bold leading-[1.6] -tracking-[0.018em]">
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </h1>
        <Search />
      </div>
    </div>
  );
}
