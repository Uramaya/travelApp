<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id')->index();
            $table->string('name', 70)->default('');
            $table->string('email', 225)->unique();
            $table->unsignedBigInteger('language_id')->nullable()->default(null)->index();
            $table->foreign('language_id')->references('id')->on('languages')->OnDelete('cascade');
            $table->text('icon_url')->nullable()->default(null);
            $table->string('time_zone_name', 50);
            $table->timestamp('email_verified_at')->nullable();
            // $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->datetime('deleted_at')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
