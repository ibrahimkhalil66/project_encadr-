const nameEl = document.getElementById("name").innerHTML;
const emailEl = document.getElementById("email").innerHTML;
const commentEl = document.getElementById("comment").innerHTML;
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", () => {
 
    alert("Thank you for your comment");
    console.log(nameEl);
    console.log(emailEl);
    console.log(commentEl);
});
