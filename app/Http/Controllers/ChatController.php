<?php

namespace App\Http\Controllers;

use App\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return view('index');
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create(Request $request)
  {
    $msg = $request->input('msg');
    // 変数をビューに渡す
    return view('index')->with([
      "msg" => $msg
    ]);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  //フォームデータ格納
  public function post(Request $request)
  {
    return response()->json(['test' => $request]);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Chat  $chat
   * @return \Illuminate\Http\Response
   */
  public function show(Chat $chat)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Chat  $chat
   * @return \Illuminate\Http\Response
   */
  public function edit(Chat $chat)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Chat  $chat
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Chat $chat)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Chat  $chat
   * @return \Illuminate\Http\Response
   */
  public function destroy(Chat $chat)
  {
    //
  }
}
