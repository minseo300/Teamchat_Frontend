import React from 'react'
import { useState, useEffect } from 'react';
import { getProject } from '../../../services/PostService';
import Sidebar from '../../route/Sidebar';
import PostList from './PostList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../../atom';
function ProjectManage() {
  
    const users = useRecoilValue(userState);
    const [myProjectList, setMyProjectList] = useState([]);

    useEffect(()=> {
       getProject(users.id).then((response) => {
        setMyProjectList(response);
       })
    }, [])

  return (
    <>
      <Sidebar />
      <div className="mx-auto mr-72 max-w-5xl px-4 sm:px-6 my-10 border-4 border-sky-200 rounded-2xl">
          <p className="text-2xl font-bold text-gray-900 m-4">참여중인 프로젝트</p>
          <div className="grid grid-cols-3 gap-y-4 h-3/6 overflow-auto"> {myProjectList && <PostList postList = {myProjectList} type={"ongoing"}/>} </div>
          <hr className="h-px my-4 border-2 border-indigo-100"></hr>

          <p className="text-2xl font-bold text-gray-900 m-4">완료된 프로젝트</p>
          <div className="mb-4 grid grid-cols-3 h-3/6 gap-y-4 gap-x-4 overflow-auto"> {myProjectList && <PostList postList = {myProjectList} type={"completed"}/>}  </div>
      </div>
    </>
  )
}

export default ProjectManage