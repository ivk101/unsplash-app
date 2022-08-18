import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
// import fetch from 'node-fetch';
// global.fetch = fetch;
import Unsplash, {
    toJson
} from 'unsplash-js';
import { useSelector, useDispatch } from 'react-redux'
import { addValues } from '../features/photos/photosSlice'
import './PhotoGallery.css';



const unsplash = new Unsplash({ 
	accessKey: 'UNn5owZvWC7Ia3Wq6ucOuhKo-lm9qC_OGaZwbBBmt6g',
	secret: 'oirSNKhRzQ36g4X8N-uT0_UynAKtu-T2vw9Leo9tVs0',
	callbackUrl: 'http://localhost:3000/auth'
});


const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos"
]);

//location.assign(authenticationUrl);

function PhotoGallery() {
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [lastLoadedPage, setLastLoadedPage] = useState(0);

    const loadMore = () => {
      console.log(lastLoadedPage)
      unsplash.photos.listPhotos(lastLoadedPage + 3, 3, "latest")
        .then(toJson)
        .then(newItems => {
          console.log(lastLoadedPage)
          setLastLoadedPage(state => state += 3)          
          setItems((currentItems) => currentItems.concat(newItems));          
        });
    }
    dispatch(addValues(items))
    

    const onscroll = ({target}) => {
      if ( target.scrollTop + target.clientHeight >= target.scrollHeight ) {
        loadMore();
      }      
    }

    useEffect(() => {
      const scrollContainer = document.body;
      scrollContainer.addEventListener("scroll", onscroll);
      loadMore();

      return () => {
        scrollContainer.removeEventListener("scroll", onscroll);
      }
    }, [])



    const listItems = items.map((item, index) =>
       <li key={index} className="item">
        <Link to={`/photo/${item.id}`}>
        	<img src={item.urls.thumb} alt="item.description" />
        </Link>
          <br /><a href={item.user.links.html}>{item.user.name}</a>
          <p>{item.created_at}</p>
          <p>&#9829; {item.likes}</p>        
       </li>
    )

	return (		
  <div className="container">
		<ul className="list">
		    {listItems}        
		</ul> 
    <button className="load-more" onClick={() => {loadMore()}}>Загрузить еще</button>
  </div>
  )
}

export default PhotoGallery;

