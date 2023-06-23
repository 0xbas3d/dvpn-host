import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import plus from '../images/plus.png';
import data from './general.json';

function NewInstance() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate('/addInstance')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate('/addInstance');
        }
      }}
      className="bg-black cursor-pointer min-w-[401px] text-white flex flex-col border-[#192a37]  border rounded-[16px] "
    >
      <img
        alt="plus"
        src={plus}
        width={63}
        height={63}
        className="relative left-[50%] translate-x-[-50%] translate-y-[80%]"
      />
      <div className="text-text-color font-medium text-[22px] text-center mt-20">
       {t(data.instance_description)}
      </div>
    </div>
  );
}

export default NewInstance;
