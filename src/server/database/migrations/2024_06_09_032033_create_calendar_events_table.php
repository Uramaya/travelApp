<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class CreateCalendarEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calendar_events', function (Blueprint $table) {
            $table->bigIncrements('id')->index();
            $table->string('title', 70)->default('');
            $table->unsignedBigInteger('marker_id')->nullable()->default(null)->index();
            $table->foreign('marker_id')->references('id')->on('markers')->OnDelete('cascade');
            $table->string('time_zone_name', 50);
            $table->date('start')->default(Carbon::now()->setTimezone('utc'));
            $table->date('end')->default(Carbon::now()->setTimezone('utc')->addHours(1));
            $table->tinyInteger('is_all_day')->default(0);
            $table->unsignedBigInteger('author_id')->nullable()->default(null)->index();
            $table->foreign('author_id')->references('id')->on('users')->OnDelete('cascade');
            $table->integer('watch')->default(0);
            $table->integer('like')->default(0);
            $table->unsignedBigInteger('event_type_id')->nullable()->default(null)->index();
            $table->unsignedBigInteger('location_id')->nullable()->default(null)->index();
            $table->unsignedBigInteger('location_from_id')->nullable()->default(null)->index();
            $table->unsignedBigInteger('location_to_id')->nullable()->default(null)->index();
            $table->foreign('event_type_id')->references('id')->on('event_types')->OnDelete('cascade');
            $table->foreign('location_id')->references('id')->on('locations')->OnDelete('cascade');
            $table->foreign('location_from_id')->references('id')->on('locations')->OnDelete('cascade');
            $table->foreign('location_to_id')->references('id')->on('locations')->OnDelete('locations');
            $table->string('description', 2000)->nullable()->default(null);
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
        Schema::dropIfExists('calendar_events');
        $table->dropForeign('calendar_events_marker_id_foreign');
        $table->dropForeign('calendar_events_author_id_foreign');
        $table->dropForeign('calendar_events_event_type_id_foreign');
        $table->dropForeign('calendar_events_location_id_foreign');
        $table->dropForeign('calendar_events_location_from_id_foreign');
        $table->dropForeign('calendar_events_location_to_id_foreign');
    }
}
