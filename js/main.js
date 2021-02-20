$(function(){
  const $yomi = $("#yomi");
  const $mondai = $("#mondai");
  const $finishPanel = $("#finish-panel");

  const mondai_list = [
    {yomi: "ごはん", text:"gohan"},
    {yomi: "おすし", text:"osushi"},
    {yomi: "サイフ", text:"saifu"},
    {yomi: "バナナ", text:"banana"},
    {yomi: "くつした", text:"kutusita"},
  ];

  let char_index = 1;
  let max_length = 3;
  let question_number = 0;
  let question_limit = 4;

  $(document).on("keypress",function(e){
    const $target = $("#char-"+char_index);
    const char = $target.text();
    if(e.key === char){
      $target.removeClass('default');
      $target.addClass('correct');
      char_index++;
    }
    
    if (question_limit < question_number){
      alert('問題終了');
    }

    if(max_length < char_index){
      changeQuestionWord();
      char_index = 1;
      question_number++;
    }

  });
  

  function changeQuestionWord() {
    const word = mondai_list[question_number]['text'];
    max_length = word.length;
    let newHtml = "";
    for(let i = 0; i < max_length; i++){
      newHtml += '<p id="char-'+(i+1)+'" class="text default">'+word[i]+'</p>';
    }

    $mondai.html(newHtml);
    $yomi.text(mondai_list[question_number]["yomi"]);
  }

  function finish() {
    $finishPanel.removeClass("hidden");
    $yomi.hide();
    $mondai.hide();
  }

});