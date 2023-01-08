<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Auth\RedirectAuthenticatedUsersController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DataRuanganController;
use App\Http\Controllers\PinjamRuangController;
use App\Http\Controllers\PinjamController;
use App\Http\Controllers\RuanganController;
use App\Http\Controllers\RuangSeminarController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::group(['middleware' => 'auth'], function () {
    Route::inertia('/dashboard', 'Dashboard')->name('dashboard');

    Route::get("/redirectAuthenticatedUsers", [RedirectAuthenticatedUsersController::class, "home"]);

    // Admin
    Route::group(['middleware' => 'checkRole:admin'], function () {
        // Route Dashboard
        Route::get('/dashboard', [PinjamRuangController::class, 'dashboard'])->name('dashboard');

        // Route CRUD Data Ruangan
        Route::get('/dataruangan/table', [RuanganController::class, 'index'])->name('dataruangan.table'); // Menampilkan Tabel Semua Ruangan
        Route::get('/dataruangan/input', [RuanganController::class, 'create'])->name('dataruangan.input'); // Menampilkan Form
        Route::post('/dataruangan/save', [RuangSeminarController::class, 'store'])->name('save');  // Mengirim Data Ke Database
        // Route::post('/dataruangan/store', [RuanganController::class, 'store'])->name('store');  // Mengirim Data Ke Database
        Route::get('/dataruangan/edit/{ruangan:id}', [RuanganController::class, 'edit']);
        Route::post('/dataruangan/update/{ruangan:id}', [RuanganController::class, 'update']);
        Route::get('/delete/{id}', [RuanganController::class, 'destroy'])->name('delete');

        // Route CURD Ruang Seminar // Menampilkan Form
        Route::get('/ruangseminar/edit/{ruangan:id}', [RuangSeminarController::class, 'edit']);
        Route::post('/ruangseminar/update/{ruangan:id}', [RuangSeminarController::class, 'update']);
        Route::get('/delete/{id}', [RuangSeminarController::class, 'destroy'])->name('delete');

        // Route Arsip Peminjaman
        Route::get('/arsip', [PinjamRuangController::class, 'arsip'])->name('arsip');
        Route::post('/arsip/add', [PinjamRuangController::class, 'add'])->name('add');
        Route::post('/arsip/store', [PinjamRuangController::class, 'store'])->name('store');

        // Route Peminjaman Masuk
        Route::get('/pinjamanmasuk', [PinjamRuangController::class, 'show'])->name('pinjamanmasuk');
        Route::post('/upload/{id}', [PinjamRuangController::class, 'upload'])->name('upload');
        Route::post('/surat/{id}', [PinjamRuangController::class, 'surat'])->name('surat');
        Route::post('/confirm/{id}', [PinjamRuangController::class, 'confirm'])->name('confirm');
        Route::post('/reject/{id}', [PinjamRuangController::class, 'reject'])->name('reject');

        //Akun
        Route::get('/akun', [RegisteredUserController::class, 'index'])->name('akun');
    });

    // User
    Route::group(['middleware' => 'checkRole:user', 'checkRole:admin'], function () {
        // Route Peminjaman User
        Route::get('/dataruangan', [DataRuanganController::class, 'index'])->name('dataruangan');
        Route::get('/pinjamruang', [PinjamRuangController::class, 'index'])->name('pinjamruang');
        Route::get('/ruangseminar', [RuangSeminarController::class, 'index'])->name('ruangseminar');
        Route::get('/pengajuan/{id_ruangan}', [PinjamRuangController::class, 'create'])->name('pengajuan');
        Route::get('/pinjam/{id_ruangan}', [RuangSeminarController::class, 'create'])->name('pinjam');
        Route::resource('pengajuan', PinjamRuangController::class);
        // Route::resource('pinjam', PinjamRuangController::class);
    });
});

require __DIR__ . '/auth.php';
