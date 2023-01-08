import{u as j,R as t,r as o,j as n,F as C,a as e,L as A}from"./app.09040f3b.js";import{F as s,f as L,e as M,g as D}from"./index.61c39fa1.js";import{M as P}from"./ModalEdit.bd3bcb67.js";import"./index.df37137f.js";function O(m){const{data:d,setData:r,key:T,post:h,progress:I,processing:g,errors:K,reset:x}=j({kode_ruangan:null,nama_ruangan:null,foto_ruangan:[],preserveScroll:!0});function f(a){r("foto_ruangan",a.target.files[0]),img.src=URL.createObjectURL(a.target.files[0])}function p(a){a.preventDefault(),console.log("File data",d),h(route("ruangan.store"),d,{forceFormData:!0,onSuccess:()=>x()}),l(U=>!1)}const[b,c]=t.useState(!1),[w,N]=t.useState(null),[y,v]=t.useState(null),[_,k]=t.useState(null),[R,S]=t.useState(null),[i,l]=o.exports.useState(!1),u=o.exports.useRef(null),F=o.exports.useRef(null);return n(C,{children:[n("div",{className:"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white",children:[n("div",{className:"rounded-t mb-0 px-4 py-3 border-0",children:[e("div",{className:"flex flex-wrap",children:e("div",{className:"relative w-full px-4 max-w-full flex-grow flex-1",children:e("h3",{className:"font-semibold text-lg text-blueGray-700",children:"Kelola Ruangan"})})}),e("div",{className:"flex flex-wrap",children:e("div",{className:"relative w-full px-4 max-w-full flex-grow flex-1",ref:u,children:i?e("button",{className:"bg-green-400 text-white hover:bg-green-500 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear",onClick:()=>l(a=>!1),children:e(s,{icon:L})}):e("button",{className:"bg-green-400 text-white hover:bg-green-500 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear",onClick:()=>l(a=>!a),children:"Tambah Ruangan"})})})]}),e("div",{className:"block w-full overflow-x-auto",ref:u,children:i?e("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:e("div",{className:"p-6 bg-white border-b border-gray-200",children:n("form",{onSubmit:p,encType:"multipart/form-data",children:[e("input",{type:"hidden",name:"_token",value:"{{ csrf_token() }}"}),n("div",{className:"mb-4",children:[n("label",{className:"text-xl text-gray-600",htmlFor:"kode_ruangan",children:["Kode Ruangan",e("span",{className:"text-red-500",children:"*"})]}),e("br",{}),e("input",{type:"text",id:"kode_ruangan",name:"kode_ruangan",className:"border-2 border-gray-300 p-2 w-full",onChange:a=>r("kode_ruangan",a.target.value)})]}),n("div",{className:"mb-4",children:[n("label",{className:"text-xl text-gray-600",htmlFor:"nama_ruangan",children:["Nama Ruangan",e("span",{className:"text-red-500",children:"*"})]}),e("br",{}),e("input",{type:"text",id:"nama_ruangan",name:"nama_ruangan",className:"border-2 border-gray-300 p-2 w-full",onChange:a=>r("nama_ruangan",a.target.value)})]}),n("div",{children:[e("label",{className:"text-xl text-gray-600",children:"Foto Ruangan"}),e("div",{className:"mb-4 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md",children:n("div",{className:"space-y-1 text-center",children:[e("div",{className:"text-sm text-gray-600",children:n("label",{htmlFor:"foto_ruangan",className:"cursor-pointer bg-indigo-600 rounded-md font-medium text-white hover:text-gray-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500",children:[e("span",{children:"Upload a file"}),e("input",{type:"file",id:"foto_ruangan",onChange:f,className:"sr-only"})]})}),e("p",{className:"text-xs",children:"PDF maksimal 2MB"}),e("img",{src:"",id:"img",alt:"img",className:"rounded-md"})]})})]}),e("div",{className:"flex p-1",children:e("button",{type:"submit",disabled:g,className:"p-3 bg-blue-500 text-white hover:bg-blue-400",children:"Submit"})})]})})}):n("table",{className:"min-w-max w-full table-fixed",ref:F,children:[e("thead",{children:n("tr",{className:"bg-gray-200 text-gray-600 uppercase text-sm leading-normal",children:[e("th",{className:"py-3 px-5 text-center mx-auto ",children:"Foto Ruangan"}),e("th",{className:"py-3 px-5 text-center mx-auto",children:"Kode Ruangan"}),e("th",{className:"py-3 px-5 text-center max-w-md mx-auto",children:"Nama Ruangan"}),e("th",{className:"py-3 px-5 text-center mx-auto ",children:"Actions"})]})}),e("tbody",{className:"text-gray-600 text-sm font-light",children:m.data.map(a=>n("tr",{className:"border-b border-gray-200 hover:bg-gray-100",children:[e("td",{className:"py-3 px-5 w-30 objects-center",children:e("img",{src:"/storage/img/"+a.foto_ruangan,style:{height:"120px"},alt:"foto ruangan",className:"rounded"})}),e("td",{className:"py-3 px-5 text-center ",children:e("span",{children:a.kode_ruangan})}),e("td",{className:"py-3 px-5 text-center ",children:e("span",{children:a.nama_ruangan})}),n("td",{className:"py-3 px-5",children:[e("button",{type:"button",className:"bg-yellow-300 text-white hover:bg-yellow-400 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear",onClick:()=>{c(!0),N(a.id),v(a.kode_ruangan),k(a.nama_ruangan),S(a.foto_ruangan)},children:e(s,{icon:M})}),e(P,{onClose:()=>c(!1),showModal:b,showId:w,showCode:y,showName:_,showPicture:R}),e(A,{as:"button",href:route("delete",a.id),className:"bg-red-500 text-white hover:bg-red-600 object-center px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear",children:e(s,{icon:D})})]},a.id)]},a.id))})]})})]}),e("div",{className:"mt-4"})]})}export{O as default};
