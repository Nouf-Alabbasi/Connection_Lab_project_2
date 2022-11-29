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
  // room 1
  plant_obj_room1.draw();
  side_tableObj_1_room1.draw();
  side_tableObj_2_room1.draw();
  bed_obj_room1.draw();
  
  // room 2
  sofa_obj_room2.draw();
  plant_obj_room2.draw();
  table_obj_room2.draw();
  Sofa_chair_obj_room2.draw();
  Sofa_chair_obj2_room2.draw();

  // room 3
  bed_obj_room3.draw();
  bed_obj_2_room3.draw();
  tv_room3.draw();
  sofa_room3.draw();
  rug_room2.draw();

  // room 4
  dining_table_obj_room4.draw();
  chair_obj_1.draw();
  chair_obj_2.draw();
  chair_obj_3.draw();

  // the dark rooms
  rectMode(CENTER);
  DarkRoom1.draw();
  DarkRoom2.draw();
  DarkRoom3.draw();
  DarkRoom4.draw();

  // the empty rooms
  textFont("VT323"); 
  textSize(50);
  fill("white");

  text("HIDE",150, 500);
  text("and",180, 550);
  text("SEEK",210, 600);

  text("HIDE",990, 500);
  text("and",1020, 550);
  text("SEEK",1050, 600); 

// walls
//   left wall
for (let i=0; i<height; i+= wall_1.height)
{
  image(wall_4,wall_4.width/2,i);
}

//   right wall
for (let i=0; i<height; i+= wall_1.height)
{
  image(wall_4,width-wall_4.width/2,i);
}

//  top wall
for (let i=0; i<width; i+= wall_1.width)
{
  image(wall_7,i, wall_7.height/2);
}


//  bottom wall
for (let i=0; i<width; i+= wall_1.width)
{
image(wall_7,i, height-wall_6.height/2);
}

//   corners
  image(wall_1,wall_1.width/2,wall_1.height/2);
  image(wall_5,width-wall_5.width/2,height-wall_5.height/2);
  image(wall_3,width-wall_3.width/2,wall_3.height/2);
  image(wall_2,wall_2.width/2,height-wall_2.height/2);

  // draw room divisions
  rectMode(CORNER);
  noStroke();
  fill("#403124");
  rect(0,height/2, width,10);
  rect(width/3,0, 10,height);
  rect((width/3)*2,0, 10,height);

  // door openings
  fill("#7a8786")
  rect((width/3)*2-1,200, 12,100);
  rect((width/3)-1,200, 12,100);
  rect((width/3)-1,550, 12,100);
  rect((width/3)*2-1,550, 12,100);
  rect(width-300,height/2-1, 100,12);

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
  // room 1
  plant_obj_room1.draw();
  side_tableObj_1_room1.draw();
  side_tableObj_2_room1.draw();
  bed_obj_room1.draw();
  
  // room 2
  sofa_obj_room2.draw();
  plant_obj_room2.draw();
  table_obj_room2.draw();
  Sofa_chair_obj_room2.draw();
  Sofa_chair_obj2_room2.draw();

  // room 3
  bed_obj_room3.draw();
  bed_obj_2_room3.draw();
  tv_room3.draw();
  sofa_room3.draw();
  rug_room2.draw();

  // room 4
  dining_table_obj_room4.draw();
  chair_obj_1.draw();
  chair_obj_2.draw();
  chair_obj_3.draw();

  // the dark rooms
  rectMode(CENTER);
  DarkRoom1.draw();
  DarkRoom2.draw();
  DarkRoom3.draw();
  DarkRoom4.draw();

  // the empty rooms
  textFont("VT323"); 
  textSize(50);
  fill("white");

  text("HIDE",150, 500);
  text("and",180, 550);
  text("SEEK",210, 600);

  text("HIDE",990, 500);
  text("and",1020, 550);
  text("SEEK",1050, 600);

  // walls
  //   left wall
  for (let i=0; i<height; i+= wall_1.height)
  {
    image(wall_4,wall_4.width/2,i);
  }

  //   right wall
  for (let i=0; i<height; i+= wall_1.height)
  {
    image(wall_4,width-wall_4.width/2,i);
  }

  //  top wall
  for (let i=0; i<width; i+= wall_1.width)
  {
    image(wall_7,i, wall_7.height/2);
  }


  //  bottom wall
  for (let i=0; i<width; i+= wall_1.width)
  {
  image(wall_7,i, height-wall_6.height/2);
  }
//   corners
  image(wall_1,wall_1.width/2,wall_1.height/2);
  image(wall_5,width-wall_5.width/2,height-wall_5.height/2);
  image(wall_3,width-wall_3.width/2,wall_3.height/2);
  image(wall_2,wall_2.width/2,height-wall_2.height/2);

  // draw room divisions
  rectMode(CORNER);
  noStroke();
  fill("#403124");
  rect(0,height/2, width,10);
  rect(width/3,0, 10,height);
  rect((width/3)*2,0, 10,height);

  // door openings
  fill("#7a8786")
  rect((width/3)*2-1,200, 12,100);
  rect((width/3)-1,200, 12,100);
  rect((width/3)-1,550, 12,100);
  rect((width/3)*2-1,550, 12,100);
  rect(width-300,height/2-1, 100,12);

  P_2.draw();
  

  textFont("VT323"); 
  textSize(20);
  fill("white");
  let timer = "number of searched places " + (num_searched_places)+"/"+max_num_searches;
  text(timer, wall_4.width,20);
}