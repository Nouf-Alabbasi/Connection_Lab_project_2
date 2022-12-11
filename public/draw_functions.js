// this file holds the functions that are responsible for displaying the different things on the screen


// ############################################ draw the state screens
function start() {
  rectMode(CORNER);
  fill("black");
  rect(0, 0, width, height);

  textFont("VT323");
  textSize(100);
  fill("white");
  let Text = "HIDE and SEEK";
  text(Text, width / 2 - textWidth(Text) / 2, height / 2);
  start_btn.draw_button();
}
//__________________________________________________________

function end() {
  rectMode(CORNER);
  fill("black");

  rect(0, 0, width, height);
  refresh_btn.draw_button();

  textFont("VT323");
  textSize(100);
  fill("white");
  let Text = "Game Ended";
  text(Text, width / 2 - textWidth(Text) / 2, height / 2);
  textSize(50);

  // let word = won?'won':'lost';
  // Text=`You have ${word} the game!`
  // text(Text,width/2-textWidth(Text)/2, height/2+70);
  // noLoop();

  if (didnt_hide == false) {
    let word = won ? 'won' : 'lost';
    Text = `You have ${word} the game!`
    text(Text, width / 2 - textWidth(Text) / 2, height / 2 + 70);
  }
  if (didnt_hide == true && role == 'hider') {
    Text = `You have lost the game!`
    text(Text, width / 2 - textWidth(Text) / 2, height / 2 + 70);
    Text = `You did not hide in time!`
    text(Text, width / 2 - textWidth(Text) / 2, height / 2 + 140);
  }
  if (didnt_hide == true && role == 'seeker') {
    Text = `You have won the game!`
    text(Text, width / 2 - textWidth(Text) / 2, height / 2 + 70);
    Text = `Hider not hide in time!`
    text(Text, width / 2 - textWidth(Text) / 2, height / 2 + 140);
  }
  // socket.disconnect();
  // noLoop();
}
//__________________________________________________________
let k = 700;
let waiting_text = "WAITING";
let Second_line = "";
let stop_time = 1000000;
function waiting_page() {
  cursor("default");
  rectMode(CORNER);
  fill("black");
  rect(0, 0, width, height);

  textSize(30);
  fill("white");
  let Text = "waiting for a second player to join";
  text(Text, width / 2 - textWidth(Text) / 2, height / 4);

  if (player_num < 2) {
    //waiting animiation
    strokeWeight(10);
    stroke("white");
    if (k > (width / 2 + textWidth("WAITING") / 2) + 30) {
      point(k - 30, height / 2 - 5);
    }
    if (k > (width / 2 + textWidth("WAITING") / 2) + 60) {
      point(k - 60, height / 2 - 5);
    }
    if (k > (width / 2 + textWidth("WAITING") / 2) + 90) {
      point(k - 90, height / 2 - 5);
    }
    if (k > (width / 2 + textWidth("WAITING") / 2) + 120) {
      point(k - 120, height / 2 - 5);
    }

    if (k > 860) {
      k = width / 2 + textWidth("WAITING") / 2;
    }
    k += 2;
  }
  else if (player_num == 2) {
    player_num += 1;
    stop_time = frameCount;
    textSize(25);
    waiting_text = "Second Player is in!";
    fill("white");
    Second_line = "Game starting soon";
  }
  if (frameCount - stop_time > 60) {
    stop_time = frameCount;
    state = "instructions"
  }
  //end of waiting animiation
  fill("white");
  noStroke();
  textWrap(WORD);
  text(waiting_text, width / 2 - textWidth(waiting_text) / 2, height / 2);
  text(Second_line, width / 2 - textWidth(Second_line) / 2, height / 2 + 30);
}
//__________________________________________________________

