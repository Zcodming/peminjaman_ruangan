<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
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
            "title" => $this->title,
            "nama_peminjam" => $this->nama_peminjam,
            "keterangan" => $this->keterangan,
            "start" => $this->start,
            "end" => $this->end,
            "waktu_mulai" => $this->waktu_mulai,
            "waktu_selesai" => $this->waktu_selesai,
        ];
    }
}
