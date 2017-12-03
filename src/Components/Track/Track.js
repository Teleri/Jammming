import React from 'react';
import './Track.css';

class Track extends React.Component {
	    constructor(props) {
        super(props);
        this.addTrack= this.addTrack.bind(this);
        this.removeTrack= this.removeTrack.bind(this);
    }

    
 /*   renderAction() {
        if (this.props.isRemoval) {
            return (
                <a className="Track-action" onClick={this.removeTrack}>-</a>
                } else {
            return (
                <a className="Track-action" onClick={this.addTrack}>+</a>
            );
        }
 }*/

addTrack(event) {
	this.props.onAdd(this.props.track);
}

removeTrack(event) {
	this.props.onRemove(this.props.track);
}

render() {
	return (
			<div className="Track">
			  <div className="Track-information">
			    <h3>track name will go here</h3>
			    
			  </div>
			  
			</div>
		);
	}
}

export default Track;