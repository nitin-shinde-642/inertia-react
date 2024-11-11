<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filterName = request('name');
        $filterStatus = request('status');
        $sortBy = request('sortBy', 'created_at');
        $sort = request('sort', 'desc');
        $projects = Project::when($filterName, fn($query) => $query->where('name', 'like', "%{$filterName}%"))
            ->when($filterStatus, fn($query) => $query->where('status', $filterStatus))
            ->orderBy($sortBy, $sort)
            ->paginate('5')
            ->withQueryString()
            ->onEachSide(1);
        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
