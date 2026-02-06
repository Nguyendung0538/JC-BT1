
class Student {
    constructor(id, name, dob, clazz, gpa) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.clazz = clazz;
        this.gpa = gpa;
    }

    updateInfo(name, dob, clazz, gpa) {
        this.name = name;
        this.dob = dob;
        this.clazz = clazz;
        this.gpa = gpa;
    }
}

let studentList = [];

function handleSave() {
    const id = document.getElementById('id').value.trim();
    const name = document.getElementById('name').value.trim();
    const dob = document.getElementById('dob').value;
    const clazz = document.getElementById('clazz').value.trim();
    const gpa = document.getElementById('gpa').value;
    const gpaValue = parseFloat(gpa);

    if (!id || !name || !gpa) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (gpaValue < 0 || gpaValue > 4) {
        alert("Điểm GPA không hợp lệ! Vui lòng nhập giá trị từ 0 đến 4.");
        return;
    }

    const isEdit = document.getElementById('id').disabled; 

    if (isEdit) {
        const student = studentList.find(s => s.id === id);
        if (student) {
            student.updateInfo(name, dob, clazz, gpa);
            alert("Cập nhật thành công!");
        }
    } else {
        if (studentList.some(s => s.id === id)) {
            alert("Mã sinh viên đã tồn tại!");
            return;
        }
        const newStudent = new Student(id, name, dob, clazz, gpa);
        studentList.push(newStudent);
    }

    renderTable();
    resetForm();
}

function renderTable() {
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = ''; 

    studentList.forEach((student) => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.dob}</td>
                <td>${student.clazz}</td>
                <td>${student.gpa}</td>
                <td>
                    <button class="action-btn btn-edit" onclick="editStudent('${student.id}')">Sửa</button>
                    <button class="action-btn btn-delete" onclick="deleteStudent('${student.id}')">Xóa</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function editStudent(id) {
    const student = studentList.find(s => s.id === id);
    if (student) {
        document.getElementById('id').value = student.id;
        document.getElementById('name').value = student.name;
        document.getElementById('dob').value = student.dob;
        document.getElementById('clazz').value = student.clazz;
        document.getElementById('gpa').value = student.gpa;

        document.getElementById('id').disabled = true;
        document.getElementById('id').style.backgroundColor = "#e9ecef";
    }
}

function deleteStudent(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
        studentList = studentList.filter(s => s.id !== id);
        renderTable();
    }
}

function resetForm() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('clazz').value = '';
    document.getElementById('gpa').value = '';
    
    document.getElementById('id').disabled = false;
    document.getElementById('id').style.backgroundColor = "white";
}