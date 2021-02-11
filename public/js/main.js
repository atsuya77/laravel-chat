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
    const postAPI = async () => {
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
    const postController = async (query,value) => {
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
  function getDB(){
    $.ajax({
          url: "get",
          dataType:"json",
          headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
        }).then((data) => {
          for(var i = 0; i < data.chats.length; i++){
            if(data.chats[i].value=="1"){
              $('#chats').append(`
                <ons-list-item modifier="nodivider">
                  <div class="right">
                    <span class="msg">${data.chats[i].text}</span>
                  </div>
                </ons-list-item>
              `);
            }
            else if(data.chats[i].value=="2"){
              $('#chats').append(`
                <ons-list-item modifier="nodivider">
                  <span class="msg--reply">${data.chats[i].text}</span>
                </ons-list-item>
              `);
            }
          }
        }).fail((data) => {
          alert('失敗しました。');
        });
  };
  getDB();

  $("#send2").on("click", (e) => {
    console.log(e)
    $.ajax({
      url:"reset",
      type: 'POST',
      headers:{
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    }).fail(() => {
      alert('失敗しました。');
    })
  })
});
