import{u as f,r as g,j as s,a as e,H as h}from"./app.09040f3b.js";import{B as w}from"./Button.536e295b.js";import{G as b}from"./Guest.78e786b7.js";import{I as l}from"./Input.200ab06f.js";import{I as n}from"./InputError.8026f664.js";import{L as i}from"./Label.a0fe2014.js";import"./ApplicationLogo.9e12ab1f.js";function E({status:t,canResetPassword:x}){const{data:r,setData:c,post:u,processing:d,errors:m,reset:p}=f({email:"",password:"",remember:""});g.exports.useEffect(()=>()=>{p("password")},[]);const o=a=>{c(a.target.name,a.target.type==="checkbox"?a.target.checked:a.target.value)};return s(b,{children:[e(h,{title:"Log in"}),t&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:t}),s("form",{onSubmit:a=>{a.preventDefault(),u(route("login"))},children:[s("div",{children:[e(i,{forInput:"email",value:"Email"}),e(l,{type:"text",name:"email",value:r.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,handleChange:o}),e(n,{message:m.email,className:"mt-2"})]}),s("div",{className:"mt-4",children:[e(i,{forInput:"password",value:"Password"}),e(l,{type:"password",name:"password",value:r.password,className:"mt-1 block w-full",autoComplete:"current-password",handleChange:o}),e(n,{message:m.password,className:"mt-2"})]}),e("div",{className:"flex items-center justify-end mt-4",children:e(w,{className:"ml-4",processing:d,children:"Log in"})})]})]})}export{E as default};
