const { default: axios } = require("axios");

  async function compareFileData(file1url, file2Url){
     console.log('before file 1')

    const file1 =   axios.get(file1url);
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('after file 1')
    const file2 =   axios.get(file2Url);
    console.log('after file 2')
    

    //compare and write on console

    if(JSON.stringify(file1.data) === JSON.stringify(file2.data)){
        console.log(`${file1url} equals ${file2Url}`);
    }
    else{
        console.log(`${file1url} not equals ${file2Url}`);
    }

}

compareFileData("https://reqres.in/api/users?page=1", "https://reqres.in/api/users?page=2");
