import React, { useRef, useEffect, useState } from 'react';
import SunEditorCore from 'suneditor/src/lib/core';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import dynamic from 'next/dynamic';
import suneditor from 'suneditor';
import useEditor from './hooks/useCreatePost';
import Link from 'next/link';
import useInput from '../../lib/hooks/useInput';
import { Spinner } from 'evergreen-ui';
import { Pane, Badge, Text } from 'evergreen-ui';
import AnimatedMulti from '../common/ReactSelectInput';
import { Button, LinkButton } from '../common/Button';
import TagsForm from '../tags/TagForm';
import Tags from '../tags/Tags';
import { ArrowButton, ArrowLink } from '../common/ArrowButton';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

const WriteMarkdownEditor = props => {
  const edtiorRef = useRef<any>();
  const [title, onChangeTitle] = useInput('');
  const [tag, setTag] = useState([]);
  const { createPost } = useEditor();
  const [fileInputState, setFileInputState] = useState<any>();
  const [readyForFile, setreadyForFile] = useState(0);
  const [previewSource, setPreviewSource] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  console.log(selectedOption);

  useEffect(() => {
    setSelectedOption({
      value: 'Beginner',
    });
  }, []);

  const deleteTag = index => {
    const newTag = [...tag];
    newTag.splice(index, 1);
    setTag(newTag);
  };

  const addTag = text => {
    const newTag = [...tag, text];
    setTag(newTag);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    createPost({
      variables: {
        input: {
          title: title,
          body: edtiorRef?.current?.getContents(false),
          thumbnail: fileInputState,
          tags: tag,
          difficulty: selectedOption?.value,
        },
      },
    });
  };

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    edtiorRef.current = sunEditor;
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as any);
    };
  };

  const handleFileInputChange = e => {
    const file = e.target.files[0];

    setreadyForFile(1);
    previewFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setFileInputState(reader?.result as any);

      setreadyForFile(2);
    };
  };

  const WaitingFotImg = readyForFile => {
    if (readyForFile == 0) {
      return (
        <>
          <div></div>
        </>
      );
    } else if (readyForFile == 1) {
      return (
        <>
          <Spinner size={16} />
        </>
      );
    } else if (readyForFile == 2) {
      return (
        <>
          <Pane flexBasis={120}>
            <Badge color="green">Success</Badge>
          </Pane>
        </>
      );
    }
  };

  return (
    <div className="flex h-full min-h-screen ">
      <div className="w-[50%] pt-9 mxl:w-full">
        <div className="pl-4">
          <input
            value={title}
            onChange={onChangeTitle}
            className="text-4xl font-bold focus:outline-none w-full mmd:text-[2rem]"
            name="title"
            placeholder="제목을 입력하세요"
          />
          <hr className="border-2 w-6/12 mt-3.5 h-1" />
          <div className="flex flex-wrap mt-4 items-center">
            {tag.map((tags, index) => (
              <Tags tags={tags} key={index} deleteTag={deleteTag} index={index} />
            ))}
          </div>
          <div className="mb-4">
            <TagsForm addTag={addTag} />
          </div>

          <div className="flex w-full justify-between z-20 mmd:flex-wrap">
            <div className="flex">
              <div className="text-[#868e96] font-semibold pr-1.5">Thumbnail</div>
              <label htmlFor="input-file">
                <svg width="1.5rem" height="1.5rem" fill="none" viewBox="0 0 107 85">
                  <path
                    fill="#868E96"
                    d="M105.155 0H1.845A1.844 1.844 0 0 0 0 1.845v81.172c0 1.02.826 1.845 1.845 1.845h103.31A1.844 1.844 0 0 0 107 83.017V1.845C107 .825 106.174 0 105.155 0zm-1.845 81.172H3.69V3.69h99.62v77.482z"></path>
                  <path
                    fill="#868E96"
                    d="M29.517 40.84c5.666 0 10.274-4.608 10.274-10.271 0-5.668-4.608-10.276-10.274-10.276-5.665 0-10.274 4.608-10.274 10.274 0 5.665 4.609 10.274 10.274 10.274zm0-16.857a6.593 6.593 0 0 1 6.584 6.584 6.593 6.593 0 0 1-6.584 6.584 6.591 6.591 0 0 1-6.584-6.582c0-3.629 2.954-6.586 6.584-6.586zM12.914 73.793a1.84 1.84 0 0 0 1.217-.46l30.095-26.495 19.005 19.004a1.843 1.843 0 0 0 2.609 0 1.843 1.843 0 0 0 0-2.609l-8.868-8.868 16.937-18.548 20.775 19.044a1.846 1.846 0 0 0 2.492-2.72L75.038 31.846a1.902 1.902 0 0 0-1.328-.483c-.489.022-.95.238-1.28.6L54.36 51.752l-8.75-8.75a1.847 1.847 0 0 0-2.523-.081l-31.394 27.64a1.845 1.845 0 0 0 1.22 3.231z"></path>
                </svg>
              </label>
              <input
                id="input-file"
                type="file"
                name="file"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
              />
              <div style={{ marginLeft: '.5rem' }}>{WaitingFotImg(readyForFile)}</div>
            </div>

            <div className="z-[9999] pb-2 pr-2 mmd:text-[0.7rem] mmd:py-2">
              <AnimatedMulti setSelectedOption={setSelectedOption} />
            </div>
          </div>
        </div>
        <SunEditor
          getSunEditorInstance={getSunEditorInstance}
          lang="ko"
          autoFocus={true}
          setOptions={{
            height: '1000',
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

        <div className="fixed flex bottom-0 z-50 w-[50%] px-4  bg-white shadow-lg shadow-slate-700  h-[4.5rem] items-center justify-between mxl:w-full">
          <div>
            <ArrowLink direction="left" href={'/'} textSize="small">
              뒤로가기
            </ArrowLink>
          </div>

          <div onClick={e => handleSubmit(e)}>
            <LinkButton className="text-zinc-600  ">완료</LinkButton>
          </div>
        </div>
      </div>

      <div className="w-[50%] flex flex-1  bg-[#F8F9FA] shadow-md">
        {/* {edtiorRef?.current?.getContents()} */}
      </div>
    </div>
  );
};
export default WriteMarkdownEditor;
