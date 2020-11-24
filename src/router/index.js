import Vue from "vue";
import Router from "vue-router";

const Login = () => import(/* webpackChunkName: "public" */ "@/views/Auth/Login");
const ForgotPassword = () => import(/* webpackChunkName: "public" */ "@/views/Auth/ForgotPassword");
const ConfirmEmail = () => import(/* webpackChunkName: "public" */ "@/views/Auth/ConfirmEmail");
const SignUp = () => import(/* webpackChunkName: "public" */ "@/views/Auth/SignUp");
const SSOCallback = () => import(/* webpackChunkName: "public" */ "@/views/Auth/SSOCallback");
const AppHome = () => import(/* webpackChunkName: "private" */ "@/views/App/Home");
const Private = () => import(/* webpackChunkName: "private" */ "@/views/Private");
const AppTodo = () => import(/* webpackChunkName: "private" */ "@/views/App/Todo");
Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Root",
            redirect: "/login",
            component: Login
        },
        {
            path: "/login",
            name: "Login",
            component: Login
        },
        {
            path: "/recuperar-senha",
            name: "Forgot Password",
            component: ForgotPassword
        },
        {
            path: "/confirm-email",
            name: "Confirm Email",
            component: ConfirmEmail
        },
        {
            path: "/signup",
            name: "Signup",
            component: SignUp
        },
        {
            path: "/sso/callback/auth",
            name: "SSO callback",
            component: SSOCallback
        },
        {
            path: "/app",
            name: "App Root",
            redirect: "/app/home",
            component: Private,
            children: [
                {
                    path: "/app/home",
                    name: "App Home",
                    component: AppHome
                },
                {
                    path: "/app/todo",
                    name: "App Todo",
                    component: AppTodo
                },
            ]
        },
    ]
});


export const menuEntries = [
    {
        "label": "Home",
        "path": "/app/home",
        "icon": "home",
    },
    {
        "label": "Todo",
        "path": "/app/todo",
        "icon": "check",
    },
]


export default router;
