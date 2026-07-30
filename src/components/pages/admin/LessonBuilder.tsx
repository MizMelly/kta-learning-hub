import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Video,
  FileText,
  Headphones,
  ClipboardList,
  MessageCircle,
  Star,
  Settings,
  Upload,
  Loader2,
  CheckCircle2,
  Save,
  Eye,
  Globe,
  Lock,
} from "lucide-react";

import apiRequest, {
  API_BASE,
  getToken,
} from "../../../services/api";



type Resource = {
  name: string;
  url: string;
};


type UploadType = "video" | "audio" | "resource";


type LessonInfo = {
  title: string;
  description: string;
  estimatedDurationMinutes: number | string;
  orderIndex: number | string;
};


type LessonData = {
  title?: string;
  description?: string;
  estimatedDurationMinutes?: number;
  orderIndex?: number;

  videoUrl?: string;
  lessonNotes?: string;
  downloadableResourceUrls?: string;

  audioUrl?: string;

  hasAssignment?: boolean;
  assignmentTitle?: string;
  assignmentInstructions?: string;
  assignmentSubmissionType?: string;

  enableReflection?: boolean;
  allowTextReflection?: boolean;
  allowVoiceReflection?: boolean;
  allowDocumentReflection?: boolean;

  enableDiscussion?: boolean;
  allowReplies?: boolean;
  allowLikes?: boolean;

  enableRating?: boolean;

  status?: string;
};


const TABS = [
  { id:"info", label:"Info", icon:FileText },
  { id:"content", label:"Content", icon:FileText },
  { id:"audio", label:"Audio", icon:Headphones },
  { id:"assignment", label:"Assignment", icon:ClipboardList },
  { id:"reflection", label:"Reflection", icon:MessageCircle },
  { id:"community", label:"Community", icon:MessageCircle },
  { id:"rating", label:"Rating", icon:Star },
  { id:"publish", label:"Publish", icon:Settings },
];


