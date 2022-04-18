import React, { Component } from 'react';
import ModalEditerCategory from '../lib/ModalEditerCategory';
import {TEMPLATE_CATEGORY} from '../lib/constants/template';
import {fs_convert_schema_cript,fs_convert_list_des} from '../lib/constants/fs';
import * as lang from '../lib/constants/language';
import { toast } from 'react-toastify';
import {
    get_cate_tag,
    action_create_or_edit_category,
    get_category_infor_by_id
}from '../lib/constants/axios'
class ControlModelCategory extends Component {
    constructor (props) {
        super(props)
        this.state = {
            template_list:TEMPLATE_CATEGORY,
            data_source:{
                id:-1,
                categorys_result:0,//
                template_selected:0,//meta
                title_post:'',//
                content_post:'',//
                descriptions:'',//meta
                thumnail_post:'',//
                schema_seo_list:[],//meta array=> by JSON.Stringtify
                code_header:'',//meta
                code_body:'',//meta
                code_footer:'',//meta
                treeData:[],
                list_des_1:[],
                list_des_2:[],
                title_x2:'',
                title_x1:'',
                demo:'',
                dowload:'',
                group:''
            },
            id_category:-1,
            categorys_list:[]
        }
    }
    //
    async componentWillReceiveProps(nextProps){
        if(nextProps.id_category!==this.props.id_category){
            if(nextProps.id_category==-2){
                // create category 
                let data_source={
                    id:-1,
                    categorys_result:0,//
                    template_selected:0,//meta
                    title_post:'',//
                    content_post:'',//
                    descriptions:'',//meta
                    thumnail_post:'',//
                    schema_seo_list:[],//meta array=> by JSON.Stringtify
                    code_header:'',//meta
                    code_body:'',//meta
                    code_footer:'',//meta
                    treeData:[],
                    list_des_1:[],
                    list_des_2:[],
                    title_x2:'',
                    title_x1:'',
                    demo:'',
                    dowload:'',
                    group:''
    
                }
                this.setState({data_source:data_source});
            }else{
                // edit post [todo=> thêm code ở đây, để convert ra data input]
                let data_server=await get_category_infor_by_id(nextProps.id_category);
                let data=await get_cate_tag();
                if(data_server!='null'&&data!='null'){
                    let metaA=data_server.metaA.metaA==undefined||data_server.metaA.metaA==''?{}:JSON.parse(data_server.metaA.metaA);
                    let data_source={
                        id:data_server.id,
                        categorys_result:data_server.categorys_result,//
                        template_selected:metaA.template_selected==undefined?'':metaA.template_selected,//meta
                        title_post:data_server.title_post,//
                        content_post:data_server.content_post,//
                        descriptions:metaA.descriptions==undefined?'':metaA.descriptions,//meta
                        thumnail_post:data_server.thumnail_post,//
                        schema_seo_list:metaA.schema_seo_list==undefined?[]:JSON.parse(metaA.schema_seo_list),//meta array=> by JSON.Stringtify
                        code_header:metaA.code_header==undefined?'':metaA.code_header,//meta
                        code_body:metaA.code_body==undefined?'':metaA.code_body,//meta
                        code_footer:metaA.code_footer==undefined?'':metaA.code_footer,//meta
                        treeData:metaA.treeData==undefined?[]:metaA.treeData,
                        list_des_1:metaA.list_des_1==undefined?[]:metaA.list_des_1,
                        list_des_2:metaA.list_des_2==undefined?[]:metaA.list_des_2,
                        title_x2:metaA.title_x2==undefined?'':metaA.title_x2,
                        title_x1:metaA.title_x1==undefined?'':metaA.title_x1,
                        demo:metaA.demo==undefined?'':metaA.demo,
                        dowload:metaA.dowload==undefined?'':metaA.dowload,
                        group:metaA.group==undefined?'':metaA.group,
                    }
                    this.setState({
                        data_source:data_source,
                        categorys_list: data.categorys_list
                    })
                }
            }
            // console.log(nextProps.id_category);
            //Perform some operation
            // this.setState({someState: someValue });
            // ....
            // [todo]
        }
    }
    async componentDidMount(){
        let data=await get_cate_tag();
        if(data!=null){
            this.setState({
             categorys_list: data.categorys_list
            })
        }
    }

