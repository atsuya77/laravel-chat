<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
  // protected $table = 'chats';

  // protected $guarded = ['id'];
  protected $fillable = [
    'text', 'value',
  ];
}
