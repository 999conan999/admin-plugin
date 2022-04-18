import React, { Component } from 'react';
import { Button,Segment,Input,Select,Table,Label,Menu,Modal,Header,Dropdown} from 'semantic-ui-react';
import ControlModelPage from './controlModelPage';
import * as lang from '../lib/constants/language';
import { toast } from 'react-toastify';
import {
    get_all_lading_page,
    action_remove_lading_page_by_id
} from '../lib/constants/axios'
const quantity=30;
class PostEdit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id_page:-1,
            page:0,
            show_more:false,
            open:false,
            openModalDelete:false,
            seleted_delete:{
                id:-1,
                title:'ERROR'
            },
            data_list_page:[
                // {
                //     id:1,
                //     title:'title 1',
                //     status:'publish',
                //     url:'http://localhost:3000/',
                //     is_home:true,
                // },
            ]

        }
    }
    //********************************API */
   async componentDidMount(){
        //[todo] get all post first here and all category
        let data_server=await get_all_lading_page(0);
        let show_more=true;
        if(data_server.length<quantity) show_more=false;
        this.setState({
            data_list_page:data_server,
            page:1,
            show_more:show_more
        })
        
    }
    // get more post
    action_click_more=async()=>{
        let {page,data_list_page}=this.state;
        let data_server=await get_all_lading_page(page);
        let show_more=true;
        if(data_server.length<quantity) show_more=false;
        data_list_page=[...data_list_page,...data_server]
        this.setState({
            data_list_page:data_list_page,
            page:page+1,
            show_more:show_more
        })
    }


    //******************************** */
    // modal delete
    setOpenModalDelete=(st)=>{
        this.setState({
            openModalDelete:st
        })
    }
    // delete post
    clickDeletePost=(id,title)=>{
        this.setState({
            openModalDelete:true,
            seleted_delete:{
                id:id,
                title:title
            }
        })
    }
    action_click_edit=(id)=>{
        this.setState({
            id_page:id,
            open:true
        })
    }
    // close modal edit
    close_model_edit=()=>{
        this.setState({
            open:false
        })
    }
    // Create post
    action_click_create_page=(id)=>{
        this.setState({
            id_page:id,
            open:true
        })
    }
    // yes delete post
    action_yes_delete_page=async()=>{
        let {seleted_delete,data_list_page}=this.state;
        this.setState({
            openModalDelete:false,
        })
        let status_delete= await action_remove_lading_page_by_id(seleted_delete.id);
        let index=null;
        if(status_delete){// ok xoa thanh cong
            data_list_page.forEach((e,i) => {
                if(e.id==seleted_delete.id){
                    index=i;
                }
            });
            if(index!=null){
                data_list_page.splice(index,1);
            }
            toast.success(lang.SUCCESS_DELETE,{theme: "colored"})
        }else{
            toast.error(lang.ERRO_DELETE,{theme: "colored"})
        }
        //[todo]
        this.setState({
            data_list_page:data_list_page
        })
    }
    // show post
    show_page_list=(data)=>{
        let result=[];
        if(data.length>0){
            data.forEach((e,i) => {
                //
                result.push(
                    <Table.Row key={i} className='danhvt'>
                        <Table.Cell>
                            <b><a href={e.url}  target="_blank">{e.title} <i className="fa-solid fa-arrow-up-right-from-square" style={{'fontSize':'10px'}}></i></a></b>
                            {e.is_home&&<i className="fa-solid fa-house hjh"></i>}
                        </Table.Cell>
                        <Table.Cell><span className={e.status=='private'?'priva':'publ'}>{e.status}</span></Table.Cell>
                        <Table.Cell>
                        {!e.is_home&&<div>
                                <Label className='edit-css' onClick={()=>this.action_click_edit(e.id)}><i className="fas fa-edit"></i> {lang.EDIT}</Label>
                                <Label className='delete-css' onClick={()=>this.clickDeletePost(e.id,e.title)}><i className="fas fa-trash-alt"></i> {lang.DELETE}</Label>
                            </div>}
                        </Table.Cell>
                    </Table.Row>
                )
            });
        }
        return result;
    }

    //************************ */
    render() {
        let {openModalDelete,id_page,open,data_list_page,seleted_delete,show_more} =this.state;
        return (
            <React.Fragment>
                <Segment.Group horizontal className='assd'>
                    <Segment>
                        <Button primary onClick={()=>this.action_click_create_page(-2)}>
                            <i className="fas fa-plus addcss"></i>
                            {lang.CREATE_NEW_PAG}
                        </Button>
                    </Segment>
                    <Segment className='bol0px'></Segment>
                </Segment.Group>
                {/* listpost */}
                <Table color={"blue"} >
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell >{lang.TITLE}</Table.HeaderCell>
                        <Table.HeaderCell width="1">{lang.STATUS}</Table.HeaderCell>
                        <Table.HeaderCell width="3">{lang.EDIT_DEL}</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.show_page_list(data_list_page)}
                    </Table.Body>

                    <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            {show_more&&<span className='smo'
                                onClick={this.action_click_more}
                            >{lang.SEE_MORE}</span>}
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Footer>
                </Table>
                {/* Modal delete */}
                <Modal
                    onClose={() => this.setOpenModalDelete(false)}
                    open={openModalDelete}
                    >
                    <Header ><i className="fas fa-trash-alt cds"></i>{lang.DELETE_THIS_POST} {seleted_delete.title}</Header>
                    <Modal.Content>
                        <p>{lang.DO_YOU_SURE_DELETE_POST}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={() => this.setOpenModalDelete(false)}>
                            <i className="fas fa-times cds"></i> {lang.NO_DELETE}
                        </Button>
                        <Button color='green' onClick={this.action_yes_delete_page}>
                         <i className="fas fa-check cds"></i> {lang.OK_DELETE}
                        </Button>
                    </Modal.Actions>
                </Modal>
                <ControlModelPage
                    open={open}
                    id_page={id_page}
                    close_model_edit={this.close_model_edit}
                    add_data_new_page={this.add_data_new_page}
                    add_data_update_page={this.add_data_update_page}
                />
            </React.Fragment>
        )
    }
    //
    add_data_new_page=(data)=>{
        let {data_list_page}=this.state;
        data_list_page=[...[data],...data_list_page];
        this.setState({
            data_list_page:data_list_page
        })
    }
    add_data_update_page=(data)=>{
        let {data_list_page}=this.state;
        let index=null;
        data_list_page.forEach((e,i) => {
            if(e.id==data.id) index=i;
        });
        if(index!=null) data_list_page[index]=data;
        this.setState({
            data_list_page:data_list_page
        })
    }
}
export default PostEdit;