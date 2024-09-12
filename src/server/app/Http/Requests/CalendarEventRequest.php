<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CalendarEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required | between:0,70',
            'time_zone_name' => 'required | between:0,50',
            'start' => 'required',
            'end' => 'required',
            'is_all_day' => 'required | integer',
            'watch' => 'required | integer',
            'like' => 'required | integer',
            'event_type' => 'required',
            // 'location' => 'required',
            // 'location_from' => 'required',
            // 'location_to' => 'required',
            'description' => 'between:0,2000',
            // 'users' => 'required',
            // 'images' => 'required',
            // 'authors' => 'required',
            // 'emails' => 'required',
            // 'pdfs' => 'required',
            'event_id' => 'required | integer',
        ];
    }

    // /**
    //  * set the validate instance
    //  *
    //  * @param  \Illuminate\Validation\Validator  $validator
    //  * @return void
    //  */
    // public function withValidator($validator)
    // {
    //     $validator->after(function ($validator) {
    //         if ($validator->fails()) {
    //             $validator->errors()->add('field', 'Something is wrong with this field!');
    //         }
    //     });
    // }
}
