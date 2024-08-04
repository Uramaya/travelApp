<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
            'watch' => 'required | integer',
            'like' => 'required | integer',
            // 'location' => 'required',
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
