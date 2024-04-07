// write your code here
// let url= "http://localhost:3000/images"

let commentcount=1;
let liked =0;
let commentformat ={
    id:0,
    imageId:"",
    content:"",
}
//console.log(commentformat)

fetch("http://localhost:3000/images")
    .then(res => res.json())
    .then(data => {
        const singleObject = data[0];

        if (singleObject) {
           // console.log(singleObject.image);

            let post = document.getElementById("card-image");
            post.src = singleObject.image;

            let post2 = document.getElementById("card-title");
            post2.innerText = singleObject.title;

            let post3 = document.getElementById("card-title");
            post3.id = singleObject.id;
            //console.log(post3.id);

            let post4 = document.getElementById("like-count");
            post4.innerHTML = `${singleObject.likes} likes`
            liked=singleObject.likes

            commentformat.imageId = singleObject.id;
            imageformat.id = singleObject.id;
            //console.log(commentformat);
        }
    });

// let dogImage = document.getElementById("card-image");

// // Add event listener to the image element
// dogImage.addEventListener("click", function() {
//     fetch("https://dog.ceo/api/breeds/image/random")
//         .then(response => response.json())
//         .then(data => {
//             // Replace the current image with the new random image
//             dogImage.src = data.message;
//         })
//         .catch(error => {
//             console.error('Error fetching random dog image:', error);
//         });
// });


let imageformat ={
    id:0,
    title: "Woofing those bugs away",
    likes: 0,
    image: "./assets/coder-dog.png"
}
//console.log(imageformat)


let likeButton=document.getElementById("like-button")


likeButton.addEventListener("click",function (){
    liked++;
    imageformat.likes=liked
    //console.log(imageformat.likes)
   // console.log(imageformat)
    updateLikeServer()
    console.log(document.getElementById("like-count").innerText=`${liked} likes`)

    //console.log(i.id)
    })

document.getElementById("comments-list").innerHTML=""

fetch("http://localhost:3000/comments")
    .then(res=>res.json())
    .then(comm=>{
        //console.log(comm)
      for(i of comm){
       // console.log(i.content);
        
       

        let j=document.createElement("li")
        j.innerText=`${i.content}`
        j.id=commentcount++;
        commentformat.id=`${j.id}`
        //console.log(commentformat)
        document.getElementById("comments-list").appendChild(j)
      }
})


let commentForm=document.getElementById("comment-form")
commentForm.addEventListener("submit",function(e){
    e.preventDefault();
    // let comm3={}
    // console.log(document.getElementById("comment").value)

    // comm3.push(document.getElementById("comment").value)
    // comm3.push(document.getElementById("comment").value)
    // comm3.push(document.getElementById("comment").value)


    let g=document.createElement("li")
    g.innerText=(document.getElementById("comment").value)
    g.id=commentcount++;

    commentformat.id=`${g.id}`
    commentformat.content=`${g.innerText}`

    document.getElementById("comments-list").appendChild(g)
    //console.log(g.id)
    //console.log(commentformat)
    updateCommentServer()
    commentForm.reset();

})
 function updateCommentServer(){
    fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(commentformat) // Assuming commentformat is already defined
      })
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse the JSON response
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        console.log('New comment added', data); // Handle the successful response data
      })
      .catch(error => {
        console.error('Error:', error); // Handle any errors
      });
 }

 function updateLikeServer(){
    fetch(`http://localhost:3000/images/${imageformat.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(imageformat) // Assuming commentformat is already defined
      })
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse the JSON response
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        //console.log('Likes updated successfully:', data); // Handle the successful response data
       console.log( document.getElementById("like-count").innerText = `${data.likes} likes`);
      })
      .catch(error => {
       // console.error('Error:', error); // Handle any errors
      });
 }
