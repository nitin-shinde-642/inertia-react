import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, projects, queryParams = null }) {

    queryParams = queryParams || {};

    const project_sort = (sortBy) => {
        if (sortBy == queryParams.sortBy) {
            queryParams.sort = queryParams.sort == 'desc' ? 'asc' : 'desc';
        } else {
            queryParams.sort = 'asc';
            queryParams.sortBy = sortBy;
        }
        router.get(route('project.index', queryParams))
    }

    const searchFieldChanged = (name, value) => {
        delete queryParams.page
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }
        router.get(route('project.index', queryParams))
    }

    const onKeyPressed = (name, e) => {
        if (e.key !== 'Enter') return

        searchFieldChanged(name, e.target.value)
    }
    return (
        <Authenticated user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-nowrap">

                                            <TableHeading
                                                sortable={true}
                                                name="id"
                                                onClick={e => project_sort('id')}
                                                sort={queryParams.sort}
                                                sortBy={queryParams.sortBy}
                                            > ID </TableHeading>

                                            <TableHeading> Image </TableHeading>

                                            <TableHeading
                                                sortable={true}
                                                name="name"
                                                onClick={e => project_sort('name')}
                                                sort={queryParams.sort}
                                                sortBy={queryParams.sortBy}
                                            > Name </TableHeading>

                                            <TableHeading
                                                sortable={true}
                                                name="status"
                                                onClick={e => project_sort('status')}
                                                sort={queryParams.sort}
                                                sortBy={queryParams.sortBy}
                                            > Status </TableHeading>

                                            <TableHeading> Created By </TableHeading>

                                            <TableHeading
                                                sortable={true}
                                                name="due_date"
                                                onClick={e => project_sort('due_date')}
                                                sort={queryParams.sort}
                                                sortBy={queryParams.sortBy}
                                            > Due Date </TableHeading>

                                            <TableHeading
                                                sortable={true}
                                                name="created_at"
                                                onClick={e => project_sort('created_at')}
                                                sort={queryParams.sort}
                                                sortBy={queryParams.sortBy}
                                            > Created On </TableHeading>

                                            <TableHeading> Actions </TableHeading>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            projects.data.length > 0 &&
                                            projects.data.map((project) => {
                                                return <tr key={project.id} className="odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-6 py-4">{project.id}</td>
                                                    <td className="px-6 py-4">
                                                        <img src={project.image} alt={project.name} style={{ width: 60 }} />
                                                    </td>
                                                    <td className="px-6 py-4">{project.name}</td>
                                                    <td className="px-6 py-4 text-nowrap">
                                                        <span className={"px-3 py-1 rounded-full text-gray-900 font-semibold " + PROJECT_STATUS_CLASS_MAP[project.status]}>{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                                    </td>
                                                    <td className="px-6 py-4">{project.createdBy.name}</td>
                                                    <td className="px-6 py-4 text-nowrap">{project.due_date}</td>
                                                    <td className="px-6 py-4 text-nowrap">{project.created_at}</td>
                                                    <td className="px-6 py-4 text-nowrap">
                                                        <Link href={route('project.edit', project.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-1">Edit</Link>
                                                        <Link href={route('project.destroy', project.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline px-1">Delete</Link>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                        {
                                            !projects.data.length > 0 &&
                                            <tr className="odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-6 py-4 text-nowrap text-center" colSpan={8}>No Projects Found!</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}