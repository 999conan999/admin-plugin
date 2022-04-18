import React, { Component } from 'react';
import { Button,Segment,Input,Select,Table,Label,Menu,Modal,Header,Dropdown} from 'semantic-ui-react';
import ControlModelPost from './controlModelPost';
import * as lang from '../lib/constants/language';
import { toast } from 'react-toastify';
import {get_posts_by_search,get_all_category,get_posts_by_category_id,action_remove_post_by_id} from '../lib/constants/axios';
const quantity=25;
class PostEdit extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id_post:-1,
            open:false,
            show_see_more:false,
            page:0,
            openModalDelete:false,
            listCategory:[],
            selected_category_id:-1,
            seleted_delete:{
                id:-1,
                title:'ERROR'
            },
            key_search:'',
            data_list_post:[
                // {
                //     id:1,
                //     title:'title 1',
                //     status:'publish',
                //     category:['danh muc 1'],
                //     url:'http://localhost:3000/',
                //     author_name:"danh 1",
                //     thumnail_url:'https://anbinhnew.com/wp-content/uploads/2021/01/ban-hoc-sinh-go-tu-nhien-gia-re-1-300x300.jpg'
                // },
            ]

        }
    }
    //********************************API */
  async  componentDidMount(){
        let listCate=await get_all_category();
        let listCategory=[{key:-1,text:lang.ALL_POST,value:-1}]
        listCate.forEach(e => {
            listCategory.push({
                key:e.id,
                value:e.id,
                text:e.name
            })
        });
        //[todo] get all post first here and all category
        let {page,show_see_more}=this.state;
        let data_list_post=await get_posts_by_search(0,'*');
        if (data_list_post.length<quantity) {
            show_see_more=false;
        }else{
            show_see_more=true;
        }
        
        this.setState({
            listCategory:listCategory,
            data_list_post:data_list_post,
            page:page+1,
            show_see_more:show_see_more
        })
        
    }
    // get more post
    action_click_more=async ()=>{
        let {selected_category_id,show_see_more}=this.state;
        if(selected_category_id==-1){
            // status search || get all
            let {page,data_list_post,key_search}=this.state;
            key_search=key_search==""?'*':key_search;
            let data_list_sv=await get_posts_by_search(page,key_search);
            if (data_list_sv.length<quantity) {
                show_see_more=false;
            }else{
                show_see_more=true;
            }
            data_list_post=[...data_list_post,...data_list_sv]
            this.setState({
                data_list_post:data_list_post,
                page:page+1,
                show_see_more:show_see_more
            })
        }else{
            let {page,data_list_post}=this.state;
            let data_list_sv=await get_posts_by_category_id(page,selected_category_id);
            if (data_list_sv.length<quantity) {
                show_see_more=false;
            }else{
                show_see_more=true;
            }
            data_list_post=[...data_list_post,...data_list_sv]
            this.setState({
                data_list_post:data_list_post,
                page:page+1,
                show_see_more:show_see_more,
            })
        }

    }
    // search keywork
    action_click_search= async ()=>{
        let {key_search}=this.state;
        if(key_search!=""){
            let {show_see_more}=this.state;
            let data_list_sv=await get_posts_by_search(0,key_search);
            if (data_list_sv.length<quantity) {
                show_see_more=false;
            }else{
                show_see_more=true;
            }
            // data_list_post=[...data_list_post,...data_list_sv]
            this.setState({
                data_list_post:data_list_sv,
                page:1,
                show_see_more:show_see_more,
                selected_category_id:-1
            })
        }
        // alert(key_search)
    }
    // change search key
    change_search_key=(e)=>{
        let key_search=e.target.value;
        this.setState({
            key_search:key_search,
            selected_category_id:-1
        });
        clearTimeout(this.time_seach);
        this.time_seach=setTimeout(async()=>{
                let {show_see_more}=this.state;
                key_search=key_search==""?"*":key_search;
                let data_list_sv=await get_posts_by_search(0,key_search);
                if (data_list_sv.length<quantity) {
                    show_see_more=false;
                }else{
                    show_see_more=true;
                }
                this.setState({
                    data_list_post:data_list_sv,
                    page:1,
                    show_see_more:show_see_more,
                    selected_category_id:-1
                })
        },350)
   
    }
    // selected category
    action_selecte_category=async(e,data)=>{
        let id=data.value;
        if(id!=-1){
            let {show_see_more}=this.state;
            let data_list_sv=await get_posts_by_category_id(0,id);
            if (data_list_sv.length<quantity) {
                show_see_more=false;
            }else{
                show_see_more=true;
            }
            this.setState({
                data_list_post:data_list_sv,
                key_search:'',
                page:1,
                show_see_more:show_see_more,
                selected_category_id:id

            })
        }else{
            let {show_see_more}=this.state;
            let data_list_sv=await get_posts_by_search(0,'*');
            if (data_list_sv.length<quantity) {
                show_see_more=false;
            }else{
                show_see_more=true;
            }
            // data_list_post=[...data_list_post,...data_list_sv]
            this.setState({
                data_list_post:data_list_sv,
                key_search:'',
                page:1,
                show_see_more:show_see_more,
                selected_category_id:id
            })
        }

    }
    //******************************** */
    // modal delete
    setOpenModalDelete=(st)=>{
        // toast.error('cccc',{theme: "colored"})
        // toast.success('cccc',{theme: "colored"})
        // toast.info('cccc',{theme: "colored"})

        //
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
            id_post:id,
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
    action_click_create_post=(id)=>{
        this.setState({
            id_post:id,
            open:true
        })
    }
    // yes delete post
    action_yes_delete_post=async ()=>{
        let {seleted_delete,data_list_post}=this.state;
        this.setState({
            openModalDelete:false,
        })
        let status_delete= await action_remove_post_by_id(seleted_delete.id);
        let index=null;
        if(status_delete){// ok xoa thanh cong
            data_list_post.forEach((e,i) => {
                if(e.id==seleted_delete.id){
                    index=i;
                }
            });
            if(index!=null){
                data_list_post.splice(index,1);
            }
            toast.success(lang.SUCCESS_DELETE,{})
        }else{
            toast.error(lang.ERRO_DELETE,{style:{theme: "colored"}})
        }
        //[todo]
        this.setState({
            data_list_post:data_list_post
        })
    }
    // fs_delete_post=async ()=>{

    // }
    // show post
    show_post_list=(data)=>{
        let result=[];
        if(data.length>0){
            data.forEach((e,i) => {
                //
                let rs=[]
                e.category.forEach((element,j) => {
                    rs.push( <span className='catezz' key={j}>{element}</span>)
                });
                //
                result.push(
                    <Table.Row key={i} className='danhvt'>
                        <Table.Cell><b><a href={e.url}  target="_blank">{e.title} <i className="fa-solid fa-arrow-up-right-from-square" style={{'fontSize':'10px'}}></i></a></b></Table.Cell>
                        <Table.Cell><img src={e.thumnail_url} height="50px"/></Table.Cell>
                        <Table.Cell><span >{e.author_name}</span></Table.Cell>
                        <Table.Cell><span className={e.status=='private'?'priva':e.status=='publish'?'publ':'draf'}>{e.status}</span></Table.Cell>
                        <Table.Cell>

                            {rs}
                        </Table.Cell>
                        <Table.Cell>
                            <Label className='edit-css' onClick={()=>this.action_click_edit(e.id)}><i className="fas fa-edit"></i> {lang.EDIT}</Label>
                            <Label className='delete-css' onClick={()=>this.clickDeletePost(e.id,e.title)}><i className="fas fa-trash-alt"></i> {lang.DELETE}</Label>
                        </Table.Cell>
                    </Table.Row>
                )
            });
        }
        return result;
    }
    // add post new affter post server
    add_data_new_post=(data)=>{
        let {data_list_post}=this.state;
        data_list_post=[...[data],...data_list_post];
        this.setState({
            data_list_post:data_list_post
        })
    }
    add_data_update_post=(data)=>{
        let {data_list_post}=this.state;
        let index=null;
        data_list_post.forEach((e,i) => {
            if(e.id==data.id) index=i;
        });
        if(index!=null) data_list_post[index]=data;
        this.setState({
            data_list_post:data_list_post
        })
    }

    //************************ */
    render() {
        let {show_see_more,listCategory,openModalDelete,id_post,open,data_list_post,seleted_delete} =this.state;
        return (
            <React.Fragment>
                <Segment.Group horizontal className='assd'>
                    <Segment>
                        <Button primary onClick={()=>this.action_click_create_post(-2)}>
                            <i className="fas fa-plus addcss"></i>
                            {lang.CREATE_POST_NEW}
                        </Button>
                    </Segment>
                    <Segment className='bol0px'></Segment>
                    <Segment>
                        <div className="ui action input">
                            <input type="text" placeholder={lang.TITLE}
                                value={this.state.key_search}
                                onChange={this.change_search_key}
                                // onChange={(e)=>this.setState({key_search:e.target.value})}
                            />
                        <button className="ui button bdr" 
                            onClick={this.action_click_search}
                        >{lang.SEARCH}</button></div>
                    </Segment>   
                    <Segment>
                        <Select  
                            options={listCategory}
                            // defaultValue={-1} 
                            value={this.state.selected_category_id}
                            onChange={this.action_selecte_category}
                        />
                    </Segment> 
                </Segment.Group>
                {/* listpost */}
                <Table color={"red"} >
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell >{lang.TITLE}</Table.HeaderCell>
                        <Table.HeaderCell width="2">{lang.THUMNAIL}</Table.HeaderCell>
                        <Table.HeaderCell width="2">{lang.AUTHOR}</Table.HeaderCell>
                        <Table.HeaderCell width="1">{lang.STATUS}</Table.HeaderCell>
                        <Table.HeaderCell width="3">{lang.CATEGORY}</Table.HeaderCell>
                        <Table.HeaderCell width="3">{lang.EDIT_DEL}</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.show_post_list(data_list_post)}
                    </Table.Body>

                    <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='6'>
                            {show_see_more&&<span className='smo'
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
                    <Header ><i className="fas fa-trash-alt cds"></i>{lang.DELETE_THIS_POST} <span style={{color:"blue"}}>{seleted_delete.title}</span></Header>
                    <Modal.Content>
                        <p>{lang.DO_YOU_SURE_DELETE_POST}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={() => this.setOpenModalDelete(false)}>
                            <i className="fas fa-times cds"></i> {lang.NO_DELETE}
                        </Button>
                        <Button color='green' onClick={this.action_yes_delete_post}>
                         <i className="fas fa-check cds"></i> {lang.OK_DELETE}
                        </Button>
                    </Modal.Actions>
                </Modal>
                <ControlModelPost
                    open={open}
                    id_post={id_post}
                    close_model_edit={this.close_model_edit}
                    permission_type={this.props.permission_type}
                    add_data_new_post={this.add_data_new_post}
                    add_data_update_post={this.add_data_update_post}
                />
            </React.Fragment>
        )
    }
    //

}
export default PostEdit;