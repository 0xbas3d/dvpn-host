import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { HomeButton } from './home-button.component';
import logo from '../assets/images/logo.png';
import earth from '../assets/images/bg-earth.png';

export const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] w-full bg-background-color px-48 pt-32">
      <div className="fixed left-0 top-0 h-full w-full bg-[url('../assets/images/main-bg.png')] bg-center bg-no-repeat mix-blend-color-dodge blur-[300px]" />
      <div className="absolute bottom-0 right-0">
        <img
          alt="earth"
          src={earth}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <img
            alt="dvpn"
            src={logo}
            height={82}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            return navigate('/instances');
          }}
          className="z-50 flex cursor-pointer items-center rounded-full border border-border-color px-8 py-4 text-text-color hover:bg-[#1F5EFF]">
          <div className="text-4xl font-medium">Go to Instances &nbsp;</div>
          <div>
            <ArrowRightIcon
              height={36}
              width={48}
            />
          </div>
        </button>
      </div>
      <div className="pt-[300px]">
        <div className="inline-grid grid-cols-2 gap-20">
          <HomeButton text="Sentinel website" />
          <HomeButton text="Docs.sentinel.co" />
          <HomeButton text="Discord/tg link" />
          <HomeButton text="Github Repo link" />
        </div>
      </div>
    </div>
  );
};