function instructions() {
  rectMode(CORNER);
  fill("black");
  rect(0, 0, width, height)

  textFont("VT323");
  textSize(70);
  fill("white");
  let Text = "Instructions";
  text(Text, width / 2 - textWidth(Text) / 2, 100);

  textFont("monospace");
  textSize(25);
  let line_1 = "This is an online hide and seek game. You play online with another player.";

  let displace_x = 300;
  let displace_y = -130;
  // arrows
  fill("#f8f9fa");
  stroke("#dee2e6");
  strokeWeight(1);
  rect(600+displace_x, 250-displace_y, 70, 75,5);
  rect(675+displace_x, 330-displace_y, 75,70,5);
  rect(520+displace_x, 330-displace_y, 75,70,5);
  rect(600+displace_x, 330-displace_y, 70,70,5);
  rect(480+displace_x, 410-displace_y, 310,60,5);

  // arrow text
  textSize(20);
  fill("#e5383b");
  noStroke();
  text("up", 635-textWidth("up")/2+displace_x, 310-displace_y);
  text("right", 713-textWidth("right")/2+displace_x, 385-displace_y);
  text("left", 555-textWidth("left")/2+displace_x, 385-displace_y);
  text("down", 635-textWidth("down")/2+displace_x, 385-displace_y);
  fill("black");
  text("space bar", 580+displace_x, 465-displace_y);
  fill("#e5383b");
  text("HIDE IN/SEARCH FURNITURE", 490+displace_x, 445-displace_y);

  fill("#f8f9fa");
  text(line_1, width / 2 - textWidth(line_1) / 2, 170);
  

  // hints and timer
  fill("#e5383b");
  image(timer_hider,780,200,350,120);
  text("15 sec time limit to hide", 780, 350);

  image(searches_seeker,100,200,550,120);
  text("seeker can search under a max of 3 furniture", 100, 350);

  image(hint_seeker,100,455,550,120);
  text("hints for the seeker - red -> close, blue -> far", 100, 600);

  // //hint system
  // text("hint system: ", 90, 585);
  // text("WARM/CLOSE: ", 460 - 150, 585);
  // image(red_hint, 490, 550, 150, 50);
  // text("COLD/FAR: ", 860 - 150, 585);
  // image(blue_hint, 860, 550, 150, 50);
  // //hint system

  instructions_btn.draw_button();

}
//__________________________________________________________

async function display_role() {
  cursor("default");
  rectMode(CORNER);
  fill("black");
  rect(0, 0, width, height)

  textFont("VT323");
  textSize(100);
  fill("white");
  let role_text = "You are the: " + role;
  text(role_text, width / 2 - textWidth(role_text) / 2, 300);
  if (role == 'seeker') {
    wait_text = "waiting for the hider to hide"
    textSize(40);
    text(wait_text, width / 2 - textWidth(wait_text) / 2, 370);
    text("you have a maximum of 3 furniture to search under", width / 2 - textWidth("you have a maximum of 3 furniture to search under") / 2, 400);
  }
  else if (role == 'hider'){
    textSize(40);
    text("you have 15 sec to hide", width / 2 - textWidth("you have 15 sec to hide") / 2, 370);
  }

  await delay(700);
  if (frameCount - stop_time > 100 && role == 'hider') {
    state = 'start_game';
  } else if (role == 'seeker' && hid) {
    time_at_hide = frameCount;
    state = 'intermediate';
  }
}
//__________________________________________________________

