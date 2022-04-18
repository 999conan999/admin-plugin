import React, { Component } from 'react';
import FileMedia from '../lib/fileMedia';
import { Button} from 'semantic-ui-react';


class Media extends Component {
    constructor (props) {
        super(props)
        this.state = {
            open:false            
        }
    }
    // return img
 async   componentDidMount(){}
    // set
    render() {
        return (
            <React.Fragment>
                <Button basic color='blue' size='small' className='btn-mgb ghhg'
                    onClick={()=>this.setState({open:true})}
                ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                <FileMedia
                    multi_select={false}
                    open={this.state.open}
                    type_media={'this.state.type_media'}
                    return_image={this.return_image}
                    set_open_media={(open)=>this.setState({open:open})}
                />
            </React.Fragment>
        )
    }
    //
    return_image=(data)=>{}
    //

}
export default Media;