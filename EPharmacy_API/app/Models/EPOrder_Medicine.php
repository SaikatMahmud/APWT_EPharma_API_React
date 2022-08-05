<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EPOrder_Medicine extends Model
{
    use HasFactory;

    //******* THIS MODEL IS NOT REQUIRED *******************************************************************

    // protected $table='order_medicine';

    // public function Medicines(){
    //     return $this->belongsToMany(EPMedicine::class,'medicine_id','medicine_id');
    // }

    // public function Orders(){
    //     return $this->belongsToMany(EPOrder::class,'order_id','order_id');
    // }

    

}
