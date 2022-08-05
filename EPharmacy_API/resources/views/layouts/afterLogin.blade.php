<html>
    <head></head>
    <body>
        <div>
            <a href="{{route('home')}}">Home</a>
            ||&emsp;
            <a href="{{route('about')}}">About Us</a>
            ||&emsp;
            <a href="{{route('contactUs')}}">Contact us</a>

            ||&emsp; &emsp; &emsp; &emsp; 
            
            <a href="{{route('cus.profile')}}">Edit Profile</a>
            ||&emsp; 
            <a href="{{route('cus.cart')}}">Cart</a>
            ||&emsp;
            <a href="{{route('order.list')}}">Orders</a>
            ||&emsp;
            <button type="button"><a href="{{route('user.logout')}}">Logout</a></button>

            
        </div>
        <br>
        <div>
            @yield('content')
        </div>
    </body>
</html>