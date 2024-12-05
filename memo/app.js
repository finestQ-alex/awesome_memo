//44-에디터버튼
async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 내용을 입력하세요");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
  readMemo();
}

async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
}

//43-불러온 값 디스플레이
function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  const editBtn = document.createElement("button"); //44-에디터버튼
  li.innerText = `${memo.content}`;
  editBtn.innerText = "수정하기"; //44-에디터버튼
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;
  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;
  ul.appendChild(li);
  li.appendChild(delBtn);
  li.appendChild(editBtn);
}

//43-메모 읽어오기
async function readMemo() {
  const res = await fetch("/memos"); //default GET
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerText = "";
  jsonRes.forEach(displayMemo);
}

readMemo(); //43

//42-메모추가
async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  // const jsonRes = await res.json();
  readMemo();
}

//42-제출버튼
function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

//42-form 영역
const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo(); //43
