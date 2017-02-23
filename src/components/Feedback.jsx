import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dismissFeedback } from '../actions/feedback';

class Feedback extends Component {
	constructor(props) {
		super(props);
		this.dismissFeedback = this.props.dismissFeedback.bind(this);
	}
	render() {
		let snacker;
		if(this.props.feedback){
			snacker = this.props.feedback.map((f, n)=>{
				return(
				<div key={n} onAnimationEnd={ () => this.dismissFeedback(n) } id="snackbar">{f.msg}</div>
				)
			});
		}else{
			snacker = '';
		}
		return (
			<div>
				{snacker}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { feedback: state.feedback };
};

const mapDispatchToProps = { dismissFeedback };

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
