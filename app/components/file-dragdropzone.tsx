"use client";

import { Button, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "actions/storage-actions";
import { queryClient } from "app/config/react-query-client-provider";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";

export default function FileDragDropZone() {
  const fileRef = useRef(null);

  // 파일 업로드 Mutation
  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
  });

  // react-dropzone의 onDrop 콜백 함수
  // dropzone에 파일을 놓았을 때 실행됨
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();

      acceptedFiles.forEach((file) => {
        formData.append(file.name, file);
      });

      await uploadImageMutation.mutate(formData);
    }
  }, []);

  // react-dropzone의 hook
  // getRootProps: dropzone의 root 엘리먼트에 필요한 props
  // getInputProps: dropzone의 input 엘리먼트에 필요한 props
  // isDragActive: dropzone에 파일을 놓았는지 여부
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center justify-center cursor-pointer">
      <input {...getInputProps()} />
      {uploadImageMutation.isPending ? (
        <Spinner />
      ) : isDragActive ? (
        <p>파일을 놓아주세요.</p>
      ) : (
        <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
      )}
    </div>
  );
}
