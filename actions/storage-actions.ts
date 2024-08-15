"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error: Error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

/**
 * 파일 목록 조회
 * @param searchText 검색어
 * @returns 파일 목록
 */
export async function fetchFiles(searchText: string = "") {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .list(null, { search: searchText });

  handleError(error);

  return data;
}

/** 파일 업로드
 * @param formData FormData
 * @returns 업로드된 파일 정보
 */
export async function uploadFile(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const files = Array.from(formData.entries()).map(([key, value]) => value as File);

  const results = await Promise.all(
    files.map((file) =>
      supabase.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
        .upload(file.name, file, { upsert: true })
    )
  );

  return results;
}

/** 파일 삭제
 * @param path 파일 경로
 * @returns 삭제된 파일 정보
 */
export async function deleteFile(path: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .remove([path]);

  handleError(error);

  return data;
}
