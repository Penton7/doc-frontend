import http from "../utils/request";

class UploadFilesService {
  upload(file, privateKey, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    return http.post("/user/documents", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }
}

export default new UploadFilesService();
