<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderMedicineTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_medicine', function (Blueprint $table) {
           
            $table->increments('om_id');
            $table->integer('order_id')->unsigned();
            $table->integer('medicine_id')->unsigned();
            $table->integer('quantity')->unsigned();

            $table->foreign('order_id')->references('order_id')->on('orders')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('medicine_id')->references('medicine_id')->on('medicines')->onDelete('cascade')->onUpdate('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_deliveryman');
    }
}
