import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseApp} from '../firebase';
import {Link} from 'react-router';
import AddComments from './AddComments';
import CommentList from './CommentList';
import EditPosts from './EditPosts';

class PostDetail extends Component{
		constructor(props){
		super(props);
		this.state={
			posts:{},
			

		};
	}
	
	componentDidMount(){
		const serverKey = this.props.params.id;	//that post's serverKey is accessed through params.id and put in serverKey
		firebaseApp.database().ref(`posts/${serverKey}`).once('value', snap=>{	//serverKey is post ID
			this.setState({
				posts:snap.val()		//here the setState sets the state of posts as the value in the snap in the posts

			})

			
		})
	}

	editPosts(email,serverKey, posttitle){
		const mail= this.props.user.email;
		if(email===mail){
			return(
				<EditPosts serverKey={serverKey} email={email} posttitle={posttitle}/>
				)
			
		}
	}
	
	render(){
		
		
		//console.log('this.props', this.props);
		const {email,posttitle}=this.state.posts;
		
		const serverKey=this.props.params.id;
		


		//this.props.actioncreator(serverKey);////we can use action creator here and pass it in here
		
		return(
			<div style={{marginLeft:'5px'}}>
				<Link to='/app'>Back To Index</Link>
				<h2>PostTitle</h2>
				<div><em>{email}</em></div>
				<div><strong>{posttitle}</strong></div>
				<div>{serverKey}</div>
				<div>
					{this.editPosts(email,serverKey, posttitle)}
				</div>
				<AddComments serverKey={serverKey}/>	{/*serverKey passed as props to AddComments component*/}
				<hr/>
				<CommentList PostKey={serverKey} />
				
				
			</div>


		);
	}
}

function mapStateToProps(state){
	const {user} = state;
	return {
		user
	}
}
export default connect(mapStateToProps, null)(PostDetail);