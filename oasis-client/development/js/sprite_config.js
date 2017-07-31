var sprite_faces = {};
var sprite_heads = {};
var sprite_right_hands = {};
var sprite_bodies = {};
var sprite_itens = {};

load_sprites();

function sprite(url) {
  var img = new Image();
  img.src = url;
  return img;
}

function load_sprites() {

  // face
  sprite_faces['face_happy'] = sprite("sprites/character/face/face_happy.png");
  sprite_faces['make_up_sexy'] = sprite("sprites/character/face/make_up_sexy.png");
  sprite_faces['black_power'] = sprite("sprites/character/face/black_power.png");
  sprite_faces['chubby_bunny'] = sprite("sprites/character/face/chubby_bunny.png");
  sprite_faces['black_glasses'] = sprite("sprites/character/face/black_glasses.png");
  sprite_faces['smoke_weed'] = sprite("sprites/character/face/smoke_weed.png");
  // heads
  sprite_heads['farmer_hat'] = sprite("sprites/character/head/farmer_hat.png");
  // bodies
  sprite_bodies['red_cape'] = sprite("sprites/character/body/red_cape.png");
  sprite_bodies['basic_tshirt'] = sprite("sprites/character/body/basic_tshirt.png");
  sprite_bodies['rich_guy'] = sprite("sprites/character/body/rich_guy.png");
  sprite_bodies['sexy_dress'] = sprite("sprites/character/body/sexy_dress.png");
}

var TERRAINS = {
  '0' : {
    sprite: sprite("sprites/world/terrain/grass.png")
  },
  '1' : {
    sprite: sprite("sprites/world/terrain/water.png"),
    connections: DEFAULT_TERRAIN_CONNECTIONS
  },
  '2' : {
    sprite: sprite("sprites/world/terrain/sand.png"),
    connections: DEFAULT_TERRAIN_CONNECTIONS
  },
  '3' : {
    sprite: sprite("sprites/world/terrain/water_sand.png")
  },
  '5' : {
    sprite: sprite("sprites/world/terrain/climb.png"),
    connections: CLIMB_TOP_CONNECTIONS
  },
  '6' : {
    sprite: sprite("sprites/world/terrain/climb.png"),
    connections: CLIMB_RIGHT_CONNECTIONS
  },
  '7' : {
    sprite: sprite("sprites/world/terrain/climb.png"),
    connections: CLIMB_LEFT_CONNECTIONS
  },
  '8' : {
    sprite: sprite("sprites/world/terrain/climb.png"),
    connections: CLIMB_BOTTOM_CONNECTIONS
  },
  '9' : {
    sprite: sprite("sprites/world/terrain/climb.png"),
    connections: CLIMB_BOTTOM_RIGHT_IN_CONNECTIONS
  },
  '10' : {
    sprite: sprite("sprites/world/terrain/climb.png"),
    connections: CLIMB_BOTTOM_LEFT_IN_CONNECTIONS
  },
  '11' : {
    sprite: sprite("sprites/world/terrain/climb.png"),
    connections: CLIMB_TOP_RIGHT_IN_CONNECTIONS
  },
  '12' : {
    sprite: sprite("sprites/world/terrain/climb.png"),
    connections: CLIMB_TOP_LEFT_IN_CONNECTIONS
  },
  '13' : {
    sprite: sprite("sprites/world/terrain/climb.png"),
    connections: CLIMB_BOTTOM_RIGHT_OUT_CONNECTIONS
  },
  '14' : {
    sprite: sprite("sprites/world/terrain/climb.png"),
    connections: CLIMB_BOTTOM_LEFT_OUT_CONNECTIONS
  },
  '15' : {
    sprite: sprite("sprites/world/terrain/climb.png"),
    connections: CLIMB_TOP_LEFT_OUT_CONNECTIONS
  },
  '16' : {
    sprite: sprite("sprites/world/terrain/climb.png"),
    connections: CLIMB_TOP_RIGHT_OUT_CONNECTIONS
  }
}

var UNITS = {
  '2' : {
    sprite: sprite("sprites/world/unit/tree3.png")
  },
  '1' : {
    sprite: sprite("sprites/world/unit/tree2.png")
  },
  '0' : {
    sprite: sprite("sprites/world/unit/tree.png"),
    sprite_front: sprite("sprites/world/unit/tree_front.png"),
    custom_height: 128
  },
  '3' : {
    sprite: sprite("sprites/world/unit/stone.png"),
    sprite_front: sprite("sprites/world/unit/stone_front.png"),
  },
  '4' : {
    sprite: sprite("sprites/world/unit/chest.png")
  },
  '6' : {
    sprite: sprite("sprites/world/unit/tree_seed.png")
  },
  '7' : {
    sprite: sprite("sprites/world/unit/stone_wall.png"),
    sprite_front: sprite("sprites/world/unit/stone_wall_front.png"),
    connections: DEFAULT_WALL_CONNECTIONS
  },
  '8' : {
    sprite: sprite("sprites/world/unit/pink_wall.png"),
    sprite_front: sprite("sprites/world/unit/pink_wall_front.png"),
    connections: DEFAULT_WALL_CONNECTIONS
  },
  '9' : {
    sprite: sprite("sprites/world/unit/fence.png"),
    sprite_front: sprite("sprites/world/unit/fence_front.png"),
    connections: FENCE_CONNECTIONS
  },
  '10' : {
    sprite: sprite("sprites/world/unit/bridge_v.png"),
    connections: BRIDGE_VERTICAL_CONNECTIONS
  },
  '11' : {
    sprite: sprite("sprites/world/unit/bridge_h.png"),
    connections: BRIDGE_HORIZONTAL_CONNECTIONS
  },
  '12' : {
    sprite: sprite("sprites/world/unit/waterfall_bottom.png"),
    sprite_front: sprite("sprites/world/unit/waterfall_bottom.png"),
    custom_height: 192,
    custom_width: 256,
    loop_animation: {
      frames: [
        {x: 0,   y: 0},
        {x: 256, y: 0},
        {x: 512, y: 0},
        {x: 768, y: 0},
        {x: 0,   y: 192},
        {x: 256, y: 192},
        {x: 512, y: 192},
        {x: 768, y: 192},
      ],
      speed: 0.14
    }
  },
  '17' : {
    sprite: sprite("sprites/world/unit/waterfall_left.png"),
    sprite_front: sprite("sprites/world/unit/waterfall_left.png"),
    custom_height: 256,
    custom_width: 192,
    loop_animation: {
      frames: [
        {x: 320, y: 0},
        {x: 320, y: 256},
        {x: 320, y: 512},
        {x: 320, y: 768},
        {x: 128, y: 0},
        {x: 128, y: 256},
        {x: 128, y: 512},
        {x: 128, y: 768},
      ],
      speed: 0.14
    }
  },
  '20' : {
    sprite: sprite("sprites/world/unit/climb_stair_right.png"),
    connections: [
      { con: '6', x: 0, y: 0 },
      { con: '4', x: 1, y: 0 },
    ]
  },
  '21' : {
    sprite: sprite("sprites/world/unit/climb_stair_right.png"),
    connections: [
      { con: '6', x: 0, y: 2 },
      { con: '4', x: 1, y: 2 },
    ]
  },
  '22' : {
    sprite: sprite("sprites/world/unit/climb_stair_right.png"),
    connections: [
      { con: '6', x: 0, y: 1 },
      { con: '4', x: 1, y: 1 },
    ]
  }
}