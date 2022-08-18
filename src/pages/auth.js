// import Unsplash from 'unsplash-
// js';
import Unsplash, {4
    toJson
} from 'unsplash-js';
// Создаем экземпляр объекта для доступа к API
const unsplash = new Unsplash({
  accesskey: "UNn5owZvWC7Ia3Wq6ucOuhKo-lm9qC_OGaZwbBBmt6g",
  secret: "oirSNKhRzQ36g4X8N-uT0_UynAKtu-T2vw9Leo9tVs0",
  callbackUrl: "http://localhost:3000/auth"
});
// Считываем GET-параметр code из URL
// www.example.com/auth?code=abcdef123456...
const code = location.search.split('code=')[1];

if (code) {
  unsplash.auth.userAuthentication(code)
  .then(res =>
  	 console.log('test')
     res.json()
  )
  .then(json => {

  unsplash.auth.setBearerToken(json.access_token);
  // Теперь можно сделать что-то от имени пользователя
  // Например, поставить лайк фотографии
  //unsplash.photos.likePhoto("kBJEJqWNtNY");
  });
}