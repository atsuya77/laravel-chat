ons.ready(() => {
  //APIKey
  const apiKey = "DZZkCS28ySsGr4OojWh2rUcWzIiQYFhI";

  $("#send").on("click", (e) => {
    if ($("#message").val() === "") return;
// 自分の発言
    $('#chats').append(`
        <ons-list-item modifier="nodivider">
          <div class="right">
            <span class="msg">${$("#message").val()}</span>
          </div>
        </ons-list-item>
    `);
    //API
    const postAPI = () => {
      return new Promise((resolve) => {
        $.ajax({
          url: "https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk",
          type: 'POST',
          data: { apikey: apiKey, query: $("#message").val() }
        }).then((data) => {
          //chatbotの返事
          $('#chats').append(`
        <ons-list-item modifier="nodivider">
          <span class="msg--reply">${data.results[0]['reply']}</span>
        </ons-list-item>
      `);
          resolve(data)
        }).fail((data) => {
          alert('失敗しました。');
        });
      })
    }
    const postController = (query,value) => {
      return new Promise((resolve) => {
        $.ajax({
          url: "post",
          type: 'POST',
          data: { query ,value},
          headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
        }).then((data) => {
          resolve(data)
        }).fail((data) => {
          alert('失敗しました。');
        });
      })
    }
    const postDB = async () => {
      const responce = await postAPI()
      console.log(responce)
      // 自分のメッセージ内容をDBに格納
      const result1 = await postController($("#message").val(),"1")
      // Talk APIからの返信をDBに格納
      const result2 = await postController(responce.results[0].reply,"2")

      console.log(result1)
      console.log(result2)
      // 元の入力内容は削除
      $("#message").val("")
    }

    postDB()
  });
  const getDB = () => {
    $.ajax({
          url: "get",
          dataType:"json",
          headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
        }).then((data) => {
          // チャットの中身が0件の時
          if (!data.chats.length) {
            $('#chats').empty()
            return
          }

          data.chats.forEach((chat, i) => {
            if(chat.value === "1"){
              $('#chats').append(`
                <ons-list-item modifier="nodivider">
                  <div class="right">
                    <span class="msg">${data.chats[i].text}</span>
                  </div>
                </ons-list-item>
              `);
            } else if(chat.value === "2"){
              $('#chats').append(`
                <ons-list-item modifier="nodivider">
                  <span class="msg--reply">${data.chats[i].text}</span>
                </ons-list-item>
              `);
            }
          })
        }).fail((data) => {
          alert('失敗しました。');
        });
  };
  getDB();

  $("#send2").on("click", (e) => {
    $.ajax({
      url:"reset",
      type: 'POST',
      headers:{
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    }).then((data) =>{
      console.log(`${data}件削除しました`);
      getDB();
    }).fail(() => {
      alert('失敗しました。');
    })
  })
});
