const Info = ({ title, subTitle, data, ...prop }: any) => {
  return (
    <div className="w-full  bg-white rounded-[20px] " {...prop}>
      <div className="p-8">
        <div className="">
          <div className="text-midnightNavy text-2xl font-bold leading-[42px]">
            {title}
          </div>
          <div className="text-steelBlue text-sm font-normal leading-tight pt-2">
            {subTitle}
          </div>
        </div>

        <div className="mt-8 bg-gray-200 rounded-xl border border-gray-200">
          <div className="py-4 px-10 grid grid-cols-2  min-[700px]:flex justify-between gap-5">
            {data?.map((e: any, index: number) => {
              return (
                <div
                  key={index}
                  className="text-[26px] font-bold  leading-[42px] grid gap-5"
                >
                  <div className="text-gray-400 ">{e?.name}</div>
                  <div
                    className={`${
                      e?.active ? "text-tealGreenColor" : "text-black"
                    }`}
                  >
                    {e?.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Info;
