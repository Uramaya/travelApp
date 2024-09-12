<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->bigIncrements('id')->index();
            $table->string('title', 70)->default('');
            $table->string('time_zone_name', 50);
            $table->timestamp('start')->default(Carbon::now()->setTimezone('utc'));
            $table->timestamp('end')->default(Carbon::now()->setTimezone('utc')->addHours(1));
            $table->integer('watch')->default(0);
            $table->integer('like')->default(0);
            $table->unsignedBigInteger('location_id')->nullable()->default(null)->index();
            $table->foreign('location_id')->references('id')->on('locations')->OnDelete('cascade');
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
        Schema::dropIfExists('events');
        $table->dropForeign('events_marker_id_foreign');
        $table->dropForeign('events_author_id_foreign');
        $table->dropForeign('events_event_type_id_foreign');
        $table->dropForeign('events_location_id_foreign');
    }
}
