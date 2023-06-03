import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid';
import sampleQr from '../images/sample-qr.png';

const InstancePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="flex flex-col bg-background-color w-full min-h-[100vh]">
      <div className="basis-[88%] overflow-auto">
        <div className="flex flex-col pt-10 pb-5 px-20 h-full justify-between">
          <div>
            <div className="fixed left-0 w-full h-full top-0 bg-[url('./images/main-bg.png')] bg-center bg-no-repeat blur-[300px] mix-blend-color-dodge"></div>
            <div>
              <div className="text-text-color font-medium text-2xl">
                {params.name}
              </div>
              <div className="w-full border-[0.8px] border-[rgba(241,242,255,0.2)] mt-4"></div>
            </div>
            <div className="mt-11 px-8 py-9 bg-[linear-gradient(180deg,rgba(31,94,255,0.1)0%,rgba(49,53,117,0.1)100%)]">
              <div className="inline-block">
                <div className="font-medium text-2xl text-text-color">
                  Node & Wallet Stats
                </div>
                <div className="border-[0.8px] border-[rgba(241,242,255,0.2)] mt-4"></div>
              </div>
              <div className="flex mt-4">
                <div className="basis-3/4 flex items-center border-r-[0.8px] border-[rgba(241,242,255,0.2)]">
                  <div className="flex gap-20">
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-4">
                        <div className="flex justify-between shrink-0 text-2xl text-text-color min-w-[235px]">
                          <span>Node Address</span>
                          <span>:</span>
                        </div>
                        <div className="text-2xl text-[rgba(241,242,255,0.3)]">
                          sent1ru63smyqqsjekt6hyqzml9hu6podffh755w07w
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex justify-between shrink-0 text-2xl text-text-color min-w-[235px]">
                          <span>Wallet Balance</span>
                          <span>:</span>
                        </div>
                        <div className="text-2xl text-[rgba(241,242,255,0.3)]">
                          0.00 DVPN
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="flex justify-between shrink-0 text-2xl text-text-color min-w-[235px]">
                          <span>Speed</span>
                          <span>:</span>
                        </div>
                        <div className="text-2xl text-[rgba(241,242,255,0.3)]">
                          <div className="flex items-center gap-2">
                            <ArrowDownIcon
                              width={15}
                              className="text-[#1F5EFF]"
                            />

                            <span>10 MB/s</span>
                            <span>|</span>
                            <ArrowUpIcon
                              width={15}
                              className="text-[#52A911]"
                            />
                            <span>10 MB/s</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-4">
                        <div className="flex justify-between shrink-0 text-2xl text-text-color min-w-[235px]">
                          <span>Price (GB)</span>
                          <span>:</span>
                        </div>
                        <div className="text-2xl text-[rgba(241,242,255,0.3)]">
                          10$
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex justify-between shrink-0 text-2xl text-text-color min-w-[235px]">
                          <span>Connected Sessions</span>
                          <span>:</span>
                        </div>
                        <div className="text-2xl text-[rgba(241,242,255,0.3)]">
                          00
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="basis-1/4 flex justify-center">
                  <img src={sampleQr} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 mt-11 gap-20">
              <div className="bg-[linear-gradient(180deg,rgba(31,94,255,0.1)0%,rgba(49,53,117,0.1)100%)] px-8 py-9">
                <div className="inline-block">
                  <div className="font-medium text-2xl text-text-color">
                    Subscriptions & Session Stats
                  </div>
                  <div className="border-[0.8px] border-[rgba(241,242,255,0.2)] mt-4"></div>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <div className="flex gap-4">
                    <div className="grow flex justify-between shrink-0 text-2xl text-text-color">
                      <span>Subscription Count</span>
                      <span>:</span>
                    </div>
                    <div className="text-2xl text-[rgba(241,242,255,0.3)]">
                      00
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="grow flex justify-between shrink-0 text-2xl text-text-color">
                      <span>Completed Sessions</span>
                      <span>:</span>
                    </div>
                    <div className="text-2xl text-[rgba(241,242,255,0.3)]">
                      00
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="grow flex justify-between shrink-0 text-2xl text-text-color">
                      <span>Total Bandwidth Download</span>
                      <span>:</span>
                    </div>
                    <div className="text-2xl text-[rgba(241,242,255,0.3)]">
                      00
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="grow flex justify-between shrink-0 text-2xl text-text-color">
                      <span>Total Bandwidth Upload</span>
                      <span>:</span>
                    </div>
                    <div className="text-2xl text-[rgba(241,242,255,0.3)]">
                      00
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="grow flex justify-between shrink-0 text-2xl text-text-color">
                      <span>Total Contract Bandwidth Remaining</span>
                      <span>:</span>
                    </div>
                    <div className="text-2xl text-[rgba(241,242,255,0.3)]">
                      00
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[linear-gradient(180deg,rgba(31,94,255,0.1)0%,rgba(49,53,117,0.1)100%)] px-8 py-9">
                <div className="inline-block">
                  <div className="font-medium text-2xl text-text-color">
                    Bandwidth Usage Graph
                  </div>
                  <div className="border-[0.8px] border-[rgba(241,242,255,0.2)] mt-4"></div>
                </div>
              </div>
              <div className="bg-[linear-gradient(180deg,rgba(31,94,255,0.1)0%,rgba(49,53,117,0.1)100%)] px-8 py-9">
                <div className="inline-block">
                  <div className="font-medium text-2xl text-text-color">
                    Earnings Graph
                  </div>
                  <div className="border-[0.8px] border-[rgba(241,242,255,0.2)] mt-4"></div>
                </div>
              </div>
            </div>
          </div>
          <ArrowLeftIcon
            className="text-text-color cursor-pointer z-50 mt-4"
            width={36}
            onClick={() => navigate('/instances')}
          />
        </div>
      </div>
    </div>
  );
};

export default InstancePage;
