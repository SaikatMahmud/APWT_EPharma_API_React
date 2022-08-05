@extends('layouts.afterLogin')
{{-- @php $cus=Session::get('loggedCustomer'); @endphp --}}
@section('content')
<h4>{{Session::get('msg')}}</h4>
@php
    $image=Session::get('loggedCustomer')->pro_pic;
   // $image=Session::get('loggedCustomer')->customer_id."_".Session::get('loggedCustomer')->customer_name.".jpg";
   // $imageFull=Storage::extension('public/cus_pic/'.$image);
@endphp
<p><img src="{{asset('storage').'/'.$image}}" alt="profile pic" height="90px" width="100px"><br></p>

<form method="post" action="" enctype="multipart/form-data">
    {{@csrf_field()}}
    Name: <input type="text" name="name" value="{{$cus->customer_name}}"><br>
    @error('name')
    {{$message}} <br>
    @enderror
    
    Email: <input type="text" name="email" value="{{$cus->customer_email}}"><br>
    @error('email')
    {{$message}}<br>
    @enderror
    
    Mobile: <input type="text" name="mobile" value="{{$cus->customer_mob}}"><br>
    @error('mobile')
    {{$message}}<br>
    @enderror
    
    Address: <input type="text" name="address" value="{{$cus->customer_add}}"><br>
    @error('address')
    {{$message}}<br>
    @enderror
    <br>
    Upload profile pic-<input type="file" name='cus_pic'>
    @error('cus_pic')
        {{$message}}<br>
        @enderror
        <br>
        <br>
        <input type="submit" value="Save">
    </form>
@endsection
