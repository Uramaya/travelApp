<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCalendarEventImageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calendar_event_image', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('calendar_event_id');
            $table->unsignedBigInteger('image_id');
            $table->foreign('calendar_event_id')->references('id')->on('calendar_events')->onDelete('cascade');
            $table->foreign('image_id')->references('id')->on('images')->onDelete('cascade');
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
        Schema::dropIfExists('calendar_event_image');
    }
}
