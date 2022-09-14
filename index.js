const inquirer = require('inquirer')
const Intern = require('./lib/Intern')
const Employee = require('./lib/Employee')
const Engineer = require('./lib/Engineer')
const Manager = require('./lib/Manager')
const wrapper = require('./template/wrapper')
const card = require('./template/card')
var fs = require('fs');
const { writeFile, copyFile } = require('./src/generatefile')

const team = []

//initial manager questions
const initialize = () => {
    inquirer
        .prompt([{
            type: "text",
            name: "manager",
            message: "Enter Team Manager's name:"
        },
        {
            type: "text",
            name: "id",
            message: "Enter employee ID:"
        },
        {
            type: "text",
            name: "email",
            message: "Enter email adress:"
        },
        {
            type: "text",
            name: "office",
            message: "Enter office number:"
        }
        ])
        .then(answers => {
            console.log(answers)
            const manager = new Manager(answers.manager, answers.id, answers.email, answers.office)
            team.push(manager)
            return newEmp();
        })
}

//prompt to continue adding employees or finish
const newEmp = () => {
    inquirer.prompt(
        {
            type: "list",
            name: "employee",
            choices: ["engineer", "intern", "finish"],
        })
        .then(answers => {
            if (answers.employee === "intern") {
                return internPrompt()
            } else if (answers.employee === "engineer") {
                return engineerPrompt()
            } else {
                finish()
            }
        })
}


//intern questions
const internPrompt = () => {
    inquirer
        .prompt([{
            type: "text",
            name: "internName",
            message: "What is intern's name?"
        },
        {
            type: "text",
            name: "internId",
            message: "What is intern's id?"
        },
        {
            type: "text",
            name: "internEmail",
            message: "What is intern's email?"
        },
        {
            type: "text",
            name: "internSchool",
            message: "Where does intern go to school?"
        }
        ])
        .then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            team.push(intern)
            return newEmp()
        })
}


//engineer questions
const engineerPrompt = () => {
    inquirer
        .prompt([{
            type: "text",
            name: "engineerName",
            message: "What is engineer's name?"
        },
        {
            type: "text",
            name: "engineerId",
            message: "What is engineer's ID"
        },
        {
            type: "text",
            name: "engineerEmail",
            message: "What is engineer's email?"
        },
        {
            type: "text",
            name: "engineerGitHub",
            message: "What is engineer's GitHub"
        }
        ])
        .then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGitHub)
            team.push(engineer)
            return newEmp()
        })
}


const finish = () => {
    //loop to create each employee card
    const teamMembers = () => {
        let empCard = ""
        for (let i = 0; i < team.length; i++) {
            const employee = team[i];
            empCard += card(employee)
        }
        return empCard;
    }

    const finalContent = wrapper(teamMembers())

    //writes html file into dist folder
    writeFile(
        finalContent
    )

    //copy css template into dist folder
    copyFile()
    process.exit()
}

//call initialize
initialize()
