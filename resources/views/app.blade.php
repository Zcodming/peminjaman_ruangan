<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Peminjaman Ruangan') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- FlowBite -->
        <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.1/dist/flowbite.min.css" />

        {{-- Icon --}}
        <link rel="shortcut icon" href="/storage/logo/Logo-Untan.png" type="image/x-icon">

        <script
            src="https://kit.fontawesome.com/a4e48aa4d8.js"
            crossorigin="anonymous"
        ></script>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/css/app.css','resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-gradient-to-r from-sky-500 to-indigo-500">
        @inertia
        <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
    </body>
</html>
