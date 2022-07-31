import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { Playlist } from "../Playlist/Playlist";
import { SearchResults } from "../SearchResults/SearchResults";
import Spotify from "../../util/Spotify";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount();
    this.state = {
      searchResults: [],
      playListName: "playlist1",
      playListTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    window.addEventListener("load", () => {
      Spotify.getAccessToken();
    });
  }
  addTrack(track) {
    let tracks = this.state.playListTracks;
    if (
      tracks.filter((playListTrack) => track.id === playListTrack.id).length ===
      0
    ) {
      tracks.push(track);
    }
    this.setState({ playListTracks: tracks });
  }
  removeTrack(track) {
    const tracks = this.state.playListTracks;
    const newTracks = tracks.filter((savedTrack) => savedTrack.id !== track.id);
    this.setState({ playListTracks: newTracks });
  }
  updatePlaylistName(name) {
    this.setState({ playListName: name });
  }
  savePlaylist() {
    const trackURIs = this.state.playListTracks.map((track) => track.uri);
  }
  async search(term) {
    console.log(`You are searching for the song ${term}`);
    Spotify.getAccessToken();
    let searchResults = await Spotify.search(term);
    this.setState({ searchResults: searchResults });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playListName={this.state.playListName}
              playListTracks={this.state.playListTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
