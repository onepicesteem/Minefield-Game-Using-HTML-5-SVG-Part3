$(function(){

var svg = Pablo('#ground').svg({ //create svg with height and width
          width: 310,
          height: 310
      });
var area=new Array(5);

var pointX=10;
var pointY=10;


for (var i = 0; i < area.length; i++) {
  area[i]=new Array(5);
}

//console.log(area);

var bombs=new Array();

for (var i = 0; i < 3; i++) {
    var bomb={
      x:Math.floor(Math.random() * 5),
      y:Math.floor(Math.random() * 5)
    }

    bombs.push(bomb);
  }

for (var x = 0; x < 5; x++) {
    for (var y = 0; y < 5; y++) {

      var square={
        value:0,
        obj:rectBuilder(pointX,pointY,'#dcdde1'),
        pointX:pointX,
        pointY:pointY
      }
        area[x][y]=square;

        for (var i = 0; i < bombs.length; i++) {
          if(x==bombs[i].x && y==bombs[i].y){
            var square={
              value:null,
              obj:rectBuilder(pointX,pointY,'#dcdde1'),//place of color of bombs
              pointX:pointX,
              pointY:pointY
            }
          area[x][y]=square;

          }
        }
        pointY=pointY+60;
    }
    pointX=pointX+60;
    pointY=10;
}


for (var x = 0; x < 5; x++) {
    for (var y = 0; y < 5; y++) {

      if(area[x][y].value==null){
      //  console.log(x+','+y);

        for (var i = x-1; i <=x+1; i++) {
          for (var j = y-1; j <=y+1; j++) {

            if(i<0||i>4){

            }else{
              if(j<0||j>4){

              }
              else{
                if(area[i][j].value!=null){
                area[i][j].value=area[i][j].value+1;
              }

              }
            }
          }
        }

        area[x][y].value=null

      }

    }
  }




  for (var x = 0; x < 5; x++) {
      for (var y = 0; y < 5; y++) {

      //boxes member of svg
      var obj=Pablo(area[x][y].obj[0]);
      console.log(obj);


      obj.on('click',function(e){


        //access the x and y attributes
        var PointX=Pablo(this).attr('x');
        var PointY=Pablo(this).attr('y');
        var value;

        for (var x = 0; x < 5; x++) {
            for (var y = 0; y < 5; y++) {
              //equality of initial values is checked.
              if(area[x][y].pointX==PointX && area[x][y].pointY==PointY){
                value=area[x][y].value;
                PointX=area[x][y].pointX;
                PointY=area[x][y].pointY
              }
            }
          }


          if(value!=null){

            textBuilder(PointX,PointY,'#1abc9c',value);

          }else{

            Pablo(this).attr('fill','#2c3e50');

            if (confirm('would you like to play again')) {
               window.location.reload(false)
            } else {

            }
          }


      }).css({cursor:'pointer'});
     }
   }





function rectBuilder(x,y,color){
  return arc=svg.rect({
    x:x,
    y:y,
    width:50, height:50,
    fill: color,
  })
}
function textBuilder(x,y,color,value){
    text = svg.text({
            x:x+20, y:y+35,
            fill:color,
            'font-size':'25px',
            'font-family':'sans-serif'
        });
  text.content(value);
  }

  //console.log(bombs);
  //console.log(area);
});
