import React, { Component } from 'react';
// import FileMedia from '../lib/fileMedia';
import * as lang from '../lib/constants/language';
import { toast } from 'react-toastify';
import { Button,Segment,Input,Dropdown,Radio, Form, TextArea,Header} from 'semantic-ui-react';
import FileMedia from '../lib/fileMedia';
import beautify from 'simply-beautiful';
import {
    fs_convert_html_video,
    fs_return_arr_post_save
} from '../lib/constants/fs'
import {
    get_posts_by_search,
    get_cate_tag,
    action_update_data_theme,
    get_data_theme
} from '../lib/constants/axios'

class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
            open:false,
            type_media:'',
            categorys_list:[],
            data_return_query_search:[],
            key_lock_query_search:'',
            data:{
                thumnail_url_home:'',
                tab_1:{
                    title_home:'',
                    descript_home:'',
                    menu_href_1:'',
                    menu_title_1:'',
                    menu_href_2:'',
                    menu_title_2:'',
                    menu_href_3:'',
                    menu_title_3:'',
                    menu_href_4:'',
                    menu_title_4:'',
                    menu_href_5:'',
                    menu_title_5:'',
                    menu_href_6:'',
                    menu_title_6:''
                },
                tab_2:{
                    is_show:true,
                    title_tab_2:'',
                    cate_id_tab_2:'',
                    post_id_1_tab_2:'',
                    post_id_2_tab_2:'',
                    post_id_3_tab_2:'',
                    post_id_4_tab_2:'',
                    post_id_5_tab_2:'',
                },
                tab_3:{
                    is_show:true,
                    title_tab_3:'',
                    url_kenh:'',
                    title_video_1:'',
                    url_video_1:'',
                    title_video_2:'',
                    url_video_2:'',
                    title_video_3:'',
                    url_video_3:'',
                    title_video_4:'',
                    url_video_4:'',
                },
                tab_4:[],
                tab_5:{
                    is_show:true,
                    cate_1:'',
                    post_1:'',
                    cate_2:'',
                    post_2:'',
                    cate_3:'',
                    post_3:'',
                },
                tab_6:{
                    code_header_home:'',
                    code_body_home:'',
                    code_footer_home:'',
                    code_css_home:''
                }
            }
        }
    }
    // return img
 async componentDidMount(){
    let data=await get_cate_tag();
    let data_setup=await get_data_theme({keyz:'home_setup'});
    let key_lock_query_search='';
    if(data_setup.list_post_arr_save!=undefined&&data_setup.list_post_arr_save.length>0){
        data_setup.list_post_arr_save.forEach(e => {
            key_lock_query_search+=','+e.value;
        });
    }

    if(data!='null'&&data_setup!='null'){
        this.setState({
         categorys_list: data.categorys_list,
         data:data_setup,
         data_return_query_search:data_setup.list_post_arr_save==undefined?[]:data_setup.list_post_arr_save,
         key_lock_query_search:key_lock_query_search
        })
    }
 }
 //
 search_title=(e,data)=>{
    this.query_search(data.searchQuery);
 }   
 //
 query_search=(text)=>{
     if(text!=''){
        clearTimeout(this.time_seach);
        this.time_seach=setTimeout(async()=>{
            let {data_return_query_search,key_lock_query_search}=this.state;
            let data_server=await get_posts_by_search(0,text);
            let z=[]
            data_server.forEach(e => {
                if(key_lock_query_search.search(','+e.id)==-1){
                    key_lock_query_search+=','+e.id;
                    z.push({
                            key:e.id,
                            value:e.id,
                            text:e.title
                        })
                }
            });
            this.setState({
                data_return_query_search:[...data_return_query_search,...z],
                key_lock_query_search:key_lock_query_search
            })
        },350)
    }
 }
 //
 click_action_update=async()=>{
    let {data,data_return_query_search} =this.state;
    let video_html= fs_convert_html_video(data.tab_3);
    data.tab_3.video_html=video_html;
    data.list_post_arr_save= fs_return_arr_post_save(data.tab_2,data.tab_5,data_return_query_search);
    let z=await action_update_data_theme({
        keyz:'home_setup',
        valuez:JSON.stringify(data)
    })
    if(z){
        toast.success(lang.SUCC_POST_EDIT,{theme: "colored"});
    }else{
        toast.error(lang.ERRO_POST_EDIT,{theme: "colored"});
    }
 }
 //
 click_action_clearCache=async()=>{
    let {data,data_return_query_search} =this.state;
    let video_html= fs_convert_html_video(data.tab_3);
    data.tab_3.video_html=video_html;
    data.list_post_arr_save=[];
    let z=await action_update_data_theme({
        keyz:'home_setup',
        valuez:JSON.stringify(data)
    })
    if(z){
        toast.success(lang.SUCC_POST_EDIT,{theme: "colored"});
    }else{
        toast.error(lang.ERRO_POST_EDIT,{theme: "colored"});
    }
 }
 //
 return_image=(arr_img)=>{
    let {type_media,data}=this.state;
    if(type_media=='thumnail_home'){
        if(arr_img.length>0){
            data.thumnail_url_home=arr_img[0].url;
            this.setState({
                data:data
            })
        }
    }
 }
 //
    render() {
        let {data_return_query_search,data,categorys_list} =this.state;
        return (
            <React.Fragment>
                {/* thumnail home */}
                <Segment raised className='okok'>
                    <p>Lựa chọn ảnh đại diện cho trang chủ :</p>
                    <div className='ghhg'>
                        <Button basic color='blue' size='small' className='btn-mgb'
                            onClick={()=>this.setState({open:true,type_media:'thumnail_home'})}
                        ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                        {data.thumnail_url_home!=undefined&&data.thumnail_url_home!=''&&<div className='thum'><div className='vvv'>
                            <img src={data.thumnail_url_home} height={'50px'}/>
                            <i className="fa-solid fa-x xxz zzx" 
                               onClick={()=>{
                                   let {data}=this.state;
                                   data.thumnail_url_home='';
                                   this.setState({data:data})
                               }}
                            ></i>
                        </div></div>}
                        <p>640:360</p>
                    </div>
                </Segment>
                {/* tab_1 */}
                <Segment raised className='okok'>
                    <div className='wrap-bb' >
                        <span className='oii'>Tiêu đề trang chủ :</span>
                        <div className='inputF'>
                            <Input 
                                size='small' 
                                fluid 
                                value={data.tab_1.title_home}
                                onChange={(e,{value})=>{
                                    let {data}=this.state;
                                    data.tab_1.title_home=value;
                                    this.setState({data:data})
                                }}
                            />
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Mô tả trang chủ : </span>
                        <div className='inputF' style={{borderRadius:"5px",border:"1px solid"}}>
                            <Form>
                                <TextArea 
                                    rows={4}
                                    value={data.tab_1.descript_home}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_1.descript_home=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </Form>
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Menu 1 :</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>Href to:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_1.menu_href_1}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_1.menu_href_1=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                            <div className='jhv'>
                                <span>Tên:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_1.menu_title_1}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_1.menu_title_1=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Menu 2 :</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>Href to:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_1.menu_href_2}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_1.menu_href_2=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                            <div className='jhv'>
                                <span>Tên:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_1.menu_title_2}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_1.menu_title_2=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Menu 3 :</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>Href to:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_1.menu_href_3}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_1.menu_href_3=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                            <div className='jhv'>
                                <span>Tên:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_1.menu_title_3}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_1.menu_title_3=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Menu 4 :</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>Href to:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_1.menu_href_4}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_1.menu_href_4=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                            <div className='jhv'>
                                <span>Tên:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_1.menu_title_4}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_1.menu_title_4=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Menu 5 :</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>Href to:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_1.menu_href_5}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_1.menu_href_5=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                            <div className='jhv'>
                                <span>Tên:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_1.menu_title_5}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_1.menu_title_5=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Menu 6 :</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>Href to:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_1.menu_href_6}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_1.menu_href_6=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                            <div className='jhv'>
                                <span>Tên:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_1.menu_title_6}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_1.menu_title_6=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Segment>
                {/* tab_2 */}
                <Segment raised className='okok'>
                    {/*  */}
                    <div className='wrap-bb' >
                        <span className='oii'>Hiển thị/Ẩn :</span>
                        <div className='inputF'>
                            <Radio 
                                toggle 
                                checked={data.tab_2.is_show}
                                onClick={()=>{
                                    let {data}=this.state;
                                    data.tab_2.is_show=!data.tab_2.is_show;
                                    this.setState({data:data})
                                }}
                            />
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Tiêu đề hướng dẫn :</span>
                        <div className='inputF'>
                            <Input 
                                size='small' 
                                fluid 
                                value={data.tab_2.title_tab_2}
                                onChange={(e,{value})=>{
                                    let {data}=this.state;
                                    data.tab_2.title_tab_2=value;
                                    this.setState({data:data})
                                }}
                            />
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Chọn danh mục :</span>
                        <div className='inputF'>
                            <Dropdown
                                placeholder='Lựa chọn bài viết'
                                fluid
                                search
                                selection
                                options={categorys_list}
                                value={data.tab_2.cate_id_tab_2}
                                onChange={(e,{value})=>{
                                    let {data}=this.state;
                                    data.tab_2.cate_id_tab_2=value;
                                    this.setState({data:data})                                    
                                }}
                            />
                            <span className='pop'
                                onClick={()=>{
                                    let {data}=this.state;
                                    data.tab_2.cate_id_tab_2='';
                                    this.setState({data:data})
                                }}
                            >clear</span>
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Lựa chọn bài viết :</span>
                        <div className='inputK'>
                            <div className='jhgz'>
                                <span>Bài viết 1<span style={{color:"red"}}> *</span>:</span><br/>
                                <Dropdown
                                    placeholder='Lựa chọn bài viết'
                                    fluid
                                    search
                                    selection
                                    options={data_return_query_search}
                                    onSearchChange={this.search_title}
                                    value={data.tab_2.post_id_1_tab_2}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_2.post_id_1_tab_2=value;
                                        this.setState({data:data})
                                    }}
                                />
                                <span className='popz'
                                    onClick={()=>{
                                        let {data}=this.state;
                                        data.tab_2.post_id_1_tab_2='';
                                        this.setState({data:data})
                                    }}
                                >clear</span>
                            </div>
                            <div className='jhgz'>
                                <span>Bài viết 2:</span><br/>
                                <Dropdown
                                    placeholder='Lựa chọn bài viết'
                                    fluid
                                    search
                                    selection
                                    options={data_return_query_search}
                                    onSearchChange={this.search_title}
                                    value={data.tab_2.post_id_2_tab_2}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_2.post_id_2_tab_2=value;
                                        this.setState({data:data})
                                    }}
                                />
                                <span className='popz'
                                    onClick={()=>{
                                        let {data}=this.state;
                                        data.tab_2.post_id_2_tab_2='';
                                        this.setState({data:data})
                                    }}
                                >clear</span>
                            </div>
                            <div className='jhgz'>
                                <span>Bài viết 3:</span><br/>
                                <Dropdown
                                    placeholder='Lựa chọn bài viết'
                                    fluid
                                    search
                                    selection
                                    options={data_return_query_search}
                                    onSearchChange={this.search_title}
                                    value={data.tab_2.post_id_3_tab_2}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_2.post_id_3_tab_2=value;
                                        this.setState({data:data})
                                    }}
                                />
                                <span className='popz'
                                    onClick={()=>{
                                        let {data}=this.state;
                                        data.tab_2.post_id_3_tab_2='';
                                        this.setState({data:data})
                                    }}
                                >clear</span>
                            </div>
                            <div className='jhgz'>
                                <span>Bài viết 4:</span><br/>
                                <Dropdown
                                    placeholder='Lựa chọn bài viết'
                                    fluid
                                    search
                                    selection
                                    options={data_return_query_search} 
                                    onSearchChange={this.search_title}
                                    value={data.tab_2.post_id_4_tab_2}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_2.post_id_4_tab_2=value;
                                        this.setState({data:data})
                                    }}
                                />
                                <span className='popz'
                                    onClick={()=>{
                                        let {data}=this.state;
                                        data.tab_2.post_id_4_tab_2='';
                                        this.setState({data:data})
                                    }}
                                >clear</span>
                            </div>
                            <div className='jhgz'>
                                <span>Bài viết 5:</span><br/>
                                <Dropdown
                                    placeholder='Lựa chọn bài viết'
                                    fluid
                                    search
                                    selection
                                    options={data_return_query_search} 
                                    onSearchChange={this.search_title}
                                    value={data.tab_2.post_id_5_tab_2}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_2.post_id_5_tab_2=value;
                                        this.setState({data:data})
                                    }}
                                />
                                <span className='popz'
                                    onClick={()=>{
                                        let {data}=this.state;
                                        data.tab_2.post_id_5_tab_2='';
                                        this.setState({data:data})
                                    }}
                                >clear</span>
                            </div>
                        </div>
                    </div>
                </Segment>
                {/* tab_3 */}
                <Segment raised className='okok'>
                    <div className='wrap-bb' >
                        <span className='oii'>Hiển thị/Ẩn :</span>
                        <div className='inputF'>
                            <Radio toggle  
                                checked={data.tab_3.is_show}
                                onClick={()=>{
                                    let {data}=this.state;
                                    data.tab_3.is_show=!data.tab_3.is_show;
                                    this.setState({data:data})
                                }}
                            />
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Tiêu đề mục video :</span>
                        <div className='inputF'>
                            <Input 
                                size='small' 
                                fluid 
                                value={data.tab_3.title_tab_3}
                                onChange={(e,{value})=>{
                                    let {data}=this.state;
                                    data.tab_3.title_tab_3=value;
                                    this.setState({data:data})
                                }}
                            />
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Url kênh youtube:</span>
                        <div className='inputF'>
                            <Input 
                                size='small' 
                                fluid 
                                value={data.tab_3.url_kenh}
                                onChange={(e,{value})=>{
                                    let {data}=this.state;
                                    data.tab_3.url_kenh=value;
                                    this.setState({data:data})
                                }}
                            />
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Video 1 <span style={{color:"red"}}> *</span>:</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>Url:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_3.url_video_1}
                                    onChange={(e,{value})=>{
                                        if(value.search('embed/')!=-1){
                                            let z=value.split('embed/');
                                            let {data}=this.state;
                                            data.tab_3.url_video_1=value;
                                            data.tab_3.id_video_1=z[1];
                                            this.setState({data:data})
                                        }else{
                                            toast.info('Url youtube phải có kiểu (nên dùng copy - paste) https://www.youtube.com/embed/[id]',{theme: "colored"})
                                            let {data}=this.state;
                                            data.tab_3.url_video_1='';
                                            this.setState({data:data})
                                        }
                                    }}
                                />
                            </div>
                            <div className='jhv'>
                                <span>Title:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_3.title_video_1}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_3.title_video_1=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Video 2 :</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>Url:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_3.url_video_2}
                                    onChange={(e,{value})=>{
                                        if(value.search('embed/')!=-1){
                                            let z=value.split('embed/');
                                            let {data}=this.state;
                                            data.tab_3.url_video_2=value;
                                            data.tab_3.id_video_2=z[1];
                                            this.setState({data:data})
                                        }else{
                                            toast.info('Url youtube phải có kiểu (nên dùng copy - paste) https://www.youtube.com/embed/[id]',{theme: "colored"})
                                            let {data}=this.state;
                                            data.tab_3.url_video_2='';
                                            this.setState({data:data})
                                        }
                                    }}
                                />
                            </div>
                            <div className='jhv'>
                                <span>Title:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_3.title_video_2}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_3.title_video_2=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Video 3 :</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>Url:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_3.url_video_3}
                                    onChange={(e,{value})=>{
                                        if(value.search('embed/')!=-1){
                                            let z=value.split('embed/');
                                            let {data}=this.state;
                                            data.tab_3.url_video_3=value;
                                            data.tab_3.id_video_3=z[1];
                                            this.setState({data:data})
                                        }else{
                                            toast.info('Url youtube phải có kiểu (nên dùng copy - paste) https://www.youtube.com/embed/[id]',{theme: "colored"})
                                            let {data}=this.state;
                                            data.tab_3.url_video_3='';
                                            this.setState({data:data})
                                        }
                                    }}
                                />
                            </div>
                            <div className='jhv'>
                                <span>title:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_3.title_video_3}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_3.title_video_3=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Video 4 :</span>
                        <div className='inputK'>
                            <div className='jhg'>
                                <span>Url:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_3.url_video_4}
                                    onChange={(e,{value})=>{
                                        if(value.search('embed/')!=-1){
                                            let z=value.split('embed/');
                                            let {data}=this.state;
                                            data.tab_3.url_video_4=value;
                                            data.tab_3.id_video_4=z[1];
                                            this.setState({data:data})
                                        }else{
                                            toast.info('Url youtube phải có kiểu (nên dùng copy - paste) https://www.youtube.com/embed/[id]',{theme: "colored"})
                                            let {data}=this.state;
                                            data.tab_3.url_video_4='';
                                            this.setState({data:data})
                                        }
                                    }}
                                />
                            </div>
                            <div className='jhv'>
                                <span>Title:</span><br/>
                                <Input 
                                    size='small' 
                                    fluid 
                                    value={data.tab_3.title_video_4}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_3.title_video_4=value;
                                        this.setState({data:data})
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                </Segment>
                {/*  */}
                <Segment raised className='okok'>
                    <div className='wrap-bb' >
                        <span className='oii'>Lựa chọn danh mục hiển thị :</span>
                        <div className='inputF'>
                        <Dropdown
                            placeholder='Chọn danh mục'
                            fluid
                            multiple
                            search
                            selection
                            options={categorys_list}
                                value={data.tab_4}
                                onChange={(e,{value})=>{
                                    let {data}=this.state;
                                    data.tab_4=value;
                                    this.setState({data:data})                                    
                                }}
                        />
                        </div>
                    </div>
                </Segment>
                {/*  */}
                <Segment raised className='okok'>
                    <div className='wrap-bb' >
                        <span className='oii'>Hiển thị/Ẩn :</span>
                        <div className='inputF'>
                            <Radio toggle 
                                checked={data.tab_5.is_show}
                                onClick={()=>{
                                    let {data}=this.state;
                                    data.tab_5.is_show=!data.tab_5.is_show;
                                    this.setState({data:data})
                                }}
                            />
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Chọn danh mục 1 :</span>
                        <div className='inputK'>
                            <div className='jhv'>
                                <span>Danh mục :</span><br/>
                                <Dropdown
                                    placeholder='Chọn danh mục'
                                    fluid
                                    search
                                    selection
                                    options={categorys_list}
                                    value={data.tab_5.cate_1}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_5.cate_1=value;
                                        this.setState({data:data})                                    
                                    }}
                                />
                                <span className='popz'
                                    onClick={()=>{
                                        let {data}=this.state;
                                        data.tab_5.cate_1='';
                                        this.setState({data:data}) 
                                    }}
                                >clear</span>
                            </div>
                            <div className='jhv'>
                                <span>Bài viết cố định:</span><br/>
                                <Dropdown
                                    placeholder='Lựa chọn bài viết'
                                    fluid
                                    search
                                    selection
                                    options={data_return_query_search} 
                                    onSearchChange={this.search_title}
                                    value={data.tab_5.post_1}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_5.post_1=value;
                                        this.setState({data:data})
                                    }}
                                />
                                <span className='popz'
                                    onClick={()=>{
                                        let {data}=this.state;
                                        data.tab_5.post_1='';
                                        this.setState({data:data})
                                    }}
                                >clear</span>
                            </div>
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Chọn danh mục 2 :</span>
                        <div className='inputK'>
                            <div className='jhv'>
                                <span>Danh mục :</span><br/>
                                <Dropdown
                                    placeholder='Chọn danh mục'
                                    fluid 
                                    search
                                    selection
                                    options={categorys_list}
                                    value={data.tab_5.cate_2}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_5.cate_2=value;
                                        this.setState({data:data})                                    
                                    }}
                                />
                                <span className='popz'
                                    onClick={()=>{
                                        let {data}=this.state;
                                        data.tab_5.cate_2='';
                                        this.setState({data:data}) 
                                    }}
                                >clear</span>
                            </div>
                            <div className='jhv'>
                                <span>Bài viết cố định:</span><br/>
                                <Dropdown
                                    placeholder='Lựa chọn bài viết'
                                    fluid
                                    search
                                    selection
                                    options={data_return_query_search} 
                                    onSearchChange={this.search_title}
                                    value={data.tab_5.post_2}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_5.post_2=value;
                                        this.setState({data:data})
                                    }}
                                />
                                <span className='popz'
                                    onClick={()=>{
                                        let {data}=this.state;
                                        data.tab_5.post_2='';
                                        this.setState({data:data}) 
                                    }}
                                >clear</span>
                            </div>
                        </div>
                    </div>
                    <div className='wrap-bb' >
                        <span className='oii'>Chọn danh mục 3 :</span>
                        <div className='inputK'>
                            <div className='jhv'>
                                <span>Danh mục :</span><br/>
                                <Dropdown
                                    placeholder='Chọn danh mục'
                                    fluid 
                                    search
                                    selection
                                    options={categorys_list}
                                    value={data.tab_5.cate_3}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_5.cate_3=value;
                                        this.setState({data:data})                                    
                                    }}
                                />
                                <span className='popz'
                                    onClick={()=>{
                                        let {data}=this.state;
                                        data.tab_5.cate_3='';
                                        this.setState({data:data}) 
                                    }}
                                >clear</span>
                            </div>
                            <div className='jhv'>
                                <span>Bài viết cố định:</span><br/>
                                <Dropdown
                                    placeholder='Lựa chọn bài viết'
                                    fluid
                                    search
                                    selection
                                    options={data_return_query_search} 
                                    onSearchChange={this.search_title}
                                    value={data.tab_5.post_3}
                                    onChange={(e,{value})=>{
                                        let {data}=this.state;
                                        data.tab_5.post_3=value;
                                        this.setState({data:data})
                                    }}
                                />
                                <span className='popz'
                                    onClick={()=>{
                                        let {data}=this.state;
                                        data.tab_5.post_3='';
                                        this.setState({data:data})
                                    }}
                                >clear</span>
                            </div>
                        </div>
                    </div>
                </Segment>
                <Segment raised className='xyg' >
                    <Header as='h4' className='clh'>*{lang.ADD_CODE}</Header>
                    <Segment raised className='okok'>
                        <Header as='h4'>CSS home code:</Header>
                        <Form>
                            <TextArea placeholder='Code here.' rows={10}
                                value={data.tab_6.code_css_home}
                                onChange={(e,{value})=>{
                                    let {data}=this.state;
                                    data.tab_6.code_css_home=value;
                                    this.setState({data:data})
                                }}
                            />
                            <span className='format-css'
                                onClick={()=>{
                                    let {data}=this.state;
                                    data.tab_6.code_css_home=beautify.css(data.tab_6.code_css_home);
                                    this.setState({data:data})
                                }}
                            >format css</span>
                        </Form>
                    </Segment>
                    <Segment raised className='okok'>
                        <Header as='h4'>Header home code:</Header>
                        <Form>
                            <TextArea placeholder='Code here.' rows={10}
                                value={data.tab_6.code_header_home}
                                onChange={(e,{value})=>{
                                    let {data}=this.state;
                                    data.tab_6.code_header_home=value;
                                    this.setState({data:data})
                                }}
                            />
                        </Form>
                    </Segment>
                    <Segment raised className='okok'>
                        <Header as='h4'>Body home code:</Header>
                        <Form>
                            <TextArea placeholder='Code here.' rows={10}
                                value={data.tab_6.code_body_home}
                                onChange={(e,{value})=>{
                                    let {data}=this.state;
                                    data.tab_6.code_body_home=value;
                                    this.setState({data:data})
                                }}
                            />
                        </Form>
                    </Segment>
                    <Segment raised className='okok'>
                        <Header as='h4'>Footer home code:</Header>
                        <Form>
                            <TextArea placeholder='Code here.' rows={10}
                                value={data.tab_6.code_footer_home}
                                onChange={(e,{value})=>{
                                    let {data}=this.state;
                                    data.tab_6.code_footer_home=value;
                                    this.setState({data:data})
                                }}
                            />
                        </Form>
                    </Segment>
                </Segment>
                <Segment raised className='okok nhnh'>
                    <Button positive onClick={this.click_action_update} style={{float:'right',marginRight:'50%'}}>{lang.UPDATE}</Button>
                    <a className='ghu' onClick={this.click_action_clearCache}>Clear cache</a>
                </Segment>
                <FileMedia
                    open={this.state.open}
                    type_media={this.state.type_media}
                    return_image={this.return_image}
                    multi_select={false}
                    set_open_media={(open)=>this.setState({open:open})}
                />
            </React.Fragment>
        )
    }
    //

}
export default Home;