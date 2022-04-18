import React, { Component  } from 'react';
import { Button,Segment,Input,Modal,Header,Dropdown,Radio, Form, TextArea, Accordion, Icon,Popup} from 'semantic-ui-react';
import EditorWrap from './editorwrap';
import * as lang from './constants/language';
import FileMedia from './fileMedia';
import { ToastContainer, toast } from 'react-toastify';
class ModalEditerPost extends Component {
    constructor (props) {
        super(props)
        this.state = {
            i:'',
            mo_des:'',
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
//  **************** Categorys
action_change_category=(e,data)=>{
    this.props.action_change_category(data.value);
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
//****************** Tags
handleAddition = (e, { value }) => {
    this.props.action_add_tags(value);
}
handleChange = (e, { value }) => {
    this.props.action_change_tags(value);
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
//
show_list_data_demo=(data_demo)=>{
    let rs=[]
    if(data_demo.length>0){
        data_demo.forEach((e,i) => {
            rs.push(<Segment className='okok'><div style={{display: "flex"}}>
            <div className="iui">
                <div className='inli'>Thêm tiêu đề trang: </div>
                <div className='inli gh'>
                    <Input 
                        placeholder='Tên trang' fluid  size='mini'
                        value={e.name}
                        onChange={(e,{value})=>this.props.change_demo("name",i,value)}
                    />
                </div>
            </div>
            <div className="iui">
                <div className='inli'>Chọn hình demo Desktop: </div>
                <div className='inli gh'>
                    <Button basic color='blue' size='small' className='btn-mgb' onClick={()=>this.setState({open:true,type_media:'add_img_to_demo',multi_select:false,i:i,mo_des:'desktop'})}
                    ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                           {e.desktop!=""&&<i class="fa-solid fa-circle-xmark fgf" onClick={()=>this.props.change_demo("desktop",i,'')}></i>}
                    <div className='tyu'>
                        {e.desktop.substring(e.desktop.indexOf('uploads')+16,e.desktop.length)}
                    </div>
                </div>
            </div>
            <div className="iui">
                <div className='inli'>Chọn hình demo Mobile: </div>
                <div className='inli gh'>
                    <Button basic color='blue' size='small' className='btn-mgb' onClick={()=>this.setState({open:true,type_media:'add_img_to_demo',multi_select:false,i:i,mo_des:'mobile'})}
                    ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                           {e.mobile!=""&&<i class="fa-solid fa-circle-xmark fgf" onClick={()=>this.props.change_demo("mobile",i,'')} ></i>}
                    <div className='tyu'>
                            {e.mobile.substring(e.mobile.indexOf('uploads')+16,e.mobile.length)}
                    </div>
                </div>
            </div>
            <span className='kook' onClick={()=>this.props.delete_e_data_demo(i)}>X</span>
        </div></Segment>)
        });
    }
    return rs;
}
// ************* Modal file media
// return img
return_image=(list_img,type_media)=>{
    if(type_media=='add_img_to_content'){
        if(list_img.length>0){
            let img_rs='';
            list_img.forEach(e => {
                img_rs+=`<p><img src="${e.url}" class="lazyload" width="300"/></p>`;
            });
            this.props.action_add_img_to_content(img_rs);
        }
    }else if(type_media=='add_img_thumnail'){
        if(list_img.length>0){
            this.props.action_add_img_thumnail(list_img[0].url);
        }
    }else if(type_media=='add_img_to_demo'){
        if(list_img.length>0){
            let {i,mo_des}=this.state;
            this.props.change_demo(mo_des,i,list_img[0].url);
        }
    }
}
//***************Status */
action_change_status=(e,data)=>{
    this.props.action_change_status(data.value);
}
    render() {
        const { activeIndex } =  this.state;
        const {data_source,id_post,template_list,categorys_list,tags_all}=this.props;
        let template_selected=data_source.template_selected;
        return (<React.Fragment>
            <Modal
                size={"large"}
                open={this.props.open}
            >
                <Modal.Header className='blackw'>{id_post==-2?lang.CREATE_POST:lang.EDIT_POST} </Modal.Header>
                <Modal.Content className='blackw'>
                    <Segment raised className='xyg '>
                        <Header as='h3' className='clh'>*{lang.INPORTANT_POST}:</Header>
                        <Segment raised className={data_source.categorys_result.length>0?'okok':''}>
                            <Header as='h4'>{lang.CATEGORY_POST}: </Header>
                            <Dropdown
                                placeholder='Category'
                                fluid
                                multiple
                                search
                                selection
                                options={categorys_list}
                                onChange={this.action_change_category}
                                value={data_source.categorys_result}
                            />
                        </Segment>
                        <Segment raised  className={template_selected!=-1?'okok':''}>
                            <Header as='h4'>{lang.TEMPLATE_POST}:</Header>
                            {this.show_templates(template_list,template_selected)}
                        </Segment>
                        <Segment raised  className={data_source.title_post!=''?'okok':''}>
                            <Header as='h4'>{lang.TITLE}:</Header>
                            <Input 
                                placeholder='Title' fluid  size='big'
                                value={data_source.title_post}
                                onChange={this.action_change_title}
                            />
                        </Segment>
                        {/*  */}
                        {template_selected==2&&<Segment.Group raised >
                            <Segment className='okok'>
                                <Header as='h3' className='clh'>* URL chuyến hướng đến trang dowload:</Header>
                            </Segment>
                            <Segment className='okok'>
                                <div>
                                    <span>URL:</span>
                                    <Input 
                                        placeholder='https://' fluid  size='small'
                                        value={data_source.data_redirect.url}
                                        onChange={(e,{value})=>this.props.action_change_data_redirect('url',value)}
                                    />
                                </div>
                            </Segment>
                            <Segment className='okok'>
                                <div>
                                    <span>Thời gian đếm ngược(giây):</span>
                                    <Input 
                                        type='number'
                                        placeholder='60 ' fluid  size='small'
                                        value={data_source.data_redirect.time}
                                        onChange={(e,{value})=>this.props.action_change_data_redirect('time',value)}
                                    />
                                </div>
                            </Segment>
                        </Segment.Group>}
                        {/*  */}
                        {template_selected==1&&<Segment.Group raised >
                            <Segment className='okok'>
                                <Header as='h3' className='clh'>* Thêm hình ảnh demo cho trang:</Header>
                            </Segment>
                            {this.show_list_data_demo(data_source.data_demo)}

                            <Button icon className='add-da' style={{margin:"20px"}}
                                onClick={this.props.add_data_demo}>
                             <i className="fa-solid fa-plus"></i>
                            </Button>
                        </Segment.Group>}
                        {template_selected!=1&&<Segment raised className={data_source.content_post!=''?'okok':''}>
                            <Header as='h4'>{lang.CONTENT_POST}:</Header>
                            <Button basic color='blue' size='small' className='btn-mgb'
                                onClick={()=>this.setState({open:true,type_media:'add_img_to_content',multi_select:true})}
                            ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                            <div className='yu'><Popup content={lang.NOTE_ADD_ICON} trigger={ <span>👉<a target="_blank" href={lang.URL_ICON_TOOL}><i class="fa-solid fa-icons"></i>{lang.TITLE_ADD_ICON_TOOL}</a>👈</span>}/></div>
                            <EditorWrap
                                action_change_content_post={this.action_change_content_post}
                                content_post={data_source.content_post}
                            />
                        </Segment>}
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
                            <Segment raised className={data_source.tags_result.length>0?'hsj okok':'hsj'}>
                                <Header as='h4'>{lang.TAGS_POST}:</Header>
                                <Dropdown
                                    options={tags_all}
                                    placeholder='Add tags'
                                    search
                                    selection
                                    fluid
                                    multiple
                                    allowAdditions
                                    value={data_source.tags_result}
                                    onAddItem={this.handleAddition}
                                    onChange={this.handleChange}
                                />
                            </Segment>
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
                    <Dropdown options={this.props.permission_type!='contributor'?[{key:'private',text:lang.PRIVATE,value:'private'},{key:'publish',text:lang.PUBLISH,value:'publish'}]:[{key:'private',text:lang.PRIVATE,value:'private'}]}
                        value={this.props.permission_type!='contributor'?data_source.status:'private'}
                        onChange={this.action_change_status}
                    />
                    <Button negative onClick={this.click_action_no}>{lang.NO}</Button>
                    <Button positive onClick={this.click_action_yes} >{id_post==-2?lang.ACTION_POST:lang.UPDATE}</Button>
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
            // alert(lang.NOTIFY_VALIDATE_TITLE)
            toast.info(lang.NOTIFY_VALIDATE_TITLE,{theme: "colored"})
        }else{
            this.props.click_action_yes()
        }
    }
}
export default ModalEditerPost;