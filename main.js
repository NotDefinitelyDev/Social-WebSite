let postBody = document.getElementById("posts")
let loginBtn = document.querySelector(".sendInfo")
let baseURL = "https://tarmeezacademy.com/api/v1"
let currentPage = 1;
let lastPage = 1;


//  Checking the login 
    

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


// Login & Logout & UI Setup

function login() {
    
    let userField = document.getElementById("username-input").value
    let passField = document.getElementById("password-input").value
    toggleLoder(true)
    axios.post(`${baseURL}/login`, {
        username: userField ,
        password: passField
      })
      .then(function (res) {
        toggleLoder(false)
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
        toggleLoder(false)
    })
}

function setupUI() {
    let token = localStorage.getItem("token")
    let userName = getUserName();
    let addBtn = document.getElementById("add-post")
        if(token == null) {     // user is guest
            document.getElementById("log-btn").style.display = "block"
            document.getElementById("reg-btn").style.display = "block"
            document.getElementById("logout-btn").style.display = "none"
            document.getElementById("userNav").style.display= "none"
            if (addBtn != null) {
                addBtn.style.display= "none"
            }
            document.getElementById("imageNav").style.display = "none"
        } else {
            document.getElementById("imageNav").style.display = "none"
            document.getElementById("log-btn").style.display = "none"
            document.getElementById("reg-btn").style.display = "none"
            document.getElementById("logout-btn").style.display = "block"
            // document.getElementById("comment-div").style.display = "block"
            if (addBtn != null) {
                addBtn.style.display= "block"
            }
            document.getElementById("userNav").style.display= "block"
            document.getElementById("userNav").innerHTML = userName.name
            if(JSON.stringify(userName.profile_image) != "{}") {
                document.getElementById("imageNav").src = userName.profile_image
                document.getElementById("imageNav").style.display = "block"
            }
    }
};

function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    if (window.location.search.includes("?postId=")) {
        document.getElementById("comment-div").style.display = "none"
    }
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
     toggleLoder(true)
     axios.post(`${baseURL}/register`, userInfo).then((res)=> {
        toggleLoder(false)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        let modal = document.getElementById("reg-modal")
        let modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        showAlert('Welcome! Your account has been created successfully', 'dark')
        setupUI()
    }).catch((error)=> {
        toggleLoder(false)
        showAlert(error.response.data.message , "danger" ,'alert')
    })
}

// Create Post && Edit Post (it must be reusable)

function createPost() {

        let postId = document.getElementById("post-id-input").value
        let isCreate = postId == null || postId == "";
        let titlePost = document.getElementById("post-title").value
        let bodyPost = document.getElementById("post-body").value
        let imagePost = document.getElementById("post-image").files[0]
        let token = localStorage.getItem("token")
        let formData = new FormData()
        let url = ``
        formData.append("title",titlePost)
        formData.append("body",bodyPost)
        formData.append("image",imagePost)
        toggleLoder(true)
        if (isCreate) {
            url = `${baseURL}/posts`
            showAlert('Your Post has been created !', 'success' , "alert")
        } else {
            url = `${baseURL}/posts/${postId}`
            formData.append( "_method", "put" )
            showAlert('You Updated The Post !', 'success' , "alert")
        }   
        axios.post(url, formData , {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            toggleLoder(false)
            let modal = document.getElementById("post-modal")
            let modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
            getPosts()
        }).catch((error)=> {
            toggleLoder(false)
            showAlert(error.response.data.message , "danger" ,'alert')
        })
}

// Get Current UserInfomration

function getUserName() {
    let user = null
    let storedUser = localStorage.getItem("user")
    if (storedUser != null) {
        user = JSON.parse(storedUser)
    }
    return user
}

function currentUser() {
    let user = getUserName()
    let id = user.id
    window.location = `./profile.html?Id=${id}`
  }



function toggleLoder(show = true ) {
    if (show) {
        document.getElementById("loder").style.visibility = 'visible'
    } else {
        document.getElementById("loder").style.visibility = 'hidden'
    }
}

