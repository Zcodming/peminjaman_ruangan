<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PinjamResource extends JsonResource
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
            "nim" => $this->nim,
            "keterangan" => $this->keterangan,
            "start" => $this->start,
            "end" => $this->end,
            "waktu_peminjaman" => $this->waktu_peminjaman,
        ];
    }
}
