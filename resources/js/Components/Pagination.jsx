import { Link } from "@inertiajs/react";

export default function ({ links }) {
    return (
        <>
            <div className="flex flex-wrap items-center justify-between mt-5">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{links.meta.from}</span> to <span className="font-semibold text-gray-900 dark:text-white">{links.meta.to}</span> of <span className="font-semibold text-gray-900 dark:text-white">{links.meta.total}</span> Entries
                </span>
                <nav aria-label="navigation">
                    <ul className="inline-flex flex-wrap -space-x-px text-sm">
                        {links.meta.links.map((link, index) => {
                            let $active = link.active ? " bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" : " hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            let $first = (index === 0) ? " rounded-s-lg" : ''
                            let $last = (index === links.meta.links.length - 1) ? " rounded-e-lg" : ''
                            let $disabled = (link.url == null) ? " cursor-not-allowed" : ''
                            return <li key={link.label}>
                                <Link preserveScroll
                                    href={link.url || ''}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={"flex text-nowrap my-1 items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300" + $first + $last + $active + $disabled}
                                ></Link>
                            </li>
                        })}
                    </ul>
                </nav>
            </div>
        </>
    )
}
