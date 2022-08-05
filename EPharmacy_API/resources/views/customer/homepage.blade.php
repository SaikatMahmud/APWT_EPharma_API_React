
@extends((!session()->has('loggedCustomer') ? 'layouts.beforeLogin' : 'layouts.afterLogin'))
@if (session()->has('loggedCustomer'))
@php $user=session()->get('loggedCustomer'); @endphp    
@endif

@section('content')
<h4>{{Session::get('regSuccess')}}</h4>
<h1 align='center'>Customer Homepage <br><br><i>``````Get medicine at your doorstep !``````</i></h1>
<form method="get" action="{{route('search.result')}}">
<input type="text" name="search" placeholder="Search here" value="">
<br>
@error('search')
{{$message}} <br>
@enderror
<input type="submit" value="search">

</form>
@endsection