export const TOGGLE_STATE = 'TOGGLESTATE';
export const ADD_ADVERTISER = 'ADD_ADVERTISER';
export const CHANGE_ADVERTISER = 'CHANGE_ADVERTISER';
export const DELETE_ADVERTISER = 'DELETE_ADVERTISER';
export const SAVE = 'SAVE';
export const ADD_SITES = 'ADD_SITES';


export function toggleState(state) {
  //debugger;
  return {
    type: TOGGLE_STATE,
    state: state
  };
}
// /this.props.index, val.value
export function addAdvertiser() {
  //debugger;
  return {
    type: ADD_ADVERTISER
  };
}


export function changeAdvertiser(index, id) {
  //debugger;
  return {
    type: CHANGE_ADVERTISER,
    advertiserIndex:index,
    id
  };
}

export function deleteAdvertiser(index) {
  //debugger;
  return {
    type: DELETE_ADVERTISER,
    advertiserIndex:index
  };
}

export function addSites(index, siteIds) {
  //debugger;
  return {
    type: ADD_SITES,
    advertiserIndex:index,
    siteIds
  };
}

export function save(index, id) {
  //debugger;
  return {
    type: SAVE,
    advertiserIndex:index,
    id
  };
}

