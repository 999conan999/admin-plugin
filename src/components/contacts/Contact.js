import React, { Component } from 'react';
import { Table,Icon,Label,Modal,Button } from 'semantic-ui-react';
import * as lang from '../lib/constants/language';
import { toast } from 'react-toastify';
import {get_contacts_plugin,delete_contact_by_id_plugin} from '../lib/constants/axios';
import {fs_is_value_null} from '../lib/constants/fs'
const count=25;
class Contact extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data:[],
            show_see_more:false,
            page:0,
            open_modal:false,
            id_del:null,
            content_del:'',
            img_del:'',
            address_del:''
        }
    }
    //
    async componentDidMount(){
        //
        let data=await get_contacts_plugin(0);
        let show_see_more=true;
        if(data.length<count) show_see_more=false;
        if(data!=null||data!=undefined){
            this.setState({data:data,show_see_more:show_see_more,page:1})
        }else{
            this.setState({data:[],show_see_more:false,page:1})
        }
    }
    show_contact=(data)=>{
        let rs=[];
        data.forEach((e,i)=> {
            console.log("🚀 ~ file: Contact.js ~ line 35 ~ Contact ~ data.forEach ~ e", e)
            let order=JSON.parse(e.orderz);
            console.log("🚀 ~ file: Contact.js ~ line 37 ~ Contact ~ data.forEach ~ order", order)
            rs.push(
                <table  key={i} style={{width: '100%',padding:'8px',border:'solid 1px chartreuse' ,marginBottom:'18px', backgroundColor:'#efecec'}} >
                    <tbody>
                        <tr style={{backgroundColor: '#5d5a5a', padding:'3px'}}>
                            <th style={{padding: '4px', color: 'white'}}>Tên SP<span class="date" style={{float:'left'}}><span>3 ngày 1 giờ 18 phút trước</span></span>
                            <i className="xoa" style={{float:'right',marginRight: '5px',cursor: 'pointer'}}
                                onClick={()=>this.setState({open_modal:true,id_del:Number(e.id),content_del:order.name,img_del:order.url_img,address_del:e.addressz})}
                            >Xóa</i>
                            </th>
                            <th style={{padding: '0px', color: 'white'}}></th>     
                            <th style={{padding: '4px', color: 'white'}}>Giá</th>

                            <th style={{padding: '4px', color: 'white'}}>SL</th>
                            <th style={{padding: '4px', color: 'white'}}>Thành tiền</th>
                        </tr>
                        <tr>
                            <td style={{borderBottom:'solid 1px #d0c7c7'}}>
                                <a className='titkx'   href={order.url_sp} target='_blank' >+{order.name} <i className="fa-solid fa-arrow-up-right-from-square" style={{'fontSize':'10px'}}></i> - <b style={{color:'blue'}}>{order.attributes_kt}</b> - <b style={{color:'green'}}>{order.attributes_ms}</b></a>
                            </td>
                            <td style={{borderBottom:'solid 1px #d0c7c7'}}>
                                <img src={order.url_img} width='50px' style={{display:"block",margin:'auto'}}/>
                            </td>
                            <td style={{textAlign:'center',borderBottom:'solid 1px #d0c7c7'}} >{order.price.format(0, 3, '.', ',')}đ</td>

                            <td style={{textAlign:'center',borderBottom:'solid 1px #d0c7c7'}}>{order.quantity}</td>
                            <td  style={{textAlign:'center',borderBottom:'solid 1px #d0c7c7'}}>{(order.price*order.quantity).format(0, 3, '.', ',')}đ</td>
                        </tr>
                        <tr>
                            <td  style={{borderBottom:'solid 1px #d0c7c7'}}></td>
                            <td  style={{borderBottom:'solid 1px #d0c7c7'}}></td>
                            <td  style={{borderBottom:'solid 1px #d0c7c7'}}></td>
                            <td  style={{ fontWeight: 600,borderBottom:'solid 1px #d0c7c7'}}>Tổng tiền: </td>
                            <td style={{fontWeight: 600, color: 'blue',textAlign:'center',borderBottom:'solid 1px #d0c7c7'}}>{(order.price*order.quantity).format(0, 3, '.', ',')}đ</td>
                        </tr>
                        <tr>
                            <td colspan="5"  style={{borderBottom:'solid 1px #d0c7c7'}}>
                                <p style={{textAlign: 'left',marginBottom: '8px',color: 'currentColor',marginTop: '6px'}}>Tên : <b>{e.namez}</b></p>
                                <p style={{textAlign: 'left',marginBottom: '8px',color: 'currentColor',marginTop: '6px'}}>Địa chỉ : <b>{e.addressz}</b></p>
                                <p style={{textAlign: 'left',marginBottom: '8px',color: 'currentColor',marginTop: '6px'}}>Số điện thoại : <b>{e.phonez}</b></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        })
        // data.forEach((e,i)=> {
        //     let dataz=JSON.parse(e.dataz);
        //     let d=new Date(e.datez)
        //     rs.push(
        //         <Table.Row key={i} className='danhvt'>
        //             <Table.Cell>{dataz.comment}</Table.Cell>
        //             <Table.Cell>{d.toLocaleDateString()} - <span style={{color:'#03a9f4'}}>{d.toLocaleTimeString()}</span></Table.Cell>
        //             <Table.Cell>
        //                 <Label className='delete-css' 
        //                     onClick={()=>this.setState({open_modal:true,id_del:Number(e.id),content_del:dataz.comment})}
        //                 ><i className="fas fa-trash-alt"></i> {lang.DELETE}</Label>
        //             </Table.Cell>
        //         </Table.Row>
        //     )
        // });
        return rs;
    }
    //
    action_click_more=async()=>{
        let {page,data}=this.state;
        let data_new=await get_contacts_plugin(page);
        let show_see_more=true;
        if(data_new.length<count) show_see_more=false;
        if(data_new!=null||data_new!=undefined){
            this.setState({data:[...data,...data_new],show_see_more:show_see_more,page:page+1})
        }else{
            this.setState({data:[],show_see_more:false,page:1})
        }
    }
    //
    click_delete_contact=async()=>{
        let {id_del,data}=this.state;
        let a=await delete_contact_by_id_plugin(id_del)
        if(a.status){
            let index=null;
            data.forEach((e,i) => {
                if(e.id==id_del) index=i;
            });
            if(index!=null) data.splice(index,1);
            this.setState({data:data,open_modal:false});
            toast.success(lang.SUCCESS_DELETE,{theme: "colored"})
        }else{
            toast.info(lang.ERRO_DELETE,{theme: "colored"})
        }
    }
    //
    render() {
        let {data,show_see_more}=this.state;
        return (
            <div style={{marginTop:'18px',paddingBottom:'100px'}}>
 
                    {/* <div style={{marginTop:'55px'}}></div> */}
                    {this.show_contact(data)}
 
                {show_see_more&&<span className='smo'
                    onClick={this.action_click_more}
                >{lang.SEE_MORE}</span>}
                {/*  */}
                <Modal
                    size={'mini'}
                    open={this.state.open_modal}
                    onClose={() =>this.setState({open_modal:false})}
                >
                    <Modal.Header>Xóa thông tin này?</Modal.Header>
                    <Modal.Content>
                    <p>+ <b>Tên sản phẩm</b> : {this.state.content_del}</p>
                    <p>+ <b>Địa chỉ </b> : {this.state.address_del}</p>
                    <p style={{textAlign:'center'}}><img src={this.state.img_del} width='100px'/></p>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button negative onClick={() =>this.setState({open_modal:false})}>
                        Không
                    </Button>
                    <Button positive onClick={() =>this.click_delete_contact()}>
                        Xác nhận xóa
                    </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }


}
export default Contact;