@extends('layouts.afterLogin')
@section('content')
<br>
<table border="1" cellpadding="4">
    <tr>
        <th>Serial</th>
        <th>Order Number</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Action</th>
    </tr>
    @foreach ($orders as $key=>$order)
    <tr>
        <td align="center">{{$key+1}}</td>
        <td align="center"><a href="{{route('order.details',['id'=>$order->order_id])}}">#{{$order->order_id}}</a></td>
        <td align="center">{{$order->amount}}</td>
        <td align="center">{{$order->status}}</td>
        <td align="center">
            @if ($order->status=="Canceled")
            <button><a href="{{route('receipt.download',['id'=>$order->order_id])}}">Download</a></button>

            @else
            <button><a href="{{route('order.cancel',['id'=>$order->order_id])}}">Cancel</a></button>
            |<button><a href="{{route('receipt.download',['id'=>$order->order_id])}}"> Download</a></button>
        </td>
        @endif
    </tr>

    @endforeach
</table><br>
<div align="center">{{ $orders->links() }}</div>
@endsection