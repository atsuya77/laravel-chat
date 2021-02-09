<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <script type="text/javascript" src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/onsenui/css/onsenui.css">
  <link rel="stylesheet" href="https://unpkg.com/onsenui/css/onsen-css-components.min.css">
  <script src="https://unpkg.com/onsenui/js/onsenui.min.js"></script>
  <script src="js/main.js"></script>
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">

  <title>チャットボット</title>
</head>

<body>
  <ons-page>

    <ons-toolbar class="header center">
      <div class="center">チャットボット</div>
    </ons-toolbar>

    <div class="content">
      <ons-list id="chats">
      </ons-list>
    </div>

    <form action="/" method="POST" class="send-area">
      {{ csrf_field() }}
      <ons-input id="message" type="text" placeholder="メッセージ" class="send-area__input" name="msg"></ons-input>
      <ons-button id="send" modifier="quiet" class="send-area__btn">送信</ons-button>
    </form>
  </ons-page>
</body>

</html>