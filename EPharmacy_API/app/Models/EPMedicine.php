<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EPMedicine extends Model
{
    use HasFactory;
    protected $table='medicines';
    protected $primaryKey = 'medicine_id';
    public $timestamps=false;

    public function Orders(){
        //return $this->hasMany(EPOrder_Medicine::class,'medicine_id','medicine_id');
        //return $this->belongsToMany(EPOrder_Medicine::class,'medicine_id','medicine_id');
       // return $this->belongsToMany(EPOrder::class,'order_medicine','medicine_id','order_id','medicine_id','order_id'); //attach kaj kore
        return $this->belongsToMany(EPOrder::class,'order_medicine','medicine_id','order_id'); //attach kaj kore
       // return $this->belongsToMany(EPOrder::class,'order_medicine');
    }

    public function Suppliers(){
        return $this->hasMany(EPSupplier_Medicine::class,'medicine_id','medicine_id');
    }

    public function Carts(){
        return $this->hasMany(EPCart::class,'medicine_id','medicine_id');
    }

}
