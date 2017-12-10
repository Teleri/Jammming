import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.track = {name: "Growl", artist: "Hell's Artist", album: "Album of Doom", id: 'manualSong', };
      this.state = { searchResults: [],
                     playlistName: "A Playlist",
                     playlistTracks: [], }

      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
    }

 addTrack(track) {
        let array = this.state.playlistTracks.slice();
        let index = array.indexOf(track);
        if (index >= 0) {
            return;
        }

        array.push(track);
        this.setState({playlistTracks: array});
    }

removeTrack(track) {
    let array = this.state.playlistTracks.slice();
    let index = array.indexOf(track);
    array.splice(index, 1);
    this.setState({playlistTracks: array});
}

updatePlaylistName(name) {
  this.setState({playlistName: name});
}

savePlaylist() {
  let trackURIs = [];
  this.state.playlistTracks.forEach(track => trackURIs.push(track.uri));
  Spotify.savePlaylist(this.state.playlistName, trackURIs);
  this.setState({playlistName: 'New Playlist', playlistTracks: []});
}

search(term) {
  console.log('Currently searching for: ' + term);
  if (term) {
    Spotify.search(term).then(results => {
      this.setState({searchResults: results
      })
    }) 
  } else {
    // eslint-disable-next-line
    {this.setState}({ searchResults: [this.track] })
  };
}

  render() {
    return (
        <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div>
    <div className="App">
      <SearchBar onSearch={this.search}/>
      <div className="App-playlist">
        <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} onRemove={false} />
        <Playlist playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} 
        onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
