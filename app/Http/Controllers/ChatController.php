<?php

namespace App\Http\Controllers;

use App\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
  //フォームデータ格納
  public function post(Request $request)
  {
    $parmas = Chat::create([
      'text' => $request["query"],
      'value' => $request["value"],
    ]);
    return $parmas;
  }
  public function get()
  {
    $chats = Chat::all();
    $data = ['chats' => $chats];
    return response()->json($data);
  }
  public function reset()
  {
    $result = Chat::query()->delete();
    return $result;
  }
}
