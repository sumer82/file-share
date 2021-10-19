const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header');
const browseBtn = document.querySelector('.button');
const fileinput = document.querySelector('#fileInput');
const link = document.querySelector('.link');
const fileUrl = document.querySelector('#fileUrl');
const maxAllowedSize = 100 * 1024 * 1024; //100mb

//when browse button is clicked file input button is also clicked
browseBtn.addEventListener('click', () => {
    fileinput.click();
});
//when file is inside the drag area

dragArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dragText.textContent = 'Release to Upload';
    dragArea.classList.add('active');
});

// when files leaves the drag area
dragArea.addEventListener('dragleave', (e) => {
    dragText.textContent = 'Drag & Drop';
    dragArea.classList.remove('active');
});

//when the file is droped in drag area

dragArea.addEventListener('drop', (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length == 1) {
        if (files[0].size < maxAllowedSize) {
            fileinput.files = files;
            uploadFile();
        } else {
            alert("max  allowed size is 100 MB");
        }
    } else {
        alert("you can upload only one file at a time ")
    }
    dragText.textContent = 'Drag & Drop';
    dragArea.classList.remove('active');
});

//when we select file using browse button

fileinput.addEventListener("change", () => {
    if (fileinput.files[0].size > maxAllowedSize) {
        alert("max  allowed size is 100 MB");
        fileinput.value = "";
    }
    uploadFile();
});

//upload file function

const uploadFile = () => {
    console.log("file uploading ");
    files = fileinput.files;

    const formData = new FormData();
    formData.append("myfile", files[0]);

    //upload file
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            onFileUploadSucess(xhr.responseText);
        }
    };

    xhr.open("POST", "http://localhost:5000/api/files");
    xhr.send(formData);
};

const onFileUploadSucess = (res) => {
    fileinput.value = "";
    const {file: url} = JSON.parse(res);
    console.log(url);
    fileUrl.value = url;
    link.classList.add('active');
    

}

fileUrl.addEventListener('click', () => {
    fileUrl.select();
});