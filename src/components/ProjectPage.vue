<template>
    <div class="nav">
        <button class="filter" :class="{active:  activebtn === 'btnn1'}"
            @click="filterBySetValue('View All'), setActivebtnvalue('btnn1')">VIEW ALL</button>
        <button class="filter" :class="{active:  activebtn === 'btnn2'}"
            @click="filterBySetValue('Completed'), setActivebtnvalue('btnn2')">COMPLETED</button>
        <button class="filter" :class="{active:  activebtn === 'btnn3'}"
            @click="filterBySetValue('Ongoing'), setActivebtnvalue('btnn3')">ONGOING</button>
    </div>

    <div v-if="projects.length === 0" class="projectbox">
        <router-link to="/add-project" class="nav-menu">
            <div class="projectbox">
                <p>No project added </p>
                <p>Click to add a new project</p>
            </div>
        </router-link>
    </div>
    <ul>
        <li v-for="(element,index) in Filterprojects" v-bind:key="index" class="projectbox"
            @click.prevent.self="showDetails(index)"
            :class="{'green-border-left':element.completed, 'red-border-left' : !element.completed}">
            <span class="project-title">{{element.title}}</span>
            <span class="icons">

                <button class="btnn" @click="deleteProject(index)"> <i class="fa-solid fa-trash"></i></button>
                <router-link :to="{name:'AddProject', params: {id:index}}"> <i class="fa-solid fa-pencil"></i>
                </router-link>
                <button @click="completedProject(index)"> <i class="fa-solid fa-check greenHover"></i></button>

            </span>
            <p class="project-detail" :key="index" v-if="showDetailsIndex === index">{{element.detail}}</p>

        </li>
    </ul>
</template>
    
<script>
export default {
    name: 'ProjectPage',
    data() {
        return {
            projects: [],
            showDetailsIndex: null,
            activebtn: 'btnn1',
            filterBy: 'View All'


        }
    },
    methods: {
        filterBySetValue(value) {
            this.filterBy = value;
        },
        setActivebtnvalue(value) {
            this.activebtn = value;
        },


        showDetails(index) {
            if (this.showDetailsIndex == index) {
                this.showDetailsIndex = null;
            } else {
                this.showDetailsIndex = index;
            }
        },
        deleteProject(index) {
            console.log(this)
            this.projects.splice(index, 1);
            localStorage.setItem("projects", JSON.stringify(this.projects));
        },
        editProject(index) {
            this.editProjectSelected = true
            this.editProjectTitle = this.projects[index].title
        },
        completedProject(index) {
            if (this.projects[index].completed === false) {
                this.projects[index].completed = true;
            } else {
                this.projects[index].completed = false;
            }
            localStorage.setItem("projects", JSON.stringify(this.projects));
        }
    },
    created() {
        this.projects = JSON.parse(localStorage.getItem('projects') || "[]");
    },
    computed: {
        Filterprojects() {
            console.log(this.filterBy);

            if (this.filterBy == 'Completed') {
                return this.projects.filter(project => project.completed)
            }
            console.log(this.filterBy);
            if (this.filterBy == 'Ongoing') {
                return this.projects.filter(project => !project.completed)
            }
            return this.projects;

        },
    }
}
</script>
    
<style>
.btnn {

    color: black;
    border-width: 1px;
    font-size: large;
}




.nav {
    margin: 10px 50px;
}

.filter {
    text-decoration: none;
    font-size: .95em;
    font-weight: 600;
    padding: 10px;
    background-color: transparent;
    border: none;
    color: white;
}

.filter:hover {
    background-color: rgb(56, 117, 167);
}

.projectbox {
    list-style: none;
    background-color: white;
    color: skyblue;
    padding: 24px 30px;
    margin: 10px 50px;
}

.project-title {
    font-weight: 600;
    font-size: 1.16em;
    margin-bottom: 15px;
}

.project-detail {
    font-size: 1.07em;
    margin-top: 8px;
    color: black;
    margin-left: 1px;
}

.icons {
    float: right;
}

.icons i,
a {
    margin-left: 10px;
    color: rgb(189, 189, 189)
}

.icons i:hover,
a:hover {
    color: yellow;

}

.icons i.greenHover:hover {
    color: mediumseagreen
}

i.green-color {
    color: mediumseagreen;
}

.green-border-left {
    border-left: 6px solid mediumseagreen;
}

.red-border-left {
    border-left: 6px solid salmon;
}

.active {
    border-bottom: 2px solid white;
}
</style>