export default function LessonBuilder(){


const {lessonId}=useParams<{lessonId:string}>();

const navigate=useNavigate();


const [,setLesson]=useState<LessonData|null>(null);

const [loading,setLoading]=useState(true);

const [saving,setSaving]=useState(false);

const [activeTab,setActiveTab]=useState("info");

const [saveSuccess,setSaveSuccess]=useState(false);

const [error,setError]=useState("");



const [info,setInfo]=useState<LessonInfo>({
 title:"",
 description:"",
 estimatedDurationMinutes:0,
 orderIndex:1
});



const [content,setContent]=useState({
 videoUrl:"",
 lessonNotes:"",
 downloadableResourceUrls:""
});



const [resourcesList,setResourcesList]=useState<Resource[]>([]);



const [audio,setAudio]=useState({
 audioUrl:""
});



const [assignment,setAssignment]=useState({
 hasAssignment:false,
 assignmentTitle:"",
 assignmentInstructions:"",
 submissionType:"Both"
});



const [reflection,setReflection]=useState({
 enableReflection:false,
 allowTextReflection:true,
 allowVoiceReflection:true,
 allowDocumentReflection:true
});


const [community,setCommunity]=useState({
 enableDiscussion:true,
 allowReplies:true,
 allowLikes:true
});


const [rating,setRating]=useState({
 enableRating:true
});


const [publishStatus,setPublishStatus]=useState("draft");



const videoInputRef=useRef<HTMLInputElement|null>(null);
const audioInputRef=useRef<HTMLInputElement|null>(null);
const resourceInputRef = useRef<HTMLInputElement | null>(null);



const [uploading,setUploading]=useState({
 video:false,
 audio:false,
 resource:false
});


const [uploadProgress,setUploadProgress]=useState({
 video:0,
 audio:0,
 resource:0
});



const fetchLesson=useCallback(async()=>{


try{


setLoading(true);


const data = await apiRequest(
 `/lessons/${lessonId}`
) as LessonData;



setLesson(data);



setInfo({

title:data.title ?? "",

description:data.description ?? "",

estimatedDurationMinutes:
data.estimatedDurationMinutes ?? 0,

orderIndex:
data.orderIndex ?? 1

});



setContent({

videoUrl:data.videoUrl ?? "",

lessonNotes:data.lessonNotes ?? "",

downloadableResourceUrls:
data.downloadableResourceUrls ?? ""

});



try{

const parsed =
data.downloadableResourceUrls
?
JSON.parse(data.downloadableResourceUrls)
:
[];


setResourcesList(
Array.isArray(parsed)
?
parsed
:
[]
);


}catch{

setResourcesList([]);

}




setAudio({

audioUrl:data.audioUrl ?? ""

});



setAssignment({

hasAssignment:
data.hasAssignment ?? false,

assignmentTitle:
data.assignmentTitle ?? "",

assignmentInstructions:
data.assignmentInstructions ?? "",

submissionType:
data.assignmentSubmissionType ?? "Both"

});



setReflection({

enableReflection:
data.enableReflection ?? false,

allowTextReflection:
data.allowTextReflection !== false,

allowVoiceReflection:
data.allowVoiceReflection ?? false,

allowDocumentReflection:
data.allowDocumentReflection ?? false

});



setCommunity({

enableDiscussion:
data.enableDiscussion !== false,

allowReplies:
data.allowReplies !== false,

allowLikes:
data.allowLikes !== false

});



setRating({

enableRating:
data.enableRating !== false

});



setPublishStatus(
(data.status ?? "draft").toLowerCase()
);



}catch(err){


setError(
err instanceof Error
?
err.message
:
"Failed to load lesson"
);


}finally{


setLoading(false);


}


},[lessonId]);

useEffect(() => {

  let mounted = true;

  const loadLesson = async () => {
    if (!mounted) return;
    await fetchLesson();
  };

  loadLesson();

  return () => {
    mounted = false;
  };

}, [fetchLesson]);


const handleFileUpload = async(
  file:File,
  type:UploadType
):Promise<string|null>=>{


if(!file) return null;


const uploadType =
type==="resource"
?
"document"
:
type;



const baseUrl =
API_BASE ||
"https://kta-learning-hub-api.onrender.com/api";



setUploading(prev=>({
...prev,
[type]:true
}));


setUploadProgress(prev=>({
...prev,
[type]:0
}));



try{


const token=getToken();



return await new Promise<string|null>((resolve,reject)=>{


const xhr=new XMLHttpRequest();



xhr.upload.addEventListener(
"progress",
(event)=>{

if(event.lengthComputable){

const percent=Math.round(
(event.loaded/event.total)*100
);


setUploadProgress(prev=>({

...prev,

[type]:percent

}));

}

}
);



xhr.onload=()=>{


if(xhr.status>=200 && xhr.status<300){


try{


const response =
JSON.parse(xhr.responseText);



const data: Record<string, unknown> =
  (response.data ?? response) as Record<string, unknown>;



let url:string|null = null;



if(typeof data==="string"){

url=data;

}

else if(typeof data==="object"){

url = 
  typeof data.fileUrl === "string"
    ? data.fileUrl
    : typeof data.url === "string"
      ? data.url
      : null;
}

if(
url &&
url.startsWith("/")
){

url =
baseUrl.replace("/api","")
+
url;

}



resolve(url);



}catch{

resolve(null);

}


}else{


reject(
new Error(
`Upload failed ${xhr.status}`
)
);


}


};



xhr.onerror=()=>{

reject(
new Error("Network error")
);

};



xhr.open(
"POST",
`${baseUrl}/files/upload/${uploadType}`
);



if(token){

xhr.setRequestHeader(
"Authorization",
`Bearer ${token}`
);

}



const formData=new FormData();


formData.append(
"file",
file
);



xhr.send(formData);



});


}catch(err){


alert(
err instanceof Error
?
err.message
:
"Upload failed"
);


return null;


}finally{


setUploading(prev=>({

...prev,

[type]:false

}));

}


};






const onVideoSelect = async(
e:React.ChangeEvent<HTMLInputElement>
)=>{


const file=e.target.files?.[0];

if(!file)return;



const url =
await handleFileUpload(
file,
"video"
);



if(url){

setContent(prev=>({

...prev,

videoUrl:url

}));

}


};






const onAudioSelect = async(
e:React.ChangeEvent<HTMLInputElement>
)=>{


const file=e.target.files?.[0];

if(!file)return;



const url =
await handleFileUpload(
file,
"audio"
);



if(url){

setAudio({

audioUrl:url

});

}


};






const onResourceSelect = async(
e:React.ChangeEvent<HTMLInputElement>
)=>{


const file=e.target.files?.[0];

if(!file)return;



const url =
await handleFileUpload(
file,
"resource"
);



if(url){


const updatedList=[

...resourcesList,

{

name:file.name,

url

}

];



setResourcesList(updatedList);



setContent(prev=>({

...prev,

downloadableResourceUrls:
JSON.stringify(updatedList)

}));


}


};

const showSuccess=()=>{


setSaveSuccess(true);


setTimeout(()=>{

setSaveSuccess(false);

},2000);


};






const saveInfo=async()=>{


setSaving(true);


try{


await apiRequest(
`/lessons/${lessonId}`,
{

method:"PUT",

body:{

title:info.title,

description:info.description,

estimatedDurationMinutes:
Number(info.estimatedDurationMinutes)||0,

orderIndex:
Number(info.orderIndex)||1

}

}
);


showSuccess();



}catch(err){


setError(

err instanceof Error
?
err.message
:
"Failed to save lesson info"

);


}finally{


setSaving(false);


}


};






const saveContent=async()=>{


setSaving(true);


try{


await apiRequest(
`/lessons/${lessonId}/content`,
{

method:"PUT",

body:{

videoUrl:
content.videoUrl || "",

lessonNotes:
content.lessonNotes || "",

downloadableResourceUrls:
content.downloadableResourceUrls || ""

}

}
);


showSuccess();



}catch(err){


setError(

err instanceof Error
?
err.message
:
"Failed to save content"

);


}finally{


setSaving(false);


}


};






const saveAudio=async()=>{


setSaving(true);


try{


await apiRequest(
`/lessons/${lessonId}/audio`,
{

method:"PUT",

body:{

audioUrl:
audio.audioUrl || ""

}

}
);



showSuccess();



}catch(err){


setError(

err instanceof Error
?
err.message
:
"Failed to save audio"

);


}finally{


setSaving(false);


}


};






const saveAssignment=async()=>{


setSaving(true);


try{


await apiRequest(
`/lessons/${lessonId}/assignment`,
{

method:"PUT",

body:{

hasAssignment:
assignment.hasAssignment,

assignmentTitle:
assignment.assignmentTitle,

assignmentInstructions:
assignment.assignmentInstructions,

submissionType:
assignment.submissionType

}

}
);



showSuccess();



}catch(err){


setError(

err instanceof Error
?
err.message
:
"Failed to save assignment"

);


}finally{


setSaving(false);


}


};
const saveReflection=async()=>{


setSaving(true);


try{


await apiRequest(
`/lessons/${lessonId}/reflection`,
{

method:"PUT",

body:{

enableReflection:
reflection.enableReflection,

allowTextReflection:
reflection.allowTextReflection,

allowVoiceReflection:
reflection.allowVoiceReflection,

allowDocumentReflection:
reflection.allowDocumentReflection

}

}
);



showSuccess();



}catch(err){


setError(

err instanceof Error
?
err.message
:
"Failed to save reflection"

);


}finally{


setSaving(false);


}


};






const saveCommunity=async()=>{


setSaving(true);


try{


await apiRequest(
`/lessons/${lessonId}/community`,
{

method:"PUT",

body:{

enableDiscussion:
community.enableDiscussion,

allowReplies:
community.allowReplies,

allowLikes:
community.allowLikes

}

}
);



showSuccess();



}catch(err){


setError(

err instanceof Error
?
err.message
:
"Failed to save community settings"

);


}finally{


setSaving(false);


}


};






const saveRating=async()=>{


setSaving(true);


try{


await apiRequest(
`/lessons/${lessonId}/rating-settings`,
{

method:"PUT",

body:{

enableRating:
rating.enableRating

}

}
);



showSuccess();



}catch(err){


setError(

err instanceof Error
?
err.message
:
"Failed to save rating settings"

);


}finally{


setSaving(false);


}


};






const handlePublish=async(
status:"draft"|"preview"|"published"
)=>{


setSaving(true);



try{


const capitalizedStatus =
status.charAt(0).toUpperCase()
+
status.slice(1);



await apiRequest(
`/lessons/${lessonId}/publish`,
{

method:"PUT",

body:{

Status:
capitalizedStatus

}

}
);



setPublishStatus(status);



showSuccess();



}catch(err){


setError(

err instanceof Error
?
err.message
:
"Failed to update publish status"

);


}finally{


setSaving(false);


}


};






if(loading){

return(

<div className="min-h-screen bg-slate-50 flex items-center justify-center">

<Loader2
size={40}
className="animate-spin text-[#0F2D52]"
/>

</div>

);

}




return(

<div className="min-h-screen bg-slate-50">



{saveSuccess && (

<div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl z-50 flex items-center gap-2">

<CheckCircle2 size={18}/>

Saved successfully

</div>

)}





<div className="bg-white border-b border-slate-200 px-6 py-4">


<div className="max-w-6xl mx-auto">


<div className="flex items-center gap-4 mb-4">


<button

onClick={()=>navigate("/admin/courses")}

className="p-2 hover:bg-slate-100 rounded-xl"

>

<ArrowLeft size={20}/>

</button>




<div className="flex-1">

<h1 className="text-2xl font-bold text-[#0B1F3A]">

{info.title || "Untitled Lesson"}

</h1>


<p className="text-sm text-slate-400">

Lesson Builder -

{
publishStatus==="published"
?
"Published"
:
publishStatus==="draft"
?
"Draft"
:
"Preview"
}

</p>


</div>



<span

className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1

${
publishStatus==="published"
?
"bg-green-50 text-green-600"
:
publishStatus==="draft"
?
"bg-amber-50 text-amber-600"
:
"bg-blue-50 text-blue-600"
}

`}

>


{
publishStatus==="published"

?

<>

<Globe size={12}/>
Published

</>

:

publishStatus==="draft"

?

<>

<Lock size={12}/>
Draft

</>

:

<>

<Eye size={12}/>
Preview

</>

}


</span>



</div>





<div className="flex gap-2 overflow-x-auto">


{
TABS.map(tab=>{


const Icon=tab.icon;


return(

<button

key={tab.id}

onClick={()=>setActiveTab(tab.id)}

className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium

${
activeTab===tab.id

?

"bg-[#0F2D52] text-white"

:

"text-slate-600 hover:bg-slate-100"

}

`}

>

<Icon size={16}/>

{tab.label}

</button>

)

})

}


