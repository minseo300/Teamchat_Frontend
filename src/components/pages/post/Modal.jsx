import React from 'react'
import { useNavigate } from "react-router-dom";
import { createApplicant, createParticipant, deleteApplicant, getApplicant, getCurrentPostCategory, updateCurrentCategory } from '../../../services/PostService';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../atom';
function Modal(props) {
    const navigate = useNavigate();
    const users = useRecoilValue(userState);
    const {open, close, header, postId, category, updateApplicant, getCurrentCategory} = props;

    const Register = () => {
        if(header ==="모집분야"){
            createApplicant(postId, category.toLowerCase(), users.id).then((response) => {
                if(response === 1000){
                    close();
                    navigate('/mainPage');
                }
            })
        }else if(header === "승인하기"){
            //여기 아래 category들은 신청자의 id 값
            createParticipant(postId, category).then((response) => {
                if(response === 1000){
                    updateCurrentCategory(postId, category).then((response) => {
                        if(response === 1000){
                            deleteApplicant(postId, category).then((res) => {
                                if(res === 1000) {
                                    // 승인하면 변경된 신청자 리스트 다시 GET
                                    getApplicant(postId).then((response) => {
                                        updateApplicant(response);
                                    })

                                    //모집 현황 다시 GET
                                    getCurrentPostCategory(postId).then((response) => {
                                        getCurrentCategory(response);
                                    })

                                    close();
                                }
                            })
                        }
                    })
                }
            })
        }else if(header === "거절하기"){
            //category는 유저 id값
            deleteApplicant(postId, category).then((response) => {
                if(response === 1000){
                    //거절한 후 신청자 리스트 GET
                    getApplicant(postId).then(response => {
                        updateApplicant(response);
                    })
                    close();
                }
            })
        }
    }
  return (
    <div className = {open ? 'flex justify-center animate-modalBgShow fixed inset-0 z-99 bg-gray-800 bg-opacity-60': 'hidden fixed inset-0 z-99 bg-gray-600'}>
        {open ? (
            <div className ="w-11/12 max-w-2xl m-auto border rounded-md bg-white overflow-hidden">
                <div className='flex relative p-4 bg-white font-bold'>
                    {header}
                    <button className='close absolute top-4 right-4 w-8 text-xl font-bold text-center bg-sky-100 border rounded-md text-black' onClick = {close}>
                        &times;
                    </button>
                </div>
                <div className ="p-4 border-y border-y-fuchsia-300">{props.children}</div>
                <div className ="p-3 text-right">
                    <button className='p-2 bg-sky-100 border rounded-md text-sm' onClick={() => {Register();}}>
                        예
                    </button>
                </div>
            </div>
        ) : null}
    </div>
  );
};

export default Modal