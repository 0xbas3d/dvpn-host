import { SetStateAction } from 'react';
import EditNodeConfig from './EditNodeConfig';

function Test() {
  return (
    <div className="px-48 pt-32 bg-black w-full min-h-[100vh]">
      <EditNodeConfig config={{}} setConfig={function (value: SetStateAction<{ [key: string]: string; } | undefined>): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
}

export default Test;
