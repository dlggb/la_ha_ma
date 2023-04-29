import axios from "axios";
console.log(222222222222);
const http = axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  baseURL: "https://aip.baidubce.com/rest/2.0/ocr/v1/doc_analysis_office?",
  timeout: 10000,
});
export default http;
