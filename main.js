var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
// canvas 기본 세팅

//네모그리기
//ctx.fillStyle = 'green';
//ctx.fillRect(10,10, 100,100); // (10,10) 위치에 (100,100) 크기의 네모

//오브젝트들의 정보

var dino = {
	x : 10,
	y : 200,
	width: 50,
	height: 50,
	draw(){
		ctx.fillStyle = 'green'; //색상
		//히트박스
		ctx.fillRect(this.x,this.y, this.width,this.height);
		/* 
		이미지로 캐릭터 그리기
		ctx.drawImage(img1, this.x, this.y)
		*/
	}
}

/* ----- 이미지 생성
var img1 = new Image();
img1.src = 'imageRoute';
*/

dino.draw(); //캐릭터 등장할 때마다 그리기
//애니매이션
dino.x = 100; //이러면 이동하긴 함.

// 애니메이션을 만들려면 1초에 60번 x++ 해줘야 함.

/*
function 프레임마다실행할거() {
	//1초에 60번 실행할 코드
	requestAnimationFrame(프레임마다실행할거)
}
프레임마다실행할거();
*/

var timer = 0;
var jumpTimer = 0;
var animation;
//장애물을 담을 배열
var cactuses = [];

function frameEvent(){
	animation = requestAnimationFrame(frameEvent);
	timer++;
	
	ctx.clearRect(0,0, canvas.width, canvas.height); // 캔버스 지웠다가 다시 그리기
	
	if(timer%120 === 0){
		var cactus = new Cactus();
		cactuses.push(cactus);
		// timer를 증가시키면서 timer를 모니터 프레임으로 나누면 1초에 한 번만 그려지게 해주겠지?
	}
	//여러개를 한 번에 그려주기
	cactuses.forEach((e, i ,o) => {
		//x좌표가 0 미만이면 제거해주기
		if(e.x < 0){
			o.splice(i,1);
			// o : 반복문을 돌리는 배열 객체
			// i : 해당 인덱스
			// splice: i 부터 1개 제거
		};
		//충돌체크는 장애물 반복문 안에서 해야 모든 장애물에 대해서 충돌체크를 할 수 있다.
		collisionDetector(dino, e);
		
		e.x--;
		e.draw();
	});
	
	//스페이스바를 누르면 jumpBoolean가 true로 바뀌고 아래 코드가 실행
	if (jumpBoolean) {
		dino.y -= 3; 
		jumpTimer++;
		
	}
	if (!jumpBoolean){
		if (dino.y < 200){
			dino.y += 3;	
		}else{
			jumpTimer = 0;
		}
		
	}
	if (jumpTimer > 60){
		jumpBoolean = false;
	}
	
	dino.draw();
	// 실행 횟수는 모니터 FPS에 따라 다름
}
frameEvent(); //실행


//충돌확인
function collisionDetector(dino, cactus){
	var diffX = cactus.x - (dino.x + dino.width); //dino의 우측 x좌표
	var diffY = cactus.y - (dino.y + dino.height); //dino의 우측 y좌표
	if(diffX < 0 && diffY < 0){
		//캔버스 클리어
		ctx.clearRect(0,0, canvas.width, canvas.height);
		//게임 정지 (프레임 정지)
		cancelAnimationFrame(animation);
	}
	
}







//스페이스바 누르면 점프
var jumpBoolean = false;
document.addEventListener('keydown', (e)=> {
	if(e.code ==='Space') {
		jumpBoolean = true;	
		
	}
	
});



//장애물
//여러번 등장하는 객체는 클래스로 관리
class Cactus {
	constructor(){
		this.x = 500;
		this.y = 200;
		this.width = 50;
		this.height = 50;
	}
	//생성메서드
	draw(){
		ctx.fillStyle = 'red'; //색상
		ctx.fillRect(this.x,this.y, this.width,this.height);
	}
	
}





