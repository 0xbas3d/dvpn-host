import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '../images/logo.png';

function Main() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="px-44 bg-[url('./images/bg-new.png')] bg-[#090a13] p-0 bg-blend-overlay w-full min-h-[100vh]">
      <div className="fixed  w-full h-full bg-[url('./images/bg-effect.png')] " />
      <div className="fixed  w-full h-full bottom-10    p-0  bg-[url('./images/characters.png')] " />
      <div className="absolute pb-[300px] top-[82px] left-[90px]">
        <div>
          <img alt="logo" src={logo} height={86} />
        </div>
        <div className="absolute w-[805px]  top-1/2  ">
          <div className="font-normal  text-[80px] leading-none text-center text-[#F1F2FF]">
            {t('DVPN Node Launcher ')}
          </div>
          <div className="flex justify-center mt-[72px] ">
            <button
              type="button"
              onClick={() => navigate('/instances')}
              className=" w-[180px] h-[72px] rounded-[63px] text-[24px] text-white bg-[#1F5EFF]"
            >
              {t('Start')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
