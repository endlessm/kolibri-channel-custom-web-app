import Vue from 'vue';
import Vuex from 'vuex';
import storeData from '@/template/overrides/store.json';

Vue.use(Vuex);

const initialState = {
  appName: '',
  logoAsset: 'logo.png',
};

const store = new Vuex.Store({
  state: { ...initialState, ...storeData },
  // state: initialState,
  // mutations: {
  //   setAppName(state, appName) {
  //     state.appName = appName;
  //   },
  //   setLogoAsset(state, logoAsset) {
  //     state.logoAsset = logoAsset;
  //   },
  // },
});

// const setInitialState = () => {
//   if ('appName' in storeData) {
//     store.commit('setAppName', storeData.appName);
//   }
//   if ('logoAsset' in storeData) {
//     store.commit('setLogoAsset', storeData.logoAsset);
//   }
// };

// setInitialState();

export default store;
