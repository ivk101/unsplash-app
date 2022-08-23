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
import { addValues, increaseStartNumber } from '../features/photos/photosSlice'


function Auth() { 
	const unsplash = new Unsplash({ 
	accessKey: 'UNn5owZvWC7Ia3Wq6ucOuhKo-lm9qC_OGaZwbBBmt6g',
	secret: 'oirSNKhRzQ36g4X8N-uT0_UynAKtu-T2vw9Leo9tVs0',
	callbackUrl: 'http://localhost:3000/auth'
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

    
    const count = useSelector((state) => state.photos.data) 
          
    const [items, setItems] = useState(count);

    const dispatch = useDispatch();
    let lastLoadedPage = useRef(0);
    const start1 = useSelector((state) => state.photos.startNumber)

    
    const loadMore = () => {

      
      
      
      //let start = window.localStorage.getItem('start');
      

        // const data = listPhoto(+start, +end, localStorage.getItem('token'))
        // data.then(d => this.props.loadPhoto(d));
        // window.localStorage.setItem('start', +start + 10);
      unsplash.photos.listPhotos(start1 + 10, 10, "latest")
        .then(toJson)
        .then(newItems => { 
          lastLoadedPage.current += 10; 
          //window.localStorage.setItem('start', +start + 10);
          setItems((items) => items.concat(newItems));  
          dispatch(addValues(newItems))   
          dispatch(increaseStartNumber(10))      
        });
        //window.localStorage.removeItem('start');
    }
    
    //dispatch(addValues(items))
    console.log(items)

   useEffect(() => {
      if(items.length == 0) {
        loadMore()
      }      
    }, [])
     

    // const onscroll = ({target}) => {
    //   if ( target.scrollTop + target.clientHeight >= target.scrollHeight ) {
    //     //console.log(start1)
    //     loadMore();
    //   }      
    // }

    // useEffect(() => {
    //   const scrollContainer = document.body;
    //   scrollContainer.addEventListener("scroll", onscroll);
    //   //loadMore();

    //   return () => {
    //     scrollContainer.removeEventListener("scroll", onscroll);
    //   }
    // }, [])


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