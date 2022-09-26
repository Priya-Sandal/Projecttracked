import { createWebHistory, createRouter } from 'vue-router'
const ProjectPage = () => import('./components/ProjectPage.vue');
const AddProject = () => import('./components/AddProject.vue');


const routes = [
    {
        name: 'ProjectPage',
        path: '/',
        component: ProjectPage
    },
    {
        path: '/add-project',
        component: AddProject,
    },
    {
        name:'AddProject',
        path: '/edit-project/:id',
        component : AddProject,
        props: true,
    },
   
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;