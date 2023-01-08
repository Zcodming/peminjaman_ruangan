<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePinjamRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'nama_ruangan' => 'required',
            'nama_peminjam' => 'required',
            'nim' => 'required',
            'keterangan' => 'required',
            'tanggal_peminjaman' => 'required',
            'waktu_peminjaman' => 'required',
            'sesi' => 'required',
        ];
    }
}
