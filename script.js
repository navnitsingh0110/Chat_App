document.addEventListener("DOMContentLoaded", () => {
  // --- Cached element references ---
  const userListContainer = document.querySelector(".userList");
  const chatBox = document.querySelector(".chat-box");
  const searchUserInput = document.getElementById("searchUserInput");
  const themeSelector = document.getElementById("themeSelector");
  const bgSelector = document.getElementById("bgSelector");
  const backBtn = document.getElementById("backBtn");
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const charCount = document.getElementById("charCount");

  const closeBtn = document.querySelector(".close-btn");
  const chatPanel = document.querySelector(".right"); // Chat panel
  const userPanel = document.querySelector(".left"); // User list panel

  // Keep track of current chat (1-based index)
  let currentChatIndex = 1;

  // --- Initialize User List ---
  setList(usersData);

  // --- Event Listeners ---
  searchUserInput.addEventListener("input", searchUser);
  themeSelector.addEventListener("change", selectTheme);
  bgSelector.addEventListener("change", changeBg);
  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("input", updateCharCount);
  backBtn.addEventListener("click", goBack);
  window.addEventListener("resize", () => {
    handleResize();
    adjustChatBoxHeight();
  });

  closeBtn.addEventListener("click", () => {
    // Hide the chat panel only
    chatPanel.style.display = "none";
    // (Optionally, for mobile you might want to show the user panel—but here we keep it visible)
    // if (window.innerWidth <= 750) {
    //   userPanel.style.display = "block";
    // }
  });

  // --- Functions ---

  // Adjust the chat box height so that the message input remains visible
  function adjustChatBoxHeight() {
    const chatHeader = document.querySelector(".chat-header");
    const mssgBox = document.querySelector(".mssg-box");
    const availableHeight = window.innerHeight - chatHeader.offsetHeight - mssgBox.offsetHeight;
    chatBox.style.height = availableHeight + "px";
  }

  // Create user list element
  function createUserList({ avatar, name, time }, index) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-list");
    if (index === 0) userDiv.classList.add("active");
    // Store index for later use
    userDiv.dataset.index = index;
    userDiv.innerHTML = `
      <div class="user-list-sub">
        <div class="avatar">
          <img src="${avatar}" alt="${name}" loading="lazy" />
        </div>
        <div class="profile-highlight">
          <div class="user-name">
            <p class="title">${name}</p>
            <p class="time">${time}</p>
          </div>
          <p class="highlights">Lorem ipsum dolor sit amet...</p>
        </div>
      </div>
    `;
    // When a user is clicked, show the chat panel and update chat content.
    userDiv.addEventListener("click", () => {
      // Ensure chat panel is visible
      chatPanel.style.display = "block";
      // Do not hide the left panel so that its scroll remains available.
      document.querySelectorAll(".user-list").forEach(el =>
        el.classList.remove("active")
      );
      userDiv.classList.add("active");
      currentChatIndex = Number(userDiv.dataset.index) + 1;
      displayChatForUser(userDiv.dataset.index);
      adjustChatBoxHeight();
    });
    userListContainer.appendChild(userDiv);
  }

  // Populate user list from array
  function setList(arr) {
    userListContainer.innerHTML = "";
    arr.forEach((item, index) => createUserList(item, index));
  }

  // Filter user list based on search input
  function searchUser(event) {
    const input = event.target.value.toLowerCase();
    if (input === "") {
      setList(usersData);
    } else {
      const filtered = usersData.filter(item =>
        item.name.toLowerCase().includes(input)
      );
      if (filtered.length === 0) {
        userListContainer.innerHTML = "<p style='padding:10px; font-weight:bold;'>No Data Found</p>";
      } else {
        setList(filtered);
      }
    }
  }

  // Display chat for a selected user using index (as a string)
  function displayChatForUser(index) {
    chatBox.innerHTML = "";
    const user = usersData[index];
    // Create current user header in chat
    const currentUserDiv = document.createElement("div");
    currentUserDiv.classList.add("current-user");
    currentUserDiv.innerHTML = `
      <div class="current-user-sub">
        <div class="current_avatar">
          <span>
            <img src="${user.avatar}" alt="${user.name}" />
            <div class="online"></div>
          </span>
        </div>
        <div class="current_status">
          <p class="current-title">${user.name}</p>
          <p class="current-highlights">${user.status}</p>
        </div>
      </div>
    `;
    chatBox.appendChild(currentUserDiv);
    // Load chat history using key "chat{index+1}"
    const chatKey = `chat${Number(index) + 1}`;
    if (JsonData[chatKey]) {
      renderChat(JsonData[chatKey]);
    } else {
      JsonData[chatKey] = [];
      const noChat = document.createElement("h5");
      noChat.textContent = "Start Chat...";
      chatBox.appendChild(noChat);
    }
    adjustChatBoxHeight();
  }

  // Render chat messages in the chat box
  function renderChat(chatArray) {
    const chatContainer = document.createElement("div");
    chatContainer.classList.add("chat");
    chatArray.forEach(({ from, msg }) => {
      const msgContainer = document.createElement("div");
      msgContainer.classList.add(from.type === "user1" ? "user1-container" : "user2-container");
      const msgElem = document.createElement("p");
      msgElem.classList.add(from.type === "user1" ? "user1-mssg" : "user2-mssg");
      msgElem.textContent = msg.message;
      msgContainer.appendChild(msgElem);
      chatContainer.appendChild(msgContainer);
    });
    chatBox.appendChild(chatContainer);
    // Auto-scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Send message function
  function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") {
      alert("Please enter a message");
      return;
    }
    const chatKey = `chat${currentChatIndex}`;
    const newMsg = { from: { type: "user2" }, msg: { message: text } };
    JsonData[chatKey].push(newMsg);
    renderChat([newMsg]);
    messageInput.value = "";
    updateCharCount();
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Update character and word count display
  function updateCharCount() {
    const text = messageInput.value;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    charCount.textContent = `Characters: ${text.length}, Words: ${words}`;
  }

  // Change theme color using CSS variable
  function selectTheme(event) {
    const color = event.target.value;
    const root = document.documentElement;
    if (color) {
      root.style.setProperty("--my-mssg", color);
    } else {
      root.style.setProperty("--my-mssg", "#00A0AE");
    }
  }

  // Change background image via CSS variable update
  function changeBg(event) {
    const bg = event.target.value;
    let bgUrl = "";
    switch (bg) {
      case "image1":
        bgUrl = 'url("https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBhdHRlcm58ZW58MHx8MHx8fDA%3D")';
        break;
      case "image2":
        bgUrl = 'url("https://wallpaperaccess.com/full/1288076.jpg")';
        break;
      case "image3":
        bgUrl = 'url("https://i.pinimg.com/736x/78/1e/21/781e212cb0a891c6d8a3738c525e235d.jpg")';
        break;
      default:
        bgUrl = 'url("https://i.pinimg.com/originals/f5/05/24/f50524ee5f161f437400aaf215c9e12f.jpg")';
    }
    chatBox.style.setProperty("--background-img", bgUrl);
  }

  // Go back (for mobile view): hide chat panel and show user list
  function goBack() {
    chatPanel.style.display = "none";
    userPanel.style.display = "block";
  }

  // Handle resize events for responsiveness
  function handleResize() {
    if (window.innerWidth > 750) {
      userPanel.style.display = "block";
      chatPanel.style.display = "block";
    } else {
      userPanel.style.display = "block";
      chatPanel.style.display = "none";
    }
  }

  // Initial adjustment of chat box height
  adjustChatBoxHeight();
});