</div>


</div>


</div>





<div className="max-w-6xl mx-auto px-6 py-6">


{error && (

<div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-xl">

{error}

</div>

)}




{/* Your existing TAB JSX starts here */}
{/* INFO TAB */}

{activeTab==="info" && (

<div className="space-y-6">


<div className="bg-white rounded-2xl border border-slate-200 p-6">


<h2 className="text-lg font-bold text-[#0B1F3A] mb-5">
Lesson Information
</h2>



<div className="space-y-4">


<input

value={info.title}

onChange={(e)=>
setInfo({
...info,
title:e.target.value
})
}

className="w-full border rounded-xl p-3"

placeholder="Lesson title"

/>



<textarea

rows={5}

value={info.description}

onChange={(e)=>
setInfo({
...info,
description:e.target.value
})
}

className="w-full border rounded-xl p-3"

placeholder="Lesson description"

/>



<div className="grid grid-cols-2 gap-4">


<input

type="number"

value={info.estimatedDurationMinutes}

onChange={(e)=>
setInfo({
...info,
estimatedDurationMinutes:e.target.value
})
}

className="border rounded-xl p-3"

placeholder="Duration"

/>



<input

type="number"

value={info.orderIndex}

onChange={(e)=>
setInfo({
...info,
orderIndex:e.target.value
})
}

className="border rounded-xl p-3"

placeholder="Order"

/>


</div>


</div>


</div>



<button

onClick={saveInfo}

disabled={saving}

className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl flex items-center gap-2"

>

{
saving
?
<Loader2 className="animate-spin"/>
:
<Save/>
}

Save Info

</button>


</div>

)}






