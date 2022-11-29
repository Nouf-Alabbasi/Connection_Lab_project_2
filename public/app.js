// authors: Hashim and Nouf
// this is am online 2 player hide and seek game created for connections lab fall 2023

function setup() {
  createCanvas(1280, 720);
  background("#7a8786"); 
  wall_1.resize(wall_1.width *0.25, 0);
  wall_2.resize(wall_2.width *0.25, 0);
  wall_3.resize(wall_3.width *0.25, 0);
  wall_4.resize(wall_4.width *0.25, 0);
  wall_5.resize(wall_5.width *0.25, 0);
  wall_6.resize(wall_6.width *0.25, 0);
  wall_7.resize(wall_7.width *0.25, 0);

//   prep sprite
  prep_sprite();

//   creating the furniture obj
  create_furn_obj();
  
  //creating button obj
  start_btn = new BUTTON("start", width/2,height/2+60);
  
  textFont("VT323"); 
  textSize(15);
  instructions_btn = new BUTTON("start game",width/2+(textWidth("instructions")/2)-35,height-100);
  
  // create dark rooms
  DarkRoom1 = new darkRoom((width/3)/2,height/4);
  DarkRoom2 = new darkRoom((width/3)*1.5,height/4);
  DarkRoom3 = new darkRoom((width/3)*2.5,height/4);
  DarkRoom4 = new darkRoom((width/3)*1.5,height/1.33);

}//end of setup

function draw() {
  print(mouseX,mouseY);
  if(state == "start"){
      start()
    }
  else if (state == "waiting")
  {
    waiting_page();
  }
  else if (state == "display role")
  {
    display_role();
  }
  else if (state == "instructions")
  {
    instructions();
  }
  else if (state == "start_game")
  {
    hid=false;
    print(hide_time);
    if (role == "hider"){
      hider() 
    }
    else{
      seeker();
    }
  }
  else if (state == "hidden"){
      // hidden();
      hider_hidden();
  }
  else if (state == "end"){
    //print("end");  
    end();
  }

  
}//end of draw function

function mouseClicked() {
  if(start_btn.InRange() && state =="start"){
    state = "waiting";
      socket = io();
      socket.on('connect', () => {
          console.log("connection established to server");
          role = socket.role;
          console.log(role);
      })

      socket.on('not_implemented',(data)=>{
        window.alert('2 players are already playing, please wait and refresh!');
        socket.disconnect();
      })

      socket.on('start',(data)=>{
        player_num=2;
        // console.log(data);
        role = data;
        if (role=='hider'){
          socket.on('move_seeker',(data)=>{
            spectator_left=data.left;
            spectator_right=data.right;
            spectator_up=data.up;
            spectator_down=data.down;
          })
        }
      })

      socket.on('set_hiding_place',(data)=>{
        hiding_place=data;
        hid=true;
      })

      socket.on('end_screen',(data)=>{
        if (data==role){
          console.log('win!!!')
          won = true;
          winSound.play();
          state='end';
        }
        else{
          console.log('lost!!')
          won=false;
          lossSound.play();
          state='end';
        }
      })

  }
  
  if(instructions_btn.InRange() && state == "instructions"){
    state = "display role";
  }
  
}

function keyPressed() {
  if (state =="start_game"){
    if (key == ' ') {
        if (role =="hider" && P_1.check_in_Bound())
          {
            state = "hidden";
            socket.emit('hide',hiding_place);
        }

        else if (role =="seeker" && P_2.check_in_Bound()){
            num_searched_places+=1;
            //fix a small bug
            if (found){//search_place == hiding_place){
              socket.emit('end',role);
            }
            if (num_searched_places >= max_num_searches)
            {
              socket.emit('end',"hider");
            }
            print("num: ",num_searched_places);
            

            // pop_up_start = frameCount;
            if (search_place == hiding_place)
            {
              found = true;
              //state = "end";
              socket.emit('end',role);
            }
            else{
              center_pg_popup("no one is hiding here");
              missHitSound.play();
            }
        }
    }
  }
}


// function start(){
//   rectMode(CORNER);
//   fill("black");
//   rect(0,0,width,height);

//   textFont("VT323"); 
//   textSize(100);
//   fill("white");
//   let Text = "HIDE and SEEK";
//   text(Text,width/2-textWidth(Text)/2, height/2);
//   start_btn.draw_button();
// }

// function end(){
//   rectMode(CORNER);
//   fill("black");
//   rect(0,0,width,height);

//   textFont("VT323"); 
//   textSize(100);
//   fill("white");
//   let Text = "Game Ended";
//   text(Text,width/2-textWidth(Text)/2, height/2);
//   textSize(50);
//   let word = won?'won':'lost';
//   Text=`You have ${word} the game!`
//   text(Text,width/2-textWidth(Text)/2, height/2+70);
//   socket.disconnect();
//   noLoop();
// }


let k = 700;
let waiting_text = "WAITING";
let Second_line = "";
let stop_time = 1000000;

// function waiting_page(){
//   cursor("default");
//   rectMode(CORNER);
//   fill("black");
//   rect(0,0,width,height);
  
//   textSize(30);
//   fill("white");
//   let Text = "waiting for a second player to join";
//   text(Text,width/2-textWidth(Text)/2, height/4);

