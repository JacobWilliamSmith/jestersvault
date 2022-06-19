const defaultState = [
  { stat: "name", name: "Character Name", width: 2.75, hasStartAdornment: false },
  { stat: "init", name: "Initiative", width: 1.25, hasStartAdornment: true },
  { stat: "ac", name: "Armor Class", width: 1.25, hasStartAdornment: true },
  { stat: "hp", name: "Hit Points", width: 1.75, hasStartAdornment: true },
  { stat: "status", name: "Status Effects", width: 5, hasStartAdornment: true },
];

const tableLayoutReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default tableLayoutReducer;
