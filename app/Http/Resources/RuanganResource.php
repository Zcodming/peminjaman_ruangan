<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RuanganResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "kode_ruangan" => $this->kode_ruangan,
            "nama_ruangan" => $this->nama_ruangan,
            "foto_ruangan" => $this->foto_ruangan,
        ];
    }
}
