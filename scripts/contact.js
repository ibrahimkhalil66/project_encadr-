const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const commentInput = document.getElementById("comment");
const submitBtn = document.getElementById("btn");

export const stored = JSON.parse(localStorage.getItem("savedComment")) || [];

submitBtn.addEventListener("click", (e) => {

    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const comment = commentInput.value.trim();

     if (!name || !email) {
      alert("Please enter your Name and Email");
      return;
    }

    if (!comment) {
      alert("Please enter your Comment");
      return;
    }


    const newEntry = {
        name,
        email,
        comment,
        date: new Date().toLocaleString()
    };

    stored.push(newEntry);
    localStorage.setItem("savedComment", JSON.stringify(stored));

     alert("Thank you — your message was Sent.");
    nameInput.value = "";
    emailInput.value = "";
    commentInput.value = "";




console.log(stored);

});
