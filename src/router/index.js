import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Movies from 'pages/movies/Movies'
import MoviesInTheater from 'pages/movies/MoviesInTheater'
import MoviesComing from 'pages/movies/MoviesComing'

import Theaters from 'pages/theaters/Theaters'
import Profile from 'pages/profile/Profile'

import CityPicker from 'pages/citypicker/CityPicker'

import Home from 'pages/Home'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/cities',
    component: CityPicker
  },
  {
    path: '/home',
    component: Home,
    redirect: '/home/movies/intheater',
    children: [
      {
        name: 'movies',
        path: 'movies',
        component: Movies,
        redirect: '/home/movies/intheater',
        children: [
          {
            name: 'intheater',
            path: 'intheater',
            component: MoviesInTheater,
            meta: 1
          },
          {
            name: 'coming',
            path: 'coming',
            component: MoviesComing,
            meta: 2
          }
        ]
      },
      {
        name: 'theaters',
        path: 'theaters',
        component: Theaters
      },
      {
        name: 'profile',
        path: 'profile',
        component: Profile
      }
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: '/dist/',
  routes
})

export default router