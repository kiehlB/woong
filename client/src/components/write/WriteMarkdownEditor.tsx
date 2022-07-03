import React, { useRef, useEffect } from 'react';

import SunEditorCore from 'suneditor/src/lib/core';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import dynamic from 'next/dynamic';
import suneditor from 'suneditor';
import useEditor from './hooks/useCreatePost';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

const WriteMarkdownEditor = props => {
  const edtiorRef = useRef<SunEditorCore>();

  const { createPost } = useEditor();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(edtiorRef?.current?.getContents(false));
    createPost({
      variables: {
        input: { title: 'zzzz', body: edtiorRef?.current?.getContents(false) },
      },
    });
  };

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    edtiorRef.current = sunEditor;
  };

  return (
    <div>
      <p onClick={e => handleSubmit(e)}> My Other Contents </p>
      <SunEditor
        getSunEditorInstance={getSunEditorInstance}
        lang="ko"
        autoFocus={true}
        setOptions={{
          height: '800',
          buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize', 'formatBlock'],
            ['paragraphStyle', 'blockquote'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['fontColor', 'hiliteColor', 'textStyle'],
            ['removeFormat'],
            '/', // Line break
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
            /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
            ['fullScreen', 'showBlocks', 'codeView'],
            ['preview', 'print'],
            ['save', 'template'],
            /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
          ], // Or Array of button list, eg. [['font', 'align'], ['image']]
          // plugins: [font] set plugins, all plugins are set by default
          // Other option
        }}
      />
    </div>
  );
};
export default WriteMarkdownEditor;
