import { useTranslation } from 'react-i18next';
import logo from '../images/logo.png';
import data from './general.json';

function NodeTopBar() {
  const { t } = useTranslation();
  return (
    <span className="flex">
      <span className="mr-auto">
        <img src={logo} alt="logo" />
      </span>
      <span className="flex space-x-14">
        <span className="text-right text-text-color">
          <span className="text-3xl font-bold pb-1 block">
            {t(data.node_monicker_label)}
          </span>
          <span className="text-sm">sent8qu3r...410284</span>
        </span>
        <span>
          <span className="flex items-center justify-between text-text-color gap-8 rounded-md py-3 px-10 z-50 cursor-pointer bg-[#007842]">
            <span className=" text-2xl font-bold">
              {t(data.start_node_label)}
            </span>
          </span>
        </span>
      </span>
    </span>
  );
}

export default NodeTopBar;
