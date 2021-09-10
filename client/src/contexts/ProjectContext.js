import React, { createContext, useReducer, useEffect } from 'react'
import axios from 'axios';
import { apiUrl } from './constant';
import { projectReducer } from 'reducers/projectReducer';

export const ProjectContext = createContext();
export default function ProjectProvider({ children }) {
  
  const [projectState, dispatch] = useReducer(projectReducer, {
    project: [],
    loading:true
  })

  const getAllProject = async () => {
    try {
      const response = await axios.get(`${apiUrl}/project`);
      if (response.data.success) {
        dispatch({
          type: 'PROJECT_LOAD_SUCCESS',
          payload: response.data.data
        })
      }
    } catch (error) {
      if (error.response.data) console.log(error.response.data);
      else console.log("something wrong!");
    }
    
  }

  const addProject = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/project`, data);
      if (response.data.success) {
        return response.data
      }
    } catch (error) {
      if (error.response.data) console.log(error.response.data);
      else return { success: false, message: 'something wrong' };
    }
    
  }

  const updateProject = async (id,data) => {
    try {
      const response = await axios.put(`${apiUrl}/project/${id}`, data);
      if (response.data.success) {
        return response.data
      }
    } catch (error) {
      if (error.response.data) console.log(error.response.data);
      else return { success: false, message: 'something wrong' };
    }

  }

  return (
    <ProjectContext.Provider value={{ projectState, getAllProject, addProject, updateProject }}>{children}</ProjectContext.Provider>
  )
}
