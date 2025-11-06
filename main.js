
window.addEventListener("load", ()=>{
    const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlearray = [];
let hue = 0;

const mouse = {
    x:null,
    y:null,
}

canvas.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i<2; i++){particlearray.push(new particelle())}


})

class particelle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random()* 8+1
        this.speedx = Math.random()* 3 -1.5;
        this.speedy = Math.random()* 3 -1.5;
        this.color =  "#bee5f5"//`hsl(${hue},100%,50%)`
    }
    update(){
        this.x += this.speedx;
        this.y += this.speedy;
        if(this.size>0.2){this.size -= 0.1;}
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.size,0,Math.PI*2);
        ctx.fill();
    }
}

function handler(){
    for(let i = 0; i<particlearray.length; i++){
    particlearray[i].update();
    particlearray[i].draw();
    for(let j = i;j<particlearray.length; j++){
        let dx = particlearray[i].x - particlearray[j].x;
        let dy = particlearray[i].y - particlearray[j].y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance<100){
            ctx.beginPath();
            ctx.strokeStyle = particlearray[i].color;
            ctx.lineWidth = 0.5
            ctx.moveTo(particlearray[i].x,particlearray[i].y);
            ctx.lineTo(particlearray[j].x,particlearray[j].y);
            ctx.stroke();


        }
    }
    if(particlearray[i].size<=0.3){
    particlearray.splice(i, 1);
    i--;
}

}

}

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handler();
    hue+=2;
    requestAnimationFrame(loop);
}
loop()
});
