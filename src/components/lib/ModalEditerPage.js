import React, { Component  } from 'react';
import { Button,Segment,Input,Modal,Header,Dropdown,Radio, Form, TextArea, Accordion, Icon,Popup} from 'semantic-ui-react';
import EditorWrap from './editorwrap';
import * as lang from './constants/language';
import FileMedia from './fileMedia';
import {create_random_text} from '../lib/constants/fs'
import {toast } from 'react-toastify';
class ModalEditerPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index_gia_tri:[],
            data_content:"",
            activeIndex: -1,
            open:false,
            type_media:'', // add / thum...
            multi_select:true
        }
    }
handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
}

// **************** Templates
show_templates=(template_list,template_selected)=>{
    let result=[];
    let selected=template_selected;
    if(template_selected==-1){
        return result;
    }else{
        template_list.forEach((e,i) => {
            if(i==selected){
                result.push(
                    <div className='selecte' key={i}>
                        <span>{e.title}</span><br/>
                        <Radio toggle checked />
                    </div>
                )
            }else{
                result.push(
                    <div className='selecte'>
                        <span>{e.title}</span><br/>
                        <Radio toggle onClick={()=>this.action_change_template(i)}/>
                    </div>
                )
            }
        });
        return result
    }
}
//
action_change_template=(i)=>{
    this.props.action_change_template(i);
}
//******************Title
action_change_title=(e,data)=>{
    this.props.action_change_title(data.value);
}
//******************Contents post
action_change_content_post=(value)=>{
    this.props.action_change_content_post(value);
}
//******************Descriptions
action_change_descriptions=(e,data)=>{
    this.props.action_change_descriptions(data.value);
}

// **************** Schema
show_schema=(schema_seo_list)=>{
    let result=[];
    schema_seo_list.forEach((e,i) => {
        result.push(<Segment raised key={i}  className={e!=''?'okok':''}>
            <Header as='h4'>Schema {i}:</Header>
                <Form>
                    <TextArea placeholder='Code schema here.' 
                        value={e}
                        onChange={(e,data)=>this.action_change_schema(data,i)}
                    />
                </Form>
                <i className="fa-solid fa-trash-can rmx" onClick={()=>this.action_delete_schema(i)}></i>
            </Segment>)
    });
    return result;
}
//
action_change_schema(data,i){
this.props.action_change_schema(data.value,i);
}
//
action_delete_schema(i){
    if (window.confirm(`${lang.NOTIFY_DELETE_SCHEMA} Schema ${i}`) == true) {
        this.props.action_delete_schema(i);
    }
}
//****************Header */
action_change_code_header=(e,data)=>{
    this.props.action_change_code_header(data.value);
}
// ************* Modal file media
// return img
return_image=(list_img,type_media)=>{
    if(type_media=='add_img_to_content'){
        if(list_img.length>0){
            let img_rs='';
            list_img.forEach(e => {
                img_rs+=`<p><img src="${e.url}" class="lazyload" width="300"  /></p>`;
            });
            this.props.action_add_img_to_content(img_rs);
        }
    }else if(type_media=='add_img_thumnail'){
        if(list_img.length>0){
            this.props.action_add_img_thumnail(list_img[0].url);
        }
    }
    // else if(type_media=='add_img_to_gia_tri'){
    //     let {index_gia_tri}=this.state;
    //     if(list_img.length>0){
    //         this.props.change_code_lien_he('gia_tri',list_img[0].url,index_gia_tri[0],index_gia_tri[1]);
    //     }
    // }
    else if(type_media=='add_img_to_title'){
        let {index_gia_tri}=this.state;
        if(list_img.length>0){
            this.props.change_code_lien_he('img_title',list_img[0].url,index_gia_tri[0],index_gia_tri[1]);
        }
    }
}
//***************Status */
action_change_status=(e,data)=>{
    this.props.action_change_status(data.value);
}
//************** */
// show_contact_code_input=(data)=>{
//     let rs=[];
//     data.forEach((e,i)=> {
//         rs.push(
//             <div className='kioi' key={i}>
//                 <div className='d-flex'>
//                     <div className='d-flex titlez'>
//                         <div style={{width:"15%",marginTop:"5px"}}> Tiêu đề: </div>
//                         <div style={{width:"80%"}}>
//                             <Input 
//                                 placeholder='tiêu đề' fluid  size='mini'
//                                 value={e.title}
//                                 onChange={(e,{value})=>this.props.change_code_lien_he('title',value,i,false)}
//                             />
//                         </div>
//                     </div>
//                     <div className='d-flex imgz'>
//                         <div>
//                             <Button basic color='blue' size='small' className='btn-mgb'
//                                 onClick={()=>this.setState({open:true,type_media:'add_img_to_title',multi_select:false,index_gia_tri:[i,false]})}
//                             ><i className="fas fa-photo-video vv"></i>Add Media</Button>
//                         </div>
//                         <div style={{padingLeft:"5px"}}>
//                            <img src={e.img_title} width="auto" height="30px" />
//                         </div>
//                     </div>
//                 </div>
//                 <div style={{display: 'flex'}}>
//                     <div className='leftZ'>
//                         <p>Code liên hệ {i+1}: </p>
//                         <Form>
//                             <TextArea placeholder=''
//                                 value={e.code}
//                                 onChange={(e,{value})=>this.props.change_code_lien_he('code',value,i,false)}
//                             />
//                         </Form>
//                     </div>
//                     <div className='rightZ'>
//                         <div>
//                             <p>Url cần chuyển hướng (ads hoặc trang data cần share):</p>
//                             <Input 
//                                 placeholder='https://' fluid  size='mini'
//                                 value={e.data_dowload.url}
//                                 onChange={(e,{value})=>this.props.change_code_lien_he('url',value,i,false)}
//                             />
//                         </div>
//                         <div>
//                             <p style={{marginTop:"5px"}}>Mã code :(<span className='ghgu'
//                                 onClick={()=>{
//                                     this.props.change_code_lien_he('ma_code',create_random_text(5),i,false)
//                                 }}
//                             >auto create</span>)</p>
//                             <Input 
//                                 placeholder='ACBS243' fluid  size='mini'
//                                 value={e.data_dowload.ma_code}
//                                 onChange={(e,{value})=>this.props.change_code_lien_he('ma_code',value,i,false)}
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className='lolo'>
//                     {this.show_gia_tri(e.gia_tri,i)}

