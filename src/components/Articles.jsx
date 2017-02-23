import React, { Component } from 'react';
import { connect } from 'react-redux';
import {submitArticle, startArticleEdit, cancelArticleEdit, submitArticleEdit, deleteArticle, uploadImage } from '../actions/articles';
import {Col, Row, Grid} from 'react-bootstrap';
import FileInput from 'react-file-input';
import Article from './Article';

class Articles extends Component {
	constructor() {
		super();
		this.submitNewArticle = this.submitNewArticle.bind(this);
	}
	submitNewArticle(e) {
		if (!this.props.articles.submitting) {
			e.preventDefault();
			if (this.refs.newMessage.value) {
				this.props.submitArticle(this.refs.newMessage.value);
			}
			this.refs.newMessage.value = '';
		}
	}

	handleChange(e){
		var image = e.target.files[0];
		this.props.uploadImage(image);
		// image = null;
	}
	render() {
		let rows = [];
		if (this.props.articles.data) {
			rows = Object.keys(this.props.articles.data).reverse().map((qid) => {
				const article = this.props.articles.data[qid];
				const status = this.props.articles.status[qid];
				/* eslint-disable react/jsx-no-bind */
				const thisStartArticleEdit = this.props.startArticleEdit.bind(this, qid);
				const thisCancelArticleEdit = this.props.cancelArticleEdit.bind(this, qid);
				const thisSubmitArticleEdit = this.props.submitArticleEdit.bind(this, qid);
				const thisDeleteArticle = this.props.deleteArticle.bind(this, qid);
				/* eslint-enable react/jsx-no-bind */
				return (
					<Article
						key={qid}
						qid={qid}
						article={article}
						status={status}
						canEdit={this.props.auth.uid === article.uid}
						startArticleEdit={thisStartArticleEdit}
						cancelArticleEdit={thisCancelArticleEdit}
						submitArticleEdit={thisSubmitArticleEdit}
						deleteArticle={thisDeleteArticle}
					/>
				);
			});
		}
		let content;
		if (this.props.auth.uid) {
			content = (
				<div>
					<form onSubmit={this.submitNewArticle}>
							<div className="input-group">
								<input className="form-control" ref="newMessage" placeholder="say something..." />
								<span className="input-group-btn">
									<button className="btn btn-primary" type="submit" disabled={this.props.articles.submittingNew}>
										{this.props.articles.submittingNew ? 'Sending...' : 'Send Message'}
									</button>
								</span>
							</div>
									<FileInput  name="myImage"
									id="input"
                   accept=".png,.gif,.jpeg"
                   placeholder="My Image"
                   className="inputClass"
                   onChange={this.handleChange.bind(this)}/>
					</form>
				</div>
			);
		} else {
			content = <b><em>Please Login to join chat...!</em></b>;
		}
		const rowsOrLoading = this.props.articles.hasReceivedData ? rows	: 'Loading Messages...';
		return (
			<Grid id="main">
				<Row>
					<Col md={7} mdOffset={3} className="box">
						<div className="innerbox">
						{this.props.articles.errorMessage
							? <p>{this.props.articles.errorMessage}</p>
							: rowsOrLoading
						}
						</div>						
						{content}
					</Col>
				</Row>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		articles: state.articles,
		auth: state.auth
	};
};

const mapDispatchToProps = {
	submitArticle,
	startArticleEdit,
	cancelArticleEdit,
	submitArticleEdit,
	deleteArticle,
	uploadImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
