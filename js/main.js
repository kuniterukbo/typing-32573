$(function(){
  const $yomi = $("#yomi");
  const $mondai = $("#mondai");
  const $finishPanel = $("#finish-panel");
  const $countSelect = $("#count-select");

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

  
  let char_index = 1;
  let max_length = 3;
  let question_number = 1;
  let question_limit = 3;
  
  changeQuestionWord(0);
  
  $countSelect.on("change", function(e){
    question_limit = Number($countSelect.val());
    changeQuestionWord(0);
  });

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
      question_number++;
      if(question_limit < question_number){
        finish();
        return;
      }
      changeQuestionWord(getQuestionNumber());
      char_index = 1;
    }

  });

  

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

  function finish() {
    $finishPanel.removeClass("hidden");
    $yomi.hide();
    $mondai.hide();
  }

  function getQuestionNumber(){
    const random_number = Math.floor(Math.random()*10);
    return random_number;
  }

});