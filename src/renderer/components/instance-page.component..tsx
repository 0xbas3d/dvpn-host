import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { routeConst } from 'renderer/common/types/consts/route-const.common';

export const InstancePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="flex min-h-[100vh] w-full flex-col bg-background-color">
      <div className="basis-[88%] overflow-auto">
        <div className="flex h-full flex-col justify-between px-20 pb-5 pt-10">
          <div>
            <div className="fixed left-0 top-0 h-full w-full bg-[url('../assets/images/main-bg.png')] bg-center bg-no-repeat mix-blend-color-dodge blur-[300px]" />
            <div>
              <div className="text-2xl font-medium text-text-color">{params.name}</div>
              <div className="mt-4 w-full border-[0.8px] border-[rgba(241,242,255,0.2)]" />
            </div>
            <div className="mt-11 bg-[linear-gradient(180deg,rgba(31,94,255,0.1)0%,rgba(49,53,117,0.1)100%)] px-8 py-9">
              <div className="inline-block">
                <div className="text-2xl font-medium text-text-color">Node & Wallet Stats</div>
                <div className="mt-4 border-[0.8px] border-[rgba(241,242,255,0.2)]" />
              </div>
              <div className="mt-4 flex">
                <div className="flex basis-3/4 items-center border-r-[0.8px] border-[rgba(241,242,255,0.2)]">
                  <div className="flex gap-20">
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-4">
                        <div className="flex min-w-[235px] shrink-0 justify-between text-2xl text-text-color">
                          <span>Node Address</span>
                          <span>:</span>
                        </div>
                        <div className="text-2xl text-[rgba(241,242,255,0.3)]">
                          sent1ru63smyqqsjekt6hyqzml9hu6podffh755w07w
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex min-w-[235px] shrink-0 justify-between text-2xl text-text-color">
                          <span>Wallet Balance</span>
                          <span>:</span>
                        </div>
                        <div className="text-2xl text-[rgba(241,242,255,0.3)]">0.00 DVPN</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex min-w-[235px] shrink-0 justify-between text-2xl text-text-color">
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
                        <div className="flex min-w-[235px] shrink-0 justify-between text-2xl text-text-color">
                          <span>Price (GB)</span>
                          <span>:</span>
                        </div>
                        <div className="text-2xl text-[rgba(241,242,255,0.3)]">10$</div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex min-w-[235px] shrink-0 justify-between text-2xl text-text-color">
                          <span>Connected Sessions</span>
                          <span>:</span>
                        </div>
                        <div className="text-2xl text-[rgba(241,242,255,0.3)]">00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-11 grid grid-cols-3 gap-20">
              <div className="bg-[linear-gradient(180deg,rgba(31,94,255,0.1)0%,rgba(49,53,117,0.1)100%)] px-8 py-9">
                <div className="inline-block">
                  <div className="text-2xl font-medium text-text-color">
                    Subscriptions & Session Stats
                  </div>
                  <div className="mt-4 border-[0.8px] border-[rgba(241,242,255,0.2)]" />
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <div className="flex gap-4">
                    <div className="flex shrink-0 grow justify-between text-2xl text-text-color">
                      <span>Subscription Count</span>
                      <span>:</span>
                    </div>
                    <div className="text-2xl text-[rgba(241,242,255,0.3)]">00</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex shrink-0 grow justify-between text-2xl text-text-color">
                      <span>Completed Sessions</span>
                      <span>:</span>
                    </div>
                    <div className="text-2xl text-[rgba(241,242,255,0.3)]">00</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex shrink-0 grow justify-between text-2xl text-text-color">
                      <span>Total Bandwidth Download</span>
                      <span>:</span>
                    </div>
                    <div className="text-2xl text-[rgba(241,242,255,0.3)]">00</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex shrink-0 grow justify-between text-2xl text-text-color">
                      <span>Total Bandwidth Upload</span>
                      <span>:</span>
                    </div>
                    <div className="text-2xl text-[rgba(241,242,255,0.3)]">00</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex shrink-0 grow justify-between text-2xl text-text-color">
                      <span>Total Contract Bandwidth Remaining</span>
                      <span>:</span>
                    </div>
                    <div className="text-2xl text-[rgba(241,242,255,0.3)]">00</div>
                  </div>
                </div>
              </div>
              <div className="bg-[linear-gradient(180deg,rgba(31,94,255,0.1)0%,rgba(49,53,117,0.1)100%)] px-8 py-9">
                <div className="inline-block">
                  <div className="text-2xl font-medium text-text-color">Bandwidth Usage Graph</div>
                  <div className="mt-4 border-[0.8px] border-[rgba(241,242,255,0.2)]" />
                </div>
              </div>
              <div className="bg-[linear-gradient(180deg,rgba(31,94,255,0.1)0%,rgba(49,53,117,0.1)100%)] px-8 py-9">
                <div className="inline-block">
                  <div className="text-2xl font-medium text-text-color">Earnings Graph</div>
                  <div className="mt-4 border-[0.8px] border-[rgba(241,242,255,0.2)]" />
                </div>
              </div>
            </div>
          </div>
          <ArrowLeftIcon
            className="z-50 mt-4 cursor-pointer text-text-color"
            width={36}
            onClick={() => {
              return navigate(routeConst.instances);
            }}
          />
        </div>
      </div>
    </div>
  );
};
