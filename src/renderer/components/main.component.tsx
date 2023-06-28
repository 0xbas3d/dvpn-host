import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo.png';

export const Main = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigateToInstance = async () => {
    navigate('/instances');
  };

  return (
    <div className="min-h-[100vh]  w-full bg-[#090A13] bg-[url('./images/bg-new2.png')] bg-cover bg-center  bg-no-repeat  p-0  px-44 bg-blend-difference">
      <div className="fixed  h-full w-full" />
      <div className="fixed  bottom-10 h-full w-full    bg-[url('./images/characters.png')]  p-0 " />
      <div className="absolute left-[90px] top-[82px] pb-[300px]">
        <div>
          <img
            alt="logo"
            src={logo}
            height={86}
          />
        </div>
        <div className="absolute top-1/2  w-[805px]  ">
          <div className="text-center  text-[80px] font-normal leading-none text-[#F1F2FF]">
            {t('general:tittle')}
          </div>
          <div className="mt-[72px] flex justify-center ">
            <button
              type="button"
              onClick={handleNavigateToInstance}
              className=" h-[72px] w-[180px] rounded-[63px] bg-[#1F5EFF] text-[24px] text-white">
              {t('start_label')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
