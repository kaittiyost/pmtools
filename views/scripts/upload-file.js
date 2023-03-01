async function uploadfile() {
    let usr_file = $("#file").prop("files")[0];
    var formData = new FormData();
    formData.append("file", usr_file);

    let response = await axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: "/upload",
      data: formData,
    });
    console.log(response.data);
    if (response.data == "FileUploaded") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Upload file successfully",
      });

    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title:
          "Error: There was a problem uploading your file. Please try again.",
      });
    }
  }