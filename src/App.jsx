import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { QueryClient,useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Formsection } from './components/Formsection'

const fetchdata = async () =>{
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return res.data;
}

const createpost = async (newpost) =>{
  const res= await axios.post('https://jsonplaceholder.typicode.com/posts',newpost);
  return res.data;
}



function App() {

  const { data, isError, isLoading, error } = useQuery({
    queryKey:['posts'],
    queryFn:fetchdata,
  })

  const queryClient= useQueryClient();

  const mutation = useMutation({
    mutationFn: createpost,
    onSuccess:(data) =>{
      alert("data posted succesfully")
      console.log(title,body)
      queryClient.invalidateQueries({queryKey:['posts']})
    },
    onError:(error)=>{
      alert("error in posting");
      console.log("error in posting")
    }
  })

  const [title,settitle] = useState('')
  const [body,setbody] = useState('')

  const handlesubmit = (e) =>{
    e.preventDefault()
    mutation.mutate({title,body})
    settitle('')
    setbody('')
  }
  
  if (isLoading) return <p>isLoading data</p>

  if (isError) return <p>error in loading data {error.message}</p> 

  

  return (
    <>
    <p>hello</p>
    <h1 className='text-red-400 font-bold'>Add data to the posts</h1>
    <form className='flex justify-center items-center' action="" onSubmit={handlesubmit}>
      <input className='text-sm font-bold rounded-xl bg-black w-[250px] h-[35px] m-10' type="text" value={title} onChange={(e)=>settitle(e.target.value)} placeholder='    enter the title' />
      <input  className='text-sm font-bold rounded-xl bg-black w-[250px] h-[35px] m-10' type="text" value={body} onChange={(e)=>setbody(e.target.value)} placeholder='     enter the body (data) ' />
      <button className="rounded-lg border border-transparent px-5 py-2 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-300 hover:border-[#c4ff64]">
  Button
</button>
    </form>
    <div>
      <h1>fetched data</h1>
      {data.slice(1,2).map(post =>(
        <div key={post.id}>
        <h1>{post.title}</h1>
        <h1>{post.body}</h1>
        </div>
      ))}
    </div>
    <Formsection/>
    </>
  )
}

export default App
