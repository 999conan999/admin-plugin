const axios = require('axios');

const { toast } =require ('react-toastify');
//chức năng: lấy dữ liệu các bài post theo tieu de hoac lay TAT CA cac bai post.
// đầu vào : url_get_post_list(*bắt buộc) + page(*bắt buộc) + data_search ( biến này ='*' => get all posts; còn có giá trị => search title)
// return_err : return_err => ARRAY ~~ OBJECT ; cai nay la sau khi gap loi se tra be mang rong hoac obj rong
const url_get_post_list='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/stsop/tegStsop.php';
export async function get_posts_by_search(page,data_search){
    if(data_search=='*'){// get all post
        let url=url_get_post_list+'?page='+page;
        return await fs_axios_get(url,'ARRAY');
    }else{// get post search by title
        let url=url_get_post_list+'?page='+page+'&data_search='+data_search;
        return await fs_axios_get(url,'ARRAY');
    }
}
export async function get_posts_by_category_id(page,category_id){
        let url=url_get_post_list+'?page='+page+'&category_id='+category_id;
        return await fs_axios_get(url,'ARRAY');
}

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
//******************************  */
const url_create_edit_post='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/stsop/etaercPtideP.php';
// data={
//     idN:-1, //==>id=-1 >> create || còn không là edit
//     titleS:'tiêu đề nè',
//     contentS:'đây là phần contents',
//     statusS:'publish',
//     categoryA:[24,1],
//     tagA:['thẻ tag 1',' thẻ tag 2'],
//     metaA:{
//         meta_shortdescript:'đây là mô tả ngăn của thẻ meta',
//         meta_code_header:'header code',
//         meta_code_body:'code body'
//     },
//     thumnailS:'https://anbinhnew.com/wp-content/uploads/2021/01/giuong-sat-2-tang-cao-cap-mau-trang-dep-nhat-hcm-binh-duong-dong-nai.jpg'
// }
export async function action_create_or_edit_post(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        if(key=='categoryA'){
            if(data[key].length>0){
                data[key].forEach(e => {
                    data_send.append('categoryA[]',e);
                });
            }else{
                    data_send.append('categoryA','null');
            }
        }else if(key=='tagA'){
            if(data[key].length>0){
                data[key].forEach(e => {
                    data_send.append('tagA[]',e);
                });
            }else{
                data_send.append('tagA','null');
            }
        }else if(key=='metaA'){
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
    let response= axios.post(url_create_edit_post, 
        data_send
    )
    .then(function (response) {
        // console.log("🚀 ~ file: axios.js ~ line 89 ~ response", response.data)
        if(response.data.status=="ok"){
            return {
                status:true,
                id:response.data.id,
                category:response.data.category,
                url:response.data.url,
                author_name:response.data.author_name,
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
const url_remove_post='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/stsop/eteled.php';
export async function action_remove_post_by_id(id){
    let data_send=new FormData();
    data_send.append('idN',id);
    let response= axios.post(url_remove_post, 
        data_send
    )
    .then(function (response) {
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
const url_post_infor='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/stsop/tegrofintsop.php?idN=';
export async function get_post_infor_by_id(id){
    let url=url_post_infor+id;
    return fs_axios_get(url,'OBJECT');
}
//
const url_category_infor='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/cate/tegrofinCate.php?idN=';
export async function get_category_infor_by_id(id){
    let url=url_category_infor+id;
    return fs_axios_get(url,'OBJECT');
}
//
const url_get_all_category='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/cate/tegCate.php';
export async function get_all_category(){
    return await fs_axios_get(url_get_all_category,'ARRAY');
}
const url_remove_category='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/cate/eteled.php';
export async function action_remove_category_by_id(id){
    let data_send=new FormData();
    data_send.append('idN',id);
    let response= axios.post(url_remove_category, 
        data_send
    )
    .then(function (response) {
        if(response.data.status=="ok"){
            return {
                status:response.data,
                rs:response.data.rs
            }
        }else{
            return  {
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
const url_create_edit_category='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/cate/etaercCtideC.php';
// {
//     idN:-1, // idN = -1 => new category || edit
//     nameS:'category api ok__update',
//     contentS:'noi dung cate ne ok__update',
//     parentIdN:4,
//     thumnailS:'anbinhnew.com ok__update',
//     metaA:{
//         meta_1:'day la the meta_1 ok__update',
//         meta_2:'day la the meta_2 ok__update',
//         meta_3:'day la the meta_3 ok__update',
//     }
// }
export async function action_create_or_edit_category(data){
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
    let response= axios.post(url_create_edit_category, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js ~ line 168 ~ response", response.data)
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
const url_create_edit_page='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/egap/etaercGtideG.php';
// data={
//     idN:-1, //==>id=-1 >> create || còn không là edit
//     titleS:'tiêu đề nè',
//     contentS:'đây là phần contents',
//     statusS:'publish',
//     metaA:{
//         meta_shortdescript:'đây là mô tả ngăn của thẻ meta',
//         meta_code_header:'header code',
//         meta_code_body:'code body'
//     },
//     thumnailS:'https://anbinhnew.com/wp-content/uploads/2021/01/giuong-sat-2-tang-cao-cap-mau-trang-dep-nhat-hcm-binh-duong-dong-nai.jpg'
// }
export async function action_create_or_edit_page(data){
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
    let response= axios.post(url_create_edit_page, 
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
const url_get_page_list='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/egap/tegegap.php';
export async function get_all_page(page){
    let url=url_get_page_list+'?page='+page;
    return await fs_axios_get(url,'OBJECT');
}
const url_get_page_list_all='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/egap/tegegapAll.php';
export async function get_all_page_All(){
    return await fs_axios_get(url_get_page_list_all,'ARRAY');
}
//
const url_remove_page='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/egap/eteled.php';
export async function action_remove_page_by_id(id){
    let data_send=new FormData();
    data_send.append('idN',id);
    let response= axios.post(url_remove_page, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js ~ line 267 ~ response", response.data)
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
const url_page_infor='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/egap/tegrofinegap.php?idN=';
export async function get_page_infor_by_id(id){
    let url=url_page_infor+id;
    return fs_axios_get(url,'OBJECT');
}
//
const url_cate_tag='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/teg_cate_sgat.php';
export async function get_cate_tag(){
    let url=url_cate_tag;
    return fs_axios_get(url,'OBJECT');
}
// upload file 
const url_upload='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/mede/upload_core.php';
export async function upload_core(data){
    let formData = new FormData();
    if(data.length>0){
        for(let i=0;i<data.length;i++){
            formData.append(i,data[i]);
        }
    }
    //
    let response= axios.post(url_upload, 
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
const url_get_img='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/mede/teggmi.php?page=';
export async function get_imgs(page){
    let url=url_get_img+page;
    return await fs_axios_get(url,'ARRAY');
}
//
const url_remove_img_by_id='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/mede/eteled.php';
export async function action_remove_img_by_id(id){
    let data_send=new FormData();
    data_send.append('idN',id);
    let response= axios.post(url_remove_img_by_id, 
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
//
const url_check_login='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/emehtAtada/check.php';
export async function check_login(){
    return await fs_axios_get(url_check_login,'ARRAY');
}
//
const url_update_data_theme='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/emehtAtada/update.php';

export async function action_update_data_theme(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
            data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_update_data_theme, 
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
const url_get_data_theme='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/emehtAtada/get.php';

export async function get_data_theme(data){// input {keyz:"xdfafdasd"}
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
            data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_get_data_theme, 
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
const url_delete_contact='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/tcatnoc/delete.php';

export async function delete_contact_by_id(id){// input {keyz:"xdfafdasd"}
    let data_send=new FormData();
    data_send.append('id',id);
    //
    let response= axios.post(url_delete_contact, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js ~ line 439 ~ response", response)
        return(response.data)
        
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return {status:false}
    })
    return response;
}
//
const url_get_contacts='http://localhost/test/wp-content/themes/danhdev_1/templates/ajax/ipa_nimda/tcatnoc/tegTcatnoc.php'
export async function get_contacts(page){
    let url=url_get_contacts+'?page='+page;
    return await fs_axios_get(url,'ARRAY');
}


////////////////////////////////////////////////////////////// pơlugin here
const url_get_lading_page_list='http://localhost/theme-plugin-1/wp-content/plugins/zsharevn-landing-page/ajax/ladingpage_zshare_vn/tegegap.php';
export async function get_all_lading_page(page){
    let url=url_get_lading_page_list+'?page='+page;
    return await fs_axios_get(url,'OBJECT');
}
//
const url_remove_lading_page='http://localhost/theme-plugin-1/wp-content/plugins/zsharevn-landing-page/ajax/ladingpage_zshare_vn/eteled.php';
export async function action_remove_lading_page_by_id(id){
    let data_send=new FormData();
    data_send.append('idN',id);
    let response= axios.post(url_remove_lading_page, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js ~ line 267 ~ response", response.data)
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
const url_create_edit_lading_page='http://localhost/theme-plugin-1/wp-content/plugins/zsharevn-landing-page/ajax/ladingpage_zshare_vn/etaercGtideG.php';
export async function action_create_or_edit_ladning_page(data){
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
const url_landing_page_infor='http://localhost/theme-plugin-1/wp-content/plugins/zsharevn-landing-page/ajax/ladingpage_zshare_vn/tegrofinegap.php?idN=';
export async function get_landing_page_infor_by_id(id){
    let url=url_landing_page_infor+id;
    return fs_axios_get(url,'OBJECT');
}
//
// upload file 
const url_upload_pl='http://localhost/theme-plugin-1/wp-content/plugins/zsharevn-landing-page/ajax/mede/upload_core.php';
export async function upload_core_pl(data){
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
const url_get_img_pl='http://localhost/theme-plugin-1/wp-content/plugins/zsharevn-landing-page/ajax/mede/teggmi.php?page=';
export async function get_imgs_pl(page){
    let url=url_get_img_pl+page;
    return await fs_axios_get(url,'ARRAY');
}
//
const url_remove_img_by_id_pl='http://localhost/theme-plugin-1/wp-content/plugins/zsharevn-landing-page/ajax/mede/eteled.php';
export async function action_remove_img_by_id_pl(id){
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
const url_get_all_category_pl='http://localhost/theme-plugin-1/wp-content/plugins/zsharevn-landing-page/ajax/tegCate.php';
export async function get_all_category_pl(){
    return await fs_axios_get(url_get_all_category_pl,'ARRAY');
}
//
const url_get_page_list_all_pl='http://localhost/theme-plugin-1/wp-content/plugins/zsharevn-landing-page/ajax/tegegapAll.php';
export async function get_all_page_All_pl(){
    return await fs_axios_get(url_get_page_list_all_pl,'ARRAY');
}
//
//
const url_update_data_plugin='http://localhost/theme-plugin-1/wp-content/plugins/zsharevn-landing-page/ajax/update.php';

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
const url_get_data_plugin='http://localhost/theme-plugin-1/wp-content/plugins/zsharevn-landing-page/ajax/get.php';

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
const url_check_firsts_conect='http://localhost/theme-plugin-1/wp-content/plugins/zsharevn-landing-page/ajax/check.php';
export async function check_login_plugin(){
    return await fs_axios_get(url_check_firsts_conect,'ARRAY');
}
//
const url_check_notify='http://localhost/theme-plugin-1/wp-content/plugins/zsharevn-landing-page/ajax/notify.php';
export async function check_notify_plugin(){
    return await fs_axios_get(url_check_notify,'ARRAY');
}
//
