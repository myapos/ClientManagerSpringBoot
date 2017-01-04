import * as actions from '../actions/';

const reducer = (state, action) => {
	const { type, advertiserIndex, id, siteIds} = action;
	//debugger;
	let newSelected;

	switch (type) {
		case actions.TOGGLE_STATE:
	       return {
	             ...state,
	             toggle: !state.toggle
	       }

		case actions.ADD_ADVERTISER:
		 	newSelected = [...state.selected, {
		 		id: 0,
		 		sites:[]
		 	}];

		       return {
		             ...state,
		             selected: newSelected
		       };

		case actions.DELETE_ADVERTISER:
		 	newSelected = state.selected.filter((item, index) => index !== advertiserIndex);

		       return {
		             ...state,
		             selected: newSelected
		       };

		case actions.CHANGE_ADVERTISER:
		 	newSelected = [...state.selected];
		 	newSelected[advertiserIndex].id = id;

		       return {
		             ...state,
		             selected: newSelected
		    	};

		case actions.ADD_SITES:
			//debugger;
		 	newSelected = [...state.selected];
		 	newSelected[advertiserIndex].sites=siteIds;

		       return {
		             ...state,
		             selected: newSelected
		       };

		 case actions.SAVE:
		 		//debugger;
		 		let url = 'http://localhost:8080/?VVS_API=1&action=save';
				var formData  = new FormData();
				formData.append('state', JSON.stringify(state.selected));
				formData.append('toggle', JSON.stringify(state.toggle));
				fetch(url, {
				    method: "POST",
				    credentials: 'include',
				    body: formData
				})
				.then (res => res.json())
				 .then(res => {
				 		console.log(res);
				 		if(res == true){
				 			window.parent.messenger.open("Your save was succesful.");
				 		}

				 });				 
				// .then(function (data) {
				//   console.log('Request success: ', data);
				// })
				// .catch(function (error) {
				//   console.log('Request failure: ', error);
				// });

		       return {
		             ...state,
		       };

		 default:
		     return state;
	 }
};
export default reducer;
