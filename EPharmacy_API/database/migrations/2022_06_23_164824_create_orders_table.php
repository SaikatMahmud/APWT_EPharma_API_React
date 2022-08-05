<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('order_id');
            $table->string('amount',10);
            $table->string('method',4);
            $table->integer('c_id')->unsigned();
            $table->integer('d_id')->unsigned();
            $table->string('status',10);

            $table->foreign('c_id')->references('customer_id')->on('customers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('d_id')->references('delman_id')->on('deliverymans')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
