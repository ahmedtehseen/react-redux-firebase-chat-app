import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';


class Article extends Component {
	constructor() {
		super();
		this.submit = this.submit.bind(this);
	}
	submit(e) {
		e.preventDefault();
		this.props.submitArticleEdit(this.refs.article.value);
		this.refs.article.value = '';
		
	}

	render() {
		return (
			<div>
			<Row>
				<Col md={1} className="userimage">
					<img src={this.props.article.userPhoto} alt="user"/>
				</Col>
				<Col sm={10}>
					{this.props.article.imageURL ?
					<img src={this.props.article.imageURL} alt={this.props.article.imageURL} width="300px" height="300px"/> :
					<b><em>{this.props.article.content}</em></b>
					}
					<br/>
					<br/>
					<em>{`${this.props.article.username}`}</em>
					{' '}<em>{this.props.article.date}</em>
				</Col>
				</Row>
				<hr/>
			</div>
		);
	}
}

export default Article;
