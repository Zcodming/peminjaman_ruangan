<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePengajuanRequest extends FormRequest
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
            'email_peminjam' => 'required',
            'keterangan' => 'required',
            'tanggal_mulai_peminjaman' => 'required',
            'tanggal_selesai_peminjaman' => 'required',
            'waktu_mulai_peminjaman' => 'required',
            'waktu_selesai_peminjaman' => 'required',
        ];
    }
}
