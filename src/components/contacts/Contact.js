import React, { Component } from 'react';
import { Table,Icon,Label,Modal,Button } from 'semantic-ui-react';
import * as lang from '../lib/constants/language';
import { toast } from 'react-toastify';
import {get_contacts_plugin,delete_contact_by_id_plugin} from '../lib/constants/axios';
import {fs_is_value_null} from '../lib/constants/fs'
const count=25;
class Contact extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data:[],
            show_see_more:false,
            page:0,
            open_modal:false,
            id_del:null,
            content_del:''
        }
    }
    //
    async componentDidMount(){
        //
        let data=await get_contacts_plugin(0);
        let show_see_more=true;
        if(data.length<count) show_see_more=false;
        if(data!=null||data!=undefined){
            this.setState({data:data,show_see_more:show_see_more,page:1})
        }else{
            this.setState({data:[],show_see_more:false,page:1})
        }
    }
    show_contact=(data)=>{
        let rs=[];
        data.forEach((e,i)=> {
            let dataz=JSON.parse(e.dataz);
            let d=new Date(e.datez)
            rs.push(
                <Table.Row key={i} className='danhvt'>
                    <Table.Cell>{dataz.comment}</Table.Cell>
                    <Table.Cell>{d.toLocaleDateString()} - <span style={{color:'#03a9f4'}}>{d.toLocaleTimeString()}</span></Table.Cell>
                    <Table.Cell>
                        <Label className='delete-css' 
                            onClick={()=>this.setState({open_modal:true,id_del:Number(e.id),content_del:dataz.comment})}
                        ><i className="fas fa-trash-alt"></i> {lang.DELETE}</Label>
                    </Table.Cell>
                </Table.Row>
            )
        });
        return rs;
    }
    //
    action_click_more=async()=>{
        let {page,data}=this.state;
        let data_new=await get_contacts_plugin(page);
        let show_see_more=true;
        if(data_new.length<count) show_see_more=false;
        if(data_new!=null||data_new!=undefined){
            this.setState({data:[...data,...data_new],show_see_more:show_see_more,page:page+1})
        }else{
            this.setState({data:[],show_see_more:false,page:1})
        }
    }
    //
    click_delete_contact=async()=>{
        let {id_del,data}=this.state;
        let a=await delete_contact_by_id_plugin(id_del)
        if(a.status){
            let index=null;
            data.forEach((e,i) => {
                if(e.id==id_del) index=i;
            });
            if(index!=null) data.splice(index,1);
            this.setState({data:data,open_modal:false});
            toast.success(lang.SUCCESS_DELETE,{theme: "colored"})
        }else{
            toast.info(lang.ERRO_DELETE,{theme: "colored"})
        }
    }
    //
    render() {
        let {data,show_see_more}=this.state;
        return (
            <React.Fragment>
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="13">Tin nhắn</Table.HeaderCell>
                        <Table.HeaderCell width="2">Thời gian</Table.HeaderCell>
                        <Table.HeaderCell width="1">Xóa</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {this.show_contact(data)}
                    </Table.Body>
                </Table>
                {show_see_more&&<span className='smo'
                    onClick={this.action_click_more}
                >{lang.SEE_MORE}</span>}
                {/*  */}
                <Modal
                    size={'mini'}
                    open={this.state.open_modal}
                    onClose={() =>this.setState({open_modal:false})}
                >
                    <Modal.Header>Xóa thông tin này?</Modal.Header>
                    <Modal.Content>
                    <p>{this.state.content_del}</p>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button negative onClick={() =>this.setState({open_modal:false})}>
                        Không
                    </Button>
                    <Button positive onClick={() =>this.click_delete_contact()}>
                        Xác nhận xóa
                    </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }


}
export default Contact;