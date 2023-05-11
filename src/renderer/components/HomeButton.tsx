const HomeButton = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-between text-text-color gap-8 rounded-3xl p-6 z-50 cursor-pointer hover:bg-[#1E2142] hover:outline hover:outline-1 hover:outline-[#1F5EFF] bg-[linear-gradient(180deg,rgba(31,94,255,0.1)0%,rgba(49,53,117,0.1)100%)]">
      <div>&#x2022;</div>
      <div className=" text-4xl font-medium">{text}</div>
      <div>&#x2022;</div>
    </div>
  );
};

export default HomeButton;
