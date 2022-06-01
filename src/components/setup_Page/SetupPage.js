import React, { Component } from 'react';
import { Segment,Header,Button,Message,Form,TextArea,Input,Dropdown } from 'semantic-ui-react';
// import Sortable from '../lib/sortable';
import FileMedia from '../lib/fileMedia';
import * as lang from '../lib/constants/language';
import { toast } from 'react-toastify';
import beautify from 'simply-beautiful';
import {
    get_all_category_pl,
    get_all_page_All_pl,
    action_update_data_plugin,
    get_data_plugin
} from '../lib/constants/axios'
class SetupPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            keyz:0,
            code_value_i:null,
            value_update:{},
            treeData:[],
            open:false,
            type_media:'',// addIcon,addlogo,codeValue
            value_category:{value:""},
            value_page:{value:""},
            value_custom_text:{
                text:'',
                url:''
            },
            data:{
                // icon_url_32:'',
                icon_url_192:'',
                // icon_url_180:'',
                logo_url_1:'',
                // logo_url_2:'',
                code_contacts:{
                    code_source:'',
                    code_value:[],
                },
                footer_setup:{
                    url_fb:'',
                    url_zalo:'',
                    design_by:'',
                    hotline:''
                },
                code_header:'',
                code_body:'',
                code_footer:'',
                css_code:'',
                website_name:'',
                data_plugin:{
                    API_telegram:'',
                    header_title:'',
                    Telegram_chat_id:''
                }
                // add_code_posts:{
                //     code_header:'',
                //     code_body:'',
                //     code_footer:'',
                //     css_code:'',
                // },
                // add_code_pages:{
                //     code_header:'',
                //     code_body:'',
                //     code_footer:'',
                //     css_code:'',
                // },
                // add_code_cetegorys:{
                //     code_header:'',
                //     code_body:'',
                //     code_footer:'',
                //     css_code:'',
                // },
            },
            category_list:[],
            page_list:[]
        }
    }
    //
    async componentDidMount(){
        let cate_list=await get_all_category_pl();
        let page_list=await get_all_page_All_pl();
        let data_setup=await get_data_plugin({keyz:'plugin_setup'})
        if(data_setup!='null'){
            try{
                // if(data_setup.add_code_posts==undefined)data_setup.add_code_posts={code_header:'',code_body:'',code_footer:'',css_code:'',};
                // if(data_setup.add_code_pages==undefined)data_setup.add_code_pages={code_header:'',code_body:'',code_footer:'',css_code:'',};
                if(data_setup.data_plugin==undefined)data_setup.data_plugin={
                    API_telegram:''
                };
                this.setState({
                    category_list:cate_list,
                    page_list:page_list,
                    treeData:data_setup.treeData,
                    data:data_setup
                })
            }catch(e){
                this.setState({
                    category_list:cate_list,
                    page_list:page_list,
                })
            }
        }else{
            this.setState({
                category_list:cate_list,
                page_list:page_list,
            })
        }

    }
    //
    return_image=(arr_img)=>{
        let {type_media,data,code_value_i}=this.state;
        if(type_media=='addIcon_32'){
            if(arr_img.length>0){
                data.icon_url_32=arr_img[0].url;
                this.setState({
                    data:data
                })
            }
        }else if(type_media=='addIcon_192'){
            if(arr_img.length>0){
                data.icon_url_192=arr_img[0].url;
                this.setState({
                    data:data
                })
            }
        }else if(type_media=='addIcon_180'){
            if(arr_img.length>0){
                data.icon_url_180=arr_img[0].url;
                this.setState({
                    data:data
                })
            }
        } else if(type_media=='addlogo_1'){
            if(arr_img.length>0){
                data.logo_url_1=arr_img[0].url;
                this.setState({
                    data:data
                })
            }
        }else if(type_media=='addlogo_2'){
            if(arr_img.length>0){
                data.logo_url_2=arr_img[0].url;
                this.setState({
                    data:data
                })
            }
        }else if(type_media=='codeValue'){
            if(arr_img.length>0){
                data.code_contacts.code_value[code_value_i]=arr_img[0].url;
                this.setState({
                    data:data
                })
            }
        }
        
    }
    // delete icon
    action_delete_img_icon=()=>{
        let {data}=this.state;
        data.icon_url_32='';
        this.setState({
            data:data
        })
    }
    // delete logo
    action_delete_img_logo=()=>{
        let {data}=this.state;
        data.logo_url_1='';
        this.setState({
            data:data
        })
    }
    // change cateogry
    // onChange_category=(e, { value })=>{
    //     let {category_list}=this.state;
    //     let js=null;
    //     category_list.forEach((e,i) => {
    //         if(e.value==value){
    //             js=i;
    //         }
    //     });
    //     if(js!=null){
    //         this.setState({
    //             value_category:category_list[js]
    //         })
    //     }

    // }
    // change page
    // onChange_page=(e, { value })=>{
    //     let {page_list}=this.state;
    //     let js=null;
    //     page_list.forEach((e,i) => {
    //         if(e.value==value){
    //             js=i;
    //         }
    //     });
    //     if(js!=null){
    //         this.setState({
    //             value_page:page_list[js]
    //         })
    //     }

    // }
    // add category
    // action_add_Cateogry=()=>{
    //     let {value_category,keyz}=this.state;
    //     if(value_category.value!=''){
    //         // treeData.push(value_category);
    //         this.setState({
    //             keyz:keyz+1,
    //             value_update:value_category,
    //             value_category:{
    //                 value:""
    //             },
    //         })
    //     }else{
    //         alert(lang.ALERT_1)
    //     }
    // }
    // add page
    // action_add_page=()=>{
    //     let {value_page,keyz}=this.state;
    //     if(value_page.value!=''){
    //         // treeData.push(value_category);
    //         this.setState({
    //             keyz:keyz+1,
    //             value_update:value_page,
    //             value_page:{
    //                 value:""
    //             },
    //         })
    //     }else{
    //         alert(lang.ALERT_2)
    //     }
    // }
    // change text
    // action_change_text=(e,{value})=>{
    //     let {value_custom_text}=this.state;
    //     value_custom_text.text=value;
    //     this.setState({
    //         value_custom_text:value_custom_text
    //     })
    // }
    // change url
    // action_change_url=(e,{value})=>{
    //     let {value_custom_text}=this.state;
    //     value_custom_text.url=value;
    //     this.setState({
    //         value_custom_text:value_custom_text
    //     })
    // }
    // add custom text url
    // action_add_text=()=>{
    //     let {value_custom_text,keyz}=this.state;
    //     if(value_custom_text.text!=''&&value_custom_text.url!=""){
    //         this.setState({
    //             keyz:keyz+1,
    //             value_update:{
    //                 title:value_custom_text.text,
    //                 key:value_custom_text.text,
    //                 text:value_custom_text.text,
    //                 value:value_custom_text.text,
    //                 url:value_custom_text.url
    //             },
    //             value_custom_text:{
    //                 text:'',
    //                 url:''
    //             },
    //         })
    //     }else{
    //         alert(lang.ALERT_3)
    //     }
    // }
    action_change_code_source=(e,{value})=>{
        let {data}=this.state;
        data.code_contacts.code_source=value;
        this.setState({data:data});
    }
    // show code value
    show_code_value=(code_value)=>{
        let result=[];
        code_value.forEach((e,i) => {
            result.push(
                <div className='wrap-bb' key={i}>
                    <span>{lang.VALUE} {i}:</span>
                    <div className='inputT'>
                        <Input 
                            size='small' 
                            placeholder={`${lang.VALUE_ADD} ${i}`} fluid 
                            value={e}
                            onChange={(e,{value})=>this.action_change_code_value(value,i)}
                        />
                        
                    </div>
                    <div className='inputM'>
                        <Button basic color='blue' size='small' className='btn-mgb'
                            onClick={()=>this.setState({open:true,type_media:'codeValue',code_value_i:i})}
                        ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                        <i className="fa-solid fa-circle-xmark uuz" onClick={()=>this.action_delete_code_value(i)}></i>
                        {e.search('http')!=-1&&<img src={e} height={'50px'}/>}
                    </div>
                </div>
            )
        });
        return result;
    }
    // change code value
    action_change_code_value=(value,i)=>{
        let {data}=this.state;
        data.code_contacts.code_value[i]=value;
        this.setState({data:data})
    }
    // add new code value
    action_add_code_value=()=>{
        let {data}=this.state;
        data.code_contacts.code_value.push('');
        this.setState({data:data})
    }
    // delete code value
    action_delete_code_value=(i)=>{
        let {data}=this.state;
        data.code_contacts.code_value.splice(i,1);
        this.setState({data:data})
    }

    render() {
        let {data,value_category,value_page,value_custom_text,category_list,page_list}=this.state;

        return (
            <React.Fragment>
                <Message  color='brown'>
                    <Message.Header>{lang.NOTIFY}:</Message.Header>
                    <Message.List items={[
                          lang.NOTIFY_1,
                          lang,lang.NOTIFY_2,
                          lang.NOTIFY_3,
                    ]} />
                </Message>
                <Segment raised className='okok'>
                    <div className='wrap-bb' >
                        <span className='oii'>{lang.NAME_SITE} :</span>
                        <div className='inputK'>
                            <div >
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.website_name}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.website_name=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Segment>
                <Segment raised className='okok'>
                    <div className='wrap-bb' >
                        <span className='oii'>Khẩu hiệu của website :</span>
                        <div className='inputK'>
                            <div >
                                <Input 
                                    size='small' 
                                    fluid
                                    placeholder='Chào mừng bạn đến với Nội thất An Bình'
                                    value={data.data_plugin.header_title}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.data_plugin.header_title=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Segment>

               <Segment raised className='okok'>
                    <Header as='h4' className='clh'>*{lang.ICON_WEB} </Header>
                    <p>
                        {lang.NOTIFY_ICON_WEB} <a href={lang.NOTIFY_ICON_WEB_HDSD_URL}  target="_blank">{lang.NOTIFY_WEB_HDSD_TITLE}</a>
                    </p>
                    {/* <div className='ghhg'>
                        <Button basic color='blue' size='small' className='btn-mgb'
                            onClick={()=>this.setState({open:true,type_media:'addIcon_32'})}
                        ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                        {data.icon_url_32!=''&&<div className='thum'><div className='vvv'>
                            <img src={data.icon_url_32} height={'50px'}/>
                            <i className="fa-solid fa-x xxz zzx" onClick={this.action_delete_img_icon}></i>
                        </div></div>}
                        <p>32x32</p>
                    </div> */}
                    <div className='ghhg'>
                        <Button basic color='blue' size='small' className='btn-mgb'
                            onClick={()=>this.setState({open:true,type_media:'addIcon_192'})}
                        ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                        {data.icon_url_192!=''&&<div className='thum'><div className='vvv'>
                            <img src={data.icon_url_192} height={'50px'}/>
                            <i className="fa-solid fa-x xxz zzx" onClick={()=>{
                                let {data}=this.state;
                                data.icon_url_192='';
                                this.setState({data:data});
                            }}></i>
                        </div></div>}
                        <p>192x192</p>
                    </div>
                    {/* <div className='ghhg'>
                        <Button basic color='blue' size='small' className='btn-mgb'
                            onClick={()=>this.setState({open:true,type_media:'addIcon_180'})}
                        ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                        {data.icon_url_180!=''&&<div className='thum'><div className='vvv'>
                            <img src={data.icon_url_180} height={'50px'}/>
                            <i className="fa-solid fa-x xxz zzx" onClick={()=>{
                                let {data}=this.state;
                                data.icon_url_180='';
                                this.setState({data:data});
                            }}></i>
                        </div></div>}
                        <p>180x180</p>
                    </div> */}
                </Segment>

               <Segment raised className='okok'>
                    <Header as='h4' className='clh'>*{lang.LOGO_WEB} </Header>
                    <p>
                        {lang.NOTIFY_LOGO_WEB} <a href={lang.NOTIFY_LOGO_WEB_HDSD_URL}  target="_blank">{lang.NOTIFY_WEB_HDSD_TITLE}</a>
                    </p>
                    <div className='ghhg'>
                        <Button basic color='blue' size='small' className='btn-mgb'
                            onClick={()=>this.setState({open:true,type_media:'addlogo_1'})}
                        ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                        {data.logo_url_1!=''&&<div className='thum'><div className='vvv'>
                            <img src={data.logo_url_1} height={'50px'}/>
                            <i className="fa-solid fa-x xxz zzx" onClick={this.action_delete_img_logo}></i>
                        </div></div>}
                        <p>179:52</p>
                    </div>
                    {/* <div className='ghhg'>
                        <Button basic color='blue' size='small' className='btn-mgb'
                            onClick={()=>this.setState({open:true,type_media:'addlogo_2'})}
                        ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                        {data.logo_url_2!=''&&<div className='thum'><div className='vvv'>
                            <img src={data.logo_url_2} height={'50px'}/>
                            <i className="fa-solid fa-x xxz zzx" onClick={()=>{
                                let {data}=this.state;
                                data.logo_url_2='';
                                this.setState({data:data})
                            }}></i>
                        </div></div>}
                        <p>1:1</p>
                    </div> */}
                </Segment>
                
                <Segment raised className='okok'>
                    <Header as='h4' className='clh'>*Cài đặt plugin: </Header>
                    <div>
                        <div className='f-3'>API telegram (thông báo khi có người gửi form) :</div>
                        <div className='f-4'>
                                <p>API :</p>
                                <Input 
                                    size='small' 
                                    fluid 
                                    placeholder='API'
                                    value={data.data_plugin.API_telegram}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.data_plugin.API_telegram=value;
                                        this.setState({data:data})
                                    }}
                                />
                        </div><div className='f-1'></div>
                        <div className='f-4'>
                                <p>Chat ID :</p>
                                <Input 
                                    size='small' 
                                    placeholder='Chat ID'
                                    fluid 
                                    type='number'
                                    value={data.data_plugin.Telegram_chat_id}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.data_plugin.Telegram_chat_id=value;
                                        this.setState({data:data})
                                    }}
                                />
                        </div>
                    </div>
                </Segment>

               {/* <Segment raised className='okok'>
                    <Header as='h4' className='clh'>*{lang.MENU_WEB} </Header>
                    <p>
                         {lang.NOTIFY_MENU_WEB}<a href={lang.NOTIFY_MENU_WEB_HDSD_URL}  target="_blank">{lang.NOTIFY_WEB_HDSD_TITLE}</a>
                    </p>
                 

                    <Segment.Group horizontal>
                            <Segment raised className={'okok mrz'}>
                                <div>
                                    <p>{lang.ADD_CATEGORY}:</p>
                                    <div className='iih'>
                                        <div className='hhz'>
                                            <Dropdown
                                                placeholder={lang.HOLDER_ADD_CATEGORY}
                                                fluid
                                                search
                                                selection
                                                options={category_list}
                                                value={value_category.value}
                                                onChange={this.onChange_category}
                                            />
                                        </div>
                                        <div className='hhv'>
                                            <Button icon className='add-da' onClick={this.action_add_Cateogry}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                    </div>
                                </div>                                
                                <div className='iih'>
                                    <p>{lang.ADD_PAGE}</p>
                                    <div>
                                        <div className='hhz'>
                                            <Dropdown
                                                placeholder={lang.HOLDER_ADD_PAGE}
                                                fluid
                                                search
                                                selection
                                                options={page_list}
                                                value={value_page.value}
                                                onChange={this.onChange_page}
                                            />
                                        </div>
                                        <div className='hhv'>
                                            <Button icon className='add-da' onClick={this.action_add_page}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                    </div>
                                </div>                                
                                <div className='iih'>
                                    <p>{lang.ADD_CUSTOM_TEXT}</p>
                                    <div>
                                        <div className='hhz'>
                                            <span>Text:</span>
                                            <Input 
                                                placeholder='Text' fluid  size='small'
                                                value={value_custom_text.text}
                                                onChange={this.action_change_text}
                                            />
                                            <span>Url:</span>
                                            <Input 
                                                placeholder='http://google.com/xyz' fluid  size='small'
                                                value={value_custom_text.url}
                                                onChange={this.action_change_url}
                                            />
                                        </div>
                                        <div className='hhv'>
                                            <Button icon className='add-da' onClick={this.action_add_text}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                    </div>
                                </div>                                
                            </Segment>
                            <Segment raised  className={'okok'}>
                                <Sortable
                                    treeData={this.state.treeData}
                                    change_treeData={(treeData)=>this.setState({treeData:treeData})}
                                    maxDepth={2}
                                    keyz={this.state.keyz}
                                    value_update={this.state.value_update}
                                />
                            </Segment>
                        </Segment.Group>

                </Segment> */}

                <Segment raised className='okok'>
                    <Header as='h4' className='clh'>*{lang.FOOTER_PAGE_SETUP}</Header>
                    <div className='wrap-bb' >
                        <span className='oii'>Facebook setup :</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>URL:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.footer_setup.url_fb}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.footer_setup.url_fb=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                            {/* <div className='jhv'>
                                <span>Title:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.footer_setup.title_fb}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.footer_setup.title_fb=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div> */}
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Zalo setup:</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>URL:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.footer_setup.url_zalo}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.footer_setup.url_zalo=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                            {/* <div className='jhv'>
                                <span>Title:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.footer_setup.title_zalo}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.footer_setup.title_zalo=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div> */}
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Hotline :</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>by:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.footer_setup.hotline}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.footer_setup.hotline=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
 
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Design by :</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>by:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.footer_setup.design_by}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.footer_setup.design_by=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
 
                        </div>
                    </div>
                </Segment>

               <Segment raised className='okok'>
                    <Header as='h4' className='clh'>*{lang.CONTACT_CODE_WEB}</Header>
                    <p>
                        {lang.NOTIFY_CONTACT_CODE_WEB} <a href={lang.NOTIFY_CONTACT_CODE_HDSD_URL}  target="_blank">{lang.NOTIFY_WEB_HDSD_TITLE}</a>
                    </p>
                    <Form>
                        <TextArea 
                            rows={4}
                            placeholder={lang.ADD_CODE_HERE}
                            value={data.code_contacts.code_source}
                            onChange={this.action_change_code_source}
                        />
                    </Form>
                    <div className='wrap-kk'>
                        {this.show_code_value(data.code_contacts.code_value)}
                        <Button icon className='add-da' onClick={this.action_add_code_value}>
                             <i className="fa-solid fa-plus"></i>
                        </Button>
                    </div>                    
                </Segment>

                <Segment raised className='xyg' >
                        <Header as='h4' className='clh'>* Phần chèn code chung cho toàn trang web</Header>
                        <p>
                            {lang.NOTIFY_ADD_CODE}<a href={lang.NOTIFY_ADD_CODE_HDSD_URL}  target="_blank">{lang.NOTIFY_WEB_HDSD_TITLE}</a>
                        </p>
                        <Segment raised className='okok'>
                            <Header as='h4'>CSS code:</Header>
                            <Form>
                                <TextArea placeholder='Code here.' rows={10}
                                    value={data.css_code}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.css_code=value;
                                        this.setState({data:data})
                                    }}
                                />
                                <span className='format-css'
                                    onClick={()=>{
                                        let {data}=this.state;
                                        data.css_code=beautify.css(data.css_code);
                                        this.setState({data:data})
                                    }}
                                >format css</span>
                            </Form>
                        </Segment>
                        <Segment raised className='okok'>
                            <Header as='h4'>Header:</Header>
                            <Form>
                                <TextArea placeholder='Code here.' rows={10}
                                    value={data.code_header}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.code_header=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </Form>
                        </Segment>
                        <Segment raised className='okok'>
                            <Header as='h4'>Body:</Header>
                            <Form>
                                <TextArea placeholder='Code here.' rows={10}
                                    value={data.code_body}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.code_body=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </Form>
                        </Segment>
                        <Segment raised className='okok'>
                            <Header as='h4'>Footer:</Header>
                            <Form>
                                <TextArea placeholder='Code here' rows={10}
                                     value={data.code_footer}
                                     onChange={(e,{value})=>{
                                         let {data}=this.state;
                                         data.code_footer=value;
                                         this.setState({data:data})
                                     }}
                                />
                            </Form>
                        </Segment>
 
                </Segment>
                {/*  */}
                    <div style={{float:"right"}}>
                       <Button positive onClick={this.click_action_update} >{lang.UPDATE}</Button>
                    </div>
                    
                <FileMedia
                    open={this.state.open}
                    type_media={this.state.type_media}
                    return_image={this.return_image}
                    multi_select={false}
                    set_open_media={(open)=>this.setState({open:open})}
                />
             <div style={{height:'80px'}}></div>
            </React.Fragment>
        )
    }

    click_action_update=async()=>{
        let {treeData,data} =this.state;
        data.menu_html=this.convert_menu_html(treeData);
        data.button_contact_html=this.convert_contact_html(data.code_contacts);
        data.treeData=treeData;
        let z=await action_update_data_plugin({
            keyz:'plugin_setup',
            valuez:JSON.stringify(data)
        })
        if(z){
            toast.success(lang.SUCC_POST_EDIT,{theme: "colored"});
        }else{
            toast.error(lang.ERRO_POST_EDIT,{theme: "colored"});
        }
    }

    // convert treeData => html menu [todo=>]
    convert_menu_html=(treeData)=>{
        let result='<ul id="nav">';
        treeData.forEach((e,i) => {
            result+='<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-2013 current_page_item menu-item-2394"><a aria-current="page" data-wpel-link="internal" href="'+e.url+'">'+e.title+'</a>'
            if(e.children!=undefined){
                if(e.children.length>0){
                    result+='<ul class="sub-menu">';
                    for(let j=0;j<e.children.length;j++){
                        result+='<li class="menu-item menu-item-type-taxonomy menu-item-object-category"><a data-wpel-link="internal"  href="'+e.children[j].url+'">'+e.children[j].title+'</a></li>';
                    }
                    result+='</ul>';
                }
            }
            result+='</li>'
        });
        result+='</ul>';
        return result;
    }
    //
    convert_contact_html=(code_contacts)=>{
        let contact_html=code_contacts.code_source;
        code_contacts.code_value.forEach((e,i) => {
            contact_html= contact_html.replace('[value='+i+']',e)
        });
        return contact_html;
    }

}
export default SetupPage;