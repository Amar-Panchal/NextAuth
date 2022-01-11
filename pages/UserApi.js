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

  let limit = 5;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
         `https://jsonplaceholder.typicode.com/photos?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
       console.log(Math.ceil(total/12));
      setItems(data);
    };
    getComments();
  }, [limit]);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
     `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };
  const handleDelete = async id => {
    await axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`);
    var newstudent = items.filter((item) => {
     // console.log(item);
     return item.id !== id;
    })
    setItems(newstudent);
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
        <table className="table  table-hover text-center table-bordered">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          
          {items.map((item) => {
            return (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td><img className="image" src={item.thumbnailUrl} alt=""/></td>
                  <td className="title-table">{item.title}</td>
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

