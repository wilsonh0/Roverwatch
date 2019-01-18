import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    date: new Date().toLocaleDateString("fr-CA", { timeZone: "America/New_York" }),
    nasaKey: '', //NASA api
    newsKey: '', //newsapi,
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    cameras: {
      spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES', 'ENTRY'],
      opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES', 'ENTRY'],
      curiosity: ['FHAZ', 'RHAZ', 'NAVCAM', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI'],
    },
    manifest: {
      spirit: null,
      opportunity: null,
      curiosity: null
    },
    img: {
      curiosity: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/PIA19808-MarsCuriosityRover-AeolisMons-BuckskinRock-20150805.jpg/800px-PIA19808-MarsCuriosityRover-AeolisMons-BuckskinRock-20150805.jpg',
      opportunity: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/KSC-03PD-0786.jpg/1024px-KSC-03PD-0786.jpg',
      spirit: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/NASA_Mars_Rover.jpg/800px-NASA_Mars_Rover.jpg'
    }
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getDate: state => {
      return state.date;
    },
    getNasaKey: state => {
      return state.nasaKey;
    },
    getNewsKey: state => {
      return state.newsKey
    },
    getRovers: state => {
      return state.rovers;
    },
    getRoverCams: state => {
      return state.cameras;
    },
    getRoverImg: state => {
      return state.img;
    }
  }
})
