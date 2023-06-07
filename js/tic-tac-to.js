/*
틱-택-토 게임에 대한 js코드는 인식문제에 오류가 계속 생겨 html header에 내장하여 사용하식으로 하였습니다.
게임에 대한 구현 코드는 tic-tac-to.html <Head>태그를 참고 해 주시기 바랍니다. 
*/

window.addEventListener("DOMContentLoaded", function () {
  if ($(window).width() > 900) {
    $('.hamburger').hide();
    $('.nav_items').show();
  } else {
    $('.hamburger').show();
    $('.nav_items').hide();
  }
});


$(window).resize(function () {
  if ($(window).width() > 900) {
    $('.hamburger').hide();
    $('.nav_items').show();
  } else {
    $('.hamburger').show();
    $('.nav_items').hide();
  }
});

$(document).ready(function () {
  $('.hamburger').click(function () {
    if ($('.nav_items').is(':visible')) {
      $('.nav_items').slideUp();
    } else {
      $('.nav_items').slideDown();
    }
  });
});

let board = [[0,0,0], [0,0,0], [0,0,0]]; // 0: 빈 칸, 1: 사용자(O), 2: 컴퓨터(X)
    let turn = 1; // 사용자의 턴부터 시작
    let gameover = false;

    function play(row, col) {
      // binding error가 있어 embed 방식으로 함수 구현  
        if (board[row][col] != 0 || gameover) return; // 이미 선택한 칸이거나 게임이 종료된 경우 무시
        board[row][col] = turn;
        document.getElementById(`${row}-${col}`).innerText = turn == 1 ? 'O' : 'X';
        document.getElementById(`${row}-${col}`).src = turn == 1 ? "../images/o.png" : '../images/x.png';

        if (checkWin(turn)) {
          alert(turn == 1 ? '사용자(O) 승리!' : '컴퓨터(X) 승리!');
          gameover = true;
          return;
        }
        if (checkDraw()) {
          alert('무승부!');
          gameover = true;
          return;
        }
        turn = turn == 1 ? 2 : 1; // 턴 변경
        if (turn == 2) {
          // 컴퓨터 턴
          setTimeout(() => {
            let row, col;
            do {
              row = Math.floor(Math.random() * 3);
              col = Math.floor(Math.random() * 3);
            } while (board[row][col] != 0);
            play(row, col);
          }, 500);
        }  
    };

  /*
  reset 함수는 게임이 끝나거나 사용자가 처음부터 게임을 다시 하고 싶을때 호출 되는 함수입니다.
  이 함수가 호출되면 td에 채워진 o나 x 에 대한 이미지들이 모두 지워지고 게임의 흐름이 초기화되어 다시 
  시작되는 방식입니다.
  */
  function reset() {
    board = [[0,0,0], [0,0,0], [0,0,0]];
    turn = 1;
    gameover = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        document.getElementById(i+'-'+j).innerText = '';
        document.getElementById(i+'-'+j).src= '../images/default.png';
      }
    }
  }
  /*
  세로, 가로 , 대각선을 먼저 채우면 이기는 게임 규칙 때문에 매 턴이 끝나면 checkwin 함수가 호출되어
  세로, 가로, 대각선에 대해 먼저 채우진 쪽이 있는지 확인하는 함수 입니다.
  */
  function checkWin(player) {
  for (let i = 0; i < 3; i++) {
      if (board[i][0] == player && board[i][1] == player && board[i][2] == player) return true; // 가로 체크
      if (board[0][i] == player && board[1][i] == player && board[2][i] == player) return true; // 세로 체크
    }
  if (board[0][0] == player && board[1][1] == player && board[2][2] == player) return true; // 대각선 체크
  if (board[0][2] == player && board[1][1] == player && board[2][0] == player) return true; // 대각선 체크
  return false;
  }
  
  /*
  무승부를 확인하는 함수이지만 실제로는 모든 같이 채워져잇따면 true반환하여 더 이상 게임 진행이
  불가능 한경우를 체크하는 기능을 합니다.
  */
  function checkDraw() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
      if (board[i][j] == 0) return false; // 빈 칸이 있는 경우 게임 계속
      }
    }
    return true; 
  }