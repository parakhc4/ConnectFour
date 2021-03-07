var player1=prompt("Player 1 enter your Name. You will play Blue chips.");
var player1color= 'rgb(86, 151, 255)';
var player2=prompt("Player 2 enter your Name. You will play Red chips.");
var player2color='rgb(237, 45, 73)';

var gameon= true;
var table= $('table tr')
function reportWin(rowNum,colNum){
  console.log("You won starting at row, ");
  console.log(rowNum);
  console.log(colNum);
}
function changeColor(rowNum,colNum,color)
{
  return table.eq(rowNum).find('td').eq(colNum).find('button').css('background-color',color);
}
function returnColor(rowNum,colNum)
{
  return table.eq(rowNum).find('td').eq(colNum).find('button').css('background-color'); //finding the background color of buttom atm
}

function checkBottom(colNum){
  var colorReport=returnColor(5,colNum);
  for(var row=5;row>-1;row--)
  {
    colorReport=returnColor(row,colNum);
    if(colorReport==='rgb(255, 255, 255)'){
      return row
    }
  }
}

function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(255, 255, 255)' && one !== undefined);
}

function horizontalWinCheck()
{
  for(var row=0;row<6;row++)
  {
    for(var col=0;col<4;col++)
    {
      if (colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3)))
      {
        console.log("horiz");
        reportWin(row,col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}
function verticalWinCheck()
{
  for(var col=0;col<7;col++)
  {
    for(var row=0;row<3;row++)
    {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col)))
      {
        console.log("vert");
        reportWin(row,col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}

function diagonalWinCheck()
{
  for(var col=0;col<5;col++)
  {
    for(var row=0;row<7;row++)
    {
      if (colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3)))
      {
        console.log("diag");
        reportWin(row,col);
        return true;
      }
      else if(colorMatchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3)))
      {
        console.log("diag");
        reportWin(row,col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}

function gameEnd(winnerName,currentColor){
  $('h1').text("Congratulations "+winnerName+" you have won!");
  $('body').css('background-color',currentColor);
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('table').fadeOut('slow');
      $('h3').fadeOut('slow');
      $('h2').fadeOut('slow');
      $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
    }
  }
}


var currentPlayer=1;
var currentName= player1;
var currentColor=player1color;

$('h2').text(player1+"'s turn. Select a circle")

$('.board button').on('click',function(){

  var col= $(this).closest("td").index(); //what is the index of the closest td of the selected column?
  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail,col,currentColor);
  if(horizontalWinCheck() ||verticalWinCheck()||diagonalWinCheck()){
    $('h1').text(currentName+"You have won!");
    gameEnd(currentName);
  }
  currentPlayer = currentPlayer*-1;

  if(currentPlayer==1){
    currentName= player1;
    $('h2').text(currentName+"'s turn.")
    currentColor= player1color;
  }
  else{
    currentName=player2;
    $('h2').text(currentName+"'s turn.")
    currentColor=player2color
  }
})
