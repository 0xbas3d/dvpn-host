import logo from '../images/logo.png';

function NodeTopBar() {
  return (
    <span className="flex">
      <span className="mr-auto">
        <img src={logo} alt="logo" />
      </span>
      <span className="flex space-x-14">
        <span className="text-right text-text-color">
          <span className="text-3xl font-bold pb-1 block">Node Monicker</span>
          <span className="text-sm">sent8qu3r...410284</span>
        </span>
        <span>
          <span className="flex items-center justify-between text-text-color gap-8 rounded-md py-3 px-10 z-50 cursor-pointer bg-[#007842]">
            <span className=" text-2xl font-bold">Start Node</span>
          </span>
        </span>
      </span>
    </span>
  );
}

export default NodeTopBar;
