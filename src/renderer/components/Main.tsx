import logo from '../images/logo.png';
import earth from '../images/bg-earth.png';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import HomeButton from './HomeButton';
import { useNavigate } from 'react-router-dom';
const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="px-48 pt-32 bg-background-color w-full min-h-[100vh]">
      <div className="fixed left-0 w-full h-full top-0 bg-[url('./images/main-bg.png')] bg-center bg-no-repeat blur-[300px] mix-blend-color-dodge"></div>
      <div className="absolute right-0 bottom-0">
        <img src={earth} />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <img src={logo} height={82} />
        </div>
        <div
          onClick={() => navigate('/instances')}
          className="flex items-center border border-border-color text-text-color rounded-full px-8 py-4 cursor-pointer hover:bg-[#1F5EFF] z-50"
        >
          <div className="text-4xl font-medium">Go to Instances &nbsp;</div>
          <div>
            <ArrowRightIcon height={36} width={48} />
          </div>
        </div>
      </div>
      <div className="pt-[300px]">
        <div className="inline-grid gap-20 grid-cols-2">
          <HomeButton text="Sentinel website" />
          <HomeButton text="Docs.sentinel.co" />
          <HomeButton text="Discord/tg link" />
          <HomeButton text="Github Repo link" />
        </div>
      </div>
    </div>
  );
};

export default Main;
