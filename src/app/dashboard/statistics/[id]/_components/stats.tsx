"use client";
import CountryStats from "./country-stats";
import DeviceStats from "./device-stats";

interface Props {
  id: string;
}

const Stats = ({ id }: Props) => {
  return (
    <div className="space-y-8 py-[100px]">
      <DeviceStats id={id} />
      <CountryStats />
    </div>
  );
};

export default Stats;
