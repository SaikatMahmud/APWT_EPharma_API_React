@extends((!session()->has('loggedCustomer') ? 'layouts.beforeLogin' : 'layouts.afterLogin'))
@if (session()->has('loggedCustomer'))
@php $user=session()->get('loggedCustomer'); @endphp
@endif
@section('content')
<div style="text-align: right;">
    <form method="get" action="{{route('search.result')}}">
        <input type="text" name="search" placeholder="Search here" value="">
        <input type="submit" value="search">
    </form>
</div>
@error('stockOut')
{{$message}} <br>
@enderror
<div>
    <p align="center"><b>Medicine details:</b></p>
    <table border="2" align="center" cellpadding="10" width="30%">
        <td>
            Name: {{$med->medicine_name}}<br><br>
            Genre: {{$med->genre}}<br><br>
            Brand:
            {{$med->Suppliers()->where('medicine_id',$med->medicine_id)->first()->Suppliers->supplier_name}}<br><br>
            Price: {{$med->price}} TK
            &emsp;&emsp;&emsp;&emsp; {{--<button><a href="{{route('check.stock',['id'=>$med->medicine_id])}}">Buy
                    now</a></button> --}}
            <div style="text-align: right;">
                <form method="post" action="{{route('cus.addtocart')}}">
                    {{@csrf_field()}}
                    @php $key=0; @endphp
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
</div>
&nbsp;
<div>
    <table border="1" align="center" cellpadding="10" width="40%">
        <td>
            Details:<br>{{$med->details}}<br>

        </td>
    </table>
</div>
@endsection