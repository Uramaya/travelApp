<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventTitleRequest extends FormRequest
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
            'id' => 'required | integer',
            'title' => 'required | between:0,70',
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
