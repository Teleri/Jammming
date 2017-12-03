import React from 'react';
import './Track.css';

class Track extends React.Component {
	    constructor(props) {
        super(props);
	    this.renderAction = this.renderAction.bind(this);
	    this.addTrack = this.addTrack.bind(this);
	    this.removeTrack = this.removeTrack.bind(this);
	    this.state = { isRemoval: this.props.isRemoval, }
    }

    
 addTrack(){
    this.props.onAdd(this.props.track);
  }
  removeTrack(){
    this.props.onRemove(this.props.track);
  }
  renderAction() {
    if (this.state.isRemoval){
      return <a onClick={this.removeTrack} className="Track-action">-</a>
    } else {
    	return <a onClick={this.addTrack} className="Track-action">+</a>
  }
}

render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }
}

export default Track;