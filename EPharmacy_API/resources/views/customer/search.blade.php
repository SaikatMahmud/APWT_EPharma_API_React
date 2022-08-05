@extends((!session()->has('loggedCustomer') ? 'layouts.beforeLogin' : 'layouts.afterLogin'))
@if (session()->has('loggedCustomer'))
@php $user=session()->get('loggedCustomer'); @endphp
@endif

@section('content')
<div style="text-align: right;">
    <form method="get" action="{{route('search.result')}}">
        <input type="text" name="search" placeholder="Search here" value="">
        <br>
        @error('search')
        {{$message}} <br>
        @enderror
        <input type="submit" value="search">
    </form>
</div>
@error('stockOut')
{{$message}} <br>
@enderror
@foreach ($results as $key=>$med)
<table border="1" align="center" cellpadding="10" width="40%">
    <td>
        Name: {{$med->medicine_name}}<br>
        Genre: {{$med->genre}}<br>
        Brand: {{$med->Suppliers()->where('medicine_id',$med->medicine_id)->first()->Suppliers->supplier_name}}
        &emsp;&emsp;&emsp; {{--<button><a href="{{route('check.stock',['id'=>$med->medicine_id])}}">Buy now</a></button>
        --}}
        Details: <a href="{{route('med.details',['id'=>$med->medicine_id])}}">see more</a>...<br>
        Price: {{$med->price}} TK
        <div style="text-align: right;">
            <form method="post" action="{{route('cus.addtocart')}}">
                {{@csrf_field()}}
                <input type="number" name="quantity{{$key}}" value="{{old('quantity'.$key)}}" placeholder="Quantity">
                <{{$med->availability}} pc<br>
                    @error('quantity'.$key)
                    {{$message}} <br>
                    @enderror
                    <input type="hidden" name="key" value="{{$key}}">
                    <input type="hidden" name="medId" value="{{$med->medicine_id}}">
                    <input type="hidden" name="avlQuantity" value="{{$med->availability}}">
                    <button>Add to cart</button>&emsp;&emsp;&emsp;&emsp;&emsp;
            </form>
        </div>
        <b>{{Session::get('added'.$key)}}</b>
    </td>
</table>
&nbsp;
@endforeach
<br>
<div align="center">{{ $results->links() }}</div>
@endsection