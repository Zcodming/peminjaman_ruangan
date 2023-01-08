<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RuanganSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'role' => 'admin',
            'email' => 'umumbmnft@gmail.com',
            'password' => bcrypt('pinjarftuntan'),
        ]);

        // $this->call([
        //     RuanganSeeder::class
        // ]);
    }
}
