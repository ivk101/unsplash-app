import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Unsplash, {
    toJson
} from 'unsplash-js';
import { useSelector, useDispatch } from 'react-redux';
import { addValues } from '../features/photos/photosSlice'


function Auth() { 
	const unsplash = new Unsplash({ 
	accessKey: 'UNn5owZvWC7Ia3Wq6ucOuhKo-lm9qC_OGaZwbBBmt6g',
	secret: 'oirSNKhRzQ36g4X8N-uT0_UynAKtu-T2vw9Leo9tVs0',
	callbackUrl: 'http://irinaislam.temp.swtest.ru/auth'
});
  const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes"
]);
  const setAccessTokenUnplash = (code) => {
    unsplash.auth.userAuthentication(code)
        .then(res => res.json())
        .then(json =>
            localStorage.setItem('token', json.access_token)
        );
};

	if (localStorage.getItem('token') === 'undefined' || localStorage.getItem('token') === '' || !localStorage.getItem('token')) {
            setAccessToken(); 
    }
    
    function setAccessToken() {
        const code = window.location.search.split('code=')[1];

        if (code) {
            setAccessTokenUnplash(code);
        }
    }

    
    const data = useSelector((state) => state.photos.data) 
          
    const [items, setItems] = useState(data);

    const dispatch = useDispatch();

    
    const loadMore = () => {        
      
      let start = window.localStorage.getItem('start');

      unsplash.photos.listPhotos(+start + 10, 10, "latest")
        .then(toJson)
        .then(newItems => { 
          window.localStorage.setItem('start', +start + 10);
          setItems((items) => items.concat(newItems));  
          dispatch(addValues(newItems))        
        });
       
    }

   
    
   useEffect(() => {
     // const scrollContainer = document.body;
     // let test1 = window.sessionStorage.getItem('scrollPosition')
     
     // if (test1) {
     //    scrollContainer.scrollTop = test1;
     //    console.log(scrollContainer.scrollTop)
     //  }
      if(items.length == 0) {
        loadMore()
      }      
    }, [])
 


    const onscroll = ({target}) => {

      if ( target.scrollTop + target.clientHeight >= target.scrollHeight ) {
        loadMore();
      }      
    }

    useEffect(() => {
      

      const scrollContainer = document.body;
      // const test = document.getElementsByClassName('container')[0];
      scrollContainer.addEventListener("scroll", onscroll);
      // scrollContainer.addEventListener("scroll", () => {
        
      //   let selector = document.body; 
      //   window.sessionStorage.setItem('scrollPosition', selector.scrollTop)
      //   console.log(window.sessionStorage.getItem('scrollPosition'))

      // });
      

      return () => {
        scrollContainer.removeEventListener("scroll", onscroll);
        setItems([]);  
      }
    }, [])


    const listItems = items.map((item, index) =>
        <li key={index} className="item">
           <div className="item-info"> 
               <a href={item.user.links.html} target="_blank">
                   <img src={item.user.profile_image.small} />
                   <span>{item.user.name}</span>
               </a>
               <p>
                   { new Date(item.created_at).toLocaleDateString() }
               </p>
               <p>&#9829; {item.likes}</p> 
           </div>
           <Link to={`/photo/${item.id}`}>
                <div className="item-image" style={ { backgroundImage: 'url(' + item.urls.small + ')' } }></div>
           </Link>      
                 
        </li>
    )

	return (		
        <main className="container">
            <header className="header">
                <div className="container-my">
                    <h1>Unsplash App</h1>
                </div>
            </header>
            <div className="content">
              <div className="container-my">
		        <ul className="list">
		            {listItems}        
		        </ul> 
		      </div>
		      <button className="load-more" onClick={() => {loadMore()}}>Загрузить еще</button>
		    </div>    
        </main>
  )
}

export default Auth;