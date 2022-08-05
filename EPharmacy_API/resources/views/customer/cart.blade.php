@extends('layouts.afterLogin')
@php $user=session()->get('loggedCustomer'); @endphp

@section('content')
@php
$subTotal=0;
@endphp

{{-- @if (session()->has('cart')) --}}
<div style="text-align: center;">
    <h3>Your cart</h3>
    <table border="1" align="center" cellpadding="4">
        <tr>
            <th>Medicine name</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
        @foreach($allCart as $cart) {{-- from Customer controller cart() function --}}
        <tr>
            <td align="center">{{$cart->where('cart_id',$cart->cart_id)->first()->Medicines->medicine_name}}</td>
            <td align="center">{{$cart->quantity}}</td>
            <td align="center">{{($cart->quantity)*($cart->where('cart_id',$cart->cart_id)->first()->Medicines->price)}}</td>
            <td><button><a href="{{route('cart.remove',['id'=>$cart->cart_id])}}">Remove from cart</a></button></td>
        </tr>
        @php $subTotal +=($cart->quantity)*($cart->where('cart_id',$cart->cart_id)->first()->Medicines->price);@endphp
        @endforeach
    </table><br>
    <li>Subtotal amount = <b>{{$subTotal}}</b> TK</li> <br><br><br>
</div>
@if ($subTotal==0)
<h2 align="center">Your cart is empty. Add medicine first to place order.</h2>
@else
<div style="text-align: center;">
    <h3>Check out ~</h3>
    <form method="post" action="{{route('confirm.order')}}">
        {{-- <form method="post" action="{{route('place.order')}}"> --}}
            {{@csrf_field()}}
            {{-- <input type="hidden" name="subTotal" value="{{$subTotal}}"> --}}
            {{-- <button>Checkout</button> --}}
            {{-- Your order amount is <b>{{$amount}}</b> TK<br><br> --}}
            <input type="hidden" name="amount" value="{{$subTotal}}">
            Payment method: <select name="method">
                <option value="">Select</option>
                <option value="COD">Cash on delivery</option>
                <option value="MFS">MFS</option>
            </select> <br>
            @error('method')
            {{ $message }} <br>
            @enderror <br>
            Delivery Address: <input type="text" name="address" placeholder="Provide address"
                value="{{$user->customer_add}}"><br>
            @error('address')
            {{ $message }} <br>
            @enderror
            <br>
            Contact: <u>{{$user->customer_mob}}</u><input type="hidden" name="mobile"
                value="{{$user->customer_mob}}"><br>
            @error('mobile')
            {{ $message }} <br>
            @enderror
            <br>
            <input type="submit" value="Place order">
        </form>
</div>
@endif
@endsection