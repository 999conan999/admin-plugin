import React, { Component } from 'react';
import PageEdit from './page/pagetEdit';
import Media from './media/controlMedia';
import {  Menu, Segment,Label } from 'semantic-ui-react'
import * as lang from './lib/constants/language';
import 'react-toastify/dist/ReactToastify.css';
import {alert_toast} from './lib/constants/language';
import { ToastContainer,toast } from 'react-toastify';
import {check_login_plugin,check_notify_plugin,action_update_data_plugin} from './lib/constants/axios';
import Contact from './contacts/Contact';
import SetupPage from './setup_Page/SetupPage';
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     Link,
//     useParams
//   } from "react-router-dom";
class Index extends Component {
    constructor (props) {
        super(props)
        this.state = {
            activeItem:"pages",
            permission_type:"null",
            notify:0,
        }
    }
   async componentDidMount(){
        this.random_popup_contact();
        let a=await check_login_plugin();
        let permission_type='null';
        if(a.permission_type!=undefined) permission_type=a.permission_type;
        this.setState({
           permission_type:permission_type,
        });
        this.check_notify_contacts()
        
    }
    // random popup infor
    // random_popup_contact=()=>{
    //     let a=[1,2,3,4,5,6];
    //     let random = Math.floor(Math.random() * a.length);
    //     if(random==1){
    //         toast(({ closeToast }) => alert_toast(),{
    //             position: "top-right",
    //             autoClose: false,
    //             hideProgressBar: false,
    //             closeOnClick: false,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             style:{
    //                 backgroundColor:"#f5e8c1",
    //                 color:"black"
    //             }
    //         });
    //     }
    //     //
    // }
    //
    clickMenu=(name)=>{
        this.setState({
            activeItem:name
        });
        this.check_notify_contacts()
    }
    //
    set_permission=(list_permisstion,permission_type)=>{
        // let permission_org=["administrator","editor",'author','contributor','subscriber'];
            if(list_permisstion.indexOf(permission_type)!=-1){
               return true;
            }else{
                return false;
            }
    }
    //
    check_notify_contacts=async()=>{
        let a = await check_notify_plugin();
        if(a.contact_count_now!=undefined){
            let notify_num=a.contact_count_now-a.contact_count_pre;
            if(notify_num>0){
                this.setState({notify:notify_num});
                // trong truong hop lon hon khong thi tinh toan o day, con khong thi thoi
                if(this.state.activeItem=='contacts'){
                    setTimeout(async()=>{
                        await action_update_data_plugin({
                            keyz:'contact_count_plugin',
                            valuez:a.contact_count_now
                        });
                        this.setState({notify:0});
                    },10000)
                }
            }
        }
    }
    //
    render() {
        let { activeItem,permission_type,notify,coun_contact_now } =  this.state;
        permission_type='editor';//[todo]
        let permission_active_page=this.set_permission(["administrator","editor"],permission_type);
        let permission_active_contact=this.set_permission(["administrator","editor",'author'],permission_type);
        let permission_active_setup=this.set_permission(["administrator","editor"],permission_type);
        // let permission_active_post=this.set_permission(["administrator","editor",'author','contributor','subscriber']);
        
        return (
            <React.Fragment>
            <Menu attached='top' tabular>

                {permission_active_page&&<a 
                    className={`link item ${activeItem=="pages"?"active":""}`}
                    onClick={()=>this.clickMenu("pages")}
                ><i class="fa-solid fa-hand menu-icon-d"></i>{lang.PAGES}</a>}

                {permission_active_contact&&<a 
                    className={`link item ${activeItem=="contacts"?"active":""}`}
                    onClick={()=>this.clickMenu("contacts")}
                ><i class="fa-brands fa-wpforms  menu-icon-d"></i>{lang.FORM_CONTACT}
                {notify>0&& <Label color='red' floating style={{top: '0px'}}>{notify}</Label>}
                </a>}

                <Menu.Menu position='right'>
                    {permission_active_setup&&<a 
                        className={`link item ${activeItem=="setups"?"active":""}`}
                        onClick={()=>this.clickMenu("setups")}
                    ><i className="fa-solid fa-gears menu-icon-d"></i>{lang.SETUP_PAGE}</a>}
                </Menu.Menu>
            </Menu>
            <div style={{padding:'5px'}}>
                {activeItem=='pages'&&<PageEdit/>}
                {activeItem=='contacts'&&<Contact/>}
                {activeItem=='setups'&&<SetupPage/>}
                {activeItem!='setups'&&activeItem!='contacts'&&activeItem!='pages'&&<PageEdit/>}
            </div>
                {/* toast */}
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                
               
          </React.Fragment>
        )
    }
    clear_notify_contact=()=>{
        this.setState({
            notify:0
        })
    }
}
export default Index;