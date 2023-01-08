import{u as p,r as f,a as e,F as h,j as a}from"./app.09040f3b.js";import{B as w}from"./Button.536e295b.js";import{I as m}from"./Input.200ab06f.js";import{I as n}from"./InputError.8026f664.js";import{L as t}from"./Label.a0fe2014.js";function k(){const{data:l,setData:i,post:c,processing:d,errors:r,reset:u}=p({name:"",email:"",role:"",password:"",password_confirmation:""});f.exports.useEffect(()=>()=>{u("password","password_confirmation")},[]);const o=s=>{i(s.target.name,s.target.type==="checkbox"?s.target.checked:s.target.value)};return console.log(r),e(h,{children:a("form",{onSubmit:s=>{s.preventDefault(),c(route("register"))},children:[a("div",{children:[e(t,{forInput:"name",value:"Name"}),e(m,{type:"text",name:"name",value:l.name,className:"mt-1 block w-full",autoComplete:"name",isFocused:!0,handleChange:o,required:!0}),e(n,{message:r.name,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(t,{forInput:"email",value:"Email"}),e(m,{type:"email",name:"email",value:l.email,className:"mt-1 block w-full",autoComplete:"email",handleChange:o,required:!0}),e(n,{message:r.email,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(t,{forInput:"role",value:"Role"}),a("select",{name:"role",id:"role",className:"block w-full mt-1 rounded-md",onChange:o,children:[e("option",{children:"Select Account Role"}),e("option",{value:"user",children:"User"}),e("option",{value:"admin",children:"Admin"})]})]}),a("div",{className:"mt-4",children:[e(t,{forInput:"password",value:"Password"}),e(m,{type:"password",name:"password",value:l.password,className:"mt-1 block w-full",autoComplete:"new-password",handleChange:o,required:!0}),e(n,{message:r.password,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(t,{forInput:"password_confirmation",value:"Confirm Password"}),e(m,{type:"password",name:"password_confirmation",value:l.password_confirmation,className:"mt-1 block w-full",handleChange:o,required:!0}),e(n,{message:r.password_confirmation,className:"mt-2"})]}),e("div",{className:"flex items-center justify-end mt-4",children:e(w,{className:"ml-4",processing:d,children:"Register"})})]})})}export{k as default};
