import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

export default function TableHeading({ name = null, sortable = false, sortBy = null, sort = null, children, ...props }) {
    return (
        <th
            scope="col"
            {...props}
            className="px-6 py-3 text-nowrap">
            <div className={(sortable) ? "flex items-center justify-spacebetwen gap-1 cursor-pointer" : undefined}>
                {children}
                {sortable && (
                    <div className="w-3 inline-block">
                        <ChevronUpIcon className={(sortBy == name && sort == 'asc') ? ' text-white' : ''} />
                        <ChevronDownIcon className={"-mt-1" + ((sortBy == name && sort == 'desc') ? ' text-white' : '')} />
                    </div>
                )}
            </div>
        </th>
    )
}