// ############################################ draw furniture objects
function create_furn_obj() {
  // room 1
  side_tableObj_1_room1 = new furniture("side table 1 bedroom", side_table, (200 + bed.width / 6) + 50, 80);
  side_tableObj_2_room1 = new furniture("side table 2 bedroom", side_table, 100, 80);
  bed_obj_room1 = new furniture("bed in bedroom", bed, 230, 120);
  plant_obj_room1 = new furniture("plant in bedroom", plant, 80, 300);

  // room 2
  plant_obj_room2 = new furniture("plant in living room", plant, 800, 70);
  table_obj_room2 = new furniture("table in living room", table, 650, 330);
  Sofa_chair_obj_room2 = new furniture("Sofa chair 1 in living room", Sofa_chair, 530, 160);
  Sofa_chair_obj2_room2 = new furniture("Sofa chair 2 in living room", Sofa_chair_2, 730, 160);
  sofa_obj_room2 = new furniture("sofa in living room", sofa, 630, 60);
  rug_room2 = new furniture("rug in guest room", rug, 630, 140);

  // room 3
  bed_obj_room3 = new furniture("bed in guest room", single_bed, 600, 450);
  bed_obj_2_room3 = new furniture("bed in guest room", single_bed, 500, 450);
  tv_room3 = new furniture("Tv in guest room", tv, 830, 450)
  sofa_room3 = new furniture("sofa in guest room", sofa_side, 750, 450)

  // room 4
  dining_table_obj_room4 = new furniture("dining table", dining_table, 1090, 150);
  chair_obj_1 = new furniture("dining chair", dining_table_chair_1, 1060, 80);
  chair_obj_2 = new furniture("dining chair", dining_table_chair_2, 965, 150);
  chair_obj_3 = new furniture("dining chair", dining_table_chair_3, 1200, 180);
}
//__________________________________________________________

function draw_room() {
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
  rect(0, height / 2, width / 3, height / 2);
  rect((width / 3) * 2, height / 2, width / 3, height / 2);

  textFont("VT323");
  textSize(50);
  fill("white");

  text("HIDE", 150, 500);
  text("and", 180, 550);
  text("SEEK", 210, 600);

  text("HIDE", 990, 500);
  text("and", 1020, 550);
  text("SEEK", 1050, 600);

  // walls
  //   left wall
  for (let i = 0; i < height; i += wall_1.height) {
    image(wall_4, wall_4.width / 2, i);
  }

  //   right wall
  for (let i = 0; i < height; i += wall_1.height) {
    image(wall_4, width - wall_4.width / 2, i);
  }

  //  top wall
  for (let i = 0; i < width; i += wall_1.width) {
    image(wall_7, i, wall_7.height / 2);
  }


  //  bottom wall
  for (let i = 0; i < width; i += wall_1.width) {
    image(wall_7, i, height - wall_6.height / 2);
  }

  //   corners
  image(wall_1, wall_1.width / 2, wall_1.height / 2);
  image(wall_5, width - wall_5.width / 2, height - wall_5.height / 2);
  image(wall_3, width - wall_3.width / 2, wall_3.height / 2);
  image(wall_2, wall_2.width / 2, height - wall_2.height / 2);

  // draw room divisions
  rectMode(CORNER);
  noStroke();
  fill("#403124");
  rect(0, height / 2, width, 10);
  rect(width / 3, 0, 10, height);
  rect((width / 3) * 2, 0, 10, height);

  // door openings
  fill("#7a8786")
  rect((width / 3) * 2 - 1, 200, 12, 100);
  rect((width / 3) - 1, 200, 12, 100);
  rect((width / 3) - 1, 550, 12, 100);
  rect((width / 3) * 2 - 1, 550, 12, 100);
  rect(width - 300, height / 2 - 1, 100, 12);
}
//__________________________________________________________

// ############################################ prepare sprite
function prep_sprite() {
  spritesheet_1.resize(spritesheet_1.width * 2.5, spritesheet_1.height * 2.5);
  w = int(spritesheet_1.width / 24);
  h = int(spritesheet_1.height);

  for (let y = 0; y < 1; y++) {
    sprites_1[y] = [];
    for (let x = 0; x < 24; x++) {
      sprites_1[y][x] = spritesheet_1.get(x * w, y * h, w, h);
    } // iterate over rows
  } // iterate over columns

  spritesheet_2.resize(spritesheet_2.width * 2.5, spritesheet_2.height * 2.5);
  w = int(spritesheet_2.width / 24);
  h = int(spritesheet_2.height);

  for (let y = 0; y < 1; y++) {
    sprites_2[y] = [];
    for (let x = 0; x < 24; x++) {
      sprites_2[y][x] = spritesheet_2.get(x * w, y * h, w, h);
    } // iterate over rows
  } // iterate over columns

  // // // // // 
  P_2 = new Player(sprites_2);
  P_1 = new Player(sprites_1);
  sides = wall_4.width + 7;
}
//__________________________________________________________

