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
import { createDiaryPost, updateDiaryPost } from "../../util/api";
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
  const { mutate: createPost } = useMutation(createDiaryPost, {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(["diaryData"]);
        queryClient.invalidateQueries(["getOpenDiaryPost"]);
      }, 300);
    },
  });
  const { mutate: updatePost } = useMutation(updateDiaryPost, {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(["diaryData"]);
        queryClient.invalidateQueries(["getOpenDiaryPost"]);
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
                `<p align="center"><img src='${url}' width="400" height="400"></p>`
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
        placeholder="제목을 입력해주세요."
      />
      <OpenValueBox onChange={onChangeOpenValue}>
        <OpenValue>
          <input type="radio" name="openValue" value="비공개" />
          비공개 일기
        </OpenValue>
        <OpenValue>
          <input type="radio" name="openValue" value="공개" />
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
                <svg viewBox="0 0 1024 1024" width="12" height="12">
                  <path
                    fill="currentColor"
                    d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z"
                  />
                </svg>
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

const Wrap = styled.div``;

const BackButton = styled.div`
  cursor: pointer;
  width: 60px;
  font-size: 24px;
  text-align: center;
  margin: 4px;
`;
const TitleInput = styled.input`
  width: 400px;
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
  background-color: #ffb06f;
  color: white;
  border: none;
  width: 100px;
  height: 32px;
  border-radius: 12px;
  font-size: 16px;
  margin: 4px;
`;
