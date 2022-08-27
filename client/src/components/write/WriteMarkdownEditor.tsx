import React, { useRef, useEffect, useState } from 'react';

import SunEditorCore from 'suneditor/src/lib/core';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import dynamic from 'next/dynamic';
import suneditor from 'suneditor';
import useEditor from './hooks/useCreatePost';
import Tags from './Tags';
import TagsForm from './TagForm';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

const WriteMarkdownEditor = props => {
  const edtiorRef = useRef<any>();
  const [tag, setTag] = useState([]);
  const { createPost } = useEditor();

  const deleteTag = index => {
    const newTag = [...tag];
    newTag.splice(index, 1);
    setTag(newTag);
  };

  const addTag = text => {
    const newTag = [...tag, { text }];
    setTag(newTag);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    createPost({
      variables: {
        input: {
          title: 'zzzz',
          body: edtiorRef?.current?.getContents(false),
          thumbnail: 'asdsad',
          tags: ['dasd'],
        },
      },
    });
  };

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    edtiorRef.current = sunEditor;
  };

  return (
    <div className="w-[95%] mx-auto pt-9">
      <input
        className="text-4xl font-bold focus:outline-none w-full "
        name="title"
        placeholder="제목을 입력하세요"
      />

      <hr className="border-2 w-4/12 mt-3.5 h-1" />

      <div className="flex flex-wrap mt-4 items-center">
        {tag.map((tags, index) => (
          <Tags tags={tags} key={index} deleteTag={deleteTag} index={index} />
        ))}
      </div>

      <div className="mb-4">
        <TagsForm addTag={addTag} />
      </div>

      <SunEditor
        getSunEditorInstance={getSunEditorInstance}
        lang="ko"
        autoFocus={true}
        setOptions={{
          height: '500',
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
