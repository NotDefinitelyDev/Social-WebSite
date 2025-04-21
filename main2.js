

let postBody = document.getElementById("posts")
let loginBtn = document.querySelector(".sendInfo")
let baseURL = "https://tarmeezacademy.com/api/v1"


//  Checking the login 
    setupUI();
    getPosts()



    // Promise all test


// Promise.all([
//     axios.get(`${baseURL}/posts`),
//     axios.get(`${baseURL}/tags`)
// ]).then(([postRes , tagRes])=> {
//     let posts =  postRes.data.data
//     let tags = tagRes.data.data
//     console.log(tags)
//     let postTitle = '';

//     for (let i = 0; i <= posts.length; i++) {
//         if (posts[i].title != null) {
//             postTitle = posts[i].title
//         }
//             let content = `<div class="card shadow mb-5">
//         <div class="card-header">
//             <img src="${posts[i].author.profile_image}" alt="" style="width: 40px;" class="border border-primary-subtle rounded-circle border-2">
//             <b class="ms-2">${posts[i].author.username}</b>
//         </div>
//         <div class="card-body">
//             <img src="./imgs/shuffle-02.jpg" class="w-100" alt="">
//             <div class="text-secondary mt-1">${posts[i].created_at}</div>
//             <h5 class="mt-2">${postTitle}</h5>
//             <p>${posts[i].body}</p>
//             <hr>
//             <div class="card-footer">
//             <i class="bi bi-vector-pen"></i>
//                 <span>
//                     (${posts[i].comments_count}) Comments ${tags[i].name}
//                 </span>
//                 </div>
//             </div>
//         </div>`
//        postBody.innerHTML += content
//     }
// })


        // Post API Request
    
        
    function getPosts() {
        axios.get(`${baseURL}/posts?limit=2`)
        .then(function (response) {
            let posts = response.data.data
            let postTitle = '';
            postBody.innerHTML = ""
        //   for( let i = 0; i <= response.data.data.length; i++ ) {
        //     let content = `<div class="card shadow mb-5">
        //             <div class="card-header">
        //                 <img src="./imgs/pic_1.jpg" alt="" style="width: 40px;" class="border border-primary-subtle rounded-circle border-2">
        //                 <b class="ms-2">${response.data.data[i].author.username}</b>
        //             </div>
        //             <div class="card-body">
        //                 <img src="${response.data.data[i].image}" class="w-100" alt="">
        //                 <div class="text-secondary mt-1">${response.data.data[i].created_at}</div>
        //                 <h5 class="mt-2">${response.data.data[i].title}</h5>
        //                 <p>${response.data.data[i].body}</p>
        //                 <hr>
        //                 <div class="card-footer">
        //                     <i class="bi bi-vector-pen"></i>
        //                         <span>
        //                             (3) Comments
    
        //                         </span>
        //                 </div>
        //             </div>
        //         </div>`
    
    
            // (for of) Method    
    
                for(post of posts) {
                   
                    if (post.title != null) {
                        postTitle = post.title
                    }
                    let content = `<div class="card shadow mb-5">
                        <div class="card-header">
                            <img src="${post.author.profile_image}" alt="" style="width: 40px;" class="border border-primary-subtle rounded-circle border-1">
                            <b class="ms-2">${post.author.username}</b>
                        </div>
                        <div class="card-body">
                            <img src="${post.image}" class="w-100" alt="">
                            <div class="text-secondary mt-1">${post.created_at}</div>
                            <h5 class="mt-2">${postTitle}</h5>
                            <p>${post.body}</p>
                            <hr>
                        <div class="card-footer">
                            <i class="bi bi-vector-pen align-bottom"></i>
                            <span>
                                (3) Comments 
                            </span>
                            <span id="post-tags">
                            <button class="tag btn btn-sm btn-secondary rounded-5 ms-1 pe-none">Sports</button> 
                            </span>
                            </div>
                        </div>`
    
                   postBody.innerHTML += content

                //    let currentPost = `post-tags-${post.id}`
                //    document.getElementById(currentPost).innerHTML = ""
                //    for(tag of post.tags) {
    
                //     }
                // }
        }});
    }


    // axios.get('https://tarmeezacademy.com/api/v1/posts/1')
    // .then((res)=> {
    //     let tags = res.data.data.tags
    //     let posts = res.data.data
    //     for(let i = 0; i < 1; i++) {
    //             let content = `
    //             <div class="card-footer">
    //                 <i class="bi bi-vector-pen"></i>
    //                     <span>
    //                         (${posts.comments_count}) Comments ${tags[i].name}
    //                     </span>
    //             </div>
    //         </div>
    //     </div>`
    //        postBody.innerHTML = content
    //     }
    //     console.log(res.data.data)
    // })





