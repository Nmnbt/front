import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/LoginView.vue'
import Register from '@/views/Login/RegisterView.vue'
import Home from '@/views/HomePage/HomeView.vue'
import EmployeeView from '@/views/Employee/EmployeeCreate.vue'
import WorkLog from '@/views/WorkLog/WorkLogManagement.vue'
import Team from '@/views/Team/TeamContainer.vue'
import Task from '@/views/Task/TaskManagement.vue'
import Project from '@/views/Project/ProjectManagement.vue'
import TeamView from '@/views/Team/TeamView.vue'
import EmployeeDetail from '@/views/Employee/EmployeeDetail.vue'
import ProjectView from '@/views/Project/ProjectView.vue'
import TaskView from '@/views/Task/TaskView.vue'
import LogView from '@/views/WorkLog/WorkLogView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/emp', name: 'Emp', component: EmployeeView },
  { path: '/team', name: 'Team', component: Team },
  { path: '/project', name: 'Project', component: Project },
  { path: '/task', name: 'Task', component: Task },
  { path: '/log', name: 'Log', component: WorkLog },
  { path: '/emp/:id', name: 'EmpDetail', component: EmployeeDetail },
  { path: '/team/:id', name: 'team-list', component: TeamView },
  { path: '/project/:id', name: 'ProjectView', compenent: ProjectView },
  { path: '/task/:id', name: 'TaskView', compenent: TaskView },
  { path: '/log/id', name: 'LogView', component: LogView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.path !== '/login' && to.path !== '/register' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