//   if (player_num < 2)
//   {
//     //waiting animiation
//     strokeWeight(10);
//     stroke("white");
//     if (k> (width/2+textWidth("WAITING")/2) +30)
//     {
//       print("this");
//       point(k-30, height/2-5);
//     }
//     if (k > (width/2+textWidth("WAITING")/2) +60)
//     {
//       print("that");
//       point(k-60, height/2-5);
//     }
//     if (k > (width/2+textWidth("WAITING")/2) +90)
//     {
//       print("that");
//       point(k-90, height/2-5);
//     }
//     if (k > (width/2+textWidth("WAITING")/2) +120)
//     {
//       print("that");
//       point(k-120, height/2-5);
//     }

//     if (k >860)
//     {
//       print("these");
//       k = width/2+textWidth("WAITING")/2;
//     }
//     k+=2;
//   }
//   else if (player_num == 2)
//   {
//     player_num +=1;
//     stop_time = frameCount;
//     textSize(25);
//     waiting_text = "Second Player is in!";
//     fill("white");
//     Second_line = "Game starting soon";
//   }
//   if (frameCount-stop_time > 60)
//   {
//     stop_time = frameCount;
//     state = "instructions"
//   }
//   //end of waiting animiation
//   fill("white");
//   noStroke();
//   textWrap(WORD);
//   text(waiting_text,width/2-textWidth(waiting_text)/2, height/2);
//   text(Second_line,width/2-textWidth(Second_line)/2, height/2+30);
// }

// function instructions(){
//   rectMode(CORNER);
//   fill("black");
//   rect(0,0,width,height)

//   textFont("VT323"); 
//   textSize(70);
//   fill("white");
//   let Text = "Instructions";
//   text(Text,width/2-textWidth(Text)/2, 100);

//   textFont("monospace"); 
//   textSize(25);
//   let line_1 = "This is an online hide and seek game. You play online with another player.";
//   let line_2 = "One player will be the seeker, and the other would be the hider";
//   let line_3 = "To move The players would use the";
//   let line_4 = " up  down  left  right";
//   let line_5 = " arrows";
//   let line_6 = " The seeker should press the space bar to search a hiding spot";
//   let line_7 = " The hider should press the space bar to hide in a hiding spot";
//   let line_8 = "SPACE";
//   fill("white");
//   rect(585+14,250,58,50);
//   rect(656+15,250,70,50);
//   rect(745+15,250,70,50);
//   rect(850,250,80,50);
//   rect(width/2-400/2,460,400,60);
//   text(line_1,width/2-textWidth(line_1)/2, 170);
//   text(line_2,85, 220);
//   text(line_3,85, 280);
//   text(line_6,70, 360);
//   text(line_7,70, 410);
//   fill("black");
//   text(line_4,600, 280);
//   text(line_8,width/2-(textWidth(line_8)/2), 500);

//   fill("white");
//   text(line_5,930, 280);

//   instructions_btn.draw_button();
  
// }

// async function display_role(){
//   cursor("default");
//   rectMode(CORNER);
//   fill("black");
//   rect(0,0,width,height)
  
//   textFont("VT323"); 
//   textSize(100);
//   fill("white");
//   let role_text = "You are the: "+role;
//   text(role_text,width/2-textWidth(role_text)/2, 300);
//   if (role=='seeker'){
//     wait_text = "waiting for the hider to hide"
//     textSize(40);
//     text(wait_text,width/2-textWidth(wait_text)/2, 370);
//   }
//   await delay(700);
//   if ((frameCount-stop_time>100 && role=='hider') || (role=='seeker' && hid))
//   {
//     state = "start_game"
//     hide_time = frameCount;
//   }
// }

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

function hidden(){
  rectMode(CORNER);
  fill("black");
  rect(0,0,width,height)

  textFont("VT323"); 
  textSize(20);
  fill("white");
  let Text = "hiding place: " + hiding_place;
  text(Text,width/2-textWidth(Text)/2, height/2);

  textSize(15);
  text("press return to restart",width/2-textWidth("press return to restart")/2, (height/3)*2);
  text("(restart not implemented yet)",width/2-textWidth("(restart not implemented yet)")/2, (height/3)*2+30);
}

function hider(){

  if (frameCount-hide_time > max_hide_time)
  {
    state = "hidden";
    socket.emit('hide',hiding_place);
  }

  // imageMode(CENTER);
  background("#7a8786"); 
  imageMode(CENTER);

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


  rectMode(CENTER);
  DarkRoom1.draw();
  DarkRoom2.draw();
  DarkRoom3.draw();
  DarkRoom4.draw();

  // draw placeholder rooms
  rectMode(CORNER);
  noStroke();
  fill("#201E1F");
  rect(0,height/2,width/3,height/2);
  rect((width/3)*2,height/2,width/3,height/2);

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

function popup(Text)
{
  textFont("VT323"); 
  textSize(20);
  fill("#394747");
  width_title = textWidth(Text);
  height_title = textAscent(Text)+textDescent(Text);
  rectMode(CORNERS);
  // rect(width-width_title-50, height - 50, width_title,width_title);
  rect(width-sides+10, height-sides+10, width-width_title-sides-10, height-height_title-sides);
  
  fill("white");
  text(Text,width-width_title-sides,height-sides);
  noFill();
  noStroke();
  rectMode(CENTER);
  
}

async function center_pg_popup(Text)
{
  textFont("VT323"); 
  textSize(20);
  fill("#394747");
  width_title = textWidth(Text);
  height_title = textAscent(Text)+textDescent(Text);
  rectMode(CENTER);
  // rect(width-width_title-50, height - 50, width_title,width_title);
  rect(width/2,height/2,width_title+10,height_title+20);
  
  fill("white");
  text(Text,width/2-width_title/2,height/2+height_title/4);
  noFill();
  noStroke();
  rectMode(CENTER);
  // stop = true;
  noLoop();
  await delay(500);
  loop()
}