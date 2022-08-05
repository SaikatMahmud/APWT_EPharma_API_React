<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EPDeliveryman extends Model
{
    use HasFactory;
    protected $table='deliverymans';

    public function Orders(){
        return $this->hasMany(EPOrder::class,'d_id','delman_id');
    }
}
