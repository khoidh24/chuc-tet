/* eslint-disable react/prop-types */
const LoadingScreen = ({ progress }) => {
  return (
    <div className="container mx-auto w-full xl:max-w-md lg:max-w-md flex justify-center items-center h-dvh flex-col overflow-hidden gap-4 bg-[#A70706] relative">
      <h1 className="text-3xl font-bold text-[#FEF9C6] mb-4">Đang tải...</h1>
      <div className="w-64 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-4 bg-[#CD1928] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-[#FEF9C6] mt-2">{progress}%</p>
    </div>
  );
};

export default LoadingScreen;
