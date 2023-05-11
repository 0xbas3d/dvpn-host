import { Container } from './Instances';
import { useNavigate } from 'react-router-dom';

const InstanceCard = ({ instance }: { instance: Container }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[url('./images/instance-bg.png')] cursor-pointer bg-cover  pt-8 rounded-xl min-w-[376px] mix-blend-color-dodge">
      <div
        className="flex pl-16 items-center"
        onClick={() => navigate('/instance/' + instance.name)}
      >
        <div className="text-text-color font-medium text-2xl">
          {instance.name}
        </div>
        <div className="rounded-full bg-[#F6F6F6] p-2 ml-2">
          {instance.status === 'Running' ? (
            <div className="text-[#52A911] text-xs">Running</div>
          ) : (
            <div className="text-[#861565] text-xs">Stopped</div>
          )}
        </div>
      </div>
      <div className="mt-32">
        <div className="flex w-full border-t-[0.7px] border-[rgba(241,242,255,0.25)]">
          <div className="basis-1/2 flex justify-center py-6 px-14 text-text-color font-medium text-2xl border-r border-[rgba(241,242,255,0.25)]">
            Details
          </div>
          <div
            className="flex justify-center basis-1/2 py-6 px-14 text-text-color font-medium text-2xl"
            onClick={async () => {
              if (instance.status !== 'Running') {
                const res = await window.electron.ipcRenderer.run([
                  instance.name,
                  'start',
                  'amangoyal',
                ]);
                console.log(res);
              } else {
                const res = await window.electron.ipcRenderer.run([
                  instance.name,
                  'stop',
                ]);
                console.log(res);
              }
            }}
          >
            {instance.status === 'Running' ? 'Stop' : 'Start'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstanceCard;
