$(function(){
  const $yomi = $("#yomi");
  const $mondai = $("#mondai");
  const $finishPanel = $("#finish-panel");
  const $countSelect = $("#count-select");
  const $correctMassage = $("#correct-message");
  const $mistakeMassage = $("#mistake-message");
  const $timeMessage = $("#time-message");

  let char_index = 1;
  let max_length = 3;
  let question_number = 1;
  let question_limit = 3;
  let done_question = {};
  let typing_cnt = 0;//タイプした合計
  let correct_cnt = 0;//正解タイプ数
  let mistake_cnt = 0;//間違えたタイプ数
  let start_game = false;
  let start_time = 0;

  const mondai_list = [
    {yomi: "ごはん", text:"gohan"},
    {yomi: "おすし", text:"osushi"},
    {yomi: "サイフ", text:"saifu"},
    {yomi: "バナナ", text:"banana"},
    {yomi: "くつした", text:"kutusita"},
    {yomi:'なべ', text:'nabe'},
    {yomi:'あし', text:'ashi'},
    {yomi:'パソコン', text:'pasokon'},
    {yomi:'けいたい', text:'keitai'},
    {yomi:'ふとん', text:'futon'},
  ];

  
  //問題数の選択----------------------------------
  changeQuestionWord(getQuestionNumber());
  
  $countSelect.on("change", function(e){
    question_limit = Number($countSelect.val());
    done_question = {};
    changeQuestionWord(getQuestionNumber());
  });
  //------------------------------------------------
  //開始-------------------------------------------
  $(document).on("keypress",function(e){

    if(!start_game && e.keyCode === 32){
      start_game = true;
      start_time = performance.now();
      return;
    } else if (!start_game){
      return;
    }
    
    typing_cnt++;

    const $target = $("#char-"+char_index);
    const char = $target.text();
    if(e.key === char){
      $target.removeClass('default');
      $target.addClass('correct');
      char_index++;
      correct_cnt++;
    } else {
      mistake_cnt++;
    }

    if(max_length < char_index){
      question_number++;
      if(question_limit < question_number){
        finish();
        return;
      }
      changeQuestionWord(getQuestionNumber());
      char_index = 1;
    }

  });
  //----------------------------------------------------------
  

  function changeQuestionWord(index) {
    const word = mondai_list[index]['text'];
    max_length = word.length;
    let newHtml = "";
    for(let i = 0; i < max_length; i++){
      newHtml += '<p id="char-'+(i+1)+'" class="text default">'+word[i]+'</p>';
    }
    $mondai.html(newHtml);
    $yomi.text(mondai_list[index]["yomi"]);
  }
  
  function getQuestionNumber(){
    let random_number = Math.floor(Math.random()*10);
    while(done_question[random_number] !== undefined){
      random_number = Math.floor(Math.random() * 10);
    }
    done_question[random_number] = random_number;
    return random_number;
  }
  
  function finish() {
    $finishPanel.removeClass("hidden");
    $yomi.hide();
    $mondai.hide();
    $correctMassage.text("正解数;"+correct_cnt+"/"+typing_cnt+"("+Math.floor(correct_cnt/typing_cnt*100)+"%)");
    $mistakeMassage.text('間違い数:'+mistake_cnt+"/"+typing_cnt+"("+Math.floor(mistake_cnt/typing_cnt*100)+"%)");

    const end_time = performance.now();
    const typing_time = ((end_time - start_time)/1000).toFixed(2);
    $timeMessage.text("かかった時間:"+typing_time+"秒");
  }


});