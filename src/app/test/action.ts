"use server";

export async function SendFileToStorage(userId: string, formData: FormData) {
  if (!userId) {
    return;
  }

  formData.forEach((e) => {
    console.log(e);
  });
}