function hidden() {
  rectMode(CORNER);
  fill("black");
  rect(0, 0, width, height)

  textFont("VT323");
  textSize(20);
  fill("white");
  let Text = "hiding place: " + hiding_place;
  text(Text, width / 2 - textWidth(Text) / 2, height / 2);

  textSize(15);
  text("press return to restart", width / 2 - textWidth("press return to restart") / 2, (height / 3) * 2);
  text("(restart not implemented yet)", width / 2 - textWidth("(restart not implemented yet)") / 2, (height / 3) * 2 + 30);
}

// ############################################ draw the popups
function popup(Text) {
  textFont("VT323");
  textSize(20);
  fill("#394747");
  width_title = textWidth(Text);
  height_title = textAscent(Text) + textDescent(Text);
  rectMode(CORNERS);
  // rect(width-width_title-50, height - 50, width_title,width_title);
  rect(width - sides + 10, height - sides + 10, width - width_title - sides - 10, height - height_title - sides);

  fill("white");
  text(Text, width - width_title - sides, height - sides);
  noFill();
  noStroke();
  rectMode(CENTER);

}
//__________________________________________________________

async function center_pg_popup(Text) {
  textFont("VT323");
  textSize(20);
  fill("#394747");
  width_title = textWidth(Text);
  height_title = textAscent(Text) + textDescent(Text);
  rectMode(CENTER);
  // rect(width-width_title-50, height - 50, width_title,width_title);
  rect(width / 2, height / 2, width_title + 10, height_title + 20);

  fill("white");
  text(Text, width / 2 - width_title / 2, height / 2 + height_title / 4);
  noFill();
  noStroke();
  rectMode(CENTER);
  // stop = true;
  noLoop();
  await delay(500);
  loop()
}
function more_than_2() {
  rectMode(CORNER);
  fill("black");
  rect(0, 0, width, height);

  textFont("VT323");
  textSize(75);
  fill("white");
  let Text = "2 Players are already playing in this room";
  text(Text, width / 2 - textWidth(Text) / 2, height / 2);
  textSize(50);
  restart_btn.draw_button();
}

function disconnected() {
  rectMode(CORNER);
  fill("black");
  rect(0, 0, width, height);

  textFont("VT323");
  textSize(100);
  fill("white");
  let Text = "Your opponent disconnected!";
  text(Text, width / 2 - textWidth(Text) / 2, height / 2);
  restart_btn.draw_button();
  socket.disconnect();
}

function intermediate_screen() {
  rectMode(CORNER);
  fill("black");
  rect(0, 0, width, height);

  textFont("VT323");
  textSize(100);
  fill("white");
  if (role == 'hider') {
    let Text = "You have hidden!";
    text(Text, width / 2 - textWidth(Text) / 2, height / 2);
    textSize(75);
    fill("white");
    Text = "Time for the seeker to seek";
    text(Text, width / 2 - textWidth(Text) / 2, height / 2 + 70);
    Text = 3 - (floor((frameCount - time_at_hide) / 60));
    text(Text, width / 2 - textWidth(Text) / 2, height / 2 + 140);
    if (frameCount - time_at_hide > 180) {
      state = 'hidden';
    }
  } else {
    let Text = "Hider has hidden!";
    text(Text, width / 2 - textWidth(Text) / 2, height / 2);
    textSize(75);
    fill("white");
    Text = "Time for you to seek";
    text(Text, width / 2 - textWidth(Text) / 2, height / 2 + 70);
    Text = 3 - (floor((frameCount - time_at_hide) / 60));
    text(Text, width / 2 - textWidth(Text) / 2, height / 2 + 140);
    if (frameCount - time_at_hide > 180) {
      state = 'start_game';
    }
  }

}