import React, { Component  } from 'react';
import { Button,Segment,Input,Modal,Header,Dropdown,Radio, Form, TextArea, Accordion, Icon,Popup} from 'semantic-ui-react';
import EditorWrap from './editorwrap';
import * as lang from './constants/language';
import FileMedia from './fileMedia';
import {create_random_text} from '../lib/constants/fs';
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
    else if(type_media=='add_img_to_title'){
        let {index_gia_tri}=this.state;
        if(list_img.length>0){
            this.props.change_code_lien_he('img_title',list_img[0].url,index_gia_tri[0],index_gia_tri[1]);
        }
    }  
    else if(type_media=='add_img_navbar1'){
        if(list_img.length>0){
            this.props.change_navbar(list_img[0].url,'url_1');
        }
    }
    else if(type_media=='add_img_navbar2'){
        if(list_img.length>0){
            this.props.change_navbar(list_img[0].url,'url_2');
        }
    }
    else if(type_media=='add_img_navbar3'){
        if(list_img.length>0){
            this.props.change_navbar(list_img[0].url,'url_3');
        }
    }
    else if(type_media=='add_img_sp'){
        let {i,j}=this.state;
        if(list_img.length>0){
            this.props.change_sp(list_img[0].url,'add_img_sp',i,j);
        }
    }
}
//***************Status */
action_change_status=(e,data)=>{
    this.props.action_change_status(data.value);
}
//************** */

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
                <span class="oiu"  onClick={( )=>this.props.change_code_lien_he('delete_gia_tri','false',i,k)}>X</span>
            </div>
        </div>)
    });
    return rr;
}
//
show_sp=(sp,activeIndex)=>{
    let rs=[];
    let length_sp=sp.length;
    if(length_sp>0){
        sp.forEach((e,i) => {
            let length_ha=e.hinh_anh.length;
            rs.push(
            <React.Fragment key={i}>
                <div className='fghxd'>
                <div className='uysd'>
                    <i className="icnz fa-solid fa-circle-chevron-down" style={i>length_sp-2?{color:'rgb(233 233 233)'}:{}} onClick={()=>this.props.change_position_sp(length_sp,i,'down')}></i>
                    <i className="icnz fa-solid fa-circle-chevron-up" style={i==0?{color:'rgb(233 233 233)'}:{}} onClick={()=>this.props.change_position_sp(length_sp,i,'up')}></i>
                </div>
                <Accordion.Title
                    active={activeIndex === 10+i}
                    index={10+i}
                    onClick={this.handleClick}
                    key={i}
                    >
                    <Icon name='dropdown' />
                    
                        Mẫu số {i+1} : {e.title}

                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 10+i}>
                        <div className='spx'>
                            <span className='msn'>Mẫu số {i+1}</span>
 
                            <div>
                                <div className='f-2'>
                                    *Tiêu đề sản phẩm:
                                </div>
                                <div className='f-8'>
                                    <Input 
                                        placeholder="Title" fluid  size='small' 
                                        value={e.title}
                                        onChange={(e,{value})=>this.props.change_sp(value,'title_sp',i,false)}
                                    /> 
                                </div>
                            </div>
                            <div>
                                <div className='f-2'>
                                    *Đánh giá:
                                </div>
                                <div className='f-2'>
                                    <Input 
                                        placeholder={4.5} fluid  size='small' type='number'
                                        value={e.danh_gia}
                                        onChange={(e,{value})=>this.props.change_sp(value,'danh_gia',i,false)}
                                    /> 
                                </div>
                            </div>
                            <div>
                                <div className='f-2'>
                                    *Tiền vận chuyển thêm cho sp này:
                                </div>
                                <div className='f-2'>
                                    <Input 
                                        placeholder={4.5} fluid  size='small' type='number'
                                        value={e.vc_2}
                                        onChange={(e,{value})=>this.props.change_sp(value,'vc_2',i,false)}
                                    /> 
                                </div>
                            </div>

                            <div style={{backgroundColor:"darkgray",padding:'5px',marginBottom:'10px'}}>
                                <div className='f-12' style={{marginTop:'10px'}}>
                                    Thêm hình ảnh cho sản phẩm:
                                </div>
                                <i className="fa-solid fa-trash-can iconz"   onClick={()=>this.props.change_sp(false,'delete_sp',i,false)} 
                                ></i><div  >
                                {
                                        e.hinh_anh.map((f,j)=>{
                                            return(
                                                <React.Fragment  key={j}>

                                                    <div  key={j} className='f-3 bdz' style={{padding:'39px 5px 5px 5px',position:"relative"}}>
                                                        <i className="fa-solid fa-trash-can iconz" style={{fontSize:'14px'}} 
                                                        onClick={()=>this.props.change_sp(false,'delete_img_sp',i,j)}
                                                        ></i>
                                                        {/* <div> */}
                                                        <span className={j==0?'inleft nozz':'inleft'}  onClick={()=>this.props.change_position_hinh_anh(length_ha,i,j,'left')}><i className="fa-solid fa-angles-left "></i></span>
                                                        <span className={j>length_ha-2?'ỉnight nozz':'ỉnight'} onClick={()=>this.props.change_position_hinh_anh(length_ha,i,j,'right')}><i className="fa-solid fa-angles-right "></i></span>
                                                        {/* </div> */}
                                                        <div className='brzs'>
                                                            <div style={{position:"relative"}}>
                                                                <div className='mediaz'>
                                                                    <Button basic color='blue' size='small' className='btn-mgb'
                                                                    onClick={()=>this.setState({open:true,type_media:'add_img_sp',i:i,j:j,multi_select:false})}
                                                                    ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                                                                </div>
                                                                <div className='f-12'>
                                                                    <img src={f.img_url} width={"100px"} height={"100px"} style={{margin:"auto",display:"block"}}/>
                                                                </div>
                                                            </div>
                
                                                            <div>
                                                                <div className='f-5'>Mã sản phẩm:</div>
                                                                    <div className='f-7'>
                                                                        <Input 
                                                                            placeholder='HG01' fluid  size='small' 
                                                                            value={f.id}
                                                                            onChange={(e,{value})=>this.props.change_sp(value,'id',i,j)}
                                                                        /> 
                                                                    </div>
                                                            </div>
                
                                                            {/* <div>
                                                                <div className='f-5'>Giá nhỏ nhất:</div>
                                                                    <div className='f-7'>
                                                                        <Input 
                                                                            fluid  size='small' type='number'
                                                                            value={f.price_from}
                                                                            onChange={(e,{value})=>this.props.change_sp(value,'price_from',i,j)}
                                                                        /> 
                                                                    </div>
                                                            </div>
                
                                                            <div>
                                                                <div className='f-5'>Giá lớn nhất:</div>
                                                                    <div className='f-7'>
                                                                        <Input 
                                                                            fluid  size='small' type='number'
                                                                            value={f.price_to}
                                                                            onChange={(e,{value})=>this.props.change_sp(value,'price_to',i,j)}
                                                                        /> 
                                                                    </div>
                                                            </div> */}
                
                                                            <div>
                                                                <div className='f-5'>Ghi chú:</div>
                                                                    <div className='f-7'>
                                                                        <Input 
                                                                            fluid  size='small' 
                                                                            value={f.message}
                                                                            onChange={(e,{value})=>this.props.change_sp(value,'message',i,j)}
                                                                        /> 
                                                                    </div>
                                                            </div>
                
                                                            <div>
                                                                <div className='f-12'>Thuộc tính sản phẩm:</div>
                                                                    <div className='f-12'>
                                                                        <Input 
                                                                            placeholder='Giường sắt màu xanh dương' fluid  size='small' 
                                                                            value={f.product_attributes}
                                                                            onChange={(e,{value})=>this.props.change_sp(value,'product_attributes',i,j)}
                                                                        /> 
                                                                    </div>
                                                            </div>
                
                
                
                                                        </div>
                                                    </div>
                
                                                </React.Fragment>
                                            )
                                        })
                                }
                                    <div>
                                        <Button  color='vk' style={{margin:"0px 15px 15px 15px"}} className='' onClick={()=>this.props.change_sp(false,'add_hinh_anh',i,false)}>
                                            <i className="fa-solid fa-plus"></i> Thêm hình
                                        </Button>
                                    </div>
                                </div>

                            </div>

                            <div style={{backgroundColor:"darkgray",padding:'5px',position:'relative',marginBottom:'10px'}}>
                                <div className='f-12' style={{marginTop:'10px'}}>
                                    Thông tin sản phẩm:
                                </div>
                                {/* <i className="fa-solid fa-trash-can iconz"></i> */}

                                <div  >
                                    {
                                        e.thong_tin_sp.map((f,j)=>{
                                            return(
                                            <React.Fragment  key={j}>
                                                <div  key={j} className='f-12 bdz' style={{padding:'39px 5px 5px 5px',position:"relative"}}>
                                                    <i className="fa-solid fa-trash-can iconz" style={{fontSize:'14px'}}
                                                        onClick={()=>this.props.change_sp(false,'delete_thongtinsp',i,j)}
                                                    ></i>
                                                    <div className='brzs'>
                                                        <div>
                                                            <div className='f-1'>
                                                                Tiêu đề :
                                                            </div>
                                                            <div className='f-11'>
                                                                <Input 
                                                                    placeholder={'Chất liệu của sản phẩm'} fluid  size='small' 
                                                                    value={f.title}
                                                                    onChange={(e,{value})=>this.props.change_sp(value,'title_thongtinsp',i,j)}
                                                                /> 
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='f-1'>
                                                                Mô tả :
                                                            </div>
                                                            <div className='f-11'>
                                                                <Input 
                                                                    placeholder={'Chất liệu làm bằng sắt 1ly4'} fluid  size='small' 
                                                                    value={f.des}
                                                                    onChange={(e,{value})=>this.props.change_sp(value,'des_thongtinsp',i,j)}
                                                                /> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                            )
                                        })
                                    }

                                    <div>
                                        <Button  color='vk' style={{margin:"0px 15px 15px 15px"}} className='' onClick={()=>this.props.change_sp(false,'add_thongtinsp',i,false)}>
                                            <i className="fa-solid fa-plus"></i> Thêm thông tin
                                        </Button>
                                    </div>

                                </div>

                            </div>

                            <div style={{backgroundColor:"darkgray",padding:'5px',position:'relative',marginBottom:'10px'}}>
                                <div className='f-12' style={{marginTop:'10px'}}>
                                    Bảng giá :
                                </div>
                                {/* <i className="fa-solid fa-trash-can iconz"></i> */}

                                <div  >
                                    {
                                        e.bang_gia_sp.map((f,j)=>{
                                            return(
                                                <div  key={j} className='f-12 bdz' style={{padding:'39px 5px 5px 5px',position:"relative"}}>
                                                    <i className="fa-solid fa-trash-can iconz" style={{fontSize:'14px'}} 
                                                        onClick={()=>this.props.change_sp(false,'delete_bang_gia_sp',i,j)}
                                                    ></i>
                                                    <div className='brzs'>
                                                        <div>
                                                            <div className='f-1'>
                                                                Thuộc tính :
                                                            </div>
                                                            <div className='f-4'>
                                                                <Input 
                                                                    placeholder={'1mx2m'} fluid  size='small' 
                                                                    value={f.title}
                                                                    onChange={(e,{value})=>this.props.change_sp(value,'title_bang_gia_sp',i,j)}
                                                                /> 
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='f-1'>
                                                                Giá :
                                                            </div>
                                                            <div className='f-4'>
                                                                <Input 
                                                                    placeholder={'1200000'} fluid  size='small' 
                                                                    type='number'
                                                                    value={f.price}
                                                                    onChange={(e,{value})=>this.props.change_sp(value,'price_bang_gia_sp',i,j)}
                                                                /> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }


                                    <div>
                                        <Button  color='vk' style={{margin:"0px 15px 15px 15px"}} className='' 
                                            onClick={()=>this.props.change_sp(false,'add_bang_gia_sp',i,false)}
                                        >
                                            <i className="fa-solid fa-plus"></i> Thêm giá
                                        </Button>
                                    </div>

                                </div>

                            </div>

                            <div style={{backgroundColor:"darkgray",padding:'5px',position:'relative',marginBottom:'10px'}}>
                                <div className='f-12' style={{marginTop:'10px'}}>
                                    Thông tin thêm (thanh toán) :
                                </div>
                                {/* <i className="fa-solid fa-trash-can iconz"></i> */}

                                <div  >
                                {
                                        e.thanh_toan.map((f,j)=>{
                                            return( 
                                                <div key={j} className='f-12 bdz' style={{padding:'39px 5px 5px 5px',position:"relative"}}>
                                                <i className="fa-solid fa-trash-can iconz" style={{fontSize:'14px'}}
                                                    onClick={()=>this.props.change_sp(false,'delete_thanh_toan',i,j)}
                                                ></i>
                                                <div className='brzs'>
                                                    <div>
                                                        <div className='f-1'>
                                                            Mô tả {j+1} :
                                                        </div>
                                                        <div className='f-11'>
                                                            <Input 
                                                                placeholder={'Thanh toán khi nhận hàng'} fluid  size='small' 
                                                                value={f}
                                                                onChange={(e,{value})=>this.props.change_sp(value,'thanh_toan_sp',i,j)}
                                                            /> 
                                                        </div>
                                                    </div>
        
                                                </div>
                                            </div>
                                            )
                                        })
                                    }


                                    <div>
                                        <Button  color='vk' style={{margin:"0px 15px 15px 15px"}} className=''
                                         onClick={()=>this.props.change_sp(false,'add_thanh_toan',i,false)}>
                                            <i className="fa-solid fa-plus"></i> Thêm mô tả
                                        </Button>
                                    </div>

                                </div>

                            </div>

                        </div> 
                </Accordion.Content>
                </div>
            </React.Fragment>
            )
        });

    }
    return rs;
}
//
    render() {
        const { activeIndex } =  this.state;
        const {data_source,template_list}=this.props;
        // console.log("🚀 ~ file: ModalEditerPage.js ~ line 231 ~ ModalEditerPage ~ render ~ ", data_source.data_lien_he)
        
        return (<React.Fragment>
            <Modal
                size={"large"}
                open={this.props.open}
            >
                <Modal.Header className='blackw'>{data_source.id==-1?lang.CREATE_NEW_PAG:lang.EDIT_PAG} </Modal.Header>
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
                                placeholder='Title page' fluid  size='big'
                                value={data_source.title_post}
                                onChange={this.action_change_title}
                            />
                        </Segment>
 
                        <Segment raised style={{backgroundColor:"rgb(164 195 165)"}}>
                            <Header as='h4'>Narbar:</Header>
                            <div>
                                <div className='f-2'>
                                    1.Giá hiển thị trên ads :
                                </div>
                                <div className='f-3'>
                                    <Input 
                                        placeholder='Nhập giá hiển thị trên ads' fluid  size='small' type='number'
                                        value={data_source.data_lading_page.price_ads}
                                        onChange={(e,{value})=>this.props.change_navbar(value,'price_ads')}
                                    /> 
                                </div>
                            </div>
                            <div>
                                <div className='f-2'>
                                    1.Tiền vận chuyển :
                                </div>
                                <div className='f-3'>
                                    <Input 
                                        placeholder='Giá vận chuyển' fluid  size='small' type='number'
                                        value={data_source.data_lading_page.narbar.vc_1}
                                        onChange={(e,{value})=>this.props.change_navbar(value,'vc_1')}
                                    /> 
                                </div>
                            </div>
                            <div style={{marginTop:'8px'}}>
                                <div>2.Lựa chọn hình ảnh cho navbar:</div>
                                <div className='f-4'  style={{marginTop:'8px',position:'relative'}}>
                                    <span>Tỉ lệ: 3:2</span><br/>
                                    <Button basic color='blue' size='small' className='btn-mgb'
                                    onClick={()=>this.setState({open:true,type_media:'add_img_navbar1',multi_select:false})}
                                    ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                                    <div style={{position:'absolute',top:'0px',left:'123px'}}>
                                        <img src={data_source.data_lading_page.narbar.url_1} width={'50px'} />
                                    </div>
                                </div>
                                <div className='f-4'  style={{marginTop:'8px',position:'relative'}}>
                                    <span>Tỉ lệ: 1:1</span><br/>
                                    <Button basic color='blue' size='small' className='btn-mgb'
                                    onClick={()=>this.setState({open:true,type_media:'add_img_navbar2',multi_select:false})}
                                    ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                                    <div style={{position:'absolute',top:'0px',left:'123px'}}>
                                        <img src={data_source.data_lading_page.narbar.url_2} width={'50px'} />
                                    </div>
                                </div>
                                <div className='f-4'  style={{marginTop:'8px',position:'relative'}}>
                                    <span>Tỉ lệ: 1:1</span><br/>
                                    <Button basic color='blue' size='small' className='btn-mgb'
                                    onClick={()=>this.setState({open:true,type_media:'add_img_navbar3',multi_select:false})}
                                    ><i className="fas fa-photo-video vv"></i>Add Media</Button>
                                    <div style={{position:'absolute',top:'0px',left:'123px'}}>
                                        <img src={data_source.data_lading_page.narbar.url_3} width={'50px'} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='f-2'>
                                    3.Tiêu đề thương hiệu :
                                </div>
                                <div className='f-8'>
                                    <Input 
                                        placeholder='Nội thất anbinhnew' fluid  size='small' 
                                        value={data_source.data_lading_page.narbar.title}
                                        onChange={(e,{value})=>this.props.change_navbar(value,'title')}
                                    /> 
                                </div>
                            </div>
                            <div>
                                <div className='f-12'>
                                    4.Mô tả ngắn về thương hiệu :
                                </div>
                                <div>
                                    <div className='f-2'>+ Mô tả hiển thị:</div>
                                    <div className='f-8'>
                                        <Form>
                                            <TextArea placeholder='Cửa hàng cung cấp đồ nội thất Hồ Chí Minh...' 
                                                value={data_source.data_lading_page.narbar.des_show}
                                                onChange={(e,{value})=>this.props.change_navbar(value,'des_show')}
                                            />
                                        </Form>
                                    </div>
                                </div>
                                <div>
                                    <div className='f-2'> + Mô tả ẩn:</div>
                                    <div className='f-8'>
                                        <Form>
                                            <TextArea placeholder='Mô tả dài hơn ẩn' 
                                                value={data_source.data_lading_page.narbar.des_hiden}
                                                onChange={(e,{value})=>this.props.change_navbar(value,'des_hiden')}
                                            />
                                        </Form>         
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='f-2'>
                                    5.Địa chỉ :
                                </div>
                                <div className='f-8'>
                                    <Input 
                                        placeholder='Địa chỉ' fluid  size='small' 
                                        value={data_source.data_lading_page.narbar.dia_chi}
                                        onChange={(e,{value})=>this.props.change_navbar(value,'dia_chi')}
                                    /> 
                                </div>
                            </div>
                            <div>
                                <div className='f-2'>
                                    6.Giờ hoạt động :
                                </div>
                                <div className='f-8'>
                                    <Input 
                                        placeholder='Mở cửa cả ngày' fluid  size='small' 
                                        value={data_source.data_lading_page.narbar.cac_gio}
                                        onChange={(e,{value})=>this.props.change_navbar(value,'cac_gio')}
                                    /> 
                                </div>
                            </div>
                            <div>
                                <div className='f-2'>
                                    7.Trạng thái hoạt động :
                                </div>
                                <div className='f-8'>
                                    <Input 
                                        placeholder='Đang hoạt động' fluid  size='small' 
                                        value={data_source.data_lading_page.narbar.trang_thai_hien_tai}
                                        onChange={(e,{value})=>this.props.change_navbar(value,'trang_thai_hien_tai')}
                                    /> 
                                </div>
                            </div>
                            <div>
                                <div className='f-2'>
                                    8.Ngày thành lập :
                                </div>
                                <div className='f-8'>
                                    <Input 
                                        placeholder='20 tháng 4, 2013' fluid  size='small' 
                                        value={data_source.data_lading_page.narbar.ngay_thanh_lap}
                                        onChange={(e,{value})=>this.props.change_navbar(value,'ngay_thanh_lap')}
                                    /> 
                                </div>
                            </div>
                            <div>
                                <div className='f-2'>
                                    9.Người đại diện :
                                </div>
                                <div className='f-8'>
                                    <Input 
                                        placeholder='Nguyễn Văn A' fluid  size='small' 
                                        value={data_source.data_lading_page.narbar.nguoi_dai_dien}
                                        onChange={(e,{value})=>this.props.change_navbar(value,'nguoi_dai_dien')}
                                    /> 
                                </div>
                            </div>
                            <div>
                                <div className='f-2'>
                                    10.Tài khoản ngân hàng :
                                </div>
                                <div className='f-8'>
                                    <Input 
                                        placeholder='0381000530472 Vietcombank Nguyễn Văn A.' fluid  size='small' 
                                        value={data_source.data_lading_page.narbar.stk}
                                        onChange={(e,{value})=>this.props.change_navbar(value,'stk')}
                                    /> 
                                </div>
                            </div>
                            <div>
                                <div className='f-2'>
                                    11.URL vị trí trên google map :
                                </div>
                                <div className='f-8'>
                                    <Input 
                                        placeholder="https://www.google.com/maps/place/10%C2%B051'38.8%22N+106%C2%B043'19.6%22E/@10.8607744,106.7199116,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x2753f9cabba66d88!8m2!3d10.8607744!4d106.7221003" fluid  size='small' 
                                        value={data_source.data_lading_page.narbar.google_map}
                                        onChange={(e,{value})=>this.props.change_navbar(value,'google_map')}
                                    /> 
                                </div>
                            </div>
                            <div>
                                <div className='f-2'>
                                    12.URL hình ảnh google map :
                                </div>
                                <div className='f-8'>
                                    <Input 
                                        placeholder="https://www.google.com/maps/place/10%C2%B051'38.8%22N+106%C2%B043'19.6%22E/@10.8607744,106.7199116,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x2753f9cabba66d88!8m2!3d10.8607744!4d106.7221003" fluid  size='small' 
                                        value={data_source.data_lading_page.narbar.pic_map}
                                        onChange={(e,{value})=>this.props.change_navbar(value,'pic_map')}
                                    /> 
                                </div>
                            </div>
                        </Segment>
                        <Segment raised style={{backgroundColor:"rgb(208 217 134)"}}>
                            <Header as='h4'>Sản phẩm:</Header>
                            {/*  */}
                            <Accordion styled style={{width:"100%"}}>
                                {this.show_sp(data_source.data_lading_page.sp,activeIndex)}
                            </Accordion>
                            {/*  */}
                            <div>
                                <Button style={{margin:"5px"}} className='add-da' onClick={()=>this.props.change_sp(false,'add_sp',false,false)}>
                                    <i className="fa-solid fa-plus" 
                                    ></i> Thêm sản phẩm
                                </Button>
                            </div>
                        </Segment>
                        {/* <Segment raised style={{backgroundColor:"rgb(229 149 176)"}}>
                            <Header as='h4'>Server render:</Header>
                            <Form>
                                <TextArea placeholder='Code here.' 
                                    value={data_source.server_render}
                                    onChange={(e,{value})=>this.props.change_sp(value,'server_render',false,false)}
                                />
                            </Form>
                        </Segment> */}
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
                        <div>
                            <Header as='h4'>Thông tin liên hệ thay thế (<span style={{color:"red"}}>nếu có</span>):</Header>
                            <div className='f-6'>
                                <div>Facebook(URL):</div>
                                    <Input 
                                        size='small' 
                                        placeholder="Facebook URL!"
                                        fluid 
                                        value={data_source.data_lading_page.mr.fb}
                                        onChange={(e,{value})=>this.props.changeMR(value,'fb')}
                                    />
                            </div>
                            <div className='f-6'>
                                <div>Zalo(URL):</div>
                                    <Input 
                                        size='small' 
                                        placeholder="Zalo URL!"
                                        fluid 
                                        value={data_source.data_lading_page.mr.zl}
                                        onChange={(e,{value})=>this.props.changeMR(value,'zl')}
                                    />
                            </div>
                            <div className='f-6'>
                                <div>Số điện thoại:</div>
                                    <Input 
                                        size='small' 
                                        placeholder="Số điện thoại!"
                                        fluid 
                                        value={data_source.data_lading_page.mr.dt}
                                        onChange={(e,{value})=>this.props.changeMR(value,'dt')}
                                    />
                            </div>
                            <div className='f-6'>
                                <div>Design by:</div>
                                    <Input 
                                        size='small' 
                                        placeholder="Thiết kế bởi..."
                                        fluid 
                                        value={data_source.data_lading_page.mr.ds}
                                        onChange={(e,{value})=>this.props.changeMR(value,'ds')}
                                    />
                            </div>
                            <div>
                                <div>Link bài viết gốc (không điền thì mặc định là bài viết này):</div>
                                    <Input 
                                        size='small' 
                                        placeholder="rel:canonical"
                                        fluid 
                                        value={data_source.canonical}
                                        onChange={(e,{value})=>this.props.changeMR(value,'canonical')}
                                    />
                            </div>
                        </div>
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
                    <Button positive onClick={this.click_action_yes} >{data_source.id==-1?lang.ACTION_POST:lang.UPDATE}</Button>
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