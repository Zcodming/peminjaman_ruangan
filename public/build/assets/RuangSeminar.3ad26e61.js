import{r as t,j as o,a as e,H as g,L as p}from"./app.c5fb3a84.js";import h from"./Index.cba77d7e.js";import"./index.ef26bd93.js";import x from"./CalendarSeminar.95626970.js";import"./ApplicationLogo.946f9fd5.js";import"./Dropdown.0eacccd8.js";import"./index.df37137f.js";import"./extends.d5b9bf4e.js";import"./ModalEvent.1a27a81d.js";import"./toConsumableArray.0e2305b8.js";import"./inheritsLoose.06539100.js";import"./index.c27b8759.js";import"./index.2c61398d.js";function H({auth:a,ruangseminar:i}){t.exports.useState("07:00"),t.exports.useState("17:00"),t.exports.useState([{startDate:new Date,endDate:new Date,key:"selection"}]);let s=0;const[l,m]=t.exports.useState("1"),[d,u]=t.exports.useState("Seminar 1"),[n,c]=t.exports.useState("1");return t.exports.useRef(null),o(h,{auth:a,errors:a.errors,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Pinjam Ruang"}),children:[e(g,{title:"Ruang Seminar"}),e("div",{className:"py-5",children:n==l?o("div",{className:"relative w-full px-4 max-w-full flex-grow flex-1",children:[e("div",{className:"ml-3",children:i.map(r=>e("button",{count:s++,className:n==r.id_ruangan?"bg-white text-grey-200 hover:bg-green-500 object-center px-4 py-3 rounded-t hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 ease-linear":"bg-green-400 text-white hover:bg-green-500 object-center px-4 py-3 rounded-t shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 ease-linear",onClick:()=>(c(r.id_ruangan),m(r.id_ruangan),u(r.nama_ruangan)),children:r.nama_ruangan}))}),e("div",{className:"relative flex justify-end object-right px-10 pt-4 bg-white rounded-t-lg",children:e(p,{className:"bg-green-400 text-white hover:bg-green-500 px-4 py-3 rounded shadow hover:shadow-lg",href:route("pinjam",n),children:"Pinjam Ruang Sidang"})}),e("div",{style:{width:"100%"},children:e(x,{room:d})})]}):e("p",{children:"error"})})]})}export{H as default};