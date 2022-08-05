<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EPCart extends Model
{
    use HasFactory;
    protected $table='carts';
    public $timestamps=false;

    public function Customer(){
        return $this->belongsTo(EPCustomer::class,'customer_id', 'customer_id');
    }

    public function Medicines(){
        return $this->belongsTo(EPMedicine::class,'medicine_id','medicine_id');
    }
}
