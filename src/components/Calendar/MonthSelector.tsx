import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

interface Props {
  value: number; // 1–12
  onChange: (val: number) => void;
}

const months = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Tháng ${i + 1}`,
}));

export default function MonthSelector({ value, onChange }: Props) {
  const selected = months.find((m) => m.id === value)!;

  return (
    <Listbox value={selected} onChange={(val) => onChange(val.id)}>
      <div className="relative w-36">
        <ListboxButton className="relative w-full cursor-pointer rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-4 pr-10 text-left shadow-sm hover:ring-1 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white">
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
          </span>
        </ListboxButton>
        <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {months.map((month) => (
            <ListboxOption
              key={month.id}
              value={month}
              className={({ active, selected }) =>
                `cursor-pointer select-none px-4 py-2 rounded-lg ${
                  active
                    ? "bg-blue-100 dark:bg-blue-600 text-blue-900 dark:text-white"
                    : selected
                    ? "bg-blue-50 dark:bg-blue-700 text-blue-800 dark:text-white"
                    : "text-gray-900 dark:text-gray-200"
                }`
              }
            >
              {month.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
