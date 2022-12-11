// this file holds the variabels and pregame prep functions (such as preload)
let socket;
let stop = false;

let P_1;
let won;
let moveData;
let P_2;

let hid = false;
let sprites_1 = [];
let sprites_2 = [];
let spritesheet_1;
let spritesheet_2;
let w;
let h;

let plant;
let side_table;
let table;
let bed;
let single_bed;
let Sofa_chair;
let Sofa_chair_2;
let sofa;
let tv;
let sofa_side;
let rug;
let dining_table;
let dining_table_chair_1;
let dining_table_chair_2;
let dining_table_chair_3;

let plant_obj_room2;
let plant_obj_room1;
let side_tableObj_1_room1;
let side_tableObj_2_room1;
let table_obj_room2;
let bed_obj_room1;
let Sofa_chair_obj_room2;
let Sofa_chair_obj2_room2;
let sofa_obj_room2;

let bed_obj_2_room3;
let bed_obj_room3;
let tv_room3;
let sofa_room3;
let time_at_hide;
let dining_table_obj_room4;
let chair_obj_1;
let chair_obj_2;
let chair_obj_3;
let didnt_hide = false;
let check;
let sides;
let wall_1;
let wall_2;
let wall_3;
let wall_4;
let wall_5;
let wall_6;
let wall_7;
let seeker_x;
let seeker_y;
let spectator_left;
let spectator_right;
let spectator_up;
let spectator_down;

let DarkRoom1;
let DarkRoom2;
let DarkRoom3;
let DarkRoom4;

let start_btn;
let refresh_btn;
let instructions_btn;
let player_num = 0;
let role = "seeker";
let found = false;
let clicked = false;
let pop_up_start = 0;
let pop_up_end = 500;

let state = "start";
let hiding_place = "bed in bedroom";
hiding_place_X = 230;
hiding_place_Y = 125;

let search_place;
let num_searched_places = 0;
let max_num_searches = 3;
// let hide_time = 0;
let max_hide_time = 900;
let time_spent = -60;
let winSound;
let missHitSound;
let lossSound;

let red_hint;
let blue_hint;

function preload() {
  //   sprites by @ScissorMarks 
  spritesheet_1 = loadImage("imgs/DinoSprites-doux.png");
  spritesheet_2 = loadImage("imgs/DinoSprites-mort.png");

  plant = loadImage("imgs/objects_house_0055_Layer-56.png");
  side_table = loadImage("imgs/objects_house_0049_Layer-50.png");
  table = loadImage("imgs/objects_house_0039_Layer-40.png");
  bed = loadImage("imgs/objects_house_0035_Layer-36.png");
  Sofa_chair = loadImage("imgs/objects_house_0013_Layer-14-1.png");
  Sofa_chair_2 = loadImage("imgs/2objects_house_0013_Layer-14-1.png");
  sofa = loadImage("imgs/objects_house_0004_Layer-5.png");
  single_bed = loadImage("imgs/objects_house_0038_Layer-39.png")
  tv = loadImage("imgs/objects_house_0021_Layer-22.png")
  sofa_side = loadImage("imgs/objects_house_0003_Layer-4.png")
  rug = loadImage("imgs/rug.png")
  dining_table = loadImage("imgs/objects_house_0044_Layer-45.png");
  dining_table_chair_1 = loadImage("imgs/objects_house_0014_Layer-15.png");
  dining_table_chair_2 = loadImage("imgs/2objects_house_0014_Layer-15.png");
  dining_table_chair_3 = loadImage("imgs/3objects_house_0014_Layer-15.png");

  red_hint = loadImage("imgs/red_hint.png");
  blue_hint = loadImage("imgs/blue_hint.png");
  hint_seeker = loadImage("imgs/hints_seeker.png");
  searches_seeker = loadImage("imgs/search_limit_seeker.png");
  timer_hider = loadImage("imgs/timer_hider.png");

  wall_1 = loadImage("imgs/walls/walls_0043_Layer-44.png");
  wall_2 = loadImage("imgs/walls/walls_0044_Layer-45.png");
  wall_3 = loadImage("imgs/walls/walls_0045_Layer-46.png");
  wall_4 = loadImage("imgs/walls/walls_0046_Layer-47.png");
  wall_5 = loadImage("imgs/walls/walls_0047_Layer-48.png");
  wall_6 = loadImage("imgs/walls/walls_0048_Layer-49.png");
  wall_7 = loadImage("imgs/walls/walls_0049_Layer-50.png");

  winSound = loadSound('sound/win.mp3')
  lossSound = loadSound('sound/lost.wav')
  missHitSound = loadSound('sound/miss-hit.wav')
}