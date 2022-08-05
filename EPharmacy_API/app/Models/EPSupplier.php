<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EPSupplier extends Model
{
    use HasFactory;
    protected $table='suppliers';

    public function Medicines(){
        return $this->hasMany(EPSupplier_Medicine::class,'supplier_id','supplier_id');
    }

}
