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
const VideoPlayer = () => import(/* webpackChunkName: "private" */ "@/views/App/Videos/Player");
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
                    path: "home",
                    name: "App Home",
                    component: AppHome
                },
                {
                    path: "todo",
                    name: "App Todo",
                    component: AppTodo
                },
                {
                    path: "videos",
                    name: "App Videos",
                    component: VideoPlayer,
                    children: [
                        {
                            path: "player",
                            name: "App Video Player",
                            component: VideoPlayer,
                        }
                    ]
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
    {
        "label": "Videos",
        "path": "/app/todo",
        "icon": "movie",
        "isGroup": true,
        "children": [
            {
                "label": "Player",
                "path": "/app/videos/player",
                "icon": "play_arrow",
            }
        ]
    },
]


export default router;
