@extends('layouts.beforeLogin')
@section('content')
<form method="post" action="">
    {{ @csrf_field() }}
    Name: <input type="text" name="name" placeholder="Name" value="{{old('name')}}"><br>
    @error('name')
    {{ $message }}<br>
    @enderror

    Email: <input type="text" name="email" placeholder="Email" value="{{old('email') }}"><br>
    @error('email')
    {{ $message }} <br>
    @enderror

    Mobile: <input type="text" name="mobile" placeholder="Mobile number" value="{{old('mobile')}}"><br>
    @error('mobile')
    {{ $message }} <br>
    @enderror

    Password: <input type="password" name="password"><br>
    @error('password')
    {{ $message }} <br>
    @enderror

    Confirm Password: <input type="password" name="confirmPass"><br>
    @error('confirmPass')
    {{ $message }}<br>
    @enderror

    <input type="submit" value="Create">
</form>
@endsection