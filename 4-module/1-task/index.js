function makeFriendsList(friends) {
  const ulElementHTML = document.createElement("ul");
  friends.forEach((friend) => {
    const liElementHTML = document.createElement("li");
    liElementHTML.textContent = `${friend.firstName} ${friend.lastName}`;
    ulElementHTML.appendChild(liElementHTML);
  });

  return ulElementHTML;
}
