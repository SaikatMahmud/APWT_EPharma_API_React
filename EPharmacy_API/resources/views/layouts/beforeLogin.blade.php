<html>
    <head></head>
    <body>
        <div>
            <a href="{{route('cus.reg')}}">Register</a>
            ||&emsp;
            <a href="{{route('user.login')}}">Login</a>
            ||&emsp;
            <a href="{{route('about')}}">About Us</a>
            ||&emsp;
            <a href="{{route('contactUs')}}">Contact us</a>
        </div>
        <br>
        <div>
            @yield('content')
        </div>
    </body>
</html>