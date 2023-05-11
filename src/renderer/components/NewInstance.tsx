import plus from '../images/plus.png';
import { useNavigate } from 'react-router-dom';

const NewInstance = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/addInstance')}
      className="bg-[url('./images/new-bg.png')] bg-cover  pt-8 rounded-3xl min-w-[376px] mix-blend-color-dodge cursor-pointer"
    >
      <img
        src={plus}
        width={62}
        height={62}
        className="relative left-[50%] translate-x-[-50%] translate-y-[100%]"
      />

      <div className="text-text-color font-medium text-2xl text-center mt-28">
        Add New
      </div>
    </div>
  );
};

export default NewInstance;
