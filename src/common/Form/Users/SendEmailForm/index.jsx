import { Button } from "@/common/Button";
import style from "./index.module.css";
import {
  tinyMceContentStyle,
  tinyMcePlugin,
  tinyMceToolbar,
} from "@/constant/tableHeading";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { BaseUrls } from "../../../../../env";

export const SendEmailForm = ({onClose}) => {
  const editorRef = useRef("");
  return (
    
      <div className={style.wrapper}>
        <form className="formInner overflow-column height-500">
        <label>Subject</label>
        <div className="mb-2">
          <input
            type="text"
            name="subject"
            className="form-control"
            placeholder="Subject"
          />
        </div>
        <label>Message</label>
        <div className="mb-2">
          <Editor
            apiKey={BaseUrls.TINYMCE_API_KEY}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            init={{
              height: 350,
              menubar: false,
              plugins: tinyMcePlugin,
              toolbar: tinyMceToolbar,
              content_style: tinyMceContentStyle,
            }}
          />
        </div>
        <div className={style.btnWrapper}>
          <Button onClick={() => onClose()} name="Close" border="1px solid #23D24F" color="#000" />
          <Button name="save" bg="#23d24f" type="submit" color="#fff" />
        </div>
        </form>
      </div>
   
  );
};
