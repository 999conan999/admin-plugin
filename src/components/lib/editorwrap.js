import React, { Component  } from 'react';
import { Editor } from '@tinymce/tinymce-react';

  class EditorWrap extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }

    
    render() {
        return (
          <>
           <Editor
             onEditorChange={(evt) => {
              this.props.action_change_content_post(evt)
             }}
             value={this.props.content_post}
             init={{
               height: 500,
               menubar: true,
               relative_urls: false,
               remove_script_host: false,
               plugins: [
                 'advlist autolink lists link image charmap print preview anchor',
                 'searchreplace visualblocks code fullscreen',
                 'insertdatetime media table paste code help wordcount imagetools '
               ],
               toolbar: 'formatselect |  | table | unlink | link |' +
               'bold italic backcolor forecolor | alignleft aligncenter ' +
               'alignright alignjustify | bullist numlist | ' +
               ' code | image| fontsizeselect | insertfile' ,
               content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
               entity_encoding : "raw"
             }}
           />
         
          </>
        )
    }
    // add_img =()=>{
    //   let data1=this.props.data_content+'<img src="https://anbinhnew.com/wp-content/uploads/2021/01/Ban-hoc-sinh-co-gia-sach-An-Binh-mau-hong-2-300x300.jpg" alt="asdasdad" width="300" height="300" />'
    //   this.props.data_contents(data1)
    // }
}
export default EditorWrap;

