import {
  CalendarDaysIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    id: 1,
    name: "Leads total",
    stat: "7",
    icon: UserIcon,
  },
  {
    id: 2,
    name: "Nombre d'appels aboutis",
    stat: "70%",
    icon: PhoneIcon,
  },
  {
    id: 3,
    name: "Rendez-vous pris",
    stat: "24.57%",
    icon: CalendarDaysIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Stats = () => {
  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        30 derniers jours
      </h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Stats;