// Alert

function showAlert(message , type) {
    const alertPlaceholder = document.getElementById("alert")
    const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
     alertPlaceholder.append(wrapper)
    };
    
    appendAlert(message, type)
    // setTimeout (()=> {
    //         let hideAlert = bootstrap.Alert.getOrCreateInstance(alertPlaceholder);
    //         hideAlert.close()
    //     },3000)  
};


// Login & Logout

function login() {
    
    let userField = document.getElementById("username-input").value
    let passField = document.getElementById("password-input").value
    
    axios.post(`${baseURL}/login`, {
        username: userField ,
        password: passField
      })
      .then(function (res) {
        let token = res.data.token
        let user =  res.data.user
        // console.log(JSON.stringify(user))
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        let modal = document.getElementById("login-modal")
        let modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        showAlert('Welcome back! You have logged in successfully!', 'success' , "alert")
        setupUI()
    }).catch((error)=> {
        showAlert(error.response.data.message , "danger" ,'alert')
    })
}

function setupUI() {
    let token = localStorage.getItem("token")
    let userName = getUserName();
        if(token == null) {     // user is guest
            document.getElementById("log-btn").style.display = "block"
            document.getElementById("reg-btn").style.display = "block"
            document.getElementById("logout-btn").style.display = "none"
            document.getElementById("userNav").style.display= "none"
            document.getElementById("add-post").style.display= "none"
            document.getElementById("imageNav").style.display = "none"
        } else {
            document.getElementById("log-btn").style.display = "none"
            document.getElementById("reg-btn").style.display = "none"
            document.getElementById("logout-btn").style.display = "block"
            document.getElementById("userNav").style.display= "block"
            document.getElementById("imageNav").style.display = "block"
            document.getElementById("userNav").innerHTML = userName.name
            document.getElementById("imageNav").src = userName.profile_image
    }
};

function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    showAlert("Logged out successfully. See you soon!", 'primary')
    setupUI()
};


// Register 

function register() {

    let nameReg = document.getElementById("reg-name").value
    let usernameReg = document.getElementById("reg-user").value
    let passReg = document.getElementById("reg-pass").value
    let emailReg = document.getElementById("reg-email").value
    let imgReg = document.getElementById("reg-image").files[0]
    let userInfo = new FormData(); 
     userInfo.append("username",usernameReg)
     userInfo.append("password",passReg)
     userInfo.append("name",nameReg)
     userInfo.append("image",imgReg)
     axios.post(`${baseURL}/register`, userInfo).then((res)=> {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        let modal = document.getElementById("reg-modal")
        let modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        showAlert('Welcome! Your account has been created successfully', 'dark')
        setupUI()
    })
}


// Create Post 

function createPost() {
        let titlePost = document.getElementById("post-title").value
        let bodyPost = document.getElementById("post-body").value
        let imagePost = document.getElementById("post-image").files[0]
        let token = localStorage.getItem("token")
        let formData = new FormData()
        formData.append("title",titlePost)
        formData.append("body",bodyPost)
        formData.append("image",imagePost)
    axios.post(`${baseURL}/posts`, formData , {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((res) => {
        console.log(res)
        let modal = document.getElementById("post-modal")
        let modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        getPosts()
        showAlert('Your Post has been created !', 'success' , "alert")
    }).catch((error)=> {
        showAlert(error.response.data.message , "danger" ,'alert')
    })
}

// Get Current User

function getUserName() {
    let user = null
    let storedUser = localStorage.getItem("user")
    if (storedUser != null) {
        user = JSON.parse(storedUser)
    }
    return user
}

