readTodo();

async function readTodo() {
    // 토큰이 없으면 리턴
    const token = localStorage.getItem("x-access-token");
    if (!token) {
        return;
    }

    // 일정 조회 API 호출하기
    const config = {
        method: "get",
        url: url + "/todos",
        headers: { "x-access-token": token},
    };

    try {
        const res = await axios(config);
        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }

        const todoDataSet = res.data.result;
            // 테스트 console.log(todoDataSet);

        for (let section in todoDataSet) {
            // 각 세션에 해당하는 ul 태그 선택
            const sectionUl = document.querySelector(`#${section} ul`);
            // 각 세션에 해당하는 데이터
            const arrayForEachSection = todoDataSet[section];
                // 테스트 console.log(arrayForEachSection);

            let result = "";
            for (let todo of arrayForEachSection) {
                let element = `
                <li class="list-item" id=${todo.todoIdx}>
                    <div class="done-text-container">
                        <input type="checkbox" class="todo-done" ${todo.status ==='C' ? "checked" : ""} />
                        <p class="todo-text">
                            ${todo.contents}
                        </p>
                    </div>
                    <div class="update-delete-container">
                    <i class="todo-update fas fa-pencil-alt"></i>
                    <i class="todo-delete fas fa-trash-alt"></i>
                    </div>
                </li>
                `;

                result += element;
            }

            sectionUl.innerHTML = result;
        }
        return true; // 임의 추가
    } catch (err) {
        console.log(err);
    }

};

// 일정 CUD
const matrixContainer = document.querySelector(".matrix-container");
matrixContainer.addEventListener("keypress", cudController);
matrixContainer.addEventListener("click", cudController);


function cudController(event) {
    const token = localStorage.getItem("x-access-token");
    if (!token) {
        alert("로그인 후에 사용해주시기 바랍니다.");   // 임의 추가
        return;
    }

    const target = event.target;
    const targetTagName = target.tagName;
    const eventType = event.type;
    const key = event.key;

        //테스트용 console.log(target, targetTagName, eventType, key);     

    // create 이벤트 처리
    if (targetTagName === "INPUT" && key === "Enter") {
        createTodo(event, token);
        return;
    }

    // update 이벤트 처리
    // 체크박스 클릭시
        //테스트용 console.log(target.className);
    if (target.className === "todo-done" && eventType === "click") {
        updateTodoDone(event, token);
        return;
    }

    // 컨텐츠 업데이트(연필아이콘 클릭시 처리)
        //테스트용 console.log(target.className);
    const firstClassName = target.className.split(" ")[0];

    if (firstClassName === "todo-update" && eventType === "click") {
        updateTodoContents(event, token);
        return;

    }

    // delete 이벤트 처리
    if (firstClassName === "todo-delete" && eventType === "click") {
        deleteTodo(event, token);
        return;
    }

}

async function createTodo(event, token) {
    const contents = event.target.value;
    const type = event.target.closest(".matrix-item").id;

    if (!contents) {
        alert("내용을 입력해주세요.");
        return false;
    }

    const config = {
        method: "post",
        url: url + "/todo",
        headers: {"x-access-token": token},
        data: {
            contents: contents,
            type: type
        }
    };

    try {
        const res = await axios(config);

        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트 (해야할 일 리스트업, 입력창 클리어)
        readTodo();
        event.target.value = "";
        return true;

    } catch (err) {
        console.error(err);
        return false;
    }
     
}

async function updateTodoDone(event, token) {
        //테스트용 console.log(event.target.checked);

    const status = event.target.checked ? "C" : "A";
    const todoIdx = event.target.closest(".list-item").id;
        //테스트용 console.log(todoIdx);

    const config = {
        method: "patch",
        url: url + "/todo",
        headers: {"x-access-token": token},
        data: {
            todoIdx: todoIdx,
            status: status
        }
    };

    try {
        const res = await axios(config);

        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트 (새로고침 이후에도 체크 상태 유효하도록)
        readTodo();
        return true;    // 임의 추가
        
    } catch (err) {
        console.error(err);
        return false;
    }

}

async function updateTodoContents(event, token) {
    const contents = prompt("내용을 입력해주세요.");
    const todoIdx = event.target.closest(".list-item").id;

    const config = {
        method: "patch",
        url: url + "/todo",
        headers: {"x-access-token": token},
        data: {
            todoIdx: todoIdx,
            contents: contents
        }
    };

    try {
        const res = await axios(config);

        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트 (새로고침 이후에도 prompt 내용 유효하도록)
        readTodo();
        return true; // 임의 추가
        
    } catch (err) {
        console.error(err);
        return false;
    }

}

async function deleteTodo(event, token) {
    const isValidReq = confirm("삭제하시겠습니까? 삭제 후에는 복구가 어렵습니다.");
    if (!isValidReq) {
        return false;
    }

    const todoIdx = event.target.closest(".list-item").id;

    const config = {
        method: "delete",
        url: url + "/todo/" + todoIdx,
        headers: {"x-access-token": token}
    };

    try {
        const res = await axios(config);

        if (res.data.code !== 200) {
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();
        return true; // 임의 추가
        
    } catch (err) {
        console.error(err);
        return false;
    }
}