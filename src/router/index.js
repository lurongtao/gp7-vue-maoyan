import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Movies from 'pages/movies/Movies'
import MoviesInTheater from 'pages/movies/MoviesInTheater'
import MoviesComing from 'pages/movies/MoviesComing'

import Theaters from 'pages/theaters/Theaters'
import Profile from 'pages/profile/Profile'

const routes = [
  {
    path: '/',
    redirect: '/movies'
  },
  {
    name: 'movies',
    path: '/movies',
    component: Movies,
    redirect: '/movies/intheater',
    children: [
      {
        name: 'intheater',
        path: 'intheater',
        component: MoviesInTheater
      },
      {
        name: 'coming',
        path: 'coming',
        component: MoviesComing
      }
    ]
  },
  {
    name: 'theaters',
    path: '/theaters',
    component: Theaters
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router