/* function playerposition(){
    let position = document.getElementById("nickname")
    let playerxy = position.split(',');
    return playerxy;
} 

let player = playerposition();
let player_x = player[1];
let player_y = player[2];  */

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
} // 캐릭터 색 정해줌 

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); // canvas 생성 

var img = new Image();
img.src = './knight.png';
/* var botimg = new Image();
botimg.src = './robot.png'; */ //안이뻐 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; //canva wrapper 크기 지정 

var world = {
    x : Math.floor(Math.random()*1920),
    y : Math.floor(Math.random()*1080),
    width : 100,
    height : 100,
    draw(){
        ctx.drawImage(img,world.x,world.y,world.width,world.height);
    }
} // 플레이어 오브젝트

class Cactus{
    constructor(){
        this.x = Math.floor(Math.random()*1920)
        this.y = Math.floor(Math.random()*1080)
        this.width = 100;
        this.height = 100; 
    }
    draw(){
        ctx.fillStyle = getRandomColor();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.width/2,0,2*Math.PI);
        ctx.stroke();
    }
    /* draw_again(i){
        ctx.fillStyle = botcolor[i];
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }*/ //개같이 멸망 왜 안될까요 ~ 

} //아마 봇으로 이용할듯 , 봇 생성 클래스

let botnum =0; // 봇 갯수 
var timer =0; // 프레임 계산
var botlimits = []; // 봇 생성하고 저장하는 배열 
var botstop = []; // 멈춘 봇 저장 
function gamestart(){
    world.draw();

    for(var i=0; i< Math.floor(Math.random()*50); i++){
        botnum++;
        var cactus = new Cactus();
        cactus.draw();
        botlimits.push(cactus); 
        //  botcolor.push(cactus.fillStyle); 봇 색 저장이 안먹음 시발것 
    } //난수로 봇들 생성하고 배열에 저장 
    botlimits.forEach((a,i,o)=>{
        if(a.x < 0 || a.x >1920 || a.y <0 || a.y>1080){
            o.splice(i,1);
        }
    }); // 화면 위치 범위 벗어나면 제거 

    function mobsmove(){
        requestAnimationFrame(mobsmove);
        timer++;
        if(timer%60==0){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            
            botlimits.forEach((element,idx) => {
                element.draw();

               for(var i=1; i<botnum-1; i++){
                    var die = crash(element ,botlimits[idx+i],idx);
                    if(die == 0){
                        break;
                    }
                } // 전체 배열을 돌면서 주변 다른 봇들과  충돌했는지 확인하기 위한 반복문 
                element.width+=10;
                element.height+=10; // 일정 시간동안 일정량 세력이 늘어남 
                element.x-=2.5; // -5 해줘야지 그냥 옆으로 늘어나는게 아닌 제자리에서 늘어나는거처럼 보임 원일땐 -2.5 
            });
            botstop.forEach((element)=>{
                element.draw();
            });
            world.draw();
            world.x-=5;
            world.width+=10;
            world.height+=10;
        }        
    }
   mobsmove();
}

gamestart();

function crash(a,b,c){
    var x_different = b.x - (a.x + a.width/2); // x축 비교 
    var y_different = b.y - (a.y + a.height/2); // y축 비교  
    if(x_different<0 && y_different<0){
        botlimits[c] =1;
        botstop[c] = a;
        return 0;
    }
}//충돌확인  -> 여기가 젤 문제 로직은 괜찮은데 충돌 후에 어떻게 할 것인지 ;; 충돌 후를 구현했는데 시벌 이러시면 안되죠 ㅋㅋㅋㅋㅋㅋㅋ하 
