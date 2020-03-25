import React, {Component} from 'react';


class ChatCard extends Component {


    render() {
        {console.log(this.props.sender)}
        return (
            <div style={{ width:'100%'}}>

             {/* <Comment*/}
             {/*     author={this.props.sender.name}*/}
             {/*     avatar={<Avatar*/}
             {/*     src={this.props.sender.image} alt={this.props.sender.name}*/}
             {/*     />}*/}
             {/*     content={*/}
             {/*     <p>{this.props.message}</p>*/}
             {/* }*/}
             {/* datetime={*/}
             {/*     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>*/}
             {/*    <span>{moment().fromNow()}</span>*/}
             {/*     </Tooltip>*/}
             {/* }*/}
             {/*/>*/}

            </div>
        );
    }
}

export default ChatCard;
