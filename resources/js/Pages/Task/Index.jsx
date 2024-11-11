import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, tasks, queryParams = null }) {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }
        console.log(queryParams)
        route('task.index', queryParams)
    }
    return (
        <>
            <Authenticated
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>}
            >
                <Head title="Tasks" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="text-nowrap pb-4">
                                    <TextInput
                                        className="me-4"
                                        defaultValue={queryParams.name}
                                        placeholder="Search Projects"
                                        onBlur={e => searchFieldChanged('name', e.target.value)}
                                        onKeyPress={e => onKeyPressed('name', e)}
                                    />
                                    <SelectInput
                                        className=""
                                        defaultValue={queryParams.status}
                                        onChange={e => searchFieldChanged('status', e.target.value)}
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                </div>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <TableHeading > ID </TableHeading>
                                                <TableHeading > image </TableHeading>
                                                <TableHeading > Name </TableHeading>
                                                <TableHeading > Status </TableHeading>
                                                <TableHeading > Priority </TableHeading>
                                                <TableHeading > Created By </TableHeading>
                                                <TableHeading > Due Date </TableHeading>
                                                <TableHeading > Created On </TableHeading>
                                                <TableHeading > Actions </TableHeading>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tasks.data.length > 0 &&
                                                tasks.data.map(task => {
                                                    return (
                                                        <tr key={task.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td className="px-6 py-4">{task.id}</td>
                                                            <td className="px-6 py-4">
                                                                <img src={task.image} alt={task.name} style={{ width: 60 }} />
                                                            </td>
                                                            <td className="px-6 py-4">{task.name}</td>
                                                            <td className="px-6 py-4">
                                                                <span class={"px-3 py-1 rounded-full text-gray-900 font-semibold " + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}</span>
                                                            </td>
                                                            <td className="px-6 py-4 text-nowrap">
                                                                <span class={"px-3 py-1 rounded-full text-gray-900 font-semibold " + TASK_PRIORITY_CLASS_MAP[task.priority]}>{TASK_PRIORITY_TEXT_MAP[task.priority]}</span>
                                                            </td>
                                                            <td className="px-6 py-4">{task.createdBy.name}</td>
                                                            <td className="px-6 py-4 text-nowrap">{task.due_date}</td>
                                                            <td className="px-6 py-4 text-nowrap">{task.created_at}</td>
                                                            <td className="px-6 py-4 text-nowrap">
                                                                <Link href={route('task.edit', task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-1">Edit</Link>
                                                                <Link href={route('task.destroy', task.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline px-1">Delete</Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                !tasks.data.length > 0 &&
                                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-6 py-4">No Tasks Found!</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination links={tasks} />
                            </div>
                        </div>
                    </div>
                </div>

            </Authenticated>
        </>
    )
}