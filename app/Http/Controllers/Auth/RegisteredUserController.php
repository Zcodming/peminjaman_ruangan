<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use phpDocumentor\Reflection\Types\Boolean;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */

    public function index()
    {
        $users = User::all();
        return Inertia::render('Admin/ManageAccount', [
            'users' => $users->map(function ($users) {
                return [
                    'id' => $users->id,
                    'name' => $users->name,
                    'email' => $users->email,
                    'password' => $users->password,
                ];
            }),
        ]);
    }

    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'required|string', // adding role, checking is role addded
            'password' => ['required', 'confirmed', 'min:6', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role, // adding role, send to db
        ]);

        $users = User::where('email', $request->email)->first();
        $tokenResult = $users->createToken('authToken')->plainTextToken;

        $data = [
            'access_token' => $tokenResult,
            'token_type' => 'Bearer',
            'user' => $users
        ];

        event(new Registered($user));

        // Auth::login($user);

        // return $this->sendResponse($data, 'Successfully Rregister');
        return back();
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'required|string', // adding role, checking is role addded
            'password' => ['required', 'confirmed', 'min:6', Rules\Password::defaults()],
        ]);

        $user->update($request->all());

        return Redirect::route('register');
    }

    public function destroy($id)
    {
        //
    }
}
