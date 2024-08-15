"use client";

import { IconButton, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { deleteFile } from "actions/storage-actions";
import { getImageUrl } from "utils/supabase/storage";
import { queryClient } from "app/config/react-query-client-provider";

export default function DropboxImage({ image }) {
  const deleteFileMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
  });

  return (
    <div className="relative w-full flex flex-col gap-2 p-4 border border-gray-100 rounded-2xl shadow-md">
      {/* Image */}
      <div>
        <img src={getImageUrl(image.name)} className="w-full aspect-square rounded-2xl" />
      </div>
      {/* FileName */}
      <div className="">{image.name}</div>
      <div className="absolute top-4 right-4">
        <IconButton
          onClick={() => {
            deleteFileMutation.mutate(image.name);
          }}
          color="red">
          {deleteFileMutation.isPending ? <Spinner /> : <i className="fas fa-trash" />}
        </IconButton>
      </div>
    </div>
  );
}
