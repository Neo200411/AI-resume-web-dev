import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  FilePenIcon,
  XIcon,
  UploadCloud,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#0284c7", "#16a34a"];
  const [allResume, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setresume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const navigate = useNavigate()

const createResume= async(event)=>{
    event.preventDefault()
    setShowCreateResume(false)
    navigate(`/app/builder/res123`)

  }

  const uploadResume = async(event)=>{
      event.preventDefault()
    setShowUploadResume(false)
    navigate(`/app/builder/res123`)

  }

  const editTitle= async(event)=>{
    event.preventDefault()
  }

   const deleteResume= async(resumeId)=>{
   const confirm =window.confirm('Are you sure you want to')
   if(confirm){
    setAllResumes(prev =>prev.filter(resume =>resume._id !==resumeId))
   }
  }

  useEffect(() => {
    setAllResumes(dummyResumeData);
  }, []);

  

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
        Welcome, Neo
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button onClick={()=>setShowCreateResume(true)} className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 hover:border-purple-500 hover:shadow-lg transition">
          <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-purple-100 to-blue-500 text-white rounded-full" />
          <p className="text-sm mt-2">Create Resume</p>
        </button>

        <button onClick={()=>setShowUploadResume(true)} className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 hover:border-purple-500 hover:shadow-lg transition">
          <UploadCloudIcon className="size-11 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />
          <p className="text-sm mt-2">Upload Existing</p>
        </button>
      </div>

      <hr className="border-slate-300 my-6 sm:w-[305px]" />

      {/* Resume Cards */}
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {allResume.map((resume, index) => {
          const baseColor = colors[index % colors.length];

          return (
            <button
              key={index} onClick={()=> navigate(`/app/builder/${resume._id}`)}
              className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg border group hover:shadow-lg transition"
              style={{
                background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                borderColor: `${baseColor}40`,
              }}
            >
              <FilePenIcon className="size-7" style={{ color: baseColor }} />

              <p className="text-sm text-center" style={{ color: baseColor }}>
                {resume.title}
              </p>

              <p
                className="absolute bottom-1 text-[11px]"
                style={{ color: baseColor }}
              >
                Updated on {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              <div onClick={e=> e.stopPropagation()} className="absolute top-1 right-1  group-hover:flex  items-center hidden">
                <TrashIcon  onClick={()=>deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                <PencilIcon onClick={()=>{setEditResumeId(resume._id); setTitle(resume.title)}} className="size-7 p-1.5 hover:bg-white/50 rounded  text-slate-700 transition-colors" />
              </div>
            </button>
          );
        })}
      </div>
{showCreateResume && (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={() => setShowCreateResume(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white p-6 rounded-lg w-[320px] shadow-xl relative"
    >
      <h2 className="text-lg font-semibold mb-4">Create Resume</h2>

      <input
        type="text"
        placeholder="Enter resume title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4 focus:ring-2 focus:ring-purple-500"
      />

      <button
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        onClick={createResume}
      >
        Create Resume
      </button>

      <XIcon
        className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-black"
        onClick={() => setShowCreateResume(false)}
      />
    </div>
  </div>
)}


{showUploadResume &&(
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={() => setShowUploadResume(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white p-6 rounded-lg w-[320px] shadow-xl relative"
    >
      <h2 className="text-lg font-semibold mb-4">Upload Resume</h2>

      <input
        type="text"
        placeholder="Enter resume title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4 focus:ring-2 focus:ring-purple-500"
      />

      <div>
        <label htmlFor="resume-input" className='block text-sm text-slate-700'>Select resume file
          <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
            {resume ?(
              <p className="text-green-700">{resume.name}</p>
            ):(

              <>
              <UploadCloud className="size-14 stroke-1"/>
              <p>Upload resume</p>
              </>
            )}
          </div>
        </label>
        <input type="file" id="resume-input" accept=".pdf" hidden
        onChange={(e)=> setresume(e.target.files[0])}/>
      </div>

      <button
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        onClick={uploadResume}
      >
        Create Resume
      </button>

      <XIcon
        className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-black"
        onClick={() => setShowUploadResume(false)}
      />
    </div>
  </div>

)}

{editResumeId && (
  <div
    onSubmit={editTitle}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={() => setEditResumeId(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white p-6 rounded-lg w-[320px] shadow-xl relative"
    >
      <h2 className="text-lg font-semibold mb-4">Edit REsume Title</h2>

      <input
        type="text"
        placeholder="Enter resume title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4 focus:ring-2 focus:ring-purple-500"
      />

      <button
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        onClick={createResume}
      >
       Update
      </button>

      <XIcon
        className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-black"
        onClick={() => {setEditResumeId(''); setTitle('')}}
      />
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;
