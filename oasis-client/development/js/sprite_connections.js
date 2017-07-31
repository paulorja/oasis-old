// -------
// 7 8 9 |
// 4 # 6 | 
// 1 2 3 |
// -------

var DEFAULT_TERRAIN_CONNECTIONS = [
    { con: '12346789', x: 1, y: 1 },
    { con: '874123', x: 2, y: 1 },
    { con: '987412', x: 2, y: 1 },
    { con: '87412', x: 2, y: 1 },
    { con: '9874123', x: 2, y: 1 },
    { con: '896321', x: 0, y: 1 },
    { con: '896327', x: 0, y: 1 },
    { con: '7896321', x: 0, y: 1 },
    { con: '89632', x: 0, y: 1 },
    { con: '741236', x: 1, y: 0 },
    { con: '412369', x: 1, y: 0 },
    { con: '41236', x: 1, y: 0 },
    { con: '7412369', x: 1, y: 0 },
    { con: '478963', x: 1, y: 2 },
    { con: '147896', x: 1, y: 2 },
    { con: '1478963', x: 1, y: 2 },
    { con: '47896', x: 1, y: 2 },
    { con: '1478926', x: 3, y: 0 },
    { con: '7896324', x: 4, y: 0 },
    { con: '7412386', x: 3, y: 1 },
    { con: '8963214', x: 4, y: 1 },
    { con: '896', x: 0, y: 2 },
    { con: '8963', x: 0, y: 2 },
    { con: '7896', x: 0, y: 2 },
    { con: '78963', x: 0, y: 2 },
    { con: '412', x: 2, y: 0 },
    { con: '7412', x: 2, y: 0 },
    { con: '4123', x: 2, y: 0 },
    { con: '74123', x: 2, y: 0 },
    { con: '874', x: 2, y: 2 },
    { con: '9874', x: 2, y: 2 },
    { con: '8741', x: 2, y: 2 },
    { con: '98741', x: 2, y: 2 },
    { con: '632', x: 0, y: 0 },
    { con: '7896', x: 0, y: 0 },
    { con: '6321', x: 0, y: 0 },
    { con: '96321', x: 0, y: 0 },
]

var DEFAULT_WALL_CONNECTIONS = [
  { con: '892', x: 1, y: 0 },
  { con: '872', x: 1, y: 0 },
  { con: '218', x: 1, y: 0 },
  { con: '238', x: 1, y: 0 },
  { con: '62', x: 1, y: 0 },
  { con: '42', x: 1, y: 0 },
  { con: '742', x: 1, y: 0 },
  { con: '23', x: 1, y: 0 },
  { con: '12', x: 1, y: 0 },
  { con: '2387', x: 1, y: 0 },
  { con: '2389', x: 1, y: 0 },
  { con: '1278', x: 1, y: 0 },
  { con: '1289', x: 1, y: 0 },
  { con: '82', x: 1, y: 0 },
  { con: '7892', x: 1, y: 0 },
  { con: '1238', x: 1, y: 0 },
]

var BRIDGE_HORIZONTAL_CONNECTIONS = [
  { con: '41236', x: 1, y: 0 },
  { con: '47896', x: 1, y: 1 },
  { con: '632', x: 0, y: 0 },
  { con: '412', x: 2, y: 0 },
  { con: '874', x: 2, y: 1 },
  { con: '896', x: 0, y: 1 },
]

var BRIDGE_VERTICAL_CONNECTIONS = [
  { con: '87412', x: 1, y: 1 },
  { con: '89632', x: 0, y: 1 },
  { con: '632', x: 0, y: 0 },
  { con: '412', x: 1, y: 0 },
  { con: '896', x: 0, y: 2 },
  { con: '874', x: 1, y: 2 },
]

var FENCE_CONNECTIONS = [
  { con: '62', x: 0, y: 0 },
  { con: '462', x: 1, y: 0 },
  { con: '', x: 2, y: 0 },
  { con: '7', x: 2, y: 0 },
  { con: '9', x: 2, y: 0 },
  { con: '3', x: 2, y: 0 },
  { con: '1', x: 2, y: 0 },
  { con: '79', x: 2, y: 0 },
  { con: '179', x: 2, y: 0 },
  { con: '13', x: 2, y: 0 },
  { con: '71', x: 2, y: 0 },
  { con: '93', x: 2, y: 0 },
  { con: '19', x: 2, y: 0 },
  { con: '73', x: 2, y: 0 },
  { con: '793', x: 2, y: 0 },
  { con: '931', x: 2, y: 0 },
  { con: '317', x: 2, y: 0 },
  { con: '82', x: 0, y: 1 },
  { con: '823', x: 0, y: 1 },
  { con: '8', x: 2, y: 0 },
  { con: '789', x: 2, y: 0 },
  { con: '7891', x: 2, y: 0 },
  { con: '7893', x: 2, y: 0 },
  { con: '78', x: 2, y: 0 },
  { con: '2', x: 0, y: 1 },
  { con: '123', x: 0, y: 1 },
  { con: '12', x: 0, y: 1 },
  { con: '23', x: 0, y: 1 },
  { con: '92', x: 0, y: 1 },
  { con: '4', x: 2, y: 1 },
  { con: '43', x: 2, y: 1 },
  { con: '49', x: 2, y: 1 },
  { con: '47', x: 2, y: 1 },
  { con: '41', x: 2, y: 1 },
  { con: '6', x: 0, y: 2 },
  { con: '693', x: 0, y: 2 },
  { con: '163', x: 0, y: 2 },
  { con: '96', x: 0, y: 2 },
  { con: '67', x: 0, y: 2 },
  { con: '763', x: 0, y: 2 },
  { con: '61', x: 0, y: 2 },
  { con: '86', x: 0, y: 2 },
  { con: '46', x: 1, y: 2 },
  { con: '46719', x: 1, y: 2 },
  { con: '46713', x: 1, y: 2 },
  { con: '46937', x: 1, y: 2 },
  { con: '46931', x: 1, y: 2 },
  { con: '4619', x: 1, y: 2 },
  { con: '4673', x: 1, y: 2 },
  { con: '4679', x: 1, y: 2 },
  { con: '4613', x: 1, y: 2 },
  { con: '469', x: 1, y: 2 },
  { con: '463', x: 1, y: 2 },
  { con: '467', x: 1, y: 2 },
  { con: '461', x: 1, y: 2 },
  { con: '42', x: 2, y: 2 },
  { con: '423', x: 2, y: 2 },
  { con: '786', x: 0, y: 2 },
  { con: '812', x: 0, y: 1 },
  { con: '892', x: 0, y: 1 },
  { con: '782', x: 0, y: 1 },
  { con: '841', x: 2, y: 1 },
  { con: '84', x: 2, y: 1 },
  { con: '426', x: 1, y: 0 },
  { con: '4268', x: 1, y: 0 },
]

