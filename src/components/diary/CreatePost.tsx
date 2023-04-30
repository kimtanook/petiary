/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from "@uiw/react-md-editor";
import * as commands from "@uiw/react-md-editor/lib/commands";
import "@uiw/react-md-editor/markdown-editor.css";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import photoImg from "../../img/icon/picture.png";
import {
  createDiaryPost,
  myPostLastVisibleReset,
  openPostLastVisibleReset,
  updateDiaryPost,
} from "../../util/api";
import { mdPostState } from "../../util/atom";
import { authService, storageService } from "../../util/firebase";

const CreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [mdContent, setMdContent] = useRecoilState<string>(mdPostState);
  const [diaryTitle, setDiaryTitle] = useState("");
  const [openValue, setOpenValue] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const resetFunction = () => {
    myPostLastVisibleReset();
    openPostLastVisibleReset();
    queryClient.invalidateQueries(["getMyDiaryPost"]);
    queryClient.invalidateQueries(["getOpenDiaryPost"]);
  };
  const { mutate: createPost } = useMutation(createDiaryPost, {
    onSuccess: () => {
      setTimeout(() => {
        resetFunction();
      }, 300);
    },
  });
  const { mutate: updatePost } = useMutation(updateDiaryPost, {
    onSuccess: () => {
      setTimeout(() => {
        resetFunction();
      }, 300);
    },
  });

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setDiaryTitle(event.target.value);
  };

  const handleImageChange = (e: any) => {
    let file = e.target.files;

    if (file.length === 0) {
      return;
    } else {
      const theFile = file[0];
      const reader = new FileReader();
      reader.readAsDataURL(theFile);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        }: any = finishedEvent;

        const imageRef = ref(storageService, `images/${uuidv4()}`);
        uploadString(imageRef, result, "data_url").then((response) =>
          getDownloadURL(response.ref).then((url) => {
            setMdContent((prevMd) =>
              prevMd.concat(
                `<p align="center"><img src='${url}' width="300"></p>`
              )
            );
          })
        );
      };
      if (fileInput.current !== null) {
        fileInput.current.value = "";
      }
    }
  };
  const submitPost = () => {
    if (!location.state) {
      createPost({
        uid: authService.currentUser?.uid,
        userName: authService.currentUser?.displayName,
        createdAt: Date.now(),
        title: diaryTitle,
        content: mdContent,
        open: openValue,
      });
      alert("작성완료!");
      setMdContent("");
      navigate("/diary");
    } else {
      updatePost({
        id: location.state.id,
        title: diaryTitle,
        content: mdContent,
        open: openValue,
      });
      alert("수정완료!");
      setMdContent("");
      navigate("/diary");
    }
  };

  const onChangeOpenValue = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "공개") {
      setOpenValue(true);
    } else {
      setOpenValue(false);
    }
  };

  useEffect(() => {
    if (location.state) {
      setDiaryTitle(location.state.title);
      setMdContent(location.state.content);
      setOpenValue(location.state.open);
    }
  }, []);

  return (
    <Wrap>
      <BackButton
        onClick={() => {
          setMdContent("");
          navigate("/diary");
        }}
      >
        〈 뒤로
      </BackButton>
      <TitleInput
        onChange={onChangeTitle}
        defaultValue={diaryTitle}
        placeholder="제목 (최대 30글자)"
        maxLength={30}
      />
      <OpenValueBox onChange={onChangeOpenValue}>
        <OpenValue>
          <input
            type="radio"
            name="openValue"
            value="비공개"
            checked={openValue === false ? true : false}
          />
          비공개 일기
        </OpenValue>
        <OpenValue>
          <input
            type="radio"
            name="openValue"
            value="공개"
            checked={openValue === true ? true : false}
          />
          공개 일기
        </OpenValue>
      </OpenValueBox>
      <EditorBox>
        <MDEditor
          data-color-mode="light"
          value={mdContent}
          height={600}
          onChange={(value: any) => {
            setMdContent(value);
          }}
          commands={[
            // Custom Toolbars
            commands.group(
              [
                commands.title1,
                commands.title2,
                commands.title3,
                commands.title4,
                commands.title5,
                commands.title6,
              ],
              {
                name: "title",
                groupName: "title",
                buttonProps: { "aria-label": "Insert title" },
              }
            ),
            commands.divider,
            commands.group([], {
              name: "update",
              groupName: "update",
              icon: (
                <img
                  src={photoImg}
                  alt="photoImg"
                  style={{ width: "12px", height: "12px" }}
                />
              ),
              children: (handle: any) => {
                return (
                  <FileInputBox>
                    <div>이미지선택</div>
                    <FileInput
                      type="file"
                      ref={fileInput}
                      accept="image/*"
                      onChange={(event) => {
                        handleImageChange(event);
                        handle.close();
                      }}
                      alt="image"
                    />
                    <CloseBtn
                      type="button"
                      onClick={() => {
                        handle.close();
                      }}
                    >
                      Close
                    </CloseBtn>
                  </FileInputBox>
                );
              },

              buttonProps: { "aria-label": "Insert title" },
            }),
          ]}
        />
      </EditorBox>
      <SubmitButton onClick={submitPost}>
        {location.state ? "수정완료" : "작성완료"}
      </SubmitButton>
    </Wrap>
  );
};

export default CreatePost;

const Wrap = styled.div`
  width: 60vw;
  min-width: 350px;
`;

const BackButton = styled.div`
  cursor: pointer;
  width: 60px;
  font-size: 24px;
  text-align: center;
  margin: 4px;
`;
const TitleInput = styled.input`
  width: 36vw;
  min-width: 300px;
  height: 40px;
  font-size: 24px;
  border-radius: 12px;
  border: none;
  padding-left: 12px;
  margin: 4px;
`;
const OpenValueBox = styled.div`
  margin: 4px;
`;
const OpenValue = styled.label`
  cursor: pointer;
`;
const EditorBox = styled.div`
  margin: 4px;
`;
const FileInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;
`;
const FileInput = styled.input`
  cursor: pointer;
  background-color: #c3c3c3;
  width: 200px;
  margin: 8px;
`;
const CloseBtn = styled.button`
  cursor: pointer;
  width: 80px;
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;
`;
const SubmitButton = styled.button`
  cursor: pointer;
  background-color: #4f1760;
  color: white;
  border: none;
  width: 100px;
  height: 32px;
  font-size: 16px;
  margin: 4px;
`;