    //**************** Category */
    action_change_category=(categorys_result)=>{
        let {data_source}=this.state;
        data_source.categorys_result=categorys_result;
        this.setState({
            data_source:data_source
        })
    }
    //******************Templates */
    action_change_template=(i)=>{
        let {data_source}=this.state;
        data_source.template_selected=i;
        this.setState({
            data_source:data_source
        })
    }
    //*******************Title */
    action_change_title=(value)=>{
        let {data_source}=this.state;
        data_source.title_post=value;
        this.setState({
            data_source:data_source
        })
    }
    //********************Content post */
    action_change_content_post=(value)=>{
        let {data_source}=this.state;
        data_source.content_post=value;
        this.setState({
            data_source:data_source
        })
    }
    //********************Description post */
    action_change_descriptions=(value)=>{
        let {data_source}=this.state;
        data_source.descriptions=value;
        this.setState({
            data_source:data_source
        })
    }
 
    //********************** Schema post */
    action_change_schema=(value,i)=>{
        let {data_source}=this.state;
        data_source.schema_seo_list[i]=value;
        this.setState({
            data_source:data_source
        })
    }
    action_delete_schema=(i)=>{
        let {data_source}=this.state;
        data_source.schema_seo_list.splice(i,1);
        this.setState({
            data_source:data_source
        })
    }
    action_add_schema=()=>{
        let {data_source}=this.state;
        data_source.schema_seo_list.push('');
        this.setState({
            data_source:data_source
        })
    }
    //********************Header */
    action_change_code_header=(value)=>{
        let {data_source}=this.state;
        data_source.code_header=value;
        this.setState({
            data_source:data_source
        })
    }
    //********************body */
    action_change_code_body=(value)=>{
        let {data_source}=this.state;
        data_source.code_body=value;
        this.setState({
            data_source:data_source
        })
    }
    //********************footer */
    action_change_code_footer=(value)=>{
        let {data_source}=this.state;
        data_source.code_footer=value;
        this.setState({
            data_source:data_source
        })
    }
    //
    //********************add img to content */
    action_add_img_to_content=(value)=>{
        let {data_source}=this.state;
        data_source.content_post+=value;
        this.setState({
            data_source:data_source
        })
    }
    //
    //********************add img to thumnail */
    action_add_img_thumnail=(value)=>{
        let {data_source}=this.state;
        data_source.thumnail_post=value;
        this.setState({
            data_source:data_source
        })
    }
    //********************delete img to thumnail */
    delete_img_thumnail=()=>{
        let {data_source}=this.state;
        data_source.thumnail_post='';
        this.setState({
            data_source:data_source
        })
    }
    //
    //
    render() {
        let {data_source,template_list,categorys_list} =this.state;
        console.log("🚀 ~ file: ControlModelCategory.js ~ line 227 ~ ControlModelCategory ~ render ~ data_source", data_source)
        return (
            <React.Fragment>
                <ModalEditerCategory 
                    open={this.props.open}
                    data_source={data_source}
                    categorys_list={categorys_list}
                    template_list={template_list}
                    action_change_category={this.action_change_category}
                    action_change_template={this.action_change_template}
                    action_change_title={this.action_change_title} 
                    action_change_content_post={this.action_change_content_post} 
                    action_change_descriptions={this.action_change_descriptions} 
                    action_change_schema={this.action_change_schema} 
                    action_delete_schema={this.action_delete_schema} 
                    action_add_schema={this.action_add_schema} 
                    action_change_code_header={this.action_change_code_header} 
                    action_change_code_body={this.action_change_code_body} 
                    action_change_code_footer={this.action_change_code_footer} 
                    action_add_img_to_content={this.action_add_img_to_content} 
                    action_add_img_thumnail={this.action_add_img_thumnail} 
                    delete_img_thumnail={this.delete_img_thumnail} 
                    click_action_yes={this.click_action_yes} 
                    click_action_no={this.click_action_no} 
                    id_category={this.props.id_category}
                    change_treeData={this.change_treeData}
                    change_title_x2={this.change_title_x2}
                    change_title_x1={this.change_title_x1}
                    add_list_des={this.add_list_des}
                    change_list_des={this.change_list_des}
                    delete_list_des={this.delete_list_des}
                    change_link_btn={this.change_link_btn}
                />
            </React.Fragment>
        )
    }
//
change_treeData=(treeData)=>{
    let {data_source}=this.state;
    data_source.treeData=treeData;
    this.setState({data_source:data_source})
}
//
change_list_des=(value,i,type)=>{
    let {data_source}=this.state;
    if(type=="type1"){
        data_source.list_des_1[i]=value;
    }else{
        data_source.list_des_2[i]=value;
    }
    this.setState({data_source:data_source})
}
//
change_link_btn=(value,type)=>{
    let {data_source}=this.state;
    if(type=='demo'){
        data_source.demo=value;
    }else if(type=='dowload'){
        data_source.dowload=value;
    }else if(type=='group'){
        data_source.group=value;
    }
    this.setState({data_source:data_source});
}
//
delete_list_des=(i,type)=>{
    let {data_source}=this.state;
    if(type=="type1"){
        data_source.list_des_1.splice(i,1);
    }else{
        data_source.list_des_2.splice(i,1);
    }
    this.setState({data_source:data_source})
}
//
change_title_x1=(value)=>{
    let {data_source}=this.state;
    data_source.title_x1=value;
    this.setState({data_source:data_source})
}
//
change_title_x2=(value)=>{
    let {data_source}=this.state;
    data_source.title_x2=value;
    this.setState({data_source:data_source})
}
//
add_list_des=(type)=>{
    let {data_source}=this.state;
    if(type=="type1"){
        data_source.list_des_1.push('');
    }else{
        data_source.list_des_2.push('');
    }
    this.setState({data_source:data_source})
}
//
    click_action_no=()=>{
        this.props.close_model_edit()
    }
//
    click_action_yes=async()=>{
        // alert('yest ' + this.props.id_category) // [todo=> sau này có chỉnh sửa code gì thêm biến ở đây]
        let {data_source}=this.state;
        this.props.close_model_edit();
        let a=await action_create_or_edit_category({
            idN:data_source.id,
            parentIdN:data_source.categorys_result,
            nameS:data_source.title_post,
            contentS:data_source.content_post,
            thumnailS:data_source.thumnail_post,
            metaA:{
                metaA:JSON.stringify({ // bien chung, gop bien o day
                    code_body:data_source.code_body,
                    code_footer:data_source.code_footer,
                    code_header:data_source.code_header,
                    descriptions:data_source.descriptions,
                    template_selected:data_source.template_selected,
                    schema_seo_list:JSON.stringify(data_source.schema_seo_list),
                    schema_seo_result:fs_convert_schema_cript(data_source.schema_seo_list),
                    list_des_1:data_source.list_des_1,
                    list_des_2:data_source.list_des_2,
                    title_x1:data_source.title_x1,
                    title_x2:data_source.title_x2,
                    treeData:data_source.treeData,
                    demo:data_source.demo,
                    dowload:data_source.dowload,
                    group:data_source.group,
                    list_des_all_html:fs_convert_list_des(data_source.list_des_1,data_source.list_des_2),

                }),
                // bien can tao meta rieng o day
            }
        });
        if(a){// thanh cong
            this.props.add_edit_success()
            data_source.id==-1?toast.success(lang.SUCCPOST_CREATE,{theme: "colored"}):toast.success(lang.SUCC_POST_EDIT,{theme: "colored"});
            let data=await get_cate_tag();
            if(data!=null){
                this.setState({
                 categorys_list: data.categorys_list
                })
            }
        }else{// khong thanh cong
            toast.error(lang.ERRO_POST_CREATE,{theme: "colored"})
        }
    }
}
export default ControlModelCategory