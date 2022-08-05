@extends('layouts.afterLogin')
@php $user=session()->get('loggedCustomer'); @endphp



********** THIS PAGE IS NOT NEEDED ***********





@section('content')
<h3>Place your order</h3>
<form method="post" action="{{route('confirm.order')}}">
    {{@csrf_field()}}
    {{-- <input type="hidden" name="medId" value="{{$med->medicine_id}}">
    <input type="hidden" name="orgQuantity" value="{{$med->availability}}">
{{--     
    Medicine Name: <u>{{$med->medicine_name}}</u><input type="hidden" name="medName" value="{{$med->medicine_name}}"
        readonly><br>
    @error('medName')
    {{ $message }}<br>
    @enderror
    <br> --}}
    {{-- Quantity: <input type="number" name="quantity" value="{{old('quantity')}}">
    <{{$med->availability}} pc<br>
        @error('quantity')
        {{ $message }} <br>
        @enderror
        <br>
        Price: <u>{{$med->price}} TK</u>/pc <br><br>
        <br> --}}
        <input type="hidden" name="amount" value="{{$amount}}">
        Your order amount is <b>{{$amount}}</b> TK<br><br>
        Payment method: <select name="method">
            <option value="">Select</option>
            <option value="COD">Cash on delivery</option>
            <option value="MFS">MFS</option>
        </select> <br>
        @error('method')
        {{ $message }} <br>
        @enderror <br>
        Delivery Address: <input type="text" name="address" placeholder="provide address"
            value="{{$user->customer_add}}"><br>
        @error('address')
        {{ $message }} <br>
        @enderror
        <br>
        Contact: <u>{{$user->customer_mob}}</u><input type="hidden" name="mobile" value="{{$user->customer_mob}}"><br>
        @error('mobile')
        {{ $message }} <br>
        @enderror
        <br>
        <input type="submit" value="Place order">
</form>
@endsection