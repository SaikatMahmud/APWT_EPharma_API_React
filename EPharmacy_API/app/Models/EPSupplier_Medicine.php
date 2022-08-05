<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EPSupplier_Medicine extends Model
{
    use HasFactory;
    protected $table='supplier_medicine';

    public function Medicines(){
        return $this->belongsTo(EPMedicine::class,'medicine_id','medicine_id');
    }

    public function Suppliers(){
        return $this->belongsTo(EPSupplier::class,'supplier_id','supplier_id');
    }

}
