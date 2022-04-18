import React, { Component } from 'react';
import { Button,Segment,Input,Select,Table,Label,Menu,Modal,Header,Dropdown} from 'semantic-ui-react';
import ControlModelCategory from './ControlModelCategory';
import * as lang from '../lib/constants/language';
import { toast } from 'react-toastify';
import {
    get_all_category,
    action_remove_category_by_id
}from '../lib/constants/axios'

class CategoryEdit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id_category:-1,
            open:false,
            openModalDelete:false,
            seleted_delete:{
                id:-1,
                title:'ERROR'
            },
            category_list:[
                // {
                //     id:1,
                //     name:'Category 1',
                //     url:'http://localhost:3000/categorys',
                //     parent_id:0
                // },
            ],

        }
    }
    //********************************API */
   async componentDidMount(){
        //[todo] get all category
        // 
        this.fs_support_get_all_category();
        
    }
    fs_support_get_all_category=async()=>{
        let category_list=await get_all_category();
        this.setState({
            category_list:category_list
        })
    }
    //******************************** */
    // modal delete
    setOpenModalDelete=(st)=>{
        this.setState({
            openModalDelete:st
        })
    }
    // delete category
    clickDeleteCategory=(id,name)=>{
        let rs_name=name.split(" |------ ").join("");
        this.setState({
            openModalDelete:true,
            seleted_delete:{
                id:id,
                name:rs_name
            }
        })
    }
    action_click_edit=(id)=>{
        this.setState({
            id_category:id,
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
    action_click_create_category=(id)=>{
        this.setState({
            id_category:id,
            open:true
        })
    }
    // yes delete post
    action_yes_delete_category=async()=>{
        this.setState({
            openModalDelete:false
        })
        let {seleted_delete}=this.state;
        let a=await action_remove_category_by_id(seleted_delete.id);
        
        if(a.status){// delete thanh cong
            if(a.rs){
                this.fs_support_get_all_category();
                toast.success(lang.SUCCESS_DELETE,{theme: "colored"})
            }else{
                toast.info(lang.CAN_NOT_DELETE,{theme: "colored"})
            }
        }else{// delete fail
            toast.error(lang.ERRO_DELETE,{theme: "colored"})
        }
        //[todo]

    }
    //
    show_category_list=(data)=>{
        let result=[];
        if(data.length>0){
            data.forEach((e,i) => {
                result.push(
                    <Table.Row key={i} className='danhvt'>
                        <Table.Cell>{e.position}<b><a href={e.url}  target="_blank">{e.name} <i className="fa-solid fa-arrow-up-right-from-square" style={{'fontSize':'10px'}}></i></a></b></Table.Cell>
                        <Table.Cell>
                            <Label className='edit-css' onClick={()=>this.action_click_edit(e.id)}><i className="fas fa-edit"></i> {lang.EDIT}</Label>
                            <Label className='delete-css' onClick={()=>this.clickDeleteCategory(e.id,e.name)}><i className="fas fa-trash-alt"></i> {lang.DELETE}</Label>
                        </Table.Cell>
                    </Table.Row>
                )
            });
        }
        return result;
    }
    add_edit_success=()=>{
        this.fs_support_get_all_category();
    }
    //************************ */
    render() {
        let {openModalDelete,id_category,open,seleted_delete} =this.state;
        let category_list=this.fs_convert_category(this.state.category_list);
        return (
            <React.Fragment>
                <Segment.Group horizontal className='assd'>
                    <Segment>
                        <Button  primary onClick={()=>this.action_click_create_category(-2)}>
                            <i className="fas fa-plus addcss"></i>
                            {lang.CREATE_CATEGORY}
                        </Button>
                    </Segment>
                
                </Segment.Group>
                {/* listpost */}
                <Table color={"green"} >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >{lang.TITLE}</Table.HeaderCell>
                            <Table.HeaderCell width="3">{lang.EDIT_DEL}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                        {this.show_category_list(category_list)}
                </Table>
                {/* Modal delete */}
                <Modal
                    onClose={() => this.setOpenModalDelete(false)}
                    open={openModalDelete}
                    >
                    <Header ><i className="fas fa-trash-alt cds"></i>{lang.DELETE_THIS_CATEGORY} {seleted_delete.name}</Header>
                    <Modal.Content>
                        <p>{lang.DO_YOU_SURE_DELETE_CATEGORY}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={() => this.setOpenModalDelete(false)}>
                            <i className="fas fa-times cds"></i> {lang.NO_DELETE}
                        </Button>
                        <Button color='green' onClick={this.action_yes_delete_category}>
                         <i className="fas fa-check cds"></i> {lang.OK_DELETE}
                        </Button>
                    </Modal.Actions>
                </Modal>
                <ControlModelCategory
                    open={open}
                    id_category={id_category}
                    close_model_edit={this.close_model_edit}
                    add_edit_success={this.add_edit_success}
                />
            </React.Fragment>
        )
    }
        //
    
        fs_convert_category=(data)=>{
            this.category_data_convert=[];
            this.convert_category(data,0,'');
            return this.category_data_convert;
        }
        convert_category=(category,parent_id,position)=>{
            category.forEach((e,i) => {
                if(e.parent_id==parent_id){
                    this.category_data_convert.push({
                        id:e.id,
                        name:e.name,
                        parent_id:e.parent_id,
                        url:e.url,
                        position:position
                    })
                    this.convert_category(category,e.id,position+' |------ ');
                }
            });
        }

}
export default CategoryEdit;