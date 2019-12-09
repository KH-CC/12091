var subQdata = null;
let Sdots = [];
var Ssin;
var Nsin;

var Shong;
var Nhong;

function preload() {
  var url = 'http://openapi.seoul.go.kr:8088/45786a556e6b6768363467634e5979/json/CardSubwayStatsNew/25/70/20191201';
  loadJSON(url, onSubQ);
  if (subQdata == null) return;
}
  

function setup() {

  createCanvas(windowWidth, windowHeight);


  //신촌 데이터
  
  for (var i = 25; i < 70; i++) {
    if (subQdata.row[i].SUB_STA_NM == "신촌") {
      Ssin = subQdata.row[i].SUB_STA_NM;
      Nsin = map(subQdata.row[i].RIDE_PASGR_NUM,0,100000,100,1000);
    }
    //점만들기
    for (i = 0; i <= Nsin; i++) {
      fill(128,235,121);
      Sdots[i] = new Dot(200, 200, random(-2, 2), random(-2, 2), 10, 10);
    }
  }
}

function draw() {

  background(220);
  
  //신촌 점 움직이기
  for (i = 0; i <= Nsin; i++) {
    fill(128,235,121);
    Sdots[i].move();
    Sdots[i].render();
  }

}


function Dot(x, y, vx, vy, sz) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.sz = sz;
  this.move = function() {
    this.x += this.vx;
    if (this.x < 0 || this.x > windowWidth) this.vx = -this.vx;
    this.y += this.vy;
    if (this.y < 0 || this.y > windowWidth) this.vy = -this.vy;

  }

  this.render = function() {
    ellipse(this.x, this.y, this.sz, this.sz)

  }
}




function onSubQ(data) {
  subQdata = data.CardSubwayStatsNew;
}