//                     <Button icon className='add-da' 
//                         onClick={(e,{value})=>this.props.change_code_lien_he('add_gia_tri',false,i,false)}
//                     >
//                         <i className="fa-solid fa-plus"></i>
//                     </Button>
//                 </div>
//                 <span class="oiuu" onClick={()=>this.props.action_add_code_lien_he("delete",i)} >X</span>
//             </div>
//         )
//     });
//     return rs;
// }
//
show_gia_tri=(gia_tri,i)=>{
    let rr=[];
    gia_tri.forEach((c,k) => {
        rr.push(<div key={k}>
            <div className='buz1'>{`giá trị ${k}`} :</div>
            <div className='buz2'>
                <Input 
                    placeholder={`giá trị ${k}`} fluid  size='small'
                    value={c}
                    onChange={(e,{value})=>this.props.change_code_lien_he('gia_tri',value,i,k)}
                />
            </div>
            <div className='buz3'>
                {/* <Button basic color='blue' size='small' className='btn-mgb'
                    onClick={()=>this.setState({open:true,type_media:'add_img_to_gia_tri',multi_select:false,index_gia_tri:[i,k]})}
                ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                {c.search("http")>-1&&<img src={c} width="40px" height="40px"  className='jiji'/>} */}
                <span class="oiu"  onClick={( )=>this.props.change_code_lien_he('delete_gia_tri','false',i,k)}>X</span>
            </div>
        </div>)
    });
    return rr;
}
//
// show_data_redirect_code=(list_code)=>{
//     let rs=[];
//     if(list_code!=undefined){
//         list_code.forEach((e,i) => {
//             rs.push(<div className='d-flex' key={i}>
//                 <div className='rightZ kioi' style={{display:"flex",width:'100%',marginBottom:'5px'}}>
//                     <div style={{width:"50%"}}>
//                         <p style={{marginBottom:"2px",marginTop:'10px'}}>Url cần chuyển hướng (ads hoặc trang data cần share):</p>
//                         <Input 
//                             placeholder='https://' fluid  size='mini'
//                             value={e.url}
//                             onChange={(e,{value})=>this.props.change_data_redirect_code('url',value,i)}
//                         />
//                     </div>
//                     <div style={{width:"50%"}}>
//                         <p style={{marginBottom:"2px",marginTop:'10px'}}>Mã code :</p>
//                         <Input 
//                             placeholder='ACBS243' fluid  size='mini'
//                             value={e.ma_code}
//                             onChange={(e,{value})=>this.props.change_data_redirect_code('ma_code',value,i)}
//                         />
//                     </div>
//                 </div>
//                 <span class="uyt" onClick={()=>this.props.change_data_redirect_code('delete_list_code',false,i)}>X</span>
//             </div>)
//         });
//     }
//     return rs;
// }
    render() {
        const { activeIndex } =  this.state;
        const {data_source,id_page,template_list}=this.props;
        // console.log("🚀 ~ file: ModalEditerPage.js ~ line 231 ~ ModalEditerPage ~ render ~ ", data_source.data_lien_he)
        
        return (<React.Fragment>
            <Modal
                size={"large"}
                open={this.props.open}
            >
                <Modal.Header className='blackw'>{id_page==-2?lang.CREATE_NEW_PAG:lang.EDIT_PAG} </Modal.Header>
                <Modal.Content className='blackw'>
                    <Segment raised className='xyg '>
                        <Header as='h3' className='clh'>*{lang.INPORTANT_POST}:</Header>
                        <Segment raised  className={data_source.template_selected!=-1?'okok':''}>
                            <Header as='h4'>{lang.TEMPLATE_POST}:</Header>
                            {this.show_templates(template_list,data_source.template_selected)}
                        </Segment>
                        <Segment raised  className={data_source.title_post!=''?'okok':''}>
                            <Header as='h4'>{lang.TITLE_PAGE}:</Header>
                            <Input 
                                placeholder='Title' fluid  size='big'
                                value={data_source.title_post}
                                onChange={this.action_change_title}
                            />
                        </Segment>
                        {/* {data_source.template_selected==2&&<Segment raised className={data_source.content_post!=''?'okok':''}>
                            <Header as='h4'>Tạo mã và đường dẫn chuyển hướng:</Header>
                            <div>
                                <div>
                                    <div style={{display:"inline"}}>Thời gian đếm ngược(s):</div>
                                    <div style={{display:"inline-block",width:"30%", marginLeft:"5px"}}>
                                        <Input 
                                            fluid  size='mini'
                                            type='number'
                                            value={data_source.data_redirect_code.time}
                                            onChange={(e,{value})=>this.props.change_data_redirect_code('time',value,false)}
                                        />
                                    </div>
                                </div>

                                {this.show_data_redirect_code(data_source.data_redirect_code.list_code)}
                                <Button icon className='add-da' 
                                    onClick={()=>this.props.change_data_redirect_code('add',false,false)}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </Button>
                            </div>
                        </Segment>} */}
                        {/* {data_source.template_selected==1&&<Segment raised className={data_source.content_post!=''?'okok':''}>
                            <Header as='h4'>Share Code liên hệ ở đây:</Header>

                            {this.show_contact_code_input(data_source.data_lien_he)}
                            <Button icon className='add-da' 
                                onClick={()=>this.props.action_add_code_lien_he("add",false)}
                            >
                                <i className="fa-solid fa-plus"></i>
                            </Button>
                        </Segment>} */}
                        <Segment raised className={data_source.content_post!=''?'okok':''}>
                            <Header as='h4'>{lang.CONTENT_POST}:</Header>
                            <Button basic color='blue' size='small' className='btn-mgb'
                                onClick={()=>this.setState({open:true,type_media:'add_img_to_content',multi_select:true})}
                            ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                               <div className='yu'><Popup content={lang.NOTE_ADD_ICON} trigger={ <span>👉<a target="_blank" href={lang.URL_ICON_TOOL}><i class="fa-solid fa-icons"></i>{lang.TITLE_ADD_ICON_TOOL}</a>👈</span>}/></div>
                            <EditorWrap
                                action_change_content_post={this.action_change_content_post}
                                content_post={data_source.content_post}
                            />
                        </Segment>
                        <Segment raised className={data_source.descriptions!=''?'okok':''}>
                            <Header as='h4'>{lang.DESCRIPTION_POST}:</Header>
                            <Form>
                                <TextArea placeholder=''
                                    value={data_source.descriptions}
                                    onChange={this.action_change_descriptions}
                                />
                            </Form>
                        </Segment>
                        <Segment.Group horizontal>
                            <Segment raised  className={data_source.thumnail_post!=''?'okok':''}>
                                <Header as='h4'>{lang.THUMNAIL_POST}:</Header>
                                <Button basic color='blue' size='small' className='btn-mgb'
                                 onClick={()=>this.setState({open:true,type_media:'add_img_thumnail',multi_select:false})}
                                ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                                <div className='thumxx'>
                                    <div className='vvv'>
                                        {(data_source.thumnail_post!=""&&data_source.thumnail_post!=undefined)&&<img src={data_source.thumnail_post} className='thumnailzz'/>}
                                        {(data_source.thumnail_post!=""&&data_source.thumnail_post!=undefined)&&<i class="fa-solid fa-circle-xmark kk" onClick={()=>this.props.delete_img_thumnail()}></i>}
                                    </div>
                                </div>
                            </Segment>
                        </Segment.Group>
                    </Segment>
                    <Segment raised className='xyg'>
                        <Header as='h3' className='clh'>*{lang.SEO_POST}:</Header>
                        <Accordion>
                            <Accordion.Title
                            active={activeIndex === 0}
                            index={0}
                            onClick={this.handleClick}
                            >
                            <Icon name='dropdown' />
                                {lang.TITLE_SEO_POST_1}
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                            <p>
                               {lang.DESCRIPTIONS_SEO_POST_1}
                            </p>
                            </Accordion.Content>

                            <Accordion.Title
                            active={activeIndex === 1}
                            index={1}
                            onClick={this.handleClick}
                            >
                            <Icon name='dropdown' />
                                {lang.TITLE_SEO_POST_2}
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 1}>
                            <p>
                                👉 <a href={lang.URL_HDSD_SEO_SCHEMA} target="_blank">{lang.TITLE_HDSD_SEO_SCHEMA}</a>
                            </p>
                            </Accordion.Content>

                        </Accordion>
                        <p className='uet'><a href={lang.GENERATOR_SCHEMA_URL} target="_blank">{lang.GENERATOR_SCHEMA_WEB}</a></p>
                        {this.show_schema(data_source.schema_seo_list)}
                        <Button icon className='add-da' onClick={this.props.action_add_schema}>
                             <i className="fa-solid fa-plus"></i>
                        </Button>
                    </Segment>
                    <Segment raised className='xyg' >
                        <Header as='h3' className='clh'>*{lang.ADVANCED_SETING}:</Header>
                        <Segment raised className={data_source.code_header!=''?'okok':''}>
                            <Header as='h4'>Css cho trang này:</Header>
                            <Form>
                                <TextArea placeholder='Code here.' 
                                    value={data_source.code_css}
                                    onChange={(e,{value})=>this.props.action_change_code_css(value)}
                                />
                            </Form>
                        </Segment>
                        <Segment raised className={data_source.code_header!=''?'okok':''}>
                            <Header as='h4'>Header:</Header>
                            <Form>
                                <TextArea placeholder='Code here.' 
                                    value={data_source.code_header}
                                    onChange={this.action_change_code_header}
                                />
                            </Form>
                        </Segment>
                        <Segment raised className={data_source.code_body!=''?'okok':''}>
                            <Header as='h4'>Body:</Header>
                            <Form>
                                <TextArea placeholder='Code here.'
                                    value={data_source.code_body}
                                    onChange={(e,data)=>this.props.action_change_code_body(data.value)}
                                />
                            </Form>
                        </Segment>
                        <Segment raised className={data_source.code_footer!=''?'okok':''}>
                            <Header as='h4'>Footer:</Header>
                            <Form>
                                <TextArea placeholder='Code more'
                                    value={data_source.code_footer}
                                    onChange={(e,data)=>this.props.action_change_code_footer(data.value)}
                                />
                            </Form>
                        </Segment>
                    </Segment>
                    
                </Modal.Content>
                <Modal.Actions>
                    <Dropdown options={[
                        {key:'private',text:lang.PRIVATE,value:'private'},
                        {key:'publish',text:lang.PUBLISH,value:'publish'}
                    ]}
                        value={data_source.status}
                        onChange={this.action_change_status}
                    />
                    <Button negative onClick={this.click_action_no}>{lang.NO}</Button>
                    <Button positive onClick={this.click_action_yes} >{id_page==-2?lang.ACTION_POST:lang.UPDATE}</Button>
                </Modal.Actions>
            </Modal>
            <FileMedia
                multi_select={this.state.multi_select}
                open={this.state.open}
                type_media={this.state.type_media}
                return_image={this.return_image}
                set_open_media={(open)=>this.setState({open:open})}
            />
        </React.Fragment>
        )
    }
    // 
    click_action_no=()=>{
        this.props.click_action_no()
    }
    //
    click_action_yes=()=>{
        if(this.props.data_source.title_post.length<3){
            toast.info(lang.NOTIFY_VALIDATE_TITLE,{theme: "colored"})
        }else{
            this.props.click_action_yes()
        }
    }
}
export default ModalEditerPage;