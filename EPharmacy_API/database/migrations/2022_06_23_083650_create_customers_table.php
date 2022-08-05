<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->increments('customer_id');
            $table->string('customer_name',35);
            $table->string('customer_email',30)->unique();
            $table->string('customer_mob',15)->unique();
            $table->string('customer_add',70);
            $table->string('password',60);
            $table->timestamps();
           // $table->timestamp('email_verified_at')->nullable();
            //$table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers');
    }
}
