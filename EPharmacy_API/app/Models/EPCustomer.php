<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EPCustomer extends Model
{
    use HasFactory;
    protected $table='customers';
    public $timestamps=false;
    
    protected $hidden=['password'];

    public function Orders(){
        return $this->hasMany(EPOrder::class,'c_id','customer_id');
    }
    public function Carts(){
        return $this->hasMany(EPCart::class,'customer_id','customer_id');
    }
}
