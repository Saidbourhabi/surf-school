import { GiSurfBoard, GiWaveSurfer, GiSunrise } from 'react-icons/gi';

const stats = [
  {
    id: 1,
    name: 'Waves surfed per hour',
    value: '2800',
    icon: GiWaveSurfer,
  },
  {
    id: 2,
    name: 'Surfers in water',
    value: '1200',
    icon: GiSurfBoard,
  },
  {
    id: 3,
    name: 'Water temperature',
    value: '72°F',
    icon: GiSunrise,
  },
  {
    id: 4,
    name: 'Water temperature',
    value: '72°F',
    icon: GiSunrise,
  },
];

export default function Example() {
  return (
    <div className="bg-[#05C7F2] py-24 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-2  gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <stat.icon className="mx-auto text-5xl text-[#f2f2f2]" />
              <dd className="text-3xl text-[#262223] sm:text-5xl">
                {stat.value}
              </dd>
              <dt className="text-base/7 text-white">{stat.name}</dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}