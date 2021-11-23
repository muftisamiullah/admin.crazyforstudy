let API_URL='';
let s3Path='';
if(process.env.NODE_ENV === 'production'){
    API_URL = 'https://admin.crazyforstudy.com/api/v1/';
    s3Path = "https://crazyforstudy.s3.ap-south-1.amazonaws.com/uploads/";
}else{
    API_URL = 'http://localhost:3000/api/v1/'
    s3Path = "https://crazyforstudy.s3.ap-south-1.amazonaws.com/uploads/";
}
export { API_URL, s3Path };
