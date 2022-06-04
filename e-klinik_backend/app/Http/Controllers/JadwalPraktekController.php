<?php

namespace App\Http\Controllers;

use App\Http\Traits\RequestTrait;
use App\Models\JadwalPraktek;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Traits\ResponseTrait;
use App\Models\Dokter;

class JadwalPraktekController extends Controller
{
    use ResponseTrait;
    use RequestTrait;
    public $days = [
        ['day' => 'sunday', 'code' => 'su'],
        ['day' => 'monday', 'code' => 'mo'],
        ['day' => 'tuesday', 'code' => 'tu'],
        ['day' => 'wednesday', 'code' => 'we'],
        ['day' => 'thursday', 'code' => 'th'],
        ['day' => 'friday', 'code' => 'fr'],
        ['day' => 'saturday', 'code' => 'sa'],
    ];
    public function seminggu(Request $request)
    {
        $jadwalPraktek = JadwalPraktek::with('dokter')->whereBetween('tgl_praktek', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->get();
        $jadwalPraktek = $jadwalPraktek->groupBy(['tgl_praktek', "jam_mulai", "jam_selesai", "status"]);
        return response()->json([
            'jadwal_praktek' => $jadwalPraktek
        ]);
    }

    public function index()
    {
        $jadwalPraktek = JadwalPraktek::all()
            ->groupBy(['tgl_praktek', "jam_mulai", "jam_selesai", "status"]);
        return response()->json([
            'jadwal_praktek' => $jadwalPraktek
        ]);
    }
    private function validated($request)
    {
        return Validator::make($request->all(), [
            'memberDokter' => ['required', 'array', 'min:1'],
            'memberDokter.*' => ['required', 'integer'],
            'tgl_praktek' => ['required', 'date_format:Y-m-d', 'after_or_equal:today'],
            'jam_mulai' => ['required', 'date_format:H:i:s'],
            'jam_selesai' => ['required', 'date_format:H:i:s', 'after:jam_mulai'],
            'status' => ['required'],
            'title' => ['required']
        ]);
    }
    public function storeSchedule($listDokter, $request, $tgl_praktek)
    {
        foreach ($listDokter as $key => $dokter) {
            JadwalPraktek::create([
                'title' => $request->title,
                'id_dokter' => $dokter->id,
                'tgl_praktek' => $tgl_praktek,
                'jam_mulai' => $request->jam_mulai,
                'jam_selesai' => $request->jam_selesai,
                'status' => $request->status
            ]);
        }
    }
    public function store(Request $request)
    {
        $interval = 1;
        $count = 1;
        $freq = 'daily';
        $next_schedule = '+1 days';
        if ($request->rRule) {
            $rules = explode(";", strtolower($request->rRule));
            $rules[0] = explode(":", $rules[0]);
            $rules[0] = $rules[0][1];
            $recurrenceRule = $this->createRecurrenceRule($rules);
        }
        if (isset($recurrenceRule)) {
            $freq = $recurrenceRule->freq;
            $interval = $recurrenceRule->interval;

            if ($recurrenceRule->count) {
                $count = $recurrenceRule->count;
            }
            if ($recurrenceRule->until) {
                $until = date('Y-m-d', strtotime($recurrenceRule->until));
            }
            if ($recurrenceRule->byday) {
                $byday = explode(",", $recurrenceRule->byday); //array hari
            }
            if ($freq === 'daily') {
                $next_schedule = "+{$interval} days";
            } else if ($freq === 'weekly') {
                // $interval = $interval * 7 - 1;
                $next_schedule = "+{$interval} weeks";
            }
            // return response()->json([
            //     'rRule' => $request->rRule,
            //     'recurrence_rules' => $recurrenceRule->all()
            // ]);
        }
        // 1. Validasi request
        $validator = $this->validated($request);
        // Validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'status' => 'validation failed',
                'errors' => $validator->failed()
            ]);
        }

        // 2. {TODO} Cari semua dokter berdasarkan id
        $listDokter = Dokter::find($request->memberDokter);
        // Dokter tidak ditemukan
        if (!$listDokter) {
            $response = [
                'status' => 'failed',
                'message' => 'dokter tidak ditemukan'
            ];
            return $this->responseFailed($request);
        }

        // 3. Menyimpan jadwal praktek
        $tgl_praktek = $request->tgl_praktek;
        // Membuatjadwal praktek hingga jumlah yang diinginkan
        if (!isset($until)) {
            if ($freq === 'daily') {
                // $this->storeSchedule($listDokter, $request, $tgl_praktek);
                for ($i = 0; $i < $count; $i++) {
                    $this->storeSchedule($listDokter, $request, $tgl_praktek);
                    $tgl_praktek = str_replace('-', '/', $tgl_praktek);
                    $tgl_praktek = date('Y-m-d', strtotime($tgl_praktek . $next_schedule));
                }
            } else if ($freq === 'weekly' && isset($byday)) {
                for ($i = 0; $i < $count; $i++) {
                    if (strtolower(date('D', strtotime($tgl_praktek))) !== 'sun') {
                        $tgl_praktek = strtotime('last sunday', strtotime($tgl_praktek));
                        $tgl_praktek = date('Y-m-d', $tgl_praktek);
                    }
                    foreach ($byday as $key => $next_day) {
                        foreach ($this->days as $day) {
                            if ($next_day === $day['code']) {
                                $tgl_praktek = strtotime($day['day'], strtotime($tgl_praktek));
                                $tgl_praktek = date('Y-m-d', $tgl_praktek);
                                if (strtotime(date('Y-m-d')) <= strtotime($tgl_praktek)) {
                                    $this->storeSchedule($listDokter, $request, $tgl_praktek);
                                }
                            }
                        }
                    }
                    $tgl_praktek = str_replace('-', '/', $tgl_praktek);
                    $tgl_praktek = date('Y-m-d', strtotime($tgl_praktek . $next_schedule));
                }
            }
        }
        // Membuat jadwal praktek hingga batas waktu tertentu
        else {
            $untilRequest = new Request();
            $untilRequest->setMethod('POST');
            $untilRequest->request->add([
                'until' => $until
            ]);
            $validator = Validator::make($untilRequest->all(), [
                'until' => ['date_format:Y-m-d', "after_or_equal:{$tgl_praktek}"]
            ]);
            if ($validator->fails()) {
                $response = [
                    'status' => 'validation failed',
                    'errors' => $validator->failed()
                ];
                return $this->responseFailed($response, 400);
            }
            do {
                if ($freq === 'daily') {
                    $this->storeSchedule($listDokter, $request, $tgl_praktek);
                    $tgl_praktek = str_replace('-', '/', $tgl_praktek);
                    $tgl_praktek = date('Y-m-d', strtotime($tgl_praktek . $next_schedule));
                } else if ($freq === 'weekly' && isset($byday)) {
                    // if (strtolower(date('D', strtotime($tgl_praktek))) !== 'sun') {
                    //     $tgl_praktek = strtotime('last sunday', strtotime($tgl_praktek));
                    //     $tgl_praktek = date('Y-m-d', $tgl_praktek);
                    // }
                    foreach ($byday as $key => $next_day) {
                        foreach ($this->days as $day) {
                            if (strtolower(date('D', strtotime($tgl_praktek))) !== 'sun') {
                                $tgl_praktek = strtotime('last sunday', strtotime($tgl_praktek));
                                $tgl_praktek = date('Y-m-d', $tgl_praktek);
                            }
                            if ($next_day === $day['code']) {
                                $tgl_praktek = strtotime($day['day'], strtotime($tgl_praktek));
                                $tgl_praktek = date('Y-m-d', $tgl_praktek);
                                if (strtotime(date('Y-m-d')) <= strtotime($tgl_praktek) && strtotime($tgl_praktek) <= strtotime($untilRequest->until)) {
                                    $this->storeSchedule($listDokter, $request, $tgl_praktek);
                                }
                            }
                        }
                    }
                    $tgl_praktek = str_replace('-', '/', $tgl_praktek);
                    $tgl_praktek = date('Y-m-d', strtotime($tgl_praktek . $next_schedule));
                    if (strtolower(date('D', strtotime($tgl_praktek))) !== 'sun') {
                        $tgl_praktek = strtotime('last sunday', strtotime($tgl_praktek));
                        $tgl_praktek = date('Y-m-d', $tgl_praktek);
                    }
                }
            } while (strtotime($tgl_praktek) <= strtotime($untilRequest->until));
        }
        $response = [
            'status' => 'success',
            'message' => 'Jadwal berhasil ditambahkan'
        ];
        return $this->responseSuccess($response);
    }
    public function detail($id)
    {
        // 1. Cari jadwal berdasarkan id
        $jadwal = JadwalPraktek::find($id);

        // 2. Cari relasi dokter nya
        $jadwal['dokter'] = $jadwal->dokter;
        // Jadwal tidak ditemukan
        if (!$jadwal) {
            $response = [
                'status' => 'failed',
                'message' => 'Jadwal tidak ditemukan'
            ];
            return $this->responseFailed($response);
        }
        // Jadwal ditemukan
        $response = [
            'status' => 'success',
            'jadwal_detail' => $jadwal
        ];
        return $this->responseSuccess($response);
    }
    public function destroy(Request $request)
    {
        // 1. Validasi request
        $validator = Validator::make($request->all(), [
            'id' => ['required', 'array', 'min:1'],
            'id.*' => ['required', 'integer'],
        ]);
        // Validasi gagal
        if ($validator->fails()) {
            return $this->responseValidationFailed($validator);
        }
        // 2. Hapus Jadwal
        $deleted = JadwalPraktek::destroy($request->id);
        if (!$deleted) {
            $response = [
                'status' => 'failed',
                'message' => 'Gagal menghapus jadwal praktek'
            ];
            return $this->responseFailed($response, 400);
        }
        // 3. Lakukan response
        $response = [
            'status' => 'success',
            'message' => 'Jadwal praktek berhasil dihapus'
        ];
        return $this->responseSuccess($response);
    }
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_jadwal' => ['required', 'array', 'min:1'],
            'id_jadwal.*' => ['required', 'integer'],
            'memberDokter' => ['required', 'array', 'min:1'],
            'memberDokter.*' => ['required', 'integer'],
        ]);
        if ($validator->fails()) {
            $response = [
                'status' => 'validation failed',
                'errors' => $validator->failed()
            ];
            return $this->responseFailed($response, 400);
        }
        $id_jadwal = $request->id_jadwal;
        $new_memberDokter = $request->new_memberDokter;
        // Membuat object request edit untuk divalidasi

        $editedJadwal = new Request();
        $editedJadwal->setMethod('POST');
        $editedJadwal->request->add([
            'memberDokter' => $request->memberDokter,
            'tgl_praktek' => $request->new_tgl_praktek ? $request->new_tgl_praktek : $request->tgl_praktek,
            'jam_mulai' => $request->new_jam_mulai ? $request->new_jam_mulai : $request->jam_mulai,
            'jam_selesai' => $request->new_jam_selesai ? $request->new_jam_selesai : $request->jam_selesai,
            'status' => $request->new_status ? $request->new_status : $request->status,
            'title' => $request->new_title ? $request->new_title : $request->title
        ]);
        $updatedJadwal = $this->validated($editedJadwal);
        if ($updatedJadwal->fails()) {
            $response = [
                'status' => 'validation failed',
                'errors' => $updatedJadwal->failed()
            ];
            return $this->responseFailed($response, 400);
        }
        foreach ($id_jadwal as $key => $jadwal) {
            JadwalPraktek::find($jadwal)
                ->update([
                    'title' => $updatedJadwal->validate()['title'],
                    'tgl_praktek' => $updatedJadwal->validate()['tgl_praktek'],
                    'jam_mulai' => $updatedJadwal->validate()['jam_mulai'],
                    'jam_selesai' => $updatedJadwal->validate()['jam_selesai'],
                    'status' => $updatedJadwal->validate()['status']
                ]);
        }
        if (isset($new_memberDokter) && count($new_memberDokter) === 0) {
            JadwalPraktek::destroy($id_jadwal);
            $response = [
                'status' => 'success',
                'message' => 'Berhasil mengubah jadwal'
            ];
            return $this->responseSuccess($response);
        }
        // $jadwalPraktek = JadwalPraktek::find($id_jadwal);
        if (isset($new_memberDokter)) {
            foreach ($new_memberDokter as $key => $id_dokter) {
                if (isset($id_jadwal[$key])) {
                    JadwalPraktek::find($id_jadwal[$key])
                        ->update([
                            'id_dokter' => $id_dokter,
                        ]);
                } else {
                    // Membuat object request jadwal praktek
                    $addJadwal = new Request();
                    $addJadwal->setMethod('POST');
                    $addJadwal->request->add([
                        'memberDokter' => [$id_dokter],
                        'tgl_praktek' => $updatedJadwal->validate()['tgl_praktek'],
                        'jam_mulai' => $updatedJadwal->validate()['jam_mulai'],
                        'jam_selesai' => $updatedJadwal->validate()['jam_selesai'],
                        'status' => $updatedJadwal->validate()['status'],
                        'title' => $updatedJadwal->validate()['title']
                    ]);
                    $this->store($addJadwal);
                }
            }
        }
        if (isset($new_memberDokter) && count($new_memberDokter) < count($id_jadwal)) {
            for ($i = count($new_memberDokter); $i < count($id_jadwal); $i++) {
                $this->destroy($id_jadwal[$i]);
            }
        }
        $response = [
            'status' => 'success',
            'message' => 'Jadwal berhasil diubah'
        ];
        return $this->responseSuccess($response);
    }
}
