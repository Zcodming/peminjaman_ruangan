import{u as f,r as p,a as e,F as w,j as r}from"./app.c5fb3a84.js";import{B as n}from"./Button.8a319494.js";import{I as m}from"./Input.5cae6208.js";import{L as l}from"./Label.97d42be9.js";function x(a){const{data:u,setData:i,post:d,processing:c,errors:h,reset:o}=f({name:a.user.name,email:a.user.email,role:a.user.role,password:a.user.password,password_confirmation:""});p.exports.useEffect(()=>()=>{o("password","password_confirmation")},[]);const t=s=>{i(s.target.name,s.target.type==="checkbox"?s.target.checked:s.target.value)};return e(w,{children:r("form",{onSubmit:s=>{s.preventDefault(),d(`update/${$props.id}`,u,{forceFormData:!0,onSuccess:()=>o()})},children:[r("div",{children:[e(l,{forInput:"name",value:"Name"}),e(m,{type:"text",name:"name",value:a.user.name,className:"mt-1 block w-full",autoComplete:"name",isFocused:!0,handleChange:t,required:!0})]}),r("div",{className:"mt-4",children:[e(l,{forInput:"email",value:"Email"}),e(m,{type:"email",name:"email",value:a.user.email,className:"mt-1 block w-full",autoComplete:"email",handleChange:t,required:!0})]}),r("div",{className:"mt-4",children:[e(l,{forInput:"password",value:"Password"}),e(m,{type:"password",name:"password",value:a.user.password,className:"mt-1 block w-full",autoComplete:"new-password",handleChange:t,required:!0})]}),r("div",{className:"mt-4",children:[e(l,{forInput:"password_confirmation",value:"Confirm Password"}),e(m,{type:"password",name:"password_confirmation",value:a.user.password_confirmation,className:"mt-1 block w-full",handleChange:t,required:!0})]}),r("div",{className:"flex items-center justify-between mt-4",children:[e(n,{className:"ml-4 bg-red-600",children:"Batal"}),e(n,{className:"ml-4",type:"submit",processing:c,children:"Edit"})]})]})})}export{x as default};