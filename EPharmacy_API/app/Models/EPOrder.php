<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EPOrder extends Model
{
    use HasFactory;
    protected $table='orders';
    protected $primaryKey = 'order_id';

    public function Customers(){
        return $this->belongsTo(EPCustomer::class,'c_id','customer_id');
    }

    public function Delmans(){
        return $this->belongsTo(EPDeliveryman::class,'d_id','delman_id');
    }

    public function Medicines(){
       // return $this->hasMany(EPOrder_Medicine::class,'order_id','order_id');
       // return $this->belongsToMany(EPOrder_Medicine::class,'order_id','order_id');

    //    return $this->belongsToMany(EPMedicine::class, 'order_medicine','order_id','medicine_id','order_id','medicine_id')
    //    ->withPivot(['quantity']);
       return $this->belongsToMany(EPMedicine::class, 'order_medicine','order_id','medicine_id')
       ->withPivot(['quantity']);

    }

}
