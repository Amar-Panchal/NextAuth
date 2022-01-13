import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";
import Navbar  from "./Navbar";
import { signIn, signOut, useSession } from 'next-auth/client';
import { OverlayTrigger,Tooltip } from 'react-bootstrap';

function UserApi() {
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [Name , setName] =useState('');
  const [rerender, setRerender] = useState(false);
  const [email, setEmail] = useState('');
  let limit = 5;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
         `http://localhost:3000/posts?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
    //   console.log(Math.ceil(total/12));
      setItems(data);
      console.log(data)
    };
    getComments();
    
  }, []);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
     `http://localhost:3000/posts?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    console.log(data)
    return data;
  };
  const handleDelete = async id => {
    await axios.delete(`http://localhost:3000/posts/${id}`);
    var newstudent = items.filter((item) => {
     return item.id !== id;
    })
    setItems(newstudent);
   }
  

   const postData=async(e)=>{
    let data = {Name,email}
    let result = await fetch(`http://localhost:3000/posts`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },  
        body:JSON.stringify(data)
    });
    result=await result.json();
    console.log("postdata",result)
    setItems(result)
}


  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage);
    setItems(commentsFormServer);
  };

  const [session, loadingSession] = useSession();

  if (loadingSession) {
    return <p className="loading">Loading....</p>;
  }

  return (
      <>
{!session && (
            <>
          <div className="SignIn-Form d-flex justify-content-center mx-auto">
            <div>
                <input type="text" placeholder="email" disabled />
                <input type="text" placeholder="password" disabled />
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Please Login with Google</Tooltip>}>
                <button className="SignIn-Btn" disabled>Sign In</button>
                </OverlayTrigger>
                <button className="Google-Btn" onClick={() => signIn()}>
                  Sign In With Google
                </button>
            </div>
            <div>
              <img className="singIn-Img" src="/signup.jpg" alt="" />
            </div>
          </div>
        </>
      )}

{session && (
  <div>
    <Navbar/>
    <div className="container">
      <div className="post-form">
        <input type="text" placeholder="Name" value={Name} onChange={(e) =>setName(e.target.value)}/>
        <input type="email" placeholder="Email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
        <button type="submit" className="post-btn" onClick={postData}>POST</button>
      </div>
        <table className="table  table-hover text-center table-bordered">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          
          {items.map((item) => {
            return (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td className="title-table">{item.Name}</td>
                  <td className="title-table">{item.email}</td>
                  <td><button className="remove-btn" onClick={() => handleDelete(item.id)}>remove</button></td>
                </tr>
            );
          })}
        </tbody>
        </table>

          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}/>
    </div>
    </div>
    )}
    
    </>
  );
}

export default UserApi;

