import React, { Component } from 'react';
import {fs_convert_schema_cript} from '../lib/constants/fs';
import * as lang from '../lib/constants/language';
import { toast } from 'react-toastify';
import ModalEditerPage from '../lib/ModalEditerPage';
import {TEMPLATE_LANDING_PAGE} from '../lib/constants/template'
import {
    action_create_or_edit_ladning_page,
    get_landing_page_infor_by_id
} from '../lib/constants/axios'
class ControlModelPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            template_list:TEMPLATE_LANDING_PAGE,
            data_source:{
                id:-1,
                template_selected:-1,// meta
                title_post:'',//
                content_post:'',//
                descriptions:'',// meta
                thumnail_post:'',// meta
                schema_seo_list:[],// meta
                code_header:'',// meta
                code_body:'',// meta
                code_footer:'',// meta
                status:'publish',//
                code_css:''
                // data_lien_he:[],
                // data_redirect_code:{
                //     time:0,
                //     list_code:[]
                // }
            },
            id_page:-1
        }
    }
    //
  async  componentWillReceiveProps(nextProps){
        if(nextProps.id_page!==this.props.id_page){
            if(nextProps.id_page==-2){
                // create page
                let data_source={
                    id:-1,
                    template_selected:0,// meta
                    title_post:'',//
                    content_post:'',//
                    descriptions:'',// meta
                    thumnail_post:'',// meta
                    schema_seo_list:[],// meta
                    code_header:'',// meta
                    code_body:'',// meta
                    code_footer:'',// meta
                    status:'private',//
                    code_css:''
                    // data_lien_he:[],
                    // data_redirect_code:{
                    //     time:0,
                    //     list_code:[]
                    // }
                };
                this.setState({
                    data_source:data_source
                })
            }else{
                // edit post [todo=>]
                let data_server= await get_landing_page_infor_by_id(nextProps.id_page);
                if(data_server!='null'){
                    let metaA=data_server.metaA.metaA==undefined||data_server.metaA.metaA==''?{}:JSON.parse(data_server.metaA.metaA);
                    let data_source={
                        id:data_server.id,
                        template_selected:metaA.template_selected==undefined?"":metaA.template_selected,// meta
                        title_post:data_server.title_post,//
                        content_post:data_server.content_post,//
                        descriptions:metaA.descriptions==undefined?"":metaA.descriptions,// meta
                        thumnail_post:metaA.thumnail_post==undefined?"":metaA.thumnail_post,// meta
                        schema_seo_list:metaA.schema_seo_list==undefined?[]:JSON.parse(metaA.schema_seo_list),// meta
                        code_css:metaA.code_css==undefined?"":metaA.code_css,// meta
                        code_header:metaA.code_header==undefined?"":metaA.code_header,// meta
                        code_body:metaA.code_body==undefined?"":metaA.code_body,// meta
                        code_footer:metaA.code_footer==undefined?"":metaA.code_footer,// meta
                        status:data_server.status,
                        // data_lien_he:metaA.data_lien_he==undefined?[]:metaA.data_lien_he,
                        // data_redirect_code:metaA.data_redirect_code==undefined?{time:0,list_code:[]}:metaA.data_redirect_code,
                    };
                    this.setState({
                        data_source:data_source
                    })
                }  
            }
            // console.log(nextProps.id_page);
            // console.log('thay doi here!')
            //Perform some operation
            // this.setState({someState: someValue });
            // ....
            // [todo]
        }
    }

    // convert_data_server=(data)=>{
    // }
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
    //********************CSS */
    action_change_code_css=(value)=>{
        let {data_source}=this.state;
        data_source.code_css=value;
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
    //********************delete img to thumnail */
    action_change_status=(value)=>{
        let {data_source}=this.state;
        data_source.status=value;
        this.setState({
            data_source:data_source
        })
    }
    //
    render() {
        let {data_source,template_list} =this.state;
        return (
            <React.Fragment>
                <ModalEditerPage
                    open={this.props.open}
                    data_source={data_source}
                    template_list={template_list}
                    action_change_template={this.action_change_template}
                    action_change_title={this.action_change_title} 
                    action_change_content_post={this.action_change_content_post} 
                    action_change_descriptions={this.action_change_descriptions} 
                    action_change_schema={this.action_change_schema} 
                    action_delete_schema={this.action_delete_schema} 
                    action_add_schema={this.action_add_schema} 
                    action_change_code_css={this.action_change_code_css} 
                    action_change_code_header={this.action_change_code_header} 
                    action_change_code_body={this.action_change_code_body} 
                    action_change_code_footer={this.action_change_code_footer} 
                    action_add_img_to_content={this.action_add_img_to_content} 
                    action_add_img_thumnail={this.action_add_img_thumnail} 
                    action_change_status={this.action_change_status} 
                    delete_img_thumnail={this.delete_img_thumnail} 
                    change_code_lien_he={this.change_code_lien_he} 
                    // action_add_code_lien_he={this.action_add_code_lien_he} 
                    // change_data_redirect_code={this.change_data_redirect_code} 
                    click_action_yes={this.click_action_yes} 
                    click_action_no={this.click_action_no} 
                    id_page={this.props.id_page}
                />
            </React.Fragment>
        )
    }
//
// change_data_redirect_code=(type,value,i)=>{
//     let {data_source}=this.state;
//     if(type=='time'){
//         data_source.data_redirect_code.time=value;
//     }else if(type=='url'){
//         data_source.data_redirect_code.list_code[i].url=value;
//     }else if(type=='ma_code'){
//         data_source.data_redirect_code.list_code[i].ma_code=value;
//     }else if(type=='delete_list_code'){
//         data_source.data_redirect_code.list_code.splice(i,1);
//     }else if(type=='add'){
//         data_source.data_redirect_code.list_code.push({url:'',ma_code:''});
//     }
//     this.setState({data_source:data_source})
// }
//
// action_add_code_lien_he=(type,i)=>{
//     let {data_source}=this.state;
//     if(type=="add"){
//         data_source.data_lien_he.push({
//             code:"",
//             data_dowload:{
//                 url:'',
//                 ma_code:''
//             },
//             gia_tri:[]
//         })
//     }else if(type=="delete"){
//         data_source.data_lien_he.splice(i,1)
//     }
//     this.setState({data_source:data_source})
// }
//
change_code_lien_he=(type,value,i,k)=>{
    let {data_source}=this.state;
    let value_data_lien_he=data_source.data_lien_he[i];
    if(type=='code'){
        value_data_lien_he.code=value;
    }else if(type=='url'){
        value_data_lien_he.data_dowload.url=value;
    }else if(type=='ma_code'){
        value_data_lien_he.data_dowload.ma_code=value;
    }else if(type=='gia_tri'){
        value_data_lien_he.gia_tri[k]=value;
    }else if(type=='add_gia_tri'){
        value_data_lien_he.gia_tri.push('');
    }else if(type=='delete_gia_tri'){
        value_data_lien_he.gia_tri.splice(k,1);
    }else if(type=='title'){
        value_data_lien_he.title=value;
    }else if(type=='img_title'){
        value_data_lien_he.img_title=value;
    }

    data_source.data_lien_he[i]=value_data_lien_he;
    this.setState({data_source:data_source})
}
//
click_action_no=()=>{
    this.props.close_model_edit()
}
//
click_action_yes=async()=>{
    // alert(this.props.id_page) // [todo=>]
    let {data_source}=this.state;
    this.props.close_model_edit()
    let a=await action_create_or_edit_ladning_page({
        idN:data_source.id,
        titleS:data_source.title_post,
        contentS:data_source.content_post,
        statusS:data_source.status,
        metaA:{
            metaA:JSON.stringify({ // bien chung, gop bien o day
                code_body:data_source.code_body,
                code_css:data_source.code_css,
                code_footer:data_source.code_footer,
                code_header:data_source.code_header,
                descriptions:data_source.descriptions,
                template_selected:data_source.template_selected,
                schema_seo_list:JSON.stringify(data_source.schema_seo_list),
                schema_seo_result:fs_convert_schema_cript(data_source.schema_seo_list),
                // data_lien_he:data_source.data_lien_he,
                // data_redirect_code:data_source.data_redirect_code,
                thumnail_post:data_source.thumnail_post,

            }),
            // bien can tao meta rieng o day
        }
    });
    if(a.status==true){
        if(data_source.id==-1){
            this.props.add_data_new_page({
                id:a.id,
                title:data_source.title_post,
                status:data_source.status,
                url:a.url,//
                thumnail_url:data_source.thumnail_post
            });
            toast.success(lang.SUCCPOST_CREATE,{theme: "colored"})
        }else{
            this.props.add_data_update_page({
                id:a.id,
                title:data_source.title_post,
                status:data_source.status,
                url:a.url,//
                thumnail_url:data_source.thumnail_post
            })
            toast.success(lang.SUCC_POST_EDIT,{theme: "colored"})
        }
        
    }else{
        if(data_source.id==-1){
            toast.error(lang.ERRO_POST_CREATE,{theme: "colored"})
        }else{
            toast.error(lang.ERRO_POST_EDIT,{theme: "colored"})
        }
    }

}
}
export default ControlModelPage;