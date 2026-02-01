function changeColor(element) {
    element.style.backgroundColor = "lightcoral";
}
function resetColor(element) {
    element.style.backgroundColor = "beige";
}

if (typeof(Storage) !== "undefined") {
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); 
            const student = {
                StudentID: document.getElementById("StudentID").value,
                FullName: document.getElementById("fullName").value,
                Birthday: document.getElementById("birthday").value,
                Email: document.getElementById("emailaddress").value,
                MobilePhone: document.getElementById("mobilephone").value,
                GradeLevel: document.getElementById("gradelevel").value,
                InternOrExtern: document.querySelector('input[name="internorextern"]:checked')?.value,
                Organization: document.getElementById("organization").value
            };

            let submissions = JSON.parse(localStorage.getItem("formSubmissions")) || [];

            submissions.push(student);

            localStorage.setItem("formSubmissions", JSON.stringify(submissions));

            window.location.href = "viewSignUps.html";
        });
    }
} else {
    alert("Your browser does not support Web Storage...");
}

function getFormList() {
    return JSON.parse(localStorage.getItem("formSubmissions")) || [];
}


document.addEventListener("DOMContentLoaded", () => {
    const orgSelect = document.getElementById("organizationFilter");

    if (orgSelect) {
        orgSelect.addEventListener("change", () => {
            displayTable(orgSelect.value);
        });

        displayTable(orgSelect.value);
    } else {
        displayTable();
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const results = document.getElementById("results");
    const count = document.getElementById("count");
    const orgSelect = document.getElementById("organizationFilter");

    results.style.display = "none";
    count.style.display = "none";

    if (orgSelect) {
        orgSelect.addEventListener("change", () => {
            const selectedOrg = orgSelect.value;
            const allSubmissions = JSON.parse(localStorage.getItem("formSubmissions")) || [];

            const filteredList = allSubmissions.filter(s => s.Organization === selectedOrg);

            let rowString = "";

            if (filteredList.length > 0) {
                rowString += `
                    <tr>
                    <th>Organization</th>
                        <th>Student ID</th>
                    <th>Full Name</th>
                    <th>Grade Level</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Intern|Extern</th>
                    </tr>`;

                filteredList.forEach(student => {
                    rowString += `
                        <tr>
                            <td>${student.Organization}</td>
                            <td>${student.StudentID}</td>
                            <td>${student.FullName}</td>
                            <td>${student.GradeLevel}</td>
                            <td>${student.Email}</td>
                            <td>${student.MobilePhone}</td>
                            <td>${student.InternOrExtern || ""}</td>
                        </tr>`;
                });
            } else {
                rowString += `
                    <tr>
                        <td colspan="7" style="text-align:center; font-style:italic; color:gray;">
                            No sign-ups for the club
                        </td>
                    </tr>`;
            }

            results.innerHTML = rowString;
            results.style.display = "table"; 
            count.innerText = filteredList.length > 0 ? `Total Records: ${filteredList.length}` : "";
            count.style.display = filteredList.length >= 0 ? "block" : "none";
            count.style.color = "white";
        });
    }
});
