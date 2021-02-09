ons.ready(function () {
  //APIKey
  const apiKey = "DZZkCS28ySsGr4OojWh2rUcWzIiQYFhI";
  const msg = $("#message").val();
  // 送信ボタンを押した時の処理
  $("#send").on("click", function (e) {
  //   $.ajaxSetup({
  //     headers: {
  //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  //     }
  // });
    if ($("#message").val() === "") return;
    // 自分の発言
    $('#chats').append(
      console.log(msg)
    );
    //API
    const postAPI = async () => {
      return new Promise((resolve) => {
        $.ajax({
          url: "https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk",
          type: 'POST',
          data: { apikey: apiKey, query: $("#message").val() }
        }).then(function (data) {
          console.log(data)
          //chatbotの返事
          $('#chats').append();
          resolve(data)
        }).fail(function (data) {
          alert('失敗しました。');
        });
      })
    }
    const postController= async () => {
      return new Promise((resolve) => {
        $.ajax({
          url: "post",
          type: 'POST',
          data:  JSON.stringify($("#message").val()),
          headers:{
           'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
         },
         dataType:"json"
        }).then(function (data) {
          console.log(data)
          resolve(data)
        }).fail(function (data) {
          alert('失敗しました。');
        });
      })
    }
    const postDB = async () => {
      const responce = await postAPI()
      console.log(msg)
      const resolve = await postController()
      console.log(resolve)
      // Controller側に送る処理
      // 下記の二つをController経由でDBに格納
        // 自分のメッセージ内容: $("#message").val()
        // Talk APIからの返信: responce
    }

    postDB()

    // 元の入力内容は削除
    $("#message").val("")
  });
});