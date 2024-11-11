<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Nitin',
            'email' => 'nitins@sigasystems.com',
            'password' => bcrypt('admin123'),
            'email_verified_at' => time()
        ]);

        Project::factory('30')->hasTasks('30')->create();
    }
}
