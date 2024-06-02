import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { filterData, getFilterValues } from "@/utils/filterData";
import { AiFillCloseCircle } from "react-icons/ai";

interface FilterItem {
    value: string;
    name: string;
}

interface Filter {
    queryName: string;
    placeholder: string;
    items: FilterItem[];
}

export const SearchFilters = () => {
    const [filters, setFilters] = useState<Filter[]>(filterData);
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Initialize selected filters from URL parameters
    useEffect(() => {
        const initialFilters: { [key: string]: string } = {};
        searchParams.forEach((value, key) => {
            initialFilters[key] = value;
        });
        setSelectedFilters(initialFilters);
    }, [searchParams]);

    const searchProperties = ({ filterValues }: { filterValues: { [key: string]: string } }) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());

        const values = getFilterValues(filterValues);

        values.forEach((item) => {
            if (item.value) {
                newSearchParams.set(item.name, item.value);
            } else {
                newSearchParams.delete(item.name);
            }
        });

        router.push(pathname + '?' + newSearchParams.toString());
    };

    const handleChange = ({ e, queryName }: { e: React.ChangeEvent<HTMLSelectElement>, queryName: string }) => {
        const value = e.target.value;

        const newFilters = { ...selectedFilters };
        newFilters[queryName] = value;

        setSelectedFilters(newFilters);
        searchProperties({ filterValues: newFilters });
    };

    const handleRemoveFilter = ({ queryName }: { queryName: string }) => {
        const newFilters = { ...selectedFilters };
        delete newFilters[queryName];

        setSelectedFilters(newFilters);
        searchProperties({ filterValues: newFilters });
    };

    return (
        <div className="flex flex-wrap justify-center sm:px-10 py-2 text-zinc-500">
            {filters.map((filter) => (
                <div key={filter.queryName} className="bg-gray-100 border-transparent dark:bg-neutral-100 dark:border-transparent dark:focus:ring-neutral-600 dark:text-neutral-400 disabled:opacity-50 disabled:pointer-events-none flex focus:border-blue-500 focus:ring-blue-500 items-center m-1 px-4 py-3 relative rounded-lg text-sm">
                    <select
                        className="bg-gray-100 focus:outline-none focus:ring-0 focus:border-gray-900 text-sm w-full"
                        value={selectedFilters[filter.queryName] || ""}
                        onChange={(e) => handleChange({ e: e, queryName: filter.queryName })}
                    >
                        <option value="" disabled>{filter.placeholder}</option>
                        {filter.items.map((item) => (
                            <option className="text-gray-900" value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    {selectedFilters[filter.queryName] && (
                        <AiFillCloseCircle
                            className="text-red-500 cursor-pointer"
                            onClick={() => handleRemoveFilter({ queryName: filter.queryName })}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};