{/* CONTENT TAB */}

{activeTab==="content" && (

<div className="space-y-6">


<div className="bg-white rounded-2xl border p-6">


<h2 className="font-bold flex gap-2 items-center mb-5">

<Video size={20}/>

Video Lesson

</h2>



<input

type="file"

accept="video/*"

ref={videoInputRef}

onChange={onVideoSelect}

className="hidden"

/>



{
content.videoUrl

?

<video

src={content.videoUrl}

controls

className="w-full rounded-xl"

/>


:

<button

onClick={()=>videoInputRef.current?.click()}

disabled={uploading.video}

className="w-full border-2 border-dashed rounded-xl p-10"

>


{
uploading.video

?

`Uploading ${uploadProgress.video}%`

:

<>

<Upload/>

Upload Video

</>

}


</button>


}



</div>




<div className="bg-white rounded-2xl border p-6">


<textarea

rows={10}

value={content.lessonNotes}

onChange={(e)=>
setContent({
...content,
lessonNotes:e.target.value
})
}

className="w-full border rounded-xl p-4"

placeholder="Lesson notes"

/>
<div className="bg-white rounded-2xl border p-6">
  <h2 className="font-bold mb-4">Resources</h2>

  <input
    type="file"
    ref={resourceInputRef}
    onChange={onResourceSelect}
    className="hidden"
  />

  <button
    type="button"
    onClick={() => resourceInputRef.current?.click()}
    className="flex items-center gap-2 border rounded-xl px-4 py-3"
  >
    <Upload size={18} />
    Add Resource
  </button>

  <div className="mt-4 space-y-2">
    {resourcesList.map((resource, index) => (
      <div
        key={index}
        className="flex items-center justify-between rounded-lg border p-3"
      >
        <span>{resource.name}</span>
      </div>
    ))}
  </div>
</div>

</div>



<button

onClick={saveContent}

disabled={saving}

className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl"

>

<Save size={18}/>

Save Content

</button>


</div>

)}


