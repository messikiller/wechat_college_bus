<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>
</head>
<body style="background-color: #f5f5f9;">
    <div id="app">
    </div>

    <!-- Scripts -->
    <script src="{{ asset('js/home.js') }}"></script>
</body>
</html>
