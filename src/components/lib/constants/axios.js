const axios = require('axios');

const { toast } =require ('react-toastify');
const home_url=window.home_url;
////////////////////////////////////////////////////////////// pơlugin here
//****************************** */
async function fs_axios_get(url,return_err){ // return_err => ARRAY ~~ OBJECT
    let data= await axios.get(url)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        toast.error('ERROR!',{theme: "colored"})
        console.log(error)
        // handle error
        if(return_err=='ARRAY') return [];
        return {};
    })
    .then(function (data) {
        return data;
    });
    return data;
}
//
export async function get_all_lading_page(page){
    const url_get_lading_page_list=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/ladingpage_zshare_vn/tegegap.php';
    let url=url_get_lading_page_list+'?page='+page;
    return await fs_axios_get(url,'OBJECT');
}
//
export async function action_remove_lading_page_by_id(id){
    const url_remove_lading_page=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/ladingpage_zshare_vn/eteled.php';
    let data_send=new FormData();
    data_send.append('idN',id);
    let response= axios.post(url_remove_lading_page, 
        data_send
    )
    .then(function (response) {
        // console.log("🚀 ~ file: axios.js ~ line 267 ~ response", response.data)
        if(response.data.status=="ok"){
            return true
        }else{
            return false
        }
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return false
    })
    return response;
}
//
export async function action_create_or_edit_ladning_page(data){
    const url_create_edit_lading_page=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/ladingpage_zshare_vn/etaercGtideG.php';
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        if(key=='metaA'){
            if(Object.keys(data[key]).length>0){
                Object.keys(data[key]).forEach(function(key_meta) {
                    data_send.append('metaA['+key_meta+']',data[key][key_meta]);
                })
            }else{
                data_send.append('metaA','null');
            }
        }else{
            data_send.append(key,data[key]);
        }
    });
    //
    let response= axios.post(url_create_edit_lading_page, 
        data_send
    )
    .then(function (response) {
        if(response.data.status=="ok"){
            return {
                status:true,
                id:response.data.id,
                url:response.data.url,
            }
        }else{
            return {
                status:false,
            }
        }
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return false
    })
    return response;
}
//
//
export async function get_landing_page_infor_by_id(id){
    const url_landing_page_infor=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/ladingpage_zshare_vn/tegrofinegap.php?idN=';
    let url=url_landing_page_infor+id;
    return fs_axios_get(url,'OBJECT');
}
//
// upload file 
export async function upload_core_pl(data){
    const url_upload_pl=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/mede/upload_core.php';
    let formData = new FormData();
    if(data.length>0){
        for(let i=0;i<data.length;i++){
            formData.append(i,data[i]);
        }
    }
    //
    let response= axios.post(url_upload_pl, 
        formData
    )
    .then(function (response) {
        if(response.data.length>0){
            return response.data
        }else{
            return []
        }
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return []
    })
    return response;
}
//
export async function get_imgs_pl(page){
    const url_get_img_pl=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/mede/teggmi.php?page=';
    let url=url_get_img_pl+page;
    return await fs_axios_get(url,'ARRAY');
}
//
export async function action_remove_img_by_id_pl(id){
    const url_remove_img_by_id_pl=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/mede/eteled.php';
    let data_send=new FormData();
    data_send.append('idN',id);
    let response= axios.post(url_remove_img_by_id_pl, 
        data_send
    )
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return {
            status:false
        }
    })
    return response;
}
////
const url_get_all_category_pl=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/tegCate.php';
export async function get_all_category_pl(){
    return await fs_axios_get(url_get_all_category_pl,'ARRAY');
}
//
const url_get_page_list_all_pl=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/tegegapAll.php';
export async function get_all_page_All_pl(){
    return await fs_axios_get(url_get_page_list_all_pl,'ARRAY');
}
//
//
const url_update_data_plugin=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/update.php';

export async function action_update_data_plugin(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
            data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_update_data_plugin, 
        data_send
    )
    .then(function (response) {
        // console.log("🚀 ~ file: axios.js ~ line 89 ~ response", response.data)
        if(response.data.status){
            return {
                status:true,
            }
        }else{
            return {
                status:false,
            }
        }
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return false
    })
    return response;
}
// 
const url_get_data_plugin=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/get.php';

export async function get_data_plugin(data){// input {keyz:"xdfafdasd"}
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
            data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_get_data_plugin, 
        data_send
    )
    .then(function (response) {
        // console.log("🚀 ~ file: axios.js ~ line 89 ~ response", response.data)
        return(response.data.data)
        
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return 'null'
    })
    return response;
}
//
//
const url_check_firsts_conect=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/check.php';
export async function check_login_plugin(){
    return await fs_axios_get(url_check_firsts_conect,'ARRAY');
}
//
const url_check_notify=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/notify.php';
export async function check_notify_plugin(){
    return await fs_axios_get(url_check_notify,'ARRAY');
}
//
const url_get_contacts_plugin=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/form_zshare_vn/tegTcatnoc.php'
export async function get_contacts_plugin(page){
    let url=url_get_contacts_plugin+'?page='+page;
    return await fs_axios_get(url,'ARRAY');
}
// 
const url_delete_contact_plugin=home_url+'/wp-content/plugins/zsharevn-landing-page/ajax/form_zshare_vn/delete.php';

export async function delete_contact_by_id_plugin(id){// input {keyz:"xdfafdasd"}
    let data_send=new FormData();
    data_send.append('id',id);
    //
    let response= axios.post(url_delete_contact_plugin, 
        data_send
    )
    .then(function (response) {
        return(response.data)
        
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return {status:false}
    })
    return response;
}
