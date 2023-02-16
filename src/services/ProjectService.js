import axios from 'axios';
import { CHATTING } from './ChattingService';

// 프로젝트의 모든 파일 가져오기
export async function getAllFiles(roomId){
    const response=await axios.get(`http://210.109.61.15:8080/chat/file/${roomId}`);
    console.log("response",response);
    // const lastReadNum=await axios.get(`/api/member/${memberId}/`)
    return response;
}