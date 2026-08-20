// مصفوفة المهام
let tasks = [
    {
        title: "قراءة كتاب",
        date: getFormattedDate(),
        isDone: false
    }
];
// تحميل المهام من local storage
function GetStorage() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || tasks;
}
GetStorage();

// دالة مساعدة لتنسيق التاريخ الحالي
function getFormattedDate() {
    const now = new Date();
    return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
}

// دالة عرض المهام
function renderTasks() {
    document.getElementById("list").innerHTML = "";
    let index = 0;

    for (let task of tasks) {
        let content = `
            <div class="task ${task.isDone ? "done" : ""}">
                <div class="info">
                    <h2>${task.title}</h2>
                    <i class="fa-solid fa-calendar-days"></i>
                    <span>${task.date}</span>
                </div>
                <div class="action">
                    <!-- زر التعديل -->
                    <button onclick="editTask(${index})" class="btn-circle first">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>

                    <!-- زر الحالة (صح / خطأ) -->
                    ${task.isDone ? `
                        <button onclick="doneTask(${index})" class="btn-circle second false">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    ` : `
                        <button onclick="doneTask(${index})" class="btn-circle second">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    `}

                    <!-- زر الحذف -->
                    <button onclick="deleteTask(${index})" class="btn-circle third">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        document.getElementById("list").innerHTML += content;
        index++;
    }
}

// التشغيل الأولي
renderTasks();

// دالة إضافة المهام
document.getElementById("add").addEventListener("click", function () {
    let taskName = prompt("ادخل المهمة");

    if (!taskName || taskName.trim() === "") {
        return;
    }

    let taskObj = {
        title: taskName.trim(),
        date: getFormattedDate(),
        isDone: false
    };

    tasks.push(taskObj);
    SaveStorage();
    renderTasks();
});

// دالة حذف المهام
function deleteTask(index) {
    if (!confirm(`هل أنت متأكد من حذف المهمة: "${tasks[index].title}"؟`)) {
        return;
    }
    tasks.splice(index, 1);
    SaveStorage();
    renderTasks();
}

// دالة تعديل المهام
function editTask(index) {
    let taskName = prompt("ادخل اسم المهمة الجديدة", tasks[index].title);

    if (!taskName || taskName.trim() === "") {
        return;
    }
    tasks[index].title = taskName.trim();
    SaveStorage();
    renderTasks();
}

// دالة تبديل حالة الإنجاز
function doneTask(index) {
    tasks[index].isDone = !tasks[index].isDone;
    SaveStorage();
    renderTasks();
}
// local storage
function SaveStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}