{/* AUDIO TAB */}

{activeTab==="audio" && (

<div className="space-y-6">


<div className="bg-white rounded-2xl border p-6">


<h2 className="font-bold flex gap-2 mb-5">

<Headphones/>

Audio Lesson

</h2>



<input

type="file"

accept="audio/*"

ref={audioInputRef}

onChange={onAudioSelect}

className="hidden"

/>



{
audio.audioUrl

?

<audio

src={audio.audioUrl}

controls

className="w-full"

/>


:

<button

onClick={()=>audioInputRef.current?.click()}

className="border-2 border-dashed p-10 w-full rounded-xl"

>

<Upload/>

Upload Audio

</button>

}


</div>



<button

onClick={saveAudio}

className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl"

>

Save Audio

</button>


</div>

)}


{/* ASSIGNMENT TAB */}

{activeTab==="assignment" && (

<div className="space-y-6">


<div className="bg-white rounded-2xl border p-6">


<label className="flex gap-2 items-center">


<input

type="checkbox"

checked={assignment.hasAssignment}

onChange={(e)=>
setAssignment({
...assignment,
hasAssignment:e.target.checked
})
}

/>

Enable Assignment

</label>



{assignment.hasAssignment && (

<>


<input

value={assignment.assignmentTitle}

onChange={(e)=>
setAssignment({
...assignment,
assignmentTitle:e.target.value
})
}

className="w-full border rounded-xl p-3 mt-4"

placeholder="Assignment title"

/>



<textarea

value={assignment.assignmentInstructions}

onChange={(e)=>
setAssignment({
...assignment,
assignmentInstructions:e.target.value
})
}

className="w-full border rounded-xl p-3 mt-4"

/>


</>

)}


</div>



<button

onClick={saveAssignment}

className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl"

>

Save Assignment

</button>


</div>

)}






{/* REFLECTION TAB */}

{activeTab==="reflection" && (

<div className="space-y-6">


<div className="bg-white rounded-2xl border p-6">


<label className="flex gap-2">


<input

type="checkbox"

checked={reflection.enableReflection}

onChange={(e)=>
setReflection({
...reflection,
enableReflection:e.target.checked
})
}

/>

Enable Reflection

</label>


</div>



<button

onClick={saveReflection}

className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl"

>

Save Reflection

</button>


</div>

)}






{/* COMMUNITY TAB */}

{activeTab==="community" && (

<div className="space-y-6">


<div className="bg-white rounded-2xl border p-6">


<label className="flex gap-2">


<input

type="checkbox"

checked={community.enableDiscussion}

onChange={(e)=>
setCommunity({
...community,
enableDiscussion:e.target.checked
})
}

/>

Enable Discussion

</label>


</div>



<button

onClick={saveCommunity}

className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl"

>

Save Community

</button>


</div>

)}






{/* RATING TAB */}

{activeTab==="rating" && (

<div className="space-y-6">


<div className="bg-white rounded-2xl border p-6">


<label className="flex gap-2">


<input

type="checkbox"

checked={rating.enableRating}

onChange={(e)=>
setRating({
...rating,
enableRating:e.target.checked
})
}

/>

Enable Rating

</label>


</div>



<button

onClick={saveRating}

className="bg-[#0F2D52] text-white px-8 py-3 rounded-xl"

>

Save Rating

</button>


</div>

)}






{/* PUBLISH TAB */}

{activeTab==="publish" && (

<div className="space-y-4">


{
[
"draft",
"preview",
"published"
].map(status=>(


<button

key={status}

onClick={()=>handlePublish(
status as "draft"|"preview"|"published"
)}

className="w-full border rounded-xl p-4 text-left"

>

{status}

</button>


))

}


</div>

)}






</div>


</div>


);

}
