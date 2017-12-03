let accessToken = '';
let client_ID = ''; //remember to remove client_ID before uploading
let redirectURI = 'http://localhost:3000/';

let Spotify = {
	getAccessToken: function(term) {
		if (accessToken) {
			return accessToken;
		}
	
	const authURL = 'https://accounts.spotify.com/authorize/?client_id=${client_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}&state=${termString}';
	let myURL = window.location.href; // The URL of the current page
	accessToken = myURL.match(/access_token=([^&]*)/);
	let expiresIn = myURL.match(/expires_in=([^&]*)/);
	if (accessToken && expiresIn) {
		accessToken = accessToken[1];
		expiresIn = expiresIn[1];
		window.setTimeout(() => accessToken = '', expiresIn * 1000);
		window.history.pushState('Access Token', null, '/');
		return accessToken;
	} else {
		console.log("Redirecting to Spotify");
		window.location.assign(authURL);
	}
},

	search: function(term, searchType) {
		if (!searchType) {
			searchType = 'track';
		}
		const searchURL = `https://api.spotify.com/v1/search?type=${searchType}&q=${term}`;
		this.getAccessToken(term);
		return fetch(searchURL, { headers: { Authorization: `Bearer ${accessToken}`, }
			}).then(response => response.json()).then(jsonResponse => {
				if (jsonResponse.tracks) {
					return jsonResponse.tracks.items.map(track => {
						return {
						id: track.id,
						name: track.name,
						artist: track.artists[0].name,
						album: track.album.name,
						uri: track.uri,
					}
				});
			}
		}
	)
},

	savePlaylist: function(playlistName, trackURIs) {
		if (!playlistName || !trackURIs) {
			return
		}

		this.getAccessToken();
		const userinfoURL = 'https://api.spotify.com/v1/me';
		let userID = '';
		fetch(userinfoURL, { headers: { Authorization: `Bearer ${accessToken}`, }, 
	}).then(response => {
		if (response.ok) {
			return response.json()}
		}).then(jsonResponse => {
			console.log(jsonResponse);
			userID = jsonResponse.id;

			const playlistCreateURL = `https://api.spotify.com/v1/users/${userID}/playlists`;
			let playlistID = '';
			fetch(playlistCreateURL, { method: 'POST', headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json', },
			body: JSON.stringify({ name: playlistName }), 
		}).then(response => {
			if (response) {
				console.log(response);
				return response.json()};
			}).then(playlist => {
				playlistID = playlist.id;
				console.log(playlist);

				const addToPlayListURL = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
				fetch(addToPlayListURL, { method: 'POST', 
					headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
					body: JSON.stringify({ uris: trackURIs }), 
				})
			})
		});
	},
};

export default Spotify;
