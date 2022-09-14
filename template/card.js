const card = (employee) => `
<div class="col">
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">${employee.getRole()}</h1>
            <div class="card-body">
                <!--Where employee info goes-->
                <h3>${employee.name}</h3>
                <h3>${employee.id}</h3>
                <h3><a href="mailto: ${employee.email}">${employee.email}</a></h3>
                <h3><a href="${employee.github ?? ""}">${employee.github ?? ""}</a></h3>
                <h3>${employee.school ?? ""}</h3>
                <h3>${employee.officeNumber ?? ""}</h3>
            </div>
        </div>
    </div>
</div>
`

module.exports = card;


