// this file holds the functions responsible for game functionality aspects

function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}
//__________________________________________________________

function hider_hidden(){
  imageMode(CENTER);
  background("#7a8786"); 
  imageMode(CENTER);

  // draw placeholder rooms
  rectMode(CORNER);
  noStroke();
  fill("#201E1F");
  rect(0,height/2,width/3,height/2);
  rect((width/3)*2,height/2,width/3,height/2);

  //   draw the furniture
  draw_room();

  P_2.spectator=true;
  P_2.draw();

  textFont("VT323"); 
  textSize(20);
  fill("white");
  let timer = "Seeker's view";
  text(timer, wall_4.width,20);
}
//__________________________________________________________

function seeker(){
  imageMode(CENTER);
  background("#7a8786"); 
  imageMode(CENTER);

  // draw placeholder rooms
  rectMode(CORNER);
  noStroke();
  fill("#201E1F");
  rect(0,height/2,width/3,height/2);
  rect((width/3)*2,height/2,width/3,height/2);

  //   draw the furniture
  draw_room();

  P_2.draw();
  

  textFont("VT323"); 
  textSize(20);
  fill("white");
  let timer = "number of searched places " + (num_searched_places)+"/"+max_num_searches;
  text(timer, wall_4.width,20);
}