<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCalendarEventUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calendar_event_user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('calendar_event_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('author_id');
            $table->foreign('calendar_event_id')->references('id')->on('calendar_events')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('calendar_event_user');
        $table->dropForeign('calendar_event_id');
        $table->dropForeign('user_id');
        $table->dropForeign('author_id');
    }
}
