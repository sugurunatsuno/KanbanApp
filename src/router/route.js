import KbnBoardView from '@/component/template/KbnBoardView.vue'
import KbnLoginView from '@/component/template/KbnLoginView.vue'
import KbnTaskDetailModal from '@/component/template/KbnTaskDetailModal.vue'

export default [{
    path: '/',
    component: KbnBoardView,
    meta: { requiresAuth: true }
},
{
    path: '/login',
    component: KbnLoginView
}, {
    path: '/tasks/:id',
    component: KbnTaskDetailModal,
    meta: {requiresAuth: true}
},
{
    path: '*',
    redirect: '/'
}]
