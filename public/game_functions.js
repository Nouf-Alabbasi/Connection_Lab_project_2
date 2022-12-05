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
  
  //hint system
  let d = dist(hiding_place_X, hiding_place_Y, P_2.get_x(), P_2.get_y());
  d = map(d, 0, width, 0, 255);
  noStroke();
  strokeWeight(3)
  stroke("black")
  fill(255-d*1.5, 50, d);
  rect(70,height-30,70,20);
  //hint system

  textFont("VT323"); 
  textSize(20);
  fill("white");
  let timer = "number of searched places " + (num_searched_places)+"/"+max_num_searches;
  text(timer, wall_4.width,20);
}

//__________________________________________________________

function hider(){

  if (frameCount-hide_time > max_hide_time)
  {
    state = "hidden";
    socket.emit('hide',hiding_place);
  }

  // imageMode(CENTER);
  background("#7a8786"); 
  imageMode(CENTER);

//   draw the room
  draw_room();

  if (role == "hider")
  {
    P_1.draw();
    textFont("VT323"); 
    textSize(20);
    fill("white");
    let timer = "time: " + int((frameCount-hide_time)/60)+"/"+int(max_hide_time/60);
    text(timer, wall_4.width,20);
  }
  else{
    P_2.draw();
  }
}
//__________________________________________________________