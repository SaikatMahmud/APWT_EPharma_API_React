<?php

namespace App\Http\Controllers;

use App\Models\EPCustomer;
use App\Models\EPDeliveryman;
use App\Models\EPMedicine;
use App\Models\EPOrder;
use App\Models\EPSupplier;
use Carbon\Carbon;
use Illuminate\Http\Request;

    //**********EITA EMNI, TRIAL******** *

class UserController extends Controller
{
    public function getAll(){
        $currentTime = Carbon::now();
        return $currentTime;
     // $med=EPMedicine::first()->Orders()->where('order_id',Orders->order_id)->first()->Delmans->delman_name;
    //  $med=EPMedicine::first()->Orders()->where('Order_id',3)->Delmans->delman_name;
    //  return $med;
        //$med=EPMedicine::all();
       // return $med;
        // foreach($med as $m)
        // {
        //     $ordr=$m->Orders()->where('medicine_id',$m->medicine_id)->first();
        //     $del=$ordr->where('order_id',$ordr->order_id)->first()->Orders;
        //     $del2=$del->where('d_id',$del->d_id)->first()->Delmans->delman_name;
        //     //return $ordr;
        //     return $del2;
        // }

        // foreach($med as $m)
        // {
        //     $ordr=$m->Suppliers()->where('medicine_id',$m->medicine_id)->first();
        //    $del=$ordr->where('supplier_id',$ordr->supplier_id)->first()->Suppliers->supplier_name;
        //     //$del2=$del->where('d_id',$del->d_id)->first()->Delmans->delman_name;
        //     //return $ordr;
        //     return $del;
        // }



    }
}