var CLIMB_TOP_CONNECTIONS = [
  { con: '41236', x: 2, y: 4 },
  { con: '412', x: 2, y: 4 },
  { con: '632', x: 2, y: 4 },
  { con: '2', x: 2, y: 4 },
  { con: '47896', x: 2, y: 5 },
  { con: '478', x: 2, y: 5 },
  { con: '896', x: 2, y: 5 },
  { con: '8', x: 2, y: 5 },
]

var CLIMB_BOTTOM_CONNECTIONS = [
  { con: '41236', x: 3, y: 0 },
  { con: '412', x: 3, y: 0 },
  { con: '632', x: 3, y: 0 },
  { con: '2', x: 3, y: 0 },
  { con: '47896', x: 3, y: 1 },
  { con: '478', x: 3, y: 1 },
  { con: '896', x: 3, y: 1 },
  { con: '8', x: 3, y: 1 },
]

var CLIMB_LEFT_CONNECTIONS = [
  { con: '89632', x: 4, y: 2 },
  { con: '896', x: 4, y: 2 },
  { con: '236', x: 4, y: 2 },
  { con: '6', x: 4, y: 2 },
  { con: '87412', x: 5, y: 2 },
  { con: '874', x: 5, y: 2 },
  { con: '412', x: 5, y: 2 },
  { con: '4', x: 5, y: 2 },
]

var CLIMB_RIGHT_CONNECTIONS = [
  { con: '89632', x: 0, y: 2 },
  { con: '896', x: 0, y: 2 },
  { con: '236', x: 0, y: 2 },
  { con: '6', x: 0, y: 2 },
  { con: '87412', x: 1, y: 2 },
  { con: '874', x: 1, y: 2 },
  { con: '412', x: 1, y: 2 },
  { con: '4', x: 1, y: 2 },
]

var CLIMB_TOP_RIGHT_IN_CONNECTIONS = [
  { con: '478', x: 1, y: 5 },
  { con: '896', x: 0, y: 5 },
  { con: '412', x: 1, y: 4 },
  { con: '236', x: 0, y: 4 },
]

var CLIMB_TOP_LEFT_IN_CONNECTIONS = [
  { con: '478', x: 5, y: 5 },
  { con: '896', x: 4, y: 5 },
  { con: '412', x: 5, y: 4 },
  { con: '236', x: 4, y: 4 },
]

var CLIMB_BOTTOM_LEFT_IN_CONNECTIONS = [
  { con: '478', x: 5, y: 1 },
  { con: '896', x: 4, y: 1 },
  { con: '412', x: 5, y: 0 },
  { con: '236', x: 4, y: 0 },
]

var CLIMB_BOTTOM_RIGHT_IN_CONNECTIONS = [
  { con: '478', x: 1, y: 1 },
  { con: '896', x: 0, y: 1 },
  { con: '412', x: 1, y: 0 },
  { con: '236', x: 0, y: 0 },
]

var CLIMB_TOP_RIGHT_OUT_CONNECTIONS = [
  { con: '478', x: 9, y: 3 },
  { con: '4783', x: 9, y: 3 },
  { con: '896', x: 8, y: 3 },
  { con: '412', x: 9, y: 2 },
  { con: '236', x: 8, y: 2 },
  { con: '2367', x: 8, y: 2 },
]

var CLIMB_TOP_LEFT_OUT_CONNECTIONS = [
  { con: '478', x: 7, y: 3 },
  { con: '896', x: 6, y: 3 },
  { con: '8961', x: 6, y: 3 },
  { con: '412', x: 7, y: 2 },
  { con: '4129', x: 7, y: 2 },
  { con: '236', x: 6, y: 2 },
]

var CLIMB_BOTTOM_LEFT_OUT_CONNECTIONS = [
  { con: '478', x: 7, y: 5 },
  { con: '4783', x: 7, y: 5 },
  { con: '896', x: 6, y: 5 },
  { con: '412', x: 7, y: 4 },
  { con: '236', x: 6, y: 4 },
  { con: '2367', x: 6, y: 4 },
]

var CLIMB_BOTTOM_RIGHT_OUT_CONNECTIONS = [
  { con: '478', x: 9, y: 5 },
  { con: '896', x: 8, y: 5 },
  { con: '8961', x: 8, y: 5 },
  { con: '412', x: 9, y: 4 },
  { con: '4129', x: 9, y: 4 },
  { con: '236', x: 8, y: 4 },
]


// -------
// 7 8 9 |
// 4 # 6 | 
// 1 2 3 |
// -------
