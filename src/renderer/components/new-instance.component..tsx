import { useNavigate } from 'react-router-dom';
import plus from '../assets/images/plus.png';

export const NewInstance = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        return navigate('/addInstance');
      }}
      className="min-w-[376px] cursor-pointer  rounded-3xl bg-[url('../assets/images/new-bg.png')] bg-cover mix-blend-color-dodge">
      <img
        alt="plus"
        src={plus}
        width={62}
        height={62}
        className="relative left-[50%] translate-x-[-50%] translate-y-[100%]"
      />

      <div className="mt-28 text-center text-2xl font-medium text-text-color">Add New</div>
    </button>
  );